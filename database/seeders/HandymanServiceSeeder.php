<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Earning;
use App\Models\Review;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HandymanServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@handyman.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_verified' => true,
        ]);

        // Create skills
        $skills = [
            ['name' => 'Electrical', 'icon' => '⚡', 'description' => 'Electrical installations, repairs, and maintenance', 'base_rate' => 45.00],
            ['name' => 'Plumbing', 'icon' => '🔧', 'description' => 'Water systems, pipe repairs, and installations', 'base_rate' => 40.00],
            ['name' => 'Carpentry', 'icon' => '🪚', 'description' => 'Wood working, furniture repair, and construction', 'base_rate' => 35.00],
            ['name' => 'Painting', 'icon' => '🎨', 'description' => 'Interior and exterior painting services', 'base_rate' => 25.00],
            ['name' => 'Cleaning', 'icon' => '🧽', 'description' => 'Professional cleaning services', 'base_rate' => 20.00],
            ['name' => 'Gardening', 'icon' => '🌱', 'description' => 'Garden maintenance and landscaping', 'base_rate' => 30.00],
            ['name' => 'AC Repair', 'icon' => '❄️', 'description' => 'Air conditioning installation and repair', 'base_rate' => 50.00],
            ['name' => 'Masonry', 'icon' => '🧱', 'description' => 'Brick work, stone work, and concrete', 'base_rate' => 35.00],
        ];

        foreach ($skills as $skillData) {
            Skill::create($skillData);
        }

        // Create sample customers
        $customers = [];
        for ($i = 1; $i <= 5; $i++) {
            $customers[] = User::create([
                'name' => "Customer $i",
                'email' => "customer$i@handyman.test",
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '+1234567890' . $i,
                'location' => 'City ' . chr(64 + $i),
            ]);
        }

        // Create sample handymen
        $handymen = [];
        $locations = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'];
        
        for ($i = 1; $i <= 8; $i++) {
            $handyman = User::create([
                'name' => "Handyman Tukang $i",
                'email' => "handyman$i@handyman.test",
                'password' => Hash::make('password'),
                'role' => 'handyman',
                'phone' => '+6281234567' . str_pad((string) $i, 3, '0', STR_PAD_LEFT),
                'location' => $locations[array_rand($locations)],
                'bio' => "Experienced handyman with expertise in various home improvement services. Professional, reliable, and committed to quality work.",
                'rating' => random_int(35, 50) / 10, // 3.5 to 5.0 rating
                'total_reviews' => random_int(5, 25),
                'is_verified' => random_int(0, 1) === 1,
            ]);

            $handymen[] = $handyman;

            // Assign random skills to handymen
            $skillIds = Skill::pluck('id')->toArray();
            $numSkills = random_int(2, min(4, count($skillIds)));
            $randomSkillIndexes = (array) array_rand($skillIds, $numSkills);

            foreach ($randomSkillIndexes as $skillIndex) {
                $skill = Skill::find($skillIds[$skillIndex]);
                $handyman->skills()->attach($skill->id, [
                    'certification_level' => ['beginner', 'intermediate', 'expert'][random_int(0, 2)],
                    'hourly_rate' => $skill->base_rate + random_int(-5, 15),
                    'years_experience' => random_int(1, 10),
                    'certification_notes' => 'Certified professional with proven track record.',
                ]);
            }
        }

        // Create sample bookings
        $bookingTitles = [
            'Fix kitchen sink leak',
            'Install ceiling fan',
            'Paint bedroom walls',
            'Repair garden fence',
            'Clean house after renovation',
            'Fix electrical outlet',
            'Install new toilet',
            'Build custom shelves',
        ];

        for ($i = 0; $i < 15; $i++) {
            $customer = $customers[array_rand($customers)];
            $handyman = $handymen[array_rand($handymen)];
            $skill = $handyman->skills->random();
            $hourlyRate = $skill->pivot->hourly_rate ?? $skill->base_rate;
            $estimatedHours = random_int(2, 8);
            $totalAmount = $hourlyRate * $estimatedHours;

            $booking = Booking::create([
                'booking_number' => Booking::generateBookingNumber(),
                'customer_id' => $customer->id,
                'handyman_id' => $handyman->id,
                'skill_id' => $skill->id,
                'title' => $bookingTitles[array_rand($bookingTitles)],
                'description' => 'Detailed description of the work that needs to be done. Customer expects professional quality work completed within the estimated time frame.',
                'location' => $customer->location ?? 'Jakarta',
                'hourly_rate' => $hourlyRate,
                'estimated_hours' => $estimatedHours,
                'total_amount' => $totalAmount,
                'status' => ['pending', 'accepted', 'in_progress', 'completed'][random_int(0, 3)],
                'scheduled_at' => now()->addDays(random_int(1, 30)),
                'notes' => random_int(0, 1) ? 'Please bring your own tools. Customer will provide materials.' : null,
            ]);

            // Create review for completed bookings
            if ($booking->status === 'completed' && random_int(0, 1)) {
                Review::create([
                    'booking_id' => $booking->id,
                    'customer_id' => $customer->id,
                    'handyman_id' => $handyman->id,
                    'rating' => random_int(3, 5),
                    'comment' => [
                        'Excellent work! Very professional and on time.',
                        'Good quality work, would recommend.',
                        'Satisfactory service, completed as requested.',
                        'Outstanding craftsmanship and attention to detail.',
                        'Quick and efficient service, very happy with results.',
                    ][random_int(0, 4)],
                    'is_public' => true,
                ]);

                // Create earning record
                $platformFee = $totalAmount * 0.1;
                Earning::create([
                    'handyman_id' => $handyman->id,
                    'booking_id' => $booking->id,
                    'amount' => $totalAmount,
                    'platform_fee' => $platformFee,
                    'net_amount' => $totalAmount - $platformFee,
                    'status' => 'paid',
                    'paid_at' => now()->subDays(random_int(1, 15)),
                ]);
            }
        }

        // Update handyman ratings based on reviews
        foreach ($handymen as $handyman) {
            $reviews = Review::where('handyman_id', $handyman->id)->get();
            if ($reviews->count() > 0) {
                $avgRating = $reviews->avg('rating');
                $handyman->update([
                    'rating' => round($avgRating, 2),
                    'total_reviews' => $reviews->count(),
                ]);
            }
        }
    }
}