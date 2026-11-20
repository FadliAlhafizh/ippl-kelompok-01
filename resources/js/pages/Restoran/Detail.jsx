import React, { useMemo, useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import Layout, { wadah } from '../../components/Layout';
import { Bintang, Halaman, KartuProduk, SelectBox, SidebarFilter, rupiah } from '../../components/ui';
import { IconHeart, IconPin } from '../../components/Icons';
import { FormUlasan, Testimoni } from '../../components/Ulasan';

const PER_HALAMAN = 9;

export default function Detail({ restoran: r, menus, ulasan, ratingSaya }) {
    const [cari, setCari] = useState('');
    const [urut, setUrut] = useState('nama');
    const [kat, setKat] = useState('Semua');
    const [tag, setTag] = useState(null);
    const [halaman, setHalaman] = useState(1);

    const hargaTertinggi = Math.max(0, ...menus.map((m) => m.harga));
    const hargaMax = Math.max(10000, Math.ceil(hargaTertinggi / 5000) * 5000);
    const [harga, setHarga] = useState(hargaMax);

    const form = useForm({ nilai: ratingSaya?.nilai ?? 0, komentar: ratingSaya?.komentar ?? '' });

    const kategoriMenu = useMemo(() => [...new Set(menus.map((m) => m.kategori))], [menus]);
    const semuaTag = useMemo(() => [...new Set(menus.flatMap((m) => m.tags))], [menus]);

    const daftarMenu = useMemo(() => {
        const k = cari.trim().toLowerCase();
        let hasil = menus.filter((m) =>
            (kat === 'Semua' || m.kategori === kat) &&
            (!tag || m.tags.includes(tag)) &&
            m.harga <= harga &&
            (!k || m.nama_menu.toLowerCase().includes(k))
        );
        if (urut === 'murah') hasil = [...hasil].sort((a, b) => a.harga - b.harga);
        if (urut === 'mahal') hasil = [...hasil].sort((a, b) => b.harga - a.harga);
        return hasil;
    }, [menus, cari, urut, kat, tag, harga]);

    const totalHalaman = Math.max(1, Math.ceil(daftarMenu.length / PER_HALAMAN));
    const halamanAktif = Math.min(halaman, totalHalaman);
    const tampil = daftarMenu.slice((halamanAktif - 1) * PER_HALAMAN, halamanAktif * PER_HALAMAN);

    const toggleFavorit = () => router.post(`/favorit/${r.restoranid}`, {}, { preserveScroll: true });

    const kirim = (e) => {
        e.preventDefault();
        form.post(`/restoran/${r.restoranid}/rating`, { preserveScroll: true });
    };

    const ulid = (fn) => (v) => { fn(v); setHalaman(1); };

    return (
        <Layout judul={r.nama} tebal>
            <div className={`${wadah} pt-12`}>
                {/* Ringkasan restoran */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
                    <div className="max-w-2xl">
                        <Link href="/" className="text-xs text-gray-500 hover:text-brand">← Kembali ke daftar restoran</Link>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
                            <span className="bg-brand px-2 py-0.5 text-[10px] text-white">{r.kategori}</span>
                            <span className="flex items-center gap-2">
                                <Bintang nilai={r.rating} size={14} />
                                <span className="text-gray-500">{r.rating ? r.rating.toFixed(1) : '-'} Rating</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">{r.ulasan} Review</span>
                            </span>
                            {r.jarak !== null && <span className="text-gray-500">{r.jarak.toFixed(1)} km dari lokasimu</span>}
                            <span className="text-gray-500">Rata-rata {rupiah(r.harga_rata)}</span>
                        </div>
                        <p className="mt-3 flex items-start gap-1.5 text-[13px] text-gray-600"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{r.alamat}</p>
                        {r.deskripsi && <p className="mt-2 text-[13px] leading-6 text-gray-500">{r.deskripsi}</p>}
                    </div>

                    <button type="button" onClick={toggleFavorit} aria-pressed={r.favorit}
                        className={`flex items-center gap-2 border px-4 py-2 text-[13px] transition ${r.favorit ? 'border-red-300 bg-red-50 text-red-600' : 'border-brand text-brand hover:bg-brand-soft'}`}>
                        <IconHeart filled={r.favorit} className="h-4 w-4" />
                        {r.favorit ? 'Hapus dari favorit' : 'Add to Wishlist'}
                    </button>
                </div>

                {/* Toolbar */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
                    <label className="flex items-center gap-2">
                        <span>Sort By :</span>
                        <SelectBox className="w-44" aria-label="Urutkan menu" value={urut} onChange={(e) => setUrut(e.target.value)}>
                            <option value="nama">Nama</option>
                            <option value="murah">Harga terendah</option>
                            <option value="mahal">Harga tertinggi</option>
                        </SelectBox>
                    </label>
                    <p className="text-xs text-gray-500 sm:ml-auto">{daftarMenu.length} menu</p>
                </div>

                <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_235px]">
                    <section aria-label="Daftar menu">
                        {daftarMenu.length === 0 ? (
                            <p className="bg-brand-soft/60 px-5 py-12 text-center text-sm text-gray-600">Menu tidak ditemukan.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3">
                                {tampil.map((m) => (
                                    <KartuProduk key={m.menuid} href={`/menu/${m.menuid}`} nama={m.nama_menu}
                                        badge={m.kategori} harga={rupiah(m.harga)} meta={m.tags.slice(0, 2).join(', ')} />
                                ))}
                            </div>
                        )}
                        <Halaman total={totalHalaman} aktif={halamanAktif} onChange={setHalaman} />
                    </section>

                    <SidebarFilter
                        q={cari} setQ={ulid(setCari)} onCari={() => setHalaman(1)} placeholder="Search Product"
                        kategori={kategoriMenu} aktifKategori={kat} onKategori={ulid(setKat)}
                        harga={harga} setHarga={ulid(setHarga)} hargaMax={hargaMax} step={5000} onFilterHarga={() => setHalaman(1)}
                    >
                        {semuaTag.length > 0 && (
                            <>
                                <h3 className="mt-8 text-[15px] font-semibold">Product Tags</h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {semuaTag.map((t) => (
                                        <button key={t} type="button" aria-pressed={tag === t} onClick={() => ulid(setTag)(tag === t ? null : t)}
                                            className={`border px-2.5 py-1 text-xs transition ${tag === t ? 'border-brand bg-brand text-white' : 'border-line text-gray-600 hover:border-brand hover:text-brand'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </SidebarFilter>
                </div>

                {/* UC7: ulasan */}
                <Testimoni ulasan={ulasan.filter((u) => u.komentar)} />
                {ulasan.length === 0 && <p className="mt-16 text-center text-sm text-gray-500">Belum ada ulasan untuk restoran ini.</p>}

                <FormUlasan form={form} kirim={kirim} sudahAda={!!ratingSaya} />
            </div>
        </Layout>
    );
}
