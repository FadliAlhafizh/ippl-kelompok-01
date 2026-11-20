<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Restoran;
use App\Services\RekomendasiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * UC2 Melihat Restoran Sekitar, UC3 Mencari, UC4 Memfilter,
 * UC5 Melihat Detail, UC9 Rekomendasi (beranda).
 */
class RestoranController extends Controller
{
    public function index(Request $request, RekomendasiService $rekomendasi)
    {
        $request->validate([
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'q' => 'nullable|string|max:100',
            'manual_location' => 'nullable|string|max:100',
            'kategori' => 'nullable|string|max:50',
            'sort' => 'nullable|in:terbaru,rating,harga_asc,harga_desc,jarak',
            'harga_max' => 'nullable|integer|min:0',
            'rating_min' => 'nullable|numeric|between:0,5',
            'jarak_max' => 'nullable|numeric|min:0',
        ]);

        [$lat, $lng, $manual] = $this->tentukanLokasi($request);
        $user = $request->user();
        $favoritIds = $user->favorit()->pluck('restoranid')->all();

        $query = Restoran::query()->withAvg('menu', 'harga')->withCount('ratings');

        // UC3 — pencarian kata kunci (restoran atau menu)
        $q = trim((string) $request->input('q', ''));
        if ($q !== '') {
            $like = '%' . $q . '%';
            $query->where(function ($w) use ($like) {
                $w->where('nama', 'like', $like)
                    ->orWhere('kategori', 'like', $like)
                    ->orWhere('alamat', 'like', $like)
                    ->orWhereHas('menu', fn ($m) => $m->where('nama_menu', 'like', $like));
            });
        }

        // UC2 (alternatif) — lokasi manual
        if ($manual !== '') {
            $like = '%' . $manual . '%';
            $query->where(fn ($w) => $w->where('alamat', 'like', $like)
                ->orWhere('city', 'like', $like)
                ->orWhere('nama', 'like', $like));
        }

        // UC4 — filter
        if ($request->filled('kategori') && $request->kategori !== 'Semua') {
            $query->where('kategori', $request->kategori);
        }
        if ($request->filled('rating_min')) {
            $query->where('rating', '>=', (float) $request->rating_min);
        }
        if ($request->filled('harga_max')) {
            $query->whereRaw(
                '(select avg(harga) from menu where menu.restoranid = restoran.restoranid) <= ?',
                [(int) $request->harga_max]
            );
        }

        $daftar = $query->get()->map(fn ($r) => $r->toCard($lat, $lng, $favoritIds));

        if ($request->filled('jarak_max') && $lat !== null) {
            $max = (float) $request->jarak_max;
            $daftar = $daftar->filter(fn ($r) => $r['jarak'] !== null && $r['jarak'] <= $max);
        }

        $daftar = match ($request->input('sort', $lat !== null ? 'jarak' : 'terbaru')) {
            'rating' => $daftar->sortByDesc('rating'),
            'harga_asc' => $daftar->sortBy(fn ($r) => $r['harga_rata'] ?? PHP_INT_MAX),
            'harga_desc' => $daftar->sortByDesc(fn ($r) => $r['harga_rata'] ?? 0),
            'jarak' => $daftar->sortBy(fn ($r) => $r['jarak'] ?? PHP_FLOAT_MAX),
            default => $daftar->sortByDesc('restoranid'),
        };
        $daftar = $daftar->values();

        // UC3 (alternatif) — tidak ada hasil -> beri saran pencarian lain
        $saran = [];
        if ($daftar->isEmpty()) {
            $saran = Restoran::orderByDesc('rating')->limit(3)->pluck('nama')
                ->merge(Restoran::distinct()->pluck('kategori'))->unique()->take(6)->values();
        }

        return Inertia::render('Dashboard', [
            'restorans' => $daftar,
            'rekomendasi' => $rekomendasi->untuk($user, $lat, $lng),
            'hasPreferensi' => (bool) $user->preferensi?->jenis_makanan,
            'kategori' => Restoran::distinct()->orderBy('kategori')->pluck('kategori'),
            'saran' => $saran,
            'ulasanTerbaru' => Rating::with(['user:id,name', 'restoran:restoranid,nama'])
                ->whereNotNull('komentar')->where('komentar', '!=', '')
                ->latest()->limit(4)->get()
                ->map(fn ($r) => [
                    'id' => $r->id,
                    'nama' => $r->user?->name ?? 'Pengguna',
                    'restoran' => $r->restoran?->nama,
                    'nilai' => $r->nilai,
                    'komentar' => $r->komentar,
                ])->values(),
            'filters' => [
                'q' => $q,
                'manual_location' => $manual,
                'kategori' => $request->input('kategori', 'Semua'),
                'sort' => $request->input('sort', ''),
                'harga_max' => $request->input('harga_max', ''),
                'rating_min' => $request->input('rating_min', ''),
                'jarak_max' => $request->input('jarak_max', ''),
            ],
            'lokasi' => [
                'aktif' => $lat !== null || $manual !== '',
                'gps' => $lat !== null,
                'manual' => $manual,
            ],
        ]);
    }

    public function detail(Request $request, $id)
    {
        $restoran = Restoran::with([
            'menu' => fn ($q) => $q->orderBy('nama_menu'),
            'ratings' => fn ($q) => $q->with('user:id,name')->latest(),
        ])->withAvg('menu', 'harga')->withCount('ratings')->findOrFail($id);

        [$lat, $lng] = $this->tentukanLokasi($request);
        $user = $request->user();
        $favoritIds = $user->favorit()->pluck('restoranid')->all();
        $saya = $restoran->ratings->firstWhere('user_id', $user->id);

        return Inertia::render('Restoran/Detail', [
            'restoran' => $restoran->toCard($lat, $lng, $favoritIds),
            'menus' => $restoran->menu->map(fn ($m) => [
                'menuid' => $m->menuid,
                'nama_menu' => $m->nama_menu,
                'harga' => $m->harga,
                'kategori' => $m->kategori,
                'tags' => $m->tags ?? [],
                'deskripsi' => $m->deskripsi,
            ])->values(),
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

    /** @return array{0: ?float, 1: ?float, 2: string} lat, lng, lokasi manual */
    private function tentukanLokasi(Request $request): array
    {
        $manual = trim((string) $request->input('manual_location', ''));

        if ($manual !== '') {
            return [null, null, $manual];
        }

        if ($request->filled('latitude') && $request->filled('longitude')) {
            $lat = (float) $request->latitude;
            $lng = (float) $request->longitude;
            $request->session()->put('lokasi', ['lat' => $lat, 'lng' => $lng]);

            return [$lat, $lng, ''];
        }

        $tersimpan = $request->session()->get('lokasi');

        return [$tersimpan['lat'] ?? null, $tersimpan['lng'] ?? null, ''];
    }
}
