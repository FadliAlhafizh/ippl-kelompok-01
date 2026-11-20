<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Restoran;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** UC11 — Mengelola Data Restoran oleh Admin (FR-11) */
class RestoranController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Restoran/Index', [
            'restorans' => Restoran::withCount('menu')->withAvg('menu', 'harga')->orderBy('nama')->get()->map(fn ($r) => [
                'restoranid' => $r->restoranid,
                'nama' => $r->nama,
                'kategori' => $r->kategori,
                'alamat' => $r->alamat,
                'rating' => (float) $r->rating,
                'jumlah_menu' => $r->menu_count,
                'gambar' => $r->gambar,
                'deskripsi' => $r->deskripsi,
                'harga_rata' => $r->menu_avg_harga !== null ? (int) round($r->menu_avg_harga) : null,
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Restoran/Form', ['restoran' => null, 'menus' => []]);
    }

    public function store(Request $request)
    {
        $restoran = Restoran::create($this->validasi($request));

        return redirect()->route('admin.restoran.edit', $restoran->restoranid)
            ->with('success', 'Restoran berhasil ditambahkan. Silakan tambahkan menu.');
    }

    public function edit($id)
    {
        $restoran = Restoran::with('menu')->findOrFail($id);

        return Inertia::render('Admin/Restoran/Form', [
            'restoran' => $restoran->only('restoranid', 'nama', 'kategori', 'alamat', 'city', 'latitude', 'longitude', 'deskripsi', 'gambar'),
            'menus' => $restoran->menu->map(fn ($m) => [
                'menuid' => $m->menuid,
                'nama_menu' => $m->nama_menu,
                'harga' => $m->harga,
                'kategori' => $m->kategori,
                'tags' => implode(', ', $m->tags ?? []),
                'deskripsi' => $m->deskripsi,
            ])->values(),
        ]);
    }

    public function update(Request $request, $id)
    {
        Restoran::findOrFail($id)->update($this->validasi($request));

        return back()->with('success', 'Data restoran berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Restoran::findOrFail($id)->delete();

        return redirect()->route('admin.restoran.index')->with('success', 'Restoran berhasil dihapus.');
    }

    public function storeMenu(Request $request, $id)
    {
        $restoran = Restoran::findOrFail($id);
        $restoran->menu()->create($this->validasiMenu($request));

        return back()->with('success', 'Menu berhasil ditambahkan.');
    }

    public function updateMenu(Request $request, $menuid)
    {
        Menu::findOrFail($menuid)->update($this->validasiMenu($request));

        return back()->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroyMenu($menuid)
    {
        Menu::findOrFail($menuid)->delete();

        return back()->with('success', 'Menu berhasil dihapus.');
    }

    private function validasi(Request $request): array
    {
        return $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|max:50',
            'alamat' => 'required|string|max:500',
            'city' => 'nullable|string|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'deskripsi' => 'nullable|string|max:2000',
            'gambar' => 'nullable|url|max:500',
        ]);
    }

    private function validasiMenu(Request $request): array
    {
        $data = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
            'kategori' => 'required|string|max:50',
            'tags' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string|max:1000',
        ]);

        $data['tags'] = collect(explode(',', (string) ($data['tags'] ?? '')))
            ->map(fn ($t) => trim($t))->filter()->values()->all();

        return $data;
    }
}
