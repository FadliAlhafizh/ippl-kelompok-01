<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preferensi extends Model
{
    protected $table = 'preferensi';

    /** Pilihan yang ditampilkan di form preferensi. */
    public const JENIS_MAKANAN = ['Manis', 'Asin', 'Gurih', 'Pedas', 'Vegetarian', 'Rendah Kalori', 'Tinggi Protein'];
    public const PANTANGAN = ['Seafood', 'Kacang', 'Susu', 'Gluten', 'Telur', 'Daging Sapi'];

    protected $fillable = ['user_id', 'jenis_makanan', 'pantangan'];

    protected function casts(): array
    {
        return ['jenis_makanan' => 'array', 'pantangan' => 'array'];
    }
}
