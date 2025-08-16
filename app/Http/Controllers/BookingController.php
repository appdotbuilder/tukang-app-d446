<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the user's bookings.
     */
    public function index()
    {
        $user = Auth::user();
        
        if ($user->isCustomer()) {
            $bookings = $user->customerBookings()
                ->with(['handyman', 'skill', 'review'])
                ->latest()
                ->paginate(10);
        } elseif ($user->isHandyman()) {
            $bookings = $user->handymanBookings()
                ->with(['customer', 'skill', 'review'])
                ->latest()
                ->paginate(10);
        } else {
            $bookings = collect();
        }

        return Inertia::render('bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(Request $request)
    {
        $handyman = null;
        if ($request->handyman_id) {
            $handyman = User::handymen()
                ->with('skills')
                ->findOrFail($request->handyman_id);
        }

        $skills = Skill::active()->get();

        return Inertia::render('bookings/create', [
            'handyman' => $handyman,
            'skills' => $skills,
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(StoreBookingRequest $request)
    {
        $handyman = User::handymen()->findOrFail($request->handyman_id);
        $skill = Skill::findOrFail($request->skill_id);
        
        // Get the handyman's rate for this skill or use base rate
        $handymanSkill = $handyman->skills()->where('skill_id', $skill->id)->first();
        $hourlyRate = $handymanSkill->pivot->hourly_rate ?? $skill->base_rate;
        
        $totalAmount = $hourlyRate * $request->estimated_hours;

        $booking = Booking::create([
            'booking_number' => Booking::generateBookingNumber(),
            'customer_id' => Auth::id(),
            'handyman_id' => $request->handyman_id,
            'skill_id' => $request->skill_id,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'hourly_rate' => $hourlyRate,
            'estimated_hours' => $request->estimated_hours,
            'total_amount' => $totalAmount,
            'scheduled_at' => $request->scheduled_at,
            'notes' => $request->notes,
        ]);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking created successfully!');
    }

    /**
     * Display the specified booking.
     */
    public function show(Booking $booking)
    {
        // Check if user has access to this booking
        $user = Auth::user();
        if (!$user->isAdmin() && 
            $booking->customer_id !== $user->id && 
            $booking->handyman_id !== $user->id) {
            abort(403);
        }

        $booking->load(['customer', 'handyman', 'skill', 'review', 'earning']);

        return Inertia::render('bookings/show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified booking status.
     */
    public function update(Request $request, Booking $booking)
    {
        $user = Auth::user();
        
        // Only handyman can accept/start/complete bookings
        if ($user->isHandyman() && $booking->handyman_id === $user->id) {
            $request->validate([
                'status' => 'required|in:accepted,in_progress,completed,cancelled',
            ]);

            $booking->update(['status' => $request->status]);

            if ($request->status === 'in_progress') {
                $booking->update(['started_at' => now()]);
            } elseif ($request->status === 'completed') {
                $booking->update(['completed_at' => now()]);
                
                // Create earning record
                $platformFee = $booking->total_amount * 0.1; // 10% platform fee
                $booking->earning()->create([
                    'handyman_id' => $booking->handyman_id,
                    'amount' => $booking->total_amount,
                    'platform_fee' => $platformFee,
                    'net_amount' => $booking->total_amount - $platformFee,
                    'status' => 'pending',
                ]);
            }
        }

        // Customer can cancel pending bookings
        if ($user->isCustomer() && $booking->customer_id === $user->id && $booking->status === 'pending') {
            $request->validate([
                'status' => 'required|in:cancelled',
            ]);

            $booking->update(['status' => $request->status]);
        }

        return back()->with('success', 'Booking updated successfully!');
    }
}