import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    IconSearch, IconUser, IconHeart, IconClock,
    IconFacebook, IconTwitter, IconInstagram, IconYoutube, IconPinterest,
} from './Icons';

export { rupiah, Bintang } from './ui';

const BANNER = 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=1800&q=85';

/** Lebar konten sama di header, isi halaman, dan footer. */
export const wadah = 'mx-auto w-full max-w-5xl px-5';

function Header() {
    const { props, url } = usePage();
    const user = props.auth?.user;
    const [buka, setBuka] = useState(false);
    const path = url.split('?')[0];

    const menu = [
        { label: 'Home', href: '/', aktif: path === '/' },
        { label: 'Menu', href: '/#restoran', anchor: true },
        { label: 'Favorit', href: '/favorit', aktif: path.startsWith('/favorit') },
        { label: 'Preferensi', href: '/preferensi', aktif: path.startsWith('/preferensi') },
        { label: 'About', href: '#tentang', anchor: true },
        { label: 'Contact', href: '#kontak', anchor: true },
    ];
    if (user?.role === 'admin') menu.splice(4, 0, { label: 'Admin', href: '/admin/restoran', aktif: path.startsWith('/admin') });

    const kelas = (aktif) => `text-[13px] transition hover:text-green-500 ${aktif ? 'font-medium text-green-600' : 'text-white'}`;
    const ikon = 'flex h-8 w-8 items-center justify-center text-white hover:text-green-500';

    return (
        <header className="bg-ink text-white">
            <nav className={`${wadah} flex h-[67px] items-center justify-between gap-4`} aria-label="Navigasi utama">
                <Link href="/" className="text-lg font-bold tracking-tight">SmartFoodie</Link>

                <div className="hidden items-center gap-7 md:flex">
                    {menu.map((m) => m.anchor
                        ? <a key={m.label} href={m.href} className={kelas(false)}>{m.label}</a>
                        : <Link key={m.label} href={m.href} className={kelas(m.aktif)} aria-current={m.aktif ? 'page' : undefined}>{m.label}</Link>)}
                </div>

                <div className="flex items-center gap-1">
                    <a href="/#restoran" aria-label="Cari restoran" className={ikon}><IconSearch className="h-[18px] w-[18px]" /></a>
                    <Link href={user ? '/profile' : '/signin'} aria-label={user ? `Profil ${user.name}` : 'Masuk'} className={ikon}>
                        <IconUser className="h-[18px] w-[18px]" />
                    </Link>
                    <Link href="/favorit" aria-label="Favorit" className={ikon}><IconHeart className="h-[18px] w-[18px]" /></Link>
                    {user && (
                        <button type="button" onClick={() => router.post('/logout')}
                            className="ml-2 hidden border border-gray-600 px-3 py-1 text-xs hover:border-green-500 hover:text-green-400 sm:block">
                            Keluar
                        </button>
                    )}
                    <button type="button" className="ml-1 flex h-8 w-8 items-center justify-center md:hidden" aria-expanded={buka}
                        aria-label="Buka menu" onClick={() => setBuka((v) => !v)}>
                        <span className="space-y-1"><i className="block h-0.5 w-5 bg-white" /><i className="block h-0.5 w-5 bg-white" /><i className="block h-0.5 w-5 bg-white" /></span>
                    </button>
                </div>
            </nav>

            {buka && (
                <div className={`${wadah} flex flex-col gap-3 pb-4 md:hidden`}>
                    {menu.map((m) => m.anchor
                        ? <a key={m.label} href={m.href} className={kelas(false)}>{m.label}</a>
                        : <Link key={m.label} href={m.href} className={kelas(m.aktif)}>{m.label}</Link>)}
                    {user && <button type="button" onClick={() => router.post('/logout')} className="text-left text-[13px] text-gray-300">Keluar</button>}
                </div>
            )}
        </header>
    );
}

function Hero({ judul, tebal }) {
    return (
        <section className="relative flex h-[200px] items-center justify-center bg-[#0b1520] bg-cover bg-center sm:h-[240px]"
            style={{ backgroundImage: `url("${BANNER}")` }}>
            <div className="absolute inset-0 bg-[#071019]/65" />
            <h1 className={`relative px-5 text-center text-3xl text-white sm:text-[34px] ${tebal ? 'font-bold' : 'font-normal'}`}>{judul}</h1>
        </section>
    );
}

