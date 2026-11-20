<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorit extends Model
{
    protected $table = 'favorit';

    protected $fillable = ['user_id', 'restoranid'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function restoran(): BelongsTo
    {
        return $this->belongsTo(Restoran::class, 'restoranid', 'restoranid');
    }
}
