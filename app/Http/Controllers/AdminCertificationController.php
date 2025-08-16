<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCertificationController extends Controller
{
    /**
     * Display certifications management.
     */
    public function index()
    {
        $handymen = User::handymen()
            ->with(['skills' => function ($query) {
                $query->withPivot(['certification_level', 'years_experience', 'hourly_rate']);
            }])
            ->paginate(10);

        return Inertia::render('admin/certifications', [
            'handymen' => $handymen,
        ]);
    }

    /**
     * Update handyman certification level.
     */
    public function update(Request $request)
    {
        $request->validate([
            'handyman_id' => 'required|exists:users,id',
            'skill_id' => 'required|exists:skills,id',
            'certification_level' => 'required|in:beginner,intermediate,expert',
        ]);

        $handyman = User::findOrFail($request->handyman_id);
        $handyman->skills()->updateExistingPivot($request->skill_id, [
            'certification_level' => $request->certification_level,
        ]);

        return back()->with('success', 'Certification level updated successfully!');
    }
}