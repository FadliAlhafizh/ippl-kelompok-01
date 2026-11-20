import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { IconChart, IconFile, IconHome, IconList, IconPencil, IconUser } from './Icons';

const menu = [
    { label: 'Dashboard', href: '/', ikon: IconHome },
    { label: 'Order Management', ikon: IconList },
    { label: 'Inventory Management', href: '/admin/restoran', ikon: IconFile, aktif: true },
    { label: 'Sales Reports', ikon: IconChart },
    { label: 'Customer Feedback', ikon: IconPencil },
    { label: 'Customer Detail', ikon: IconUser },
];

/** Kerangka dashboard admin (sidebar kiri) sesuai Figma Management_Restaurant. */
export default function AdminLayout({ children }) {
    const { props } = usePage();
    const flash = props.flash;
    const [buka, setBuka] = useState(false);

    return (
        <div className="min-h-screen bg-[#f3f3f7] font-admin text-[#3b3b4f] lg:flex">
            <header className="flex items-center justify-between bg-white px-5 py-4 lg:hidden">
                <span className="font-logo text-xl font-bold text-[#2b2b3b]">SmartFoodie</span>
                <button type="button" aria-expanded={buka} aria-label="Buka menu" onClick={() => setBuka((v) => !v)} className="text-sm font-medium">Menu</button>
            </header>

            <aside className={`${buka ? 'block' : 'hidden'} w-full shrink-0 bg-white px-8 pb-8 pt-10 lg:block lg:min-h-screen lg:w-[260px]`}>
                <div className="hidden lg:block">
                    <p className="font-logo text-[28px] font-bold leading-none text-[#2b2b3b]">SmartFoodie</p>
                    <p className="mt-1 text-xs text-gray-400">Modern Admin Dashboard</p>
                </div>

                <nav aria-label="Menu admin" className="mt-2 space-y-1 lg:mt-14">
                    {menu.map(({ label, href, ikon: Ikon, aktif }) => {
                        const kelas = `flex items-center gap-4 py-3 text-[15px] ${aktif ? 'font-medium text-admin-green' : 'text-[#2b2b3b]'}`;
                        const isi = <><Ikon className="h-[18px] w-[18px] shrink-0" />{label}</>;
                        return href
                            ? <Link key={label} href={href} className={kelas} aria-current={aktif ? 'page' : undefined}>{isi}</Link>
                            : <span key={label} className={`${kelas} cursor-not-allowed opacity-50`} aria-disabled="true" title="Belum tersedia">{isi}</span>;
                    })}
                    <button type="button" onClick={() => router.post('/logout')} className="flex items-center gap-4 py-3 text-[15px] text-[#2b2b3b] hover:text-accent">
                        <span className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />Keluar
                    </button>
                </nav>
            </aside>

            <main className="min-w-0 flex-1 px-5 pb-16 pt-10 lg:px-14 lg:pt-[72px]">
                {(flash?.success || flash?.error) && (
                    <p role="status" className={`mb-6 rounded-lg px-4 py-3 text-sm ${flash.error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}>
                        {flash.error ?? flash.success}
                    </p>
                )}
                {children}
            </main>
        </div>
    );
}
