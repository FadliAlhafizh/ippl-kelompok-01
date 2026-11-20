import React, { useRef, useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import Layout, { wadah } from '../../components/Layout';
import { Bintang, KartuProduk, rupiah } from '../../components/ui';
import {
    IconArrowLeft, IconArrowRight, IconCalendar, IconFacebook, IconHeart, IconLink, IconReply, IconTwitter,
} from '../../components/Icons';
import { FormUlasan } from '../../components/Ulasan';

function Avatar({ nama, ukuran = 'h-11 w-11' }) {
    return (
        <span className={`flex ${ukuran} shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white`}>
            {nama.charAt(0).toUpperCase()}
        </span>
    );
}

export default function Detail({ menu: m, restoran: r, prev, next, mirip, ulasan, ratingSaya }) {
    const [tab, setTab] = useState('deskripsi');
    const [tersalin, setTersalin] = useState(false);
    const jalur = useRef(null);
    const form = useForm({ nilai: ratingSaya?.nilai ?? 0, komentar: ratingSaya?.komentar ?? '' });

    const toggleFavorit = () => router.post(`/favorit/${r.restoranid}`, {}, { preserveScroll: true });
    const kirim = (e) => {
        e.preventDefault();
        form.post(`/restoran/${r.restoranid}/rating`, { preserveScroll: true });
    };
    const salin = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setTersalin(true);
            setTimeout(() => setTersalin(false), 2000);
        } catch { /* clipboard tidak tersedia */ }
    };
    const geser = (arah) => jalur.current?.scrollBy({ left: arah * 240, behavior: 'smooth' });

    const url = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
    const tab_ = (id) => `px-6 py-3 text-[13px] ${tab === id ? 'bg-brand text-white' : 'text-gray-700 hover:text-brand'}`;
    const navLink = 'flex items-center gap-1 text-xs text-gray-600 hover:text-brand';

    return (
        <Layout judul={r.nama} tebal>
            <div className={`${wadah} pt-14`}>
                <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    {/* Gambar */}
                    <div className="aspect-[1/1.1] max-h-[420px] w-full overflow-hidden bg-brand-soft">
                        {r.gambar
                            ? <img src={r.gambar} alt={`Suasana ${r.nama}`} className="h-full w-full object-cover" />
                            : <span className="flex h-full items-center justify-center text-7xl font-bold text-brand/30">{m.nama_menu.charAt(0)}</span>}
                    </div>

                    {/* Info */}
                    <div>
                        <div className="flex items-start justify-between gap-3">
                            <button type="button" onClick={toggleFavorit} aria-pressed={r.favorit}
                                className={`px-2.5 py-1 text-[10px] text-white ${r.favorit ? 'bg-red-600' : 'bg-brand hover:bg-brand-dark'}`}>
                                {r.favorit ? 'Favorit ✓' : 'Add Favorite'}
                            </button>
                            <div className="flex gap-4">
                                {prev ? <Link href={`/menu/${prev}`} className={navLink}><IconArrowLeft className="h-3.5 w-3.5" />Prev</Link> : <span className={`${navLink} opacity-40`}><IconArrowLeft className="h-3.5 w-3.5" />Prev</span>}
                                {next ? <Link href={`/menu/${next}`} className={navLink}>Next<IconArrowRight className="h-3.5 w-3.5" /></Link> : <span className={`${navLink} opacity-40`}>Next<IconArrowRight className="h-3.5 w-3.5" /></span>}
                            </div>
                        </div>

                        <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">{m.nama_menu}</h2>
                        <p className="mt-4 text-[13px] leading-6 text-gray-500">
                            {m.deskripsi || `Menu ${m.kategori.toLowerCase()} dari ${r.nama}.`}
                        </p>

                        <div className="mt-5 border-t border-line pt-5">
                            <p className="text-xl font-bold text-ink">{rupiah(m.harga)}</p>
                            <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                <Bintang nilai={r.rating} size={13} />
                                <span className="text-gray-300">|</span>
                                <span>{r.rating ? r.rating.toFixed(1) : '-'} Rating</span>
                                <span className="text-gray-300">|</span>
                                <span>{r.ulasan} Review</span>
                            </p>
                            <p className="mt-4 text-[13px] text-gray-700">
                                Restoran: <Link href={`/restoran/${r.restoranid}`} className="text-brand hover:underline">{r.nama}</Link>
                            </p>
                        </div>

                        <div className="mt-5 space-y-2 border-t border-line pt-5 text-[13px] text-gray-700">
                            <button type="button" onClick={toggleFavorit} className="flex items-center gap-1.5 hover:text-brand">
                                <IconHeart filled={r.favorit} className={`h-4 w-4 ${r.favorit ? 'text-red-500' : ''}`} />
                                {r.favorit ? 'Hapus dari favorit' : 'Add to Wishlist'}
                            </button>
                            <p>Category: <span className="text-gray-500">{m.kategori}</span></p>
                            {m.tags.length > 0 && <p>Tag: <span className="text-gray-500">{m.tags.join(', ')}</span></p>}
                            <p className="flex items-center gap-2">
                                Share :
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer" aria-label="Bagikan ke Facebook" className="text-ink hover:text-brand"><IconFacebook className="h-4 w-4" /></a>
                                <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noreferrer" aria-label="Bagikan ke X" className="text-ink hover:text-brand"><IconTwitter className="h-4 w-4" /></a>
                                <button type="button" onClick={salin} aria-label="Salin tautan" className="text-ink hover:text-brand"><IconLink className="h-4 w-4" /></button>
                                {tersalin && <span role="status" className="text-xs text-brand">Tautan disalin</span>}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab */}
                <div className="mt-14" role="tablist" aria-label="Informasi menu">
                    <button role="tab" id="t-deskripsi" aria-selected={tab === 'deskripsi'} aria-controls="p-deskripsi" onClick={() => setTab('deskripsi')} className={tab_('deskripsi')}>Description</button>
                    <button role="tab" id="t-ulasan" aria-selected={tab === 'ulasan'} aria-controls="p-ulasan" onClick={() => setTab('ulasan')} className={tab_('ulasan')}>Reviews ({ulasan.length})</button>
                </div>

                {tab === 'deskripsi' ? (
                    <section id="p-deskripsi" role="tabpanel" aria-labelledby="t-deskripsi" className="mt-6 text-[13px] leading-6 text-gray-500">
                        <p>{m.deskripsi || 'Belum ada deskripsi untuk menu ini.'}</p>
                        {r.alamat && <p className="mt-4">Tersedia di {r.nama}, {r.alamat}.</p>}
                        {m.tags.length > 0 && (
                            <>
                                <h3 className="mt-6 text-sm text-gray-700">Key Benefits</h3>
                                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs">
                                    {m.tags.map((t) => <li key={t}>{t}</li>)}
                                </ul>
                            </>
                        )}
                    </section>
                ) : (
                    <section id="p-ulasan" role="tabpanel" aria-labelledby="t-ulasan" className="mt-6">
                        <h3 className="text-2xl font-bold text-ink">Comments - {String(ulasan.length).padStart(2, '0')}</h3>
                        {ulasan.length === 0 && <p className="mt-4 text-sm text-gray-500">Belum ada ulasan.</p>}
                        <ul className="mt-6 max-w-2xl space-y-6">
                            {ulasan.map((u) => (
                                <li key={u.id} className="flex gap-3">
                                    <Avatar nama={u.nama} />
                                    <div className="min-w-0 flex-1 text-xs">
                                        <div className="flex items-center gap-4">
                                            <b className="text-[13px] text-ink">{u.nama}</b>
                                            <span className="flex items-center gap-1 text-brand"><IconReply className="h-3 w-3" />Reply</span>
                                        </div>
                                        <Bintang nilai={u.nilai} size={12} className="mt-1" />
                                        <p className="mt-1 flex items-center gap-1 text-gray-500"><IconCalendar className="h-3.5 w-3.5 text-brand" />{u.tanggal}</p>
                                        {u.komentar && <p className="mt-1 leading-5 text-gray-600">{u.komentar}</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="max-w-2xl"><FormUlasan form={form} kirim={kirim} sudahAda={!!ratingSaya} /></div>
                    </section>
                )}

                {/* Similar products */}
                {mirip.length > 0 && (
                    <section className="mt-16" aria-labelledby="judul-mirip">
                        <div className="flex items-center justify-between">
                            <h2 id="judul-mirip" className="text-2xl font-bold text-ink">Similar Products</h2>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => geser(-1)} aria-label="Sebelumnya" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-gray-600 hover:bg-gray-200"><IconArrowLeft className="h-4 w-4" /></button>
                                <button type="button" onClick={() => geser(1)} aria-label="Berikutnya" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark"><IconArrowRight className="h-4 w-4" /></button>
                            </div>
                        </div>
                        <ul ref={jalur} className="mt-6 flex snap-x gap-5 overflow-x-auto pb-2">
                            {mirip.map((x) => (
                                <li key={x.menuid} className="w-[220px] shrink-0 snap-start">
                                    <KartuProduk href={`/menu/${x.menuid}`} nama={x.nama_menu} badge={x.kategori} harga={rupiah(x.harga)} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </Layout>
    );
}
