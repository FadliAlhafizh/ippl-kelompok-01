<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rating', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('restoranid')->constrained('restoran', 'restoranid')->cascadeOnDelete();
            $table->unsignedTinyInteger('nilai');
            $table->text('komentar')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'restoranid']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rating');
    }
};
