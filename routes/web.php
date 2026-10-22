<?php

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'title' => 'Welcome to Inertia.js with React'
    ]);
});
