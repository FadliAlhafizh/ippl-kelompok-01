<?php

namespace App\Http\Controllers;

use App\Models\Preferensi;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

/** UC10 Mengatur Profil (FR-10) dan UC6 Mengatur Preferensi Makanan (FR-06) */
class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $u = $request->user();

        return Inertia::render('Profile', [
            'user' => [
                'name' => $u->name,
                'email' => $u->email,
                'no_telepon' => $u->no_telepon,
                'tanggal_lahir' => $u->tanggal_lahir?->format('Y-m-d'),
                'lokasi' => $u->lokasi,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'no_telepon' => ['nullable', 'string', 'max:20', Rule::unique('users', 'no_telepon')->ignore($user->id)],
            'tanggal_lahir' => 'nullable|date|before:today',
            'lokasi' => 'nullable|string|max:255',
        ]);

        $user->update($data);

        return back()->with('success', 'Profil berhasil diperbarui.');
    }

    public function editPreferensi(Request $request)
    {
        $pref = $request->user()->preferensi;

        return Inertia::render('Preferensi', [
            'pilihanJenis' => Preferensi::JENIS_MAKANAN,
            'pilihanPantangan' => Preferensi::PANTANGAN,
            'jenisMakanan' => $pref?->jenis_makanan ?? [],
            'pantangan' => $pref?->pantangan ?? [],
        ]);
    }

    public function updatePreferensi(Request $request)
    {
        $data = $request->validate([
            'jenis_makanan' => 'nullable|array',
            'jenis_makanan.*' => ['string', Rule::in(Preferensi::JENIS_MAKANAN)],
            'pantangan' => 'nullable|array',
            'pantangan.*' => ['string', Rule::in(Preferensi::PANTANGAN)],
        ]);

        Preferensi::updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'jenis_makanan' => array_values($data['jenis_makanan'] ?? []),
                'pantangan' => array_values($data['pantangan'] ?? []),
            ]
        );

        return back()->with('success', 'Preferensi makanan berhasil disimpan.');
    }
}
