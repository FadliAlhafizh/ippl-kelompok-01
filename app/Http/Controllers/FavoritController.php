<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use App\Models\Restoran;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** UC8 — Menandai Restoran Favorit (FR-08) */
class FavoritController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $lokasi = $request->session()->get('lokasi');
        $ids = $user->favorit()->pluck('restoranid')->all();

        $restorans = Restoran::whereIn('restoranid', $ids)
            ->withAvg('menu', 'harga')->withCount('ratings')->get()
            ->map(fn ($r) => $r->toCard($lokasi['lat'] ?? null, $lokasi['lng'] ?? null, $ids))
            ->values();

        return Inertia::render('Favorit', ['restorans' => $restorans]);
    }

    /** Tambah ke favorit; bila sudah ada, hapus dari favorit. */
    public function toggle(Request $request, $id)
    {
        $restoran = Restoran::findOrFail($id);
        $favorit = Favorit::where('user_id', $request->user()->id)->where('restoranid', $restoran->restoranid);

        if ($favorit->exists()) {
            $favorit->delete();

            return back()->with('success', 'Dihapus dari favorit.');
        }

        Favorit::create(['user_id' => $request->user()->id, 'restoranid' => $restoran->restoranid]);

        return back()->with('success', 'Berhasil ditambahkan ke favorit.');
    }
}
