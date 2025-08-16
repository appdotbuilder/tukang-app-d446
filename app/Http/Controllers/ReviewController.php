<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Show the form for creating a new review.
     */
    public function create(Booking $booking)
    {
        // Check if user is the customer of this booking
        if ($booking->customer_id !== Auth::id()) {
            abort(403);
        }

        // Check if booking is completed
        if ($booking->status !== 'completed') {
            abort(403, 'You can only review completed bookings.');
        }

        // Check if review already exists
        if ($booking->review) {
            return redirect()->route('bookings.show', $booking)
                ->with('error', 'You have already reviewed this booking.');
        }

        $booking->load(['handyman', 'skill']);

        return Inertia::render('reviews/create', [
            'booking' => $booking,
        ]);
    }

    /**
     * Store a newly created review.
     */
    public function store(StoreReviewRequest $request, Booking $booking)
    {
        // Check if user is the customer of this booking
        if ($booking->customer_id !== Auth::id()) {
            abort(403);
        }

        // Check if booking is completed
        if ($booking->status !== 'completed') {
            abort(403, 'You can only review completed bookings.');
        }

        // Check if review already exists
        if ($booking->review) {
            return redirect()->route('bookings.show', $booking)
                ->with('error', 'You have already reviewed this booking.');
        }

        Review::create([
            'booking_id' => $booking->id,
            'customer_id' => Auth::id(),
            'handyman_id' => $booking->handyman_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_public' => $request->is_public ?? true,
        ]);

        // Update handyman's rating
        $this->updateHandymanRating($booking->handyman_id);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Review submitted successfully!');
    }

    /**
     * Update handyman's overall rating.
     */
    protected function updateHandymanRating($handymanId): void
    {
        $reviews = Review::where('handyman_id', $handymanId)->get();
        
        if ($reviews->count() > 0) {
            $avgRating = $reviews->avg('rating');
            $handyman = \App\Models\User::find($handymanId);
            $handyman->update([
                'rating' => round($avgRating, 2),
                'total_reviews' => $reviews->count(),
            ]);
        }
    }
}