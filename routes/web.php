<?php

use App\Http\Controllers\AdminCertificationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminReportController;
use App\Http\Controllers\AdminSkillController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HandymanController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public handyman browsing
Route::get('/handymen', [HandymanController::class, 'index'])->name('handymen.index');
Route::get('/handymen/{handyman}', [HandymanController::class, 'show'])->name('handymen.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Booking routes for customers
    Route::get('/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    
    // Review routes
    Route::get('/bookings/{booking}/review', [ReviewController::class, 'create'])->name('reviews.create');
    Route::post('/bookings/{booking}/review', [ReviewController::class, 'store'])->name('reviews.store');

    // Booking management for both customers and handymen
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::patch('/bookings/{booking}', [BookingController::class, 'update'])->name('bookings.update');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/skills', [AdminSkillController::class, 'index'])->name('skills');
        Route::patch('/skills/{skill}', [AdminSkillController::class, 'update'])->name('skills.update');
        Route::get('/certifications', [AdminCertificationController::class, 'index'])->name('certifications');
        Route::patch('/certifications', [AdminCertificationController::class, 'update'])->name('certifications.update');
        Route::get('/reports', [AdminReportController::class, 'index'])->name('reports');
        Route::get('/users', [AdminUserController::class, 'index'])->name('users');
        Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
