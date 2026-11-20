<?php

namespace App\Services;

use App\Models\Restoran;
use App\Models\User;

/**
 * UC9 / FR-09 — rekomendasi restoran berdasarkan rating, lokasi, dan preferensi.
 *
 * skor = rating (maks 50) + kecocokan preferensi (maks 30) + kedekatan (maks 20)
 * Menu yang mengandung pantangan pengguna diabaikan; restoran tanpa menu aman dibuang.
 */
class RekomendasiService
{
    private const RADIUS_KEDEKATAN_KM = 20;

    public function untuk(User $user, ?float $lat = null, ?float $lng = null, int $limit = 6): array
    {
        $pref = $user->preferensi;
        $suka = $this->normalisasi($pref?->jenis_makanan ?? []);
        $pantang = $this->normalisasi($pref?->pantangan ?? []);
        $favoritIds = $user->favorit()->pluck('restoranid')->all();

        $hasil = [];

        $restorans = Restoran::with('menu')->withAvg('menu', 'harga')->withCount('ratings')->get();

        foreach ($restorans as $r) {
            $menuAman = $r->menu->filter(
                fn ($m) => $this->tagMenu($m)->intersect($pantang)->isEmpty()
            );

            // Punya menu, tetapi semuanya mengandung pantangan -> lewati.
            if ($r->menu->isNotEmpty() && $menuAman->isEmpty()) {
                continue;
            }

            $cocok = collect();
            $menuCocok = collect();
            foreach ($menuAman as $m) {
                $irisan = $this->tagMenu($m)->intersect($suka);
                if ($irisan->isNotEmpty()) {
                    $cocok = $cocok->merge($irisan);
                    $menuCocok->push($m->nama_menu);
                }
            }
            if (in_array(mb_strtolower($r->kategori), $suka, true)) {
                $cocok->push(mb_strtolower($r->kategori));
            }
            $cocok = $cocok->unique()->values();

            $jarak = $r->jarakDari($lat, $lng);
            $skorRating = ((float) $r->rating / 5) * 50;
            $skorPref = $suka ? min($cocok->count(), 3) / 3 * 30 : 0;
            $skorJarak = $jarak !== null ? max(0, 1 - $jarak / self::RADIUS_KEDEKATAN_KM) * 20 : 0;

            $alasan = [];
            if ($r->rating > 0) {
                $alasan[] = 'Rating ' . number_format($r->rating, 1);
            }
            if ($cocok->isNotEmpty()) {
                $alasan[] = 'Sesuai preferensi: ' . $cocok->map(fn ($t) => ucfirst($t))->implode(', ');
            }
            if ($jarak !== null) {
                $alasan[] = number_format($jarak, 1) . ' km dari Anda';
            }

            $hasil[] = $r->toCard($lat, $lng, $favoritIds) + [
                'skor' => round($skorRating + $skorPref + $skorJarak, 2),
                'alasan' => $alasan,
                'menu_cocok' => $menuCocok->take(2)->values()->all(),
            ];
        }

        usort($hasil, fn ($a, $b) => $b['skor'] <=> $a['skor']);

        return array_slice($hasil, 0, $limit);
    }

    private function normalisasi(array $items)
    {
        return collect($items)->map(fn ($i) => mb_strtolower(trim($i)))->filter()->values()->all();
    }

    private function tagMenu($menu)
    {
        return collect($menu->tags ?? [])
            ->push($menu->kategori)
            ->map(fn ($t) => mb_strtolower(trim($t)))
            ->unique();
    }
}
