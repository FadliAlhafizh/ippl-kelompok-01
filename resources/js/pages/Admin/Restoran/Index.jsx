import React, { useMemo, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import { rupiah } from '../../../components/ui';
import { IconPlus } from '../../../components/Icons';

function Gambar({ r, className }) {
    return r.gambar
        ? <img src={r.gambar} alt="" loading="lazy" className={`object-cover ${className}`} />
        : <span className={`flex items-center justify-center bg-gradient-to-br from-[#e8ebe3] to-[#c9d4bd] text-5xl font-bold text-brand/40 ${className}`}>{r.nama.charAt(0)}</span>;
}

function KartuAdmin({ r, onHapus }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl bg-white">
            <Link href={`/admin/restoran/${r.restoranid}/edit`} tabIndex={-1} aria-hidden="true">
                <Gambar r={r} className="h-56 w-full rounded-2xl" />
            </Link>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[26px] font-medium leading-tight text-[#3b0d0d]">{r.nama}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-5 text-[#3b0d0d]">
                    {r.deskripsi || `${r.kategori} · ${r.alamat}`}
                </p>
                <div className="mt-auto flex items-end justify-between pt-6">
                    <div className="flex gap-4 text-base">
                        <Link href={`/admin/restoran/${r.restoranid}/edit`} className="text-[#0a4b2c] underline underline-offset-2 hover:text-admin-green">Edit info</Link>
                        <button type="button" onClick={() => onHapus(r)} className="text-red-600 underline underline-offset-2 hover:text-red-700">Hapus</button>
                    </div>
                    <p className="text-[28px] font-medium leading-none text-accent">{r.harga_rata ? rupiah(r.harga_rata) : '-'}</p>
                </div>
            </div>
        </article>
    );
}

export default function Index({ restorans }) {
    const [kat, setKat] = useState('Semua');

    const hapus = (r) => {
        if (confirm(`Hapus restoran "${r.nama}" beserta seluruh menunya?`)) {
            router.delete(`/admin/restoran/${r.restoranid}`);
        }
    };

    // Satu ubin per kategori, memakai gambar restoran pertama di kategori itu.
    const kategori = useMemo(() => {
        const peta = new Map();
        restorans.forEach((r) => { if (!peta.has(r.kategori)) peta.set(r.kategori, r); });
        return [...peta.entries()];
    }, [restorans]);

    const terpopuler = useMemo(() => [...restorans].sort((a, b) => b.rating - a.rating).slice(0, 3), [restorans]);
    const semua = kat === 'Semua' ? restorans : restorans.filter((r) => r.kategori === kat);

    return (
        <AdminLayout>
            <h1 className="text-[32px] font-medium leading-tight text-[#3b3b4f]">Inventory Management</h1>
            <Link href="/admin/restoran/create" className="mt-3 inline-flex items-center gap-3 text-lg text-[#3b3b4f] hover:text-accent">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white"><IconPlus className="h-5 w-5" /></span>
                Add new
            </Link>

            {restorans.length === 0 ? (
                <p className="mt-12 rounded-2xl bg-white px-6 py-14 text-center text-gray-500">Belum ada restoran. Pilih “Add new” untuk menambahkan.</p>
            ) : (
                <>
                    <section className="mt-8" aria-labelledby="h-kategori">
                        <h2 id="h-kategori" className="text-[28px] font-medium text-[#3b3b4f]">All Categories</h2>
                        <ul className="mt-5 flex gap-6 overflow-x-auto pb-3">
                            <li className="shrink-0">
                                <button type="button" onClick={() => setKat('Semua')} aria-pressed={kat === 'Semua'} className="block text-left">
                                    <span className={`flex h-[130px] w-[130px] items-center justify-center rounded-3xl bg-white text-lg ${kat === 'Semua' ? 'ring-4 ring-admin-green' : ''}`}>Semua</span>
                                    <span className="mt-2 block text-xl text-[#3b3b4f]">All</span>
                                </button>
                            </li>
                            {kategori.map(([nama, r]) => (
                                <li key={nama} className="shrink-0">
                                    <button type="button" onClick={() => setKat(nama)} aria-pressed={kat === nama} className="block text-left">
                                        <Gambar r={r} className={`h-[130px] w-[130px] rounded-3xl ${kat === nama ? 'ring-4 ring-admin-green' : ''}`} />
                                        <span className="mt-2 block text-xl text-[#3b3b4f]">{nama}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <hr className="mt-3 border-t-4 border-gray-300" />
                    </section>

                    <section className="mt-10" aria-labelledby="h-populer">
                        <h2 id="h-populer" className="text-[28px] font-medium text-[#3b3b4f]">Most popular</h2>
                        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {terpopuler.map((r) => <KartuAdmin key={r.restoranid} r={r} onHapus={hapus} />)}
                        </div>
                    </section>

                    <section className="mt-12" aria-labelledby="h-semua">
                        <h2 id="h-semua" className="text-[28px] font-medium text-[#3b3b4f]">All restaurants{kat !== 'Semua' && ` · ${kat}`}</h2>
                        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {semua.map((r) => <KartuAdmin key={r.restoranid} r={r} onHapus={hapus} />)}
                        </div>
                    </section>
                </>
            )}
        </AdminLayout>
    );
}
