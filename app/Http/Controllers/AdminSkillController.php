<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSkillController extends Controller
{
    /**
     * Display skills management.
     */
    public function index()
    {
        $skills = Skill::withCount('handymen')->paginate(10);

        return Inertia::render('admin/skills', [
            'skills' => $skills,
        ]);
    }

    /**
     * Update skill pricing.
     */
    public function update(Request $request, Skill $skill)
    {
        $request->validate([
            'base_rate' => 'required|numeric|min:0|max:1000',
        ]);

        $skill->update([
            'base_rate' => $request->base_rate,
        ]);

        return back()->with('success', 'Skill pricing updated successfully!');
    }
}