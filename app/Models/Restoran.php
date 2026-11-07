<?php

namespace App\Models;

use illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restoran extends Model
{
    use HasFactory;

    protected $table = 'restoran';
    protected $primaryKey = 'restoranid';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nama',
        'alamat',
        'kategori',
        'rating',
    ];

    public function menu()
    {
        return $this->hasMany(Menu::class, 'restoranid', 'restoranid');
    }
}
