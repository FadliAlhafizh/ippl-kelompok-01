<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('no_telepon', 20)->nullable()->unique();
            $table->date('tanggal_lahir')->nullable();
            $table->string('lokasi')->nullable();
            $table->string('role', 20)->default('user'); // 'user' | 'admin'
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['no_telepon']);
            $table->dropColumn(['no_telepon', 'tanggal_lahir', 'lokasi', 'role']);
        });
    }
};
