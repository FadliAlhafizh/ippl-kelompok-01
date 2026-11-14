<?php

namespace App\Http\Controllers;

use App\Models\Restoran;
use Inertia\Inertia;

class RestoranController extends Controller
{
    public function index()
    {
        $restorans = Restoran::all();

        return Inertia::render('Restoran/Index', [
            'restorans' => $restorans
        ]);
    }

    public function tampilkanDetail($id) 
    {
        $restoran = Restoran::findOrFail($id);

        return Inertia::render('Restoran/Detail', [
            'restoran' => $restoran
        ]);
    }

    public function tampilkanDaftarSekitar()
    {
        $restoranSekitar = Restoran::all();

        return Inertia::render('Restoran/Index', [
            'restoranSekitar' => $restoranSekitar
        ]);
    }
    
}

