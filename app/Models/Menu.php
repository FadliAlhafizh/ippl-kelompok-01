<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Menu extends Model
{
    protected $table = 'menu';
    protected $primaryKey = 'menuid';

    protected $fillable = ['restoranid', 'nama_menu', 'harga', 'kategori', 'tags', 'deskripsi'];

    protected function casts(): array
    {
        return ['tags' => 'array', 'harga' => 'integer'];
    }

    public function restoran(): BelongsTo
    {
        return $this->belongsTo(Restoran::class, 'restoranid', 'restoranid');
    }
}
