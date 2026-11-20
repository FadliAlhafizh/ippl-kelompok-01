<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Menambahkan kolom yang dibutuhkan fitur lokasi & detail restoran.
     * Setiap kolom dicek dulu (hasColumn) karena database lama bisa saja
     * dibuat dari versi awal migration restoran yang belum punya kolom lokasi.
     */
    public function up(): void
    {
        Schema::table('restoran', function (Blueprint $table) {
            if (! Schema::hasColumn('restoran', 'latitude')) {
                $table->decimal('latitude', 10, 8)->nullable();
            }
            if (! Schema::hasColumn('restoran', 'longitude')) {
                $table->decimal('longitude', 11, 8)->nullable();
            }
            if (! Schema::hasColumn('restoran', 'city')) {
                $table->string('city')->nullable();
            }
            if (! Schema::hasColumn('restoran', 'deskripsi')) {
                $table->text('deskripsi')->nullable();
            }
            if (! Schema::hasColumn('restoran', 'gambar')) {
                $table->string('gambar')->nullable();
            }
        });
    }

    public function down(): void
    {
        // Hanya kolom yang ditambahkan khusus oleh migration ini.
        Schema::table('restoran', function (Blueprint $table) {
            $table->dropColumn(['deskripsi', 'gambar']);
        });
    }
};
