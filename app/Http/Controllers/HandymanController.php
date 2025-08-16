<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HandymanController extends Controller
{
    /**
     * Display a listing of handymen.
     */
    public function index(Request $request)
    {
        $query = User::handymen()->with(['skills', 'reviews']);

        // Filter by skill
        if ($request->skill_id) {
            $query->whereHas('skills', function ($q) use ($request) {
                $q->where('skill_id', $request->skill_id);
            });
        }

        // Filter by location
        if ($request->location) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Filter by rating
        if ($request->min_rating) {
            $query->where('rating', '>=', $request->min_rating);
        }

        // Sort by rating or newest
        $sortBy = $request->sort_by ?? 'rating';
        if ($sortBy === 'rating') {
            $query->orderBy('rating', 'desc');
        } else {
            $query->latest();
        }

        $handymen = $query->paginate(12);
        $skills = Skill::active()->get();

        return Inertia::render('handymen/index', [
            'handymen' => $handymen,
            'skills' => $skills,
            'filters' => $request->only(['skill_id', 'location', 'min_rating', 'sort_by']),
        ]);
    }

    /**
     * Display the specified handyman.
     */
    public function show(User $handyman)
    {
        if (!$handyman->isHandyman()) {
            abort(404);
        }

        $handyman->load([
            'skills',
            'reviews' => function ($query) {
                $query->public()->with('customer')->latest();
            }
        ]);

        return Inertia::render('handymen/show', [
            'handyman' => $handyman,
        ]);
    }
}