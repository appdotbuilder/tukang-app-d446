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
        Schema::create('earnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('handyman_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2)->comment('Earning amount');
            $table->decimal('platform_fee', 10, 2)->default(0.00)->comment('Platform commission fee');
            $table->decimal('net_amount', 10, 2)->comment('Net amount after platform fee');
            $table->enum('status', ['pending', 'paid', 'disputed'])->default('pending');
            $table->datetime('paid_at')->nullable()->comment('Date when payment was made');
            $table->timestamps();
            
            $table->unique('booking_id');
            $table->index('handyman_id');
            $table->index('status');
            $table->index('paid_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('earnings');
    }
};