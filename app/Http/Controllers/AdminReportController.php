<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    /**
     * Display earnings reports.
     */
    public function index()
    {
        // Top earning handymen
        $topHandymen = User::handymen()
            ->with('earnings')
            ->get()
            ->map(function ($handyman) {
                $handyman->setAttribute('total_earnings', $handyman->earnings->sum('net_amount'));
                return $handyman;
            })
            ->sortByDesc('total_earnings')
            ->take(10);

        // Monthly statistics
        $monthlyStats = Booking::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as total_bookings'),
            DB::raw('SUM(total_amount) as total_revenue')
        )
            ->where('status', 'completed')
            ->groupBy('month')
            ->orderBy('month')
            ->take(12)
            ->get();

        // Popular skills
        $popularSkills = Skill::withCount('bookings')
            ->orderBy('bookings_count', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('admin/reports', [
            'topHandymen' => $topHandymen,
            'monthlyStats' => $monthlyStats,
            'popularSkills' => $popularSkills,
        ]);
    }
}