import React from 'react';
import { useForm } from '@inertiajs/react';
import Layout, { wadah } from '../components/Layout';

function Kelompok({ judul, deskripsi, pilihan, nilai, onToggle }) {
    return (
        <fieldset className="mb-6">
            <legend className="font-semibold">{judul}</legend>
            <p className="mb-3 text-xs text-gray-500">{deskripsi}</p>
            <div className="flex flex-wrap gap-2">
                {pilihan.map((p) => {
                    const aktif = nilai.includes(p);
                    return (
                        <label key={p}
                            className={`cursor-pointer border px-4 py-2 text-xs transition ${
                                aktif ? 'border-brand bg-brand text-white' : 'border-line hover:border-brand'
                            }`}>
                            <input type="checkbox" className="sr-only" checked={aktif} onChange={() => onToggle(p)} />
                            {p}
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}

export default function Preferensi({ pilihanJenis, pilihanPantangan, jenisMakanan, pantangan }) {
    const { data, setData, put, processing, errors } = useForm({
        jenis_makanan: jenisMakanan,
        pantangan,
    });

    const toggle = (kunci) => (nilai) =>
        setData(kunci, data[kunci].includes(nilai) ? data[kunci].filter((x) => x !== nilai) : [...data[kunci], nilai]);

    return (
        <Layout judul="Preferensi Makanan">
            <form onSubmit={(e) => { e.preventDefault(); put('/preferensi'); }}
                className={`${wadah} max-w-2xl pt-14`}>
                <Kelompok judul="Jenis makanan yang disukai" deskripsi="Dipakai untuk rekomendasi di beranda."
                    pilihan={pilihanJenis} nilai={data.jenis_makanan} onToggle={toggle('jenis_makanan')} />
                <Kelompok judul="Pantangan" deskripsi="Menu yang mengandung bahan ini tidak akan direkomendasikan."
                    pilihan={pilihanPantangan} nilai={data.pantangan} onToggle={toggle('pantangan')} />

                {Object.values(errors).length > 0 && (
                    <p className="mb-3 text-sm text-red-600">{Object.values(errors)[0]}</p>
                )}
                <button disabled={processing}
                    className="bg-brand px-6 py-2.5 text-[13px] text-white hover:bg-brand-dark disabled:opacity-60">
                    Simpan perubahan
                </button>
            </form>
        </Layout>
    );
}