function Footer() {
    const kolom = [
        { judul: 'Useful Links', link: [['About', '#tentang'], ['News', '/'], ['Partners', '/'], ['Team', '/'], ['Menu', '/#restoran'], ['Contact', '#kontak']] },
        { judul: 'Help?', link: [['FAQ', '/'], ['Term & Condition', '/'], ['Reporting', '/'], ['Documentation', '/'], ['Support Policy', '/'], ['Privacy', '/']] },
    ];
    const sosial = [['Facebook', IconFacebook], ['X', IconTwitter], ['Instagram', IconInstagram], ['YouTube', IconYoutube], ['Pinterest', IconPinterest]];

    return (
        <footer id="kontak" className="mt-20 bg-[#0d0d0d] text-white">
            <div className={`${wadah} pb-14 pt-16`}>
                <div className="max-w-3xl md:ml-10">
                    <h2 className="text-[28px] font-bold leading-tight"><span className="text-brand">St</span>ill You Need Our Support ?</h2>
                    <p className="mt-3 text-[13px]">Don’t wait, make a smart &amp; logical choice. It’s pretty easy.</p>
                </div>
                <div className="mt-8 h-px bg-brand/60 md:ml-10" />

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr]">
                    <div id="tentang">
                        <h3 className="text-base font-bold">About Us.</h3>
                        <p className="mt-6 max-w-xs text-[13px] leading-6">
                            SmartFoodie membantu kamu menemukan restoran dan menu yang cocok dengan selera, lokasi, dan anggaranmu.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <span className="flex h-[54px] w-[54px] items-center justify-center bg-brand"><IconClock className="h-7 w-7" /></span>
                            <div className="text-[11px] leading-5">
                                <p className="text-[15px]">Opening Hours</p>
                                <p>Mon - Sat (08.00 - 18.00)</p>
                                <p>Sunday - Closed</p>
                            </div>
                        </div>
                    </div>

                    {kolom.map((k) => (
                        <div key={k.judul}>
                            <h3 className="text-base font-bold">{k.judul}</h3>
                            <ul className="mt-6 space-y-3">
                                {k.link.map(([nama, href]) => (
                                    <li key={nama}>
                                        {href.startsWith('/') && !href.includes('#')
                                            ? <Link href={href} className="text-[13px] hover:text-green-500">{nama}</Link>
                                            : <a href={href} className="text-[13px] hover:text-green-500">{nama}</a>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-base font-bold">Install App</h3>
                        <div className="mt-14 flex gap-2">
                            <span className="flex h-9 items-center border border-gray-500 bg-black px-2.5 text-left leading-none">
                                <span><small className="block text-[7px]">Download on the</small><b className="text-[13px] font-medium">App Store</b></span>
                            </span>
                            <span className="flex h-9 items-center gap-1.5 border border-gray-500 bg-black px-2.5 leading-none">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M4 3v18l16-9L4 3Z" className="fill-green-500" /></svg>
                                <span><small className="block text-[7px]">GET IT ON</small><b className="text-[13px] font-medium">Google Play</b></span>
                            </span>
                        </div>
                        <p className="mt-10 text-[12px]">Secured Payment Gateways</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#4b4b4b]">
                <div className={`${wadah} flex flex-col items-center justify-between gap-4 py-6 text-[12px] sm:flex-row`}>
                    <p>Copyright © {new Date().getFullYear()} SmartFoodie. All Rights Reserved.</p>
                    <div className="flex gap-2">
                        {sosial.map(([nama, Ikon]) => (
                            <a key={nama} href="/" aria-label={nama} className="flex h-7 w-7 items-center justify-center bg-white text-black hover:text-brand">
                                <Ikon className="h-3.5 w-3.5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Layout({ children, judul, tebal = false }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Header />
            {judul && <Hero judul={judul} tebal={tebal} />}

            {(flash?.success || flash?.error) && (
                <div className={`${wadah} mt-6`}>
                    <p role="status" className={`px-4 py-3 text-sm ${flash.error ? 'bg-red-50 text-red-700' : 'bg-brand-soft text-brand'}`}>
                        {flash.error ?? flash.success}
                    </p>
                </div>
            )}

            <main>{children}</main>
            <Footer />
        </div>
    );
}
