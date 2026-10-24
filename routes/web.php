
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Halaman welcome lama tetap bisa diakses
Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'title' => 'Welcome to Inertia.js with React',
    ]);
})->name('welcome');

Route::get('/signin', function () {
    return Inertia::render('SignIn');
})->name('signin');

Route::get('/signup', function () {
    return Inertia::render('SignUp');
})->name('signup');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('profile');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('profile');

Route::get('/restaurant-detail', function () {    //Sementara untuk testing, nanti dihapus
    return Inertia::render('DetailRestaurant');
});