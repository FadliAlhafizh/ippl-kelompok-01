<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Rekomendasi extends Model
{
    use HasFactory;
 
    protected $table = 'rekomendasi';
    protected $primaryKey = 'profileid';
    public $incrementing = true;
    protected $keyType = 'int';
 
    protected $fillable = [
        'userid',
        'restoranid',
        'alasan',
    ];
 
    // Rekomendasi milik satu user (User 1 -> 0..* Rekomendasi)
    public function user()
    {
        return $this->belongsTo(User::class, 'userid', 'id');
    }
 
    // Rekomendasi merujuk ke satu restoran, restoran punya banyak menu
    public function restoran()
    {
        return $this->belongsTo(Restoran::class, 'restoranid', 'restoranid');
    }
 
    /**
     * prosesPreferensi():
     * pilih restoran dengan kategori sesuai jenis makanan favorit user
     * dan rating tertinggi, lalu simpan sebagai rekomendasi beserta alasannya.
     */
    public static function prosesPreferensi(int $userid, string $jenisMakanan): self
    {
        $restoran = Restoran::where('kategori', $jenisMakanan)
            ->orderByDesc('rating')
            ->first();
 
        return self::create([
            'userid'     => $userid,
            'restoranid' => $restoran?->restoranid,
            'alasan'     => $restoran
                ? "Sesuai preferensi {$jenisMakanan} dan memiliki rating {$restoran->rating}"
                : 'Belum ada restoran yang cocok dengan preferensi Anda',
        ]);
    }
}