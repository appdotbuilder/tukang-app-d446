<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Earning;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display admin dashboard with key metrics.
     */
    public function index()
    {
        $stats = [
            'total_customers' => User::customers()->count(),
            'total_handymen' => User::handymen()->count(),
            'total_bookings' => Booking::count(),
            'completed_bookings' => Booking::where('status', 'completed')->count(),
            'total_revenue' => Earning::sum('platform_fee'),
            'pending_earnings' => Earning::where('status', 'pending')->sum('net_amount'),
        ];

        // Recent bookings
        $recentBookings = Booking::with(['customer', 'handyman', 'skill'])
            ->latest()
            ->take(10)
            ->get();

        // Monthly earnings chart data
        $monthlyEarnings = Earning::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('SUM(platform_fee) as revenue')
        )
            ->groupBy('month')
            ->orderBy('month')
            ->take(12)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'monthlyEarnings' => $monthlyEarnings,
        ]);
    }
}