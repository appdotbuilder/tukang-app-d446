<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Earning;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Earning>
 */
class EarningFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Earning>
     */
    protected $model = Earning::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, 50, 500);
        $platformFee = $amount * 0.1; // 10% platform fee
        $netAmount = $amount - $platformFee;

        return [
            'handyman_id' => User::factory()->create(['role' => 'handyman']),
            'booking_id' => Booking::factory(),
            'amount' => $amount,
            'platform_fee' => $platformFee,
            'net_amount' => $netAmount,
            'status' => $this->faker->randomElement(['pending', 'paid', 'disputed']),
            'paid_at' => $this->faker->optional(0.7)->dateTimeBetween('-30 days', 'now'),
        ];
    }
}