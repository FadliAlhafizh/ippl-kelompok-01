<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // 'role' sengaja tidak mass-assignable agar tidak bisa diubah lewat request.
    protected $fillable = [
        'name',
        'email',
        'password',
        'no_telepon',
        'tanggal_lahir',
        'lokasi',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'tanggal_lahir' => 'date:Y-m-d',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function preferensi(): HasOne
    {
        return $this->hasOne(Preferensi::class, 'user_id');
    }

    public function favorit(): HasMany
    {
        return $this->hasMany(Favorit::class, 'user_id');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, 'user_id');
    }
}
