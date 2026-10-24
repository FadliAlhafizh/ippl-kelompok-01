<?php

use Inertia\Inertia;
use App\Http\Controllers\RestoranController;

Route::get('/restorans', [RestoranController::class, 'index'])->name('restorans.index');
Route::get('/', function () {
    return Inertia::render('welcome', [
        'title' => 'Welcome to Inertia.js with React'
    ]);
});

