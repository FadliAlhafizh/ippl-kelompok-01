<?php

use App\Http\Controllers\Admin\RestoranController as AdminRestoranController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoritController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RestoranController;
use Illuminate\Support\Facades\Route;

// UC1 — Membuat akun & login
Route::middleware('guest')->group(function () {
    Route::get('/signin', [AuthController::class, 'showSignin'])->name('signin');
    Route::post('/signin', [AuthController::class, 'signin']);
    Route::get('/signup', [AuthController::class, 'showSignup'])->name('signup');
    Route::post('/signup', [AuthController::class, 'signup']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // UC2, UC3, UC4, UC9 — beranda: restoran sekitar, pencarian, filter, rekomendasi
    Route::get('/', [RestoranController::class, 'index'])->name('home');
    Route::get('/restoran-sekitar', [RestoranController::class, 'index'])->name('restoran.sekitar');

    // UC5 — detail restoran
    Route::get('/restoran/{id}', [RestoranController::class, 'detail'])->name('restoran.detail');

    // UC5 — detail menu
    Route::get('/menu/{id}', [MenuController::class, 'show'])->name('menu.detail');

    // UC7 — rating & ulasan
    Route::post('/restoran/{id}/rating', [RatingController::class, 'store'])->name('rating.store');

    // UC8 — favorit
    Route::get('/favorit', [FavoritController::class, 'index'])->name('favorit.index');
    Route::post('/favorit/{id}', [FavoritController::class, 'toggle'])->name('favorit.toggle');

    // UC10 — profil, UC6 — preferensi
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/preferensi', [ProfileController::class, 'editPreferensi'])->name('preferensi');
    Route::put('/preferensi', [ProfileController::class, 'updatePreferensi'])->name('preferensi.update');

    // UC11 — admin kelola data restoran
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/restoran', [AdminRestoranController::class, 'index'])->name('restoran.index');
        Route::get('/restoran/create', [AdminRestoranController::class, 'create'])->name('restoran.create');
        Route::post('/restoran', [AdminRestoranController::class, 'store'])->name('restoran.store');
        Route::get('/restoran/{id}/edit', [AdminRestoranController::class, 'edit'])->name('restoran.edit');
        Route::put('/restoran/{id}', [AdminRestoranController::class, 'update'])->name('restoran.update');
        Route::delete('/restoran/{id}', [AdminRestoranController::class, 'destroy'])->name('restoran.destroy');

        Route::post('/restoran/{id}/menu', [AdminRestoranController::class, 'storeMenu'])->name('menu.store');
        Route::put('/menu/{menuid}', [AdminRestoranController::class, 'updateMenu'])->name('menu.update');
        Route::delete('/menu/{menuid}', [AdminRestoranController::class, 'destroyMenu'])->name('menu.destroy');
    });
});
