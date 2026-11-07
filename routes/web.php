<?php

use Inertia\Inertia;
use App\Http\Controllers\RestoranController;

Route::get('/restorans', [RestoranController::class, 'index'])->name('restorans.index');
Route::get('/restoran/{id}', [RestoranController::class, 'tampilkanDetail'])->name('restoran.detail');
Route::get('/restoran-sekitar', [RestoranController::class, 'tampilkanDaftarSekitar'])->name('restoran.sekitar');
Route::get('/', function () {
    return Inertia::render('welcome', [
        'title' => 'Welcome to Inertia.js with React'
    ]);
});

