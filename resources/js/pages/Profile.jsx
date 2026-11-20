import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Layout from '../components/Layout';
import { AuthPage, kartu } from '../components/AuthCard';
import { IconChevronDown } from '../components/Icons';

const KODE = [
    ['ID', '+62'], ['US', '+1'], ['MY', '+60'], ['SG', '+65'], ['AU', '+61'], ['GB', '+44'],
];

/** Pisahkan "+62 8123..." menjadi kode negara dan nomor. */
function pecah(nilai) {
    const v = (nilai ?? '').trim();
    const cocok = [...KODE].sort((a, b) => b[1].length - a[1].length).find(([, k]) => v.startsWith(k));
    return cocok ? [cocok[1], v.slice(cocok[1].length).trim()] : ['+62', v];
}

const label = 'mb-1.5 block text-[11px] font-semibold text-gray-700';
const kolom = 'h-10 w-full border border-line px-3 text-[13px] text-gray-600 outline-none focus:border-brand';

export default function Profile({ user }) {
    const { flash } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        tanggal_lahir: user.tanggal_lahir ?? '',
        no_telepon: user.no_telepon ?? '',
        email: user.email ?? '',
        lokasi: user.lokasi ?? '',
    });

    const [kode, nomor] = pecah(data.no_telepon);
    const setTelepon = (k, n) => setData('no_telepon', n.trim() ? `${k} ${n.trim()}` : '');

    const galat = Object.values(errors)[0];
    const pesan = galat || flash?.success || '';

    const kirim = (e) => {
        e.preventDefault();
        put('/profile', { preserveScroll: true });
    };

    return (
        <Layout judul="Profile">
            <AuthPage>
                <section className={kartu} aria-labelledby="judul-profil">
                    <h2 id="judul-profil" className="mb-4 text-center text-base font-bold text-[#292929]">Profile</h2>

                    <form onSubmit={kirim} className="space-y-4">
                        <div>
                            <label htmlFor="p-nama" className={label}>Nama</label>
                            <input id="p-nama" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name" required className={kolom} />
                        </div>

                        <div>
                            <label htmlFor="p-lahir" className={label}>Tanggal Lahir</label>
                            <input id="p-lahir" type="date" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                className={kolom} />
                        </div>

                        <div>
                            <label htmlFor="p-hp" className={label}>No. HP</label>
                            <div className="flex h-10 items-center border border-line focus-within:border-brand">
                                <span className="relative flex h-full items-center border-r border-line">
                                    <select aria-label="Kode negara" value={kode} onChange={(e) => setTelepon(e.target.value, nomor)}
                                        className="h-full appearance-none bg-transparent pl-3 pr-7 text-[13px] text-gray-600 outline-none">
                                        {KODE.map(([n, k]) => <option key={n} value={k}>{n} {k}</option>)}
                                    </select>
                                    <IconChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-gray-500" />
                                </span>
                                <input id="p-hp" type="tel" inputMode="tel" placeholder="8123456789" value={nomor}
                                    onChange={(e) => setTelepon(kode, e.target.value)} autoComplete="tel-national"
                                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-gray-600 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="p-email" className={label}>Email Address</label>
                            <input id="p-email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email" required className={kolom} />
                        </div>

                        <div>
                            <label htmlFor="p-lokasi" className={label}>Lokasi</label>
                            <input id="p-lokasi" type="text" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)}
                                placeholder="Mis. Dayeuhkolot, Bandung" className={kolom} />
                        </div>

                        <div className="flex flex-col items-center pt-2">
                            <button type="submit" disabled={processing}
                                className="border border-gray-800 px-6 py-2 text-[13px] font-semibold text-gray-900 transition hover:border-brand hover:bg-brand hover:text-white disabled:opacity-60">
                                Update Profile
                            </button>
                            <Link href="/preferensi" className="mt-4 text-xs text-brand hover:underline">Atur preferensi makanan →</Link>
                            {pesan && <p role="status" className={`mt-3 text-center text-xs leading-4 ${galat ? 'text-red-600' : 'text-brand'}`}>{pesan}</p>}
                        </div>
                    </form>
                </section>
            </AuthPage>
        </Layout>
    );
}
