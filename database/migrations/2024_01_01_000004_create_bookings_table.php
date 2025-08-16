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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique()->comment('Unique booking reference number');
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('handyman_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Brief title of the job');
            $table->text('description')->comment('Detailed description of the work needed');
            $table->string('location')->comment('Job location address');
            $table->decimal('hourly_rate', 8, 2)->comment('Agreed hourly rate');
            $table->integer('estimated_hours')->comment('Estimated hours to complete');
            $table->decimal('total_amount', 10, 2)->comment('Total estimated cost');
            $table->enum('status', [
                'pending',
                'accepted', 
                'in_progress',
                'completed',
                'cancelled',
                'disputed'
            ])->default('pending');
            $table->datetime('scheduled_at')->nullable()->comment('Scheduled start time');
            $table->datetime('started_at')->nullable()->comment('Actual start time');
            $table->datetime('completed_at')->nullable()->comment('Actual completion time');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index('booking_number');
            $table->index('customer_id');
            $table->index('handyman_id');
            $table->index('skill_id');
            $table->index('status');
            $table->index('scheduled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};