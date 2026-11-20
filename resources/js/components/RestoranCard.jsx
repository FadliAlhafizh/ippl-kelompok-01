import React from 'react';
import { router } from '@inertiajs/react';
import { KartuProduk, rupiah } from './ui';

export default function RestoranCard({ r }) {
    const toggleFavorit = () =>
        router.post(`/favorit/${r.restoranid}`, {}, { preserveScroll: true, preserveState: true });

    const meta = [
        r.rating ? `★ ${r.rating.toFixed(1)}` : null,
        r.jarak !== null && r.jarak !== undefined ? `${r.jarak.toFixed(1)} km` : r.city,
    ].filter(Boolean).join(' · ');

    return (
        <KartuProduk
            href={`/restoran/${r.restoranid}`}
            gambar={r.gambar}
            nama={r.nama}
            badge={r.kategori}
            harga={r.harga_rata ? `±${rupiah(r.harga_rata)}` : null}
            meta={meta}
            favorit={r.favorit}
            onFavorit={toggleFavorit}
        />
    );
}
