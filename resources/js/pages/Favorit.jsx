import React from 'react';
import { Link } from '@inertiajs/react';
import Layout, { wadah } from '../components/Layout';
import RestoranCard from '../components/RestoranCard';

export default function Favorit({ restorans }) {
    return (
        <Layout judul="Restoran Favorit">
            <div className={`${wadah} pt-14`}>
                {restorans.length === 0 ? (
                    <div className="bg-brand-soft/60 px-5 py-12 text-center text-sm text-gray-600">
                        Belum ada restoran favorit.{' '}
                        <Link href="/" className="font-semibold text-brand hover:underline">Cari restoran</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
                        {restorans.map((r) => <RestoranCard key={r.restoranid} r={r} />)}
                    </div>
                )}
            </div>
        </Layout>
    );
}
