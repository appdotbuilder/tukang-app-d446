<?php

namespace Database\Factories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Skill>
 */
class SkillFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Skill>
     */
    protected $model = Skill::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $skills = [
            ['name' => 'Electrical', 'icon' => '⚡', 'description' => 'Electrical installations, repairs, and maintenance'],
            ['name' => 'Plumbing', 'icon' => '🔧', 'description' => 'Water systems, pipe repairs, and installations'],
            ['name' => 'Carpentry', 'icon' => '🪚', 'description' => 'Wood working, furniture repair, and construction'],
            ['name' => 'Painting', 'icon' => '🎨', 'description' => 'Interior and exterior painting services'],
            ['name' => 'Cleaning', 'icon' => '🧽', 'description' => 'Professional cleaning services'],
            ['name' => 'Gardening', 'icon' => '🌱', 'description' => 'Garden maintenance and landscaping'],
            ['name' => 'AC Repair', 'icon' => '❄️', 'description' => 'Air conditioning installation and repair'],
            ['name' => 'Masonry', 'icon' => '🧱', 'description' => 'Brick work, stone work, and concrete'],
        ];

        $skill = $this->faker->randomElement($skills);

        return [
            'name' => $skill['name'],
            'icon' => $skill['icon'],
            'description' => $skill['description'],
            'base_rate' => $this->faker->randomFloat(2, 15, 50),
            'is_active' => true,
        ];
    }
}