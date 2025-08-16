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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['customer', 'handyman', 'admin'])->default('customer')->after('email');
            $table->string('phone')->nullable()->after('email');
            $table->string('location')->nullable()->after('phone');
            $table->text('bio')->nullable()->after('location');
            $table->decimal('rating', 3, 2)->default(0.00)->after('bio');
            $table->integer('total_reviews')->default(0)->after('rating');
            $table->boolean('is_verified')->default(false)->after('total_reviews');
            
            $table->index('role');
            $table->index('location');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['location']);
            $table->dropIndex(['rating']);
            
            $table->dropColumn([
                'role',
                'phone',
                'location',
                'bio',
                'rating',
                'total_reviews',
                'is_verified'
            ]);
        });
    }
};