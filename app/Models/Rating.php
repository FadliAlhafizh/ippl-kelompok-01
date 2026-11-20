<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    protected $table = 'rating';

    protected $fillable = ['user_id', 'restoranid', 'nilai', 'komentar'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function restoran(): BelongsTo
    {
        return $this->belongsTo(Restoran::class, 'restoranid', 'restoranid');
    }
}
