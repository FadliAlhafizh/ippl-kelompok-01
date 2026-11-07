<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('restoran', function (Blueprint $table) {
            $table->id('restoranid'); 
            $table->string('nama');
            $table->text('alamat');
            $table->string('kategori');
            $table->double('rating')->default(0.0);
            $table->json('daftar_menu')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restoran');
    }
};
