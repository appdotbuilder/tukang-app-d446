<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Booking>
     */
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hourlyRate = $this->faker->randomFloat(2, 20, 60);
        $estimatedHours = $this->faker->numberBetween(1, 8);
        $totalAmount = $hourlyRate * $estimatedHours;

        return [
            'booking_number' => Booking::generateBookingNumber(),
            'customer_id' => User::factory()->create(['role' => 'customer']),
            'handyman_id' => User::factory()->create(['role' => 'handyman']),
            'skill_id' => Skill::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(3),
            'location' => $this->faker->address,
            'hourly_rate' => $hourlyRate,
            'estimated_hours' => $estimatedHours,
            'total_amount' => $totalAmount,
            'status' => $this->faker->randomElement(['pending', 'accepted', 'in_progress', 'completed', 'cancelled']),
            'scheduled_at' => $this->faker->optional()->dateTimeBetween('now', '+30 days'),
            'started_at' => $this->faker->optional()->dateTimeBetween('-30 days', 'now'),
            'completed_at' => $this->faker->optional()->dateTimeBetween('-30 days', 'now'),
            'notes' => $this->faker->optional()->paragraph(),
        ];
    }
}