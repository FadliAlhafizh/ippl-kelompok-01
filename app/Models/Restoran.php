<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restoran extends Model
{
    protected $table = 'restorans';
    protected $guarded = ['id'];

    public function menu()
    {
        return $this->hasMany(Menu::class, 'restoran_id');
    }
}
