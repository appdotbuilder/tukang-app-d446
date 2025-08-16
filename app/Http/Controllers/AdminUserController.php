<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    /**
     * Display users management.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->role && $request->role !== 'all') {
            $query->where('role', $request->role);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $users = $query->latest()->paginate(15);

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    /**
     * Update user verification status.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'is_verified' => 'required|boolean',
        ]);

        $user->update([
            'is_verified' => $request->is_verified,
        ]);

        return back()->with('success', 'User verification status updated!');
    }
}