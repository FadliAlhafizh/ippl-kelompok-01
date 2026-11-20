<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'latitude',
        'longitude',
        'city',
        'deskripsi',
        'gambar',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'float',
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }

    public function menu(): HasMany
    {
        return $this->hasMany(Menu::class, 'restoranid', 'restoranid');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, 'restoranid', 'restoranid');
    }

    public function favorit(): HasMany
    {
        return $this->hasMany(Favorit::class, 'restoranid', 'restoranid');
    }

    /** Hitung ulang rata-rata rating dari tabel rating. */
    public function hitungUlangRating(): void
    {
        $this->update(['rating' => round((float) $this->ratings()->avg('nilai'), 1)]);
    }

    /** Jarak (km) antar dua koordinat — rumus Haversine. */
    public static function hitungJarak(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $r = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);
        $a = sin($dLat / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;

        return $r * 2 * atan2(sqrt($a), sqrt(1 - $a));
    }

    public function jarakDari(?float $lat, ?float $lng): ?float
    {
        if ($lat === null || $lng === null || $this->latitude === null || $this->longitude === null) {
            return null;
        }

        return self::hitungJarak($lat, $lng, $this->latitude, $this->longitude);
    }

    /** Bentuk ringkas untuk kartu restoran di frontend. */
    public function toCard(?float $lat = null, ?float $lng = null, array $favoritIds = []): array
    {
        $jarak = $this->jarakDari($lat, $lng);

        return [
            'restoranid' => $this->restoranid,
            'nama' => $this->nama,
            'alamat' => $this->alamat,
            'kategori' => $this->kategori,
            'city' => $this->city,
            'deskripsi' => $this->deskripsi,
            'gambar' => $this->gambar,
            'rating' => (float) $this->rating,
            'ulasan' => (int) ($this->ratings_count ?? 0),
            'harga_rata' => isset($this->menu_avg_harga) ? (int) round($this->menu_avg_harga) : null,
            'jarak' => $jarak !== null ? round($jarak, 1) : null,
            'favorit' => in_array($this->restoranid, $favoritIds, true),
        ];
    }
}
