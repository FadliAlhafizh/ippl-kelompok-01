<?php
 
namespace App\Http\Controllers;
 
use App\Models\Rekomendasi;
use Inertia\Inertia;
 
class RekomendasiController extends Controller
{
    // tampilkanRekomendasi()
    public function index()
    {
        $rekomendasis = Rekomendasi::with('restoran.menu')->get();
 
        return Inertia::render('Rekomendasi/Index', [
            'rekomendasis' => $rekomendasis
        ]);
    }
}
 