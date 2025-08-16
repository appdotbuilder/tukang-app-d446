<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Booking
 *
 * @property int $id
 * @property string $booking_number
 * @property int $customer_id
 * @property int $handyman_id
 * @property int $skill_id
 * @property string $title
 * @property string $description
 * @property string $location
 * @property float $hourly_rate
 * @property int $estimated_hours
 * @property float $total_amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $scheduled_at
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $customer
 * @property-read \App\Models\User $handyman
 * @property-read \App\Models\Skill $skill
 * @property-read \App\Models\Review|null $review
 * @property-read \App\Models\Earning|null $earning
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereBookingNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereHandymanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereEstimatedHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUpdatedAt($value)
 * @method static \Database\Factories\BookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'booking_number',
        'customer_id',
        'handyman_id',
        'skill_id',
        'title',
        'description',
        'location',
        'hourly_rate',
        'estimated_hours',
        'total_amount',
        'status',
        'scheduled_at',
        'started_at',
        'completed_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'hourly_rate' => 'float',
        'estimated_hours' => 'integer',
        'total_amount' => 'float',
        'scheduled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the booking.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the handyman that owns the booking.
     */
    public function handyman(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handyman_id');
    }

    /**
     * Get the skill for the booking.
     */
    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }

    /**
     * Get the review for the booking.
     */
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }

    /**
     * Get the earning for the booking.
     */
    public function earning(): HasOne
    {
        return $this->hasOne(Earning::class);
    }

    /**
     * Generate a unique booking number.
     */
    public static function generateBookingNumber(): string
    {
        do {
            $number = 'BK-' . date('Y') . '-' . str_pad((string) random_int(1000, 9999), 4, '0', STR_PAD_LEFT);
        } while (static::where('booking_number', $number)->exists());

        return $number;
    }
}