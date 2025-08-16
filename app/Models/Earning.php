<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Earning
 *
 * @property int $id
 * @property int $handyman_id
 * @property int $booking_id
 * @property float $amount
 * @property float $platform_fee
 * @property float $net_amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $handyman
 * @property-read \App\Models\Booking $booking
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Earning newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Earning newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Earning query()
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereHandymanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereBookingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning wherePlatformFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereNetAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning wherePaidAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Earning whereUpdatedAt($value)
 * @method static \Database\Factories\EarningFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Earning extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'handyman_id',
        'booking_id',
        'amount',
        'platform_fee',
        'net_amount',
        'status',
        'paid_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'float',
        'platform_fee' => 'float',
        'net_amount' => 'float',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the handyman that owns the earning.
     */
    public function handyman(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handyman_id');
    }

    /**
     * Get the booking that owns the earning.
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}