<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('Skill name like electrical, plumbing, etc.');
            $table->string('icon')->nullable()->comment('Icon class or emoji for the skill');
            $table->text('description')->nullable()->comment('Description of the skill');
            $table->decimal('base_rate', 8, 2)->default(0.00)->comment('Base hourly rate for this skill');
            $table->boolean('is_active')->default(true)->comment('Whether skill is active');
            $table->timestamps();
            
            $table->index('name');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};