import React from 'react';
import { Link } from '@inertiajs/react';
import { IconChevronDown, IconHeart, IconBag, IconSearch, IconCheck } from './Icons';

export const rupiah = (v) =>
    v === null || v === undefined
        ? '-'
        : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

function Bintang1({ penuh, size }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={penuh ? 'text-brand' : 'text-gray-200'} fill="currentColor">
            <path d="m12 2.800 2.900 5.900 6.500.9-4.700 4.600 1.100 6.500L12 17.600l-5.800 3.100 1.100-6.500L2.600 9.600l6.500-.9L12 2.800Z" />
        </svg>
    );
}

/** Bintang rating bergaya Figma (hijau tua). */
export function Bintang({ nilai = 0, size = 14, className = '' }) {
    const penuh = Math.round(nilai || 0);
    return (
        <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${nilai || 0} dari 5`}>
            {[1, 2, 3, 4, 5].map((n) => <Bintang1 key={n} penuh={n <= penuh} size={size} />)}
        </span>
    );
}

/** Pemilih bintang interaktif. */
export function PilihBintang({ nilai, onChange, size = 20 }) {
    return (
        <span className="inline-flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={nilai === n} aria-label={`${n} bintang`}
                    onClick={() => onChange(n)}>
                    <Bintang1 penuh={n <= nilai} size={size} />
                </button>
            ))}
        </span>
    );
}

/** <select> bergaya Figma: kotak tipis dengan panah. */
export function SelectBox({ className = '', children, ...props }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <select {...props}
                className="h-9 w-full appearance-none rounded-sm border border-line bg-white pl-3 pr-8 text-[13px] text-gray-500 outline-none focus:border-brand">
                {children}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </span>
    );
}

/** Kartu produk (restoran maupun menu) sesuai Figma. */
export function KartuProduk({ href, gambar, nama, badge, harga, meta, favorit, onFavorit, inisial }) {
    return (
        <article className="group">
            <div className="relative aspect-[1/0.86] overflow-hidden bg-brand-soft">
                <Link href={href} className="block h-full" tabIndex={-1} aria-hidden="true">
                    {gambar ? (
                        <img src={gambar} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-soft to-[#c9d4bd] text-5xl font-bold text-brand/40">
                            {(inisial ?? nama ?? '?').charAt(0).toUpperCase()}
                        </span>
                    )}
                </Link>
                {badge && <span className="absolute left-2.5 top-2.5 bg-brand px-2 py-0.5 text-[10px] text-white">{badge}</span>}

                <div className={`absolute inset-x-0 bottom-3 flex justify-center gap-1 transition-opacity focus-within:opacity-100 md:group-hover:opacity-100 ${favorit ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
                    <Link href={href} aria-label={`Lihat ${nama}`} className="flex h-7 w-7 items-center justify-center bg-brand text-white hover:bg-brand-dark">
                        <IconBag className="h-3.5 w-3.5" />
                    </Link>
                    {onFavorit && (
                        <button type="button" onClick={onFavorit} aria-pressed={!!favorit}
                            aria-label={favorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                            className={`flex h-7 w-7 items-center justify-center bg-white hover:text-red-500 ${favorit ? 'text-red-500' : 'text-brand'}`}>
                            <IconHeart filled={favorit} className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
            <Link href={href} className="mt-2 block text-[13px] font-bold leading-tight hover:text-brand">{nama}</Link>
            <p className="mt-1 text-xs">
                {harga && <span className="text-brand">{harga}</span>}
                {meta && <span className="ml-2 text-gray-400">{meta}</span>}
            </p>
        </article>
    );
}

/** Pagination persegi bergaya Figma. */
export function Halaman({ total, aktif, onChange }) {
    if (total <= 1) return null;
    const btn = 'flex h-9 w-9 items-center justify-center border text-[13px]';
    return (
        <nav className="mt-10 flex justify-center gap-2" aria-label="Halaman">
            <button type="button" aria-label="Halaman sebelumnya" disabled={aktif === 1} onClick={() => onChange(aktif - 1)}
                className={`${btn} border-line text-brand disabled:opacity-40`}>«</button>
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => onChange(n)} aria-current={n === aktif ? 'page' : undefined}
                    className={`${btn} ${n === aktif ? 'border-brand bg-brand text-white' : 'border-line text-gray-700 hover:border-brand'}`}>
                    {n}
                </button>
            ))}
            <button type="button" aria-label="Halaman berikutnya" disabled={aktif === total} onClick={() => onChange(aktif + 1)}
                className={`${btn} border-line text-brand disabled:opacity-40`}>»</button>
        </nav>
    );
}

/** Sidebar filter (Search Product, Category, Filter By Price) — dipakai Dashboard & Detail restoran. */
export function SidebarFilter({
    q, setQ, onCari, placeholder = 'Search Product',
    judulKategori = 'Category', kategori, aktifKategori, onKategori,
    harga, setHarga, hargaMax, step, onFilterHarga, children,
}) {
    return (
        <aside className="h-fit border border-gray-100 p-4 text-[13px] lg:sticky lg:top-4">
            <form onSubmit={(e) => { e.preventDefault(); onCari(); }} className="flex">
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder}
                    className="h-9 min-w-0 flex-1 bg-brand-soft px-3 text-xs outline-none placeholder:text-gray-400" />
                <button aria-label="Cari" className="flex h-9 w-9 items-center justify-center bg-brand text-white hover:bg-brand-dark">
                    <IconSearch className="h-4 w-4" />
                </button>
            </form>

            <h3 className="mt-6 text-[15px] font-semibold">{judulKategori}</h3>
            <ul className="mt-3 space-y-2.5">
                {kategori.map((k) => {
                    const aktif = aktifKategori === k;
                    return (
                        <li key={k}>
                            <label className="flex cursor-pointer items-center gap-2">
                                <input type="checkbox" className="sr-only" checked={aktif} onChange={() => onKategori(aktif ? 'Semua' : k)} />
                                <span className={`flex h-3 w-3 items-center justify-center border ${aktif ? 'border-brand bg-brand text-white' : 'border-gray-500'}`}>
                                    {aktif && <IconCheck className="h-2.5 w-2.5" />}
                                </span>
                                <span className={aktif ? 'font-medium text-brand' : 'text-gray-700'}>{k}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>

            <h3 className="mt-7 text-[15px] font-semibold">Filter By Price</h3>
            <input type="range" min="0" max={hargaMax} step={step} value={harga} onChange={(e) => setHarga(Number(e.target.value))}
                aria-label="Harga maksimum" className="sf-range mt-4 w-full" />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Rp0 – {rupiah(harga)}</span>
                <button type="button" onClick={onFilterHarga} className="text-gray-700 hover:text-brand">Filter</button>
            </div>

            {children}
        </aside>
    );
}
