import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout, { wadah } from '../components/Layout';
import RestoranCard from '../components/RestoranCard';
import { Bintang, Halaman, SelectBox, SidebarFilter, rupiah } from '../components/ui';
import { Testimoni } from '../components/Ulasan';
import { IconPin } from '../components/Icons';

const BATAS_AKURASI = 1000; // meter
const HARGA_MAKS = 100000;

const kosong = (v) => v === '' || v === null || v === undefined;

export default function Dashboard({ restorans, rekomendasi, hasPreferensi, kategori, saran, ulasanTerbaru = [], filters, lokasi }) {
    const [q, setQ] = useState(filters.q ?? '');
    const [manual, setManual] = useState(filters.manual_location ?? '');
    const [tampilManual, setTampilManual] = useState(!!filters.manual_location);
    const [pesanLokasi, setPesanLokasi] = useState('');
    const [mencari, setMencari] = useState(false);
    const [halaman, setHalaman] = useState(1);
    const [perHalaman, setPerHalaman] = useState(9);
    const [harga, setHarga] = useState(Number(filters.harga_max) || HARGA_MAKS);

    // Semua perubahan pencarian/filter/lokasi dikirim ke server (UC2, UC3, UC4).
    const terapkan = (patch = {}) => {
        const next = { ...filters, q, manual_location: manual, ...patch };
        const params = Object.fromEntries(
            Object.entries(next).filter(([, v]) => !kosong(v) && v !== 'Semua')
        );
        setHalaman(1);
        router.get('/', params, { preserveState: true, preserveScroll: true, replace: true });
    };

    // UC2: deteksi lokasi; jika gagal / tidak akurat -> lokasi manual.
    const deteksiLokasi = () => {
        setMencari(true);
        setPesanLokasi('');
        const gagal = () => {
            setMencari(false);
            setPesanLokasi('Lokasi tidak akurat, gunakan lokasi manual');
            setTampilManual(true);
        };
        if (!navigator.geolocation) return gagal();

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (pos.coords.accuracy > BATAS_AKURASI) return gagal();
                setMencari(false);
                setManual('');
                setTampilManual(false);
                terapkan({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    manual_location: '',
                });
            },
            gagal,
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    useEffect(() => {
        if (!lokasi.aktif) deteksiLokasi();
    }, []);

    const cariManual = (e) => {
        e.preventDefault();
        if (manual.trim()) terapkan({ manual_location: manual.trim(), sort: 'terbaru' });
    };

    const filterHarga = () => terapkan({ harga_max: harga >= HARGA_MAKS ? '' : harga });

    const adaFilter = filters.q || filters.kategori !== 'Semua' || filters.harga_max || filters.rating_min || filters.jarak_max;
    const reset = () => {
        setQ(''); setHarga(HARGA_MAKS);
        terapkan({ q: '', kategori: 'Semua', harga_max: '', rating_min: '', jarak_max: '' });
    };

    const totalHalaman = Math.max(1, Math.ceil(restorans.length / perHalaman));
    const halamanAktif = Math.min(halaman, totalHalaman);
    const tampil = restorans.slice((halamanAktif - 1) * perHalaman, halamanAktif * perHalaman);

    const chip = (aktif) => `border px-2.5 py-1 text-xs transition ${aktif ? 'border-brand bg-brand text-white' : 'border-line text-gray-600 hover:border-brand hover:text-brand'}`;

    return (
        <Layout judul="Temukan kuliner yang cocok untukmu" tebal>
            <div className={`${wadah} pt-14`}>
                {/* Toolbar: Sort By / Show + lokasi */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
                    <label className="flex items-center gap-2">
                        <span>Sort By :</span>
                        <SelectBox className="w-44" aria-label="Urutkan" value={filters.sort} onChange={(e) => terapkan({ sort: e.target.value })}>
                            <option value="">Default</option>
                            <option value="terbaru">Newest</option>
                            <option value="rating">Rating tertinggi</option>
                            <option value="harga_asc">Harga terendah</option>
                            <option value="harga_desc">Harga tertinggi</option>
                            <option value="jarak" disabled={!lokasi.gps}>Terdekat</option>
                        </SelectBox>
                    </label>
                    <label className="flex items-center gap-2">
                        <span>Show :</span>
                        <SelectBox className="w-32" aria-label="Jumlah per halaman" value={perHalaman}
                            onChange={(e) => { setPerHalaman(Number(e.target.value)); setHalaman(1); }}>
                            <option value={9}>Default</option>
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                        </SelectBox>
                    </label>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:ml-auto">
                        <button type="button" onClick={deteksiLokasi} disabled={mencari}
                            className="flex items-center gap-1.5 border border-line px-3 py-2 text-gray-700 hover:border-brand hover:text-brand disabled:opacity-60">
                            <IconPin className="h-3.5 w-3.5" />
                            {mencari ? 'Mendeteksi lokasi…' : lokasi.gps ? 'Perbarui lokasi saya' : 'Gunakan lokasi saya'}
                        </button>
                        <button type="button" onClick={() => setTampilManual((v) => !v)} aria-expanded={tampilManual}
                            className="border border-line px-3 py-2 text-gray-700 hover:border-brand hover:text-brand">
                            Atur lokasi manual
                        </button>
                    </div>
                </div>

                {(pesanLokasi || lokasi.gps || lokasi.manual) && (
                    <p role="status" className={`mt-3 text-xs ${pesanLokasi ? 'text-amber-700' : 'text-gray-500'}`}>
                        {pesanLokasi || (lokasi.gps ? 'Menampilkan restoran terdekat dari lokasimu.' : `Lokasi: ${lokasi.manual}`)}
                    </p>
                )}

                {tampilManual && (
                    <form onSubmit={cariManual} className="mt-3 flex max-w-md">
                        <input type="text" value={manual} onChange={(e) => setManual(e.target.value)}
                            placeholder="Masukkan lokasi, misalnya: Dago" aria-label="Lokasi manual"
                            className="h-9 min-w-0 flex-1 border border-line px-3 text-[13px] outline-none focus:border-brand" />
                        <button className="h-9 bg-brand px-4 text-xs font-medium text-white hover:bg-brand-dark">Terapkan</button>
                    </form>
                )}

                <div id="restoran" className="mt-5 grid scroll-mt-4 gap-8 lg:grid-cols-[minmax(0,1fr)_235px]">
                    {/* Grid restoran */}
                    <section aria-label="Daftar restoran">
                        <p className="mb-4 text-xs text-gray-500">
                            {restorans.length} restoran ditemukan
                            {adaFilter && <button type="button" onClick={reset} className="ml-3 text-brand underline">Reset filter</button>}
                        </p>

                        {restorans.length === 0 ? (
                            <div className="bg-brand-soft/60 px-5 py-12 text-center">
                                <p className="font-bold">Tidak ada hasil dari pencarian anda</p>
                                {saran.length > 0 && (
                                    <>
                                        <p className="mt-3 text-sm text-gray-500">Coba pencarian lain:</p>
                                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                                            {saran.map((s) => (
                                                <button key={s} type="button" className={chip(false)}
                                                    onClick={() => { setQ(s); terapkan({ q: s, kategori: 'Semua', harga_max: '', rating_min: '', jarak_max: '' }); }}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3">
                                {tampil.map((r) => <RestoranCard key={r.restoranid} r={r} />)}
                            </div>
                        )}

                        <Halaman total={totalHalaman} aktif={halamanAktif} onChange={setHalaman} />
                    </section>

                    {/* Sidebar */}
                    <SidebarFilter
                        q={q} setQ={setQ} onCari={() => terapkan()} placeholder="Search Product"
                        kategori={kategori} aktifKategori={filters.kategori} onKategori={(k) => terapkan({ kategori: k })}
                        harga={harga} setHarga={setHarga} hargaMax={HARGA_MAKS} step={5000} onFilterHarga={filterHarga}
                    >
                        <h3 className="mt-7 text-[15px] font-semibold">Rating</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {[['', 'Semua'], ['3', '★ 3+'], ['4', '★ 4+'], ['4.5', '★ 4.5+']].map(([v, l]) => (
                                <button key={l} type="button" aria-pressed={String(filters.rating_min) === v}
                                    onClick={() => terapkan({ rating_min: v })} className={chip(String(filters.rating_min) === v)}>{l}</button>
                            ))}
                        </div>

                        {lokasi.gps && (
                            <>
                                <h3 className="mt-7 text-[15px] font-semibold">Jarak</h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {[['', 'Semua'], ['2', '≤ 2 km'], ['5', '≤ 5 km'], ['10', '≤ 10 km']].map(([v, l]) => (
                                        <button key={l} type="button" aria-pressed={String(filters.jarak_max) === v}
                                            onClick={() => terapkan({ jarak_max: v })} className={chip(String(filters.jarak_max) === v)}>{l}</button>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* UC9: rekomendasi (menggantikan "Latest Products") */}
                        <h3 className="mt-8 text-[15px] font-semibold">Rekomendasi untukmu</h3>
                        {rekomendasi.length === 0 ? (
                            <p className="mt-3 text-xs text-gray-500">Belum ada rekomendasi yang cocok.</p>
                        ) : (
                            <ul className="mt-4 space-y-4">
                                {rekomendasi.slice(0, 4).map((r) => (
                                    <li key={r.restoranid}>
                                        <Link href={`/restoran/${r.restoranid}`} className="flex gap-3 hover:text-brand">
                                            <span className="h-[52px] w-[50px] shrink-0 overflow-hidden bg-brand-soft">
                                                {r.gambar && <img src={r.gambar} alt="" loading="lazy" className="h-full w-full object-cover" />}
                                            </span>
                                            <span className="min-w-0 text-xs">
                                                <span className="block truncate">{r.nama}</span>
                                                <Bintang nilai={r.rating} size={9} />
                                                <span className="block text-[11px] text-gray-500">
                                                    {r.harga_rata ? rupiah(r.harga_rata) : ''}
                                                </span>
                                            </span>
                                        </Link>
                                        {(r.alasan[0] || r.menu_cocok.length > 0) && (
                                            <p className="mt-1 text-[11px] leading-4 text-brand">
                                                ✓ {r.menu_cocok.length > 0 ? `Menu cocok: ${r.menu_cocok.join(', ')}` : r.alasan[0]}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!hasPreferensi && (
                            <Link href="/preferensi" className="mt-4 inline-block text-xs font-medium text-brand underline">
                                Atur preferensi makanan
                            </Link>
                        )}
                    </SidebarFilter>
                </div>

                <Testimoni ulasan={ulasanTerbaru} />
            </div>
        </Layout>
    );
}
