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

    // untuk menampilkan daftar restoran sekitar berdasarkan lokasi pengguna
    public function tampilkanDaftarSekitar(Request $request)
    {
        $lat = $request->input('latitude');
        $lng = $request->input('longitude');
        $manualLocation = $request->input('manual_location');

        if ($lat && $lng) {
            $radius = 10;
            
            $restoranSekitar = Restoran::select('*', DB::raw("6371 * acos(cos(radians($lat)) * cos(radians(latitude)) * cos(radians(longitude) - radians($lng)) + sin(radians($lat)) * sin(radians(latitude))) AS distance"))
                ->having('distance', '<=', $radius)
                ->orderBy('distance', 'asc')
                ->get();
        } else if ($manualLocation) {
            $restoranSekitar = Restoran::where('alamat', 'like', "%{$manualLocation}%")
                ->orWhere('nama', 'like', "%{$manualLocation}%")
                ->get();
        } else {
             $restoranSekitar = Restoran::all();

        return Inertia::render('Restoran/Index', [
            'restoranSekitar' => $restoranSekitar
        ]);
        }
       
    }
    
}

