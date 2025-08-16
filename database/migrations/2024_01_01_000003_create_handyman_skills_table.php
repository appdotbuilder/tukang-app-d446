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
        Schema::create('handyman_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->enum('certification_level', ['beginner', 'intermediate', 'expert'])->default('beginner');
            $table->text('certification_notes')->nullable()->comment('Additional notes about certification');
            $table->decimal('hourly_rate', 8, 2)->nullable()->comment('Custom hourly rate for this handyman');
            $table->integer('years_experience')->default(0)->comment('Years of experience in this skill');
            $table->timestamps();
            
            $table->unique(['user_id', 'skill_id']);
            $table->index('certification_level');
            $table->index('hourly_rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('handyman_skills');
    }
};