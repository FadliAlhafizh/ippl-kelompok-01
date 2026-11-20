<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Restoran;
use Illuminate\Http\Request;

/** UC7 — Memberi Rating dan Ulasan (FR-07) */
class RatingController extends Controller
{
    public function store(Request $request, $id)
    {
        $restoran = Restoran::findOrFail($id);

        $data = $request->validate([
            'nilai' => 'required|integer|between:1,5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        Rating::updateOrCreate(
            ['user_id' => $request->user()->id, 'restoranid' => $restoran->restoranid],
            $data
        );
        $restoran->hitungUlangRating();

        return back()->with('success', 'Rating dan ulasan berhasil disimpan.');
    }
}
