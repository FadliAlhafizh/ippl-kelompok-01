<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Restoran;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** UC5 — detail satu menu (tampilan Detail_Menu pada Figma). */
class MenuController extends Controller
{
    public function show(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $user = $request->user();

        $restoran = Restoran::with([
            'ratings' => fn ($q) => $q->with('user:id,name')->latest(),
        ])->withAvg('menu', 'harga')->withCount('ratings')->findOrFail($menu->restoranid);

        $favoritIds = $user->favorit()->pluck('restoranid')->all();
        $saya = $restoran->ratings->firstWhere('user_id', $user->id);

        // Urutan menu dalam restoran yang sama -> tombol Prev / Next
        $urut = Menu::where('restoranid', $menu->restoranid)->orderBy('nama_menu')->pluck('menuid')->values();
        $posisi = $urut->search($menu->menuid);

        $bentuk = fn (Menu $m) => [
            'menuid' => $m->menuid,
            'nama_menu' => $m->nama_menu,
            'harga' => $m->harga,
            'kategori' => $m->kategori,
            'tags' => $m->tags ?? [],
            'deskripsi' => $m->deskripsi,
        ];

        return Inertia::render('Menu/Detail', [
            'menu' => $bentuk($menu),
            'restoran' => $restoran->toCard(null, null, $favoritIds),
            'prev' => $posisi !== false && $posisi > 0 ? $urut[$posisi - 1] : null,
            'next' => $posisi !== false ? ($urut[$posisi + 1] ?? null) : null,
            'mirip' => Menu::where('restoranid', $menu->restoranid)
                ->where('menuid', '!=', $menu->menuid)
                ->orderByRaw('kategori = ? desc', [$menu->kategori])
                ->limit(8)->get()->map($bentuk)->values(),
            'ulasan' => $restoran->ratings->map(fn ($r) => [
                'id' => $r->id,
                'nama' => $r->user?->name ?? 'Pengguna',
                'nilai' => $r->nilai,
                'komentar' => $r->komentar,
                'tanggal' => $r->updated_at->format('d M Y'),
            ])->values(),
            'ratingSaya' => $saya ? ['nilai' => $saya->nilai, 'komentar' => $saya->komentar] : null,
        ]);
    }
}
