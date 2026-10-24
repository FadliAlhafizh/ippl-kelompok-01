<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RestoranController extends Controller
{
    public function index()
    {
        $restorans = Restoran::all();

        return Inertia::render('Restoran/Index', [
            'restorans' => $restorans
        ]);
    }
}
