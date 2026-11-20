<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id('menuid');
            $table->foreignId('restoranid')->constrained('restoran', 'restoranid')->cascadeOnDelete();
            $table->string('nama_menu');
            $table->unsignedInteger('harga')->default(0);
            $table->string('kategori');
            $table->json('tags')->nullable(); // mis. ["Pedas","Seafood","Rendah Kalori"]
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};
