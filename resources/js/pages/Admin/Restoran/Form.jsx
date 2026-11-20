import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import { rupiah } from '../../../components/ui';

const input = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-admin-green';

function Field({ label, error, children }) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#3b3b4f]">{label}</span>
            {children}
            {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
        </label>
    );
}

const menuKosong = { nama_menu: '', harga: '', kategori: '', tags: '', deskripsi: '' };

function KelolaMenu({ restoran, menus }) {
    const [editId, setEditId] = useState(null);
    const f = useForm(menuKosong);

    const mulaiEdit = (m) => {
        setEditId(m.menuid);
        f.setData({ nama_menu: m.nama_menu, harga: m.harga, kategori: m.kategori, tags: m.tags, deskripsi: m.deskripsi ?? '' });
    };
    const batal = () => { setEditId(null); f.setData(menuKosong); f.clearErrors(); };

    const simpan = (e) => {
        e.preventDefault();
        const opsi = { preserveScroll: true, onSuccess: batal };
        if (editId) f.put(`/admin/menu/${editId}`, opsi);
        else f.post(`/admin/restoran/${restoran.restoranid}/menu`, opsi);
    };

    const hapus = (m) => {
        if (confirm(`Hapus menu "${m.nama_menu}"?`)) router.delete(`/admin/menu/${m.menuid}`, { preserveScroll: true });
    };

    return (
        <section className="mt-12">
            <h2 className="text-[28px] font-medium text-[#3b3b4f]">Menu</h2>

            <ul className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white">
                {menus.map((m) => (
                    <li key={m.menuid} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                        <div>
                            <strong>{m.nama_menu}</strong> · {rupiah(m.harga)} · {m.kategori}
                            {m.tags && <span className="ml-2 text-xs text-gray-500">[{m.tags}]</span>}
                        </div>
                        <div className="space-x-3">
                            <button type="button" onClick={() => mulaiEdit(m)} className="text-[#0a4b2c] underline underline-offset-2 hover:text-admin-green">Edit</button>
                            <button type="button" onClick={() => hapus(m)} className="text-red-600 hover:underline">Hapus</button>
                        </div>
                    </li>
                ))}
                {menus.length === 0 && <li className="px-4 py-6 text-center text-sm text-gray-500">Belum ada menu.</li>}
            </ul>

            <form onSubmit={simpan} className="mt-6 grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-2">
                <h3 className="font-semibold sm:col-span-2">{editId ? 'Edit menu' : 'Tambah menu'}</h3>
                <Field label="Nama menu" error={f.errors.nama_menu}>
                    <input className={input} value={f.data.nama_menu} onChange={(e) => f.setData('nama_menu', e.target.value)} />
                </Field>
                <Field label="Harga (Rp)" error={f.errors.harga}>
                    <input type="number" min="0" className={input} value={f.data.harga} onChange={(e) => f.setData('harga', e.target.value)} />
                </Field>
                <Field label="Kategori" error={f.errors.kategori}>
                    <input className={input} value={f.data.kategori} onChange={(e) => f.setData('kategori', e.target.value)} />
                </Field>
                <Field label="Tag (pisahkan koma, mis. Pedas, Seafood)" error={f.errors.tags}>
                    <input className={input} value={f.data.tags} onChange={(e) => f.setData('tags', e.target.value)} />
                </Field>
                <div className="sm:col-span-2">
                    <Field label="Deskripsi" error={f.errors.deskripsi}>
                        <input className={input} value={f.data.deskripsi} onChange={(e) => f.setData('deskripsi', e.target.value)} />
                    </Field>
                </div>
                <div className="flex gap-2 sm:col-span-2">
                    <button disabled={f.processing} className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
                        {editId ? 'Simpan menu' : 'Tambah menu'}
                    </button>
                    {editId && <button type="button" onClick={batal} className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm">Batal</button>}
                </div>
            </form>
        </section>
    );
}

export default function Form({ restoran, menus }) {
    const edit = !!restoran;
    const { data, setData, post, put, processing, errors } = useForm({
        nama: restoran?.nama ?? '',
        kategori: restoran?.kategori ?? '',
        alamat: restoran?.alamat ?? '',
        city: restoran?.city ?? '',
        latitude: restoran?.latitude ?? '',
        longitude: restoran?.longitude ?? '',
        deskripsi: restoran?.deskripsi ?? '',
        gambar: restoran?.gambar ?? '',
    });

    const simpan = (e) => {
        e.preventDefault();
        if (edit) put(`/admin/restoran/${restoran.restoranid}`);
        else post('/admin/restoran');
    };

    const t = (k) => ({ value: data[k], onChange: (e) => setData(k, e.target.value), className: input });

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <Link href="/admin/restoran" className="text-sm text-[#0a4b2c] underline underline-offset-2 hover:text-admin-green">← Inventory Management</Link>
                <h1 className="mt-3 text-[32px] font-medium leading-tight text-[#3b3b4f]">{edit ? 'Edit Restoran' : 'Tambah Restoran'}</h1>

                <form onSubmit={simpan} className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Nama restoran" error={errors.nama}><input {...t('nama')} /></Field>
                    <Field label="Kategori (mis. Nusantara, Cafe)" error={errors.kategori}><input {...t('kategori')} /></Field>
                    <div className="sm:col-span-2">
                        <Field label="Alamat" error={errors.alamat}><input {...t('alamat')} /></Field>
                    </div>
                    <Field label="Kota" error={errors.city}><input {...t('city')} /></Field>
                    <Field label="URL gambar" error={errors.gambar}><input {...t('gambar')} /></Field>
                    <Field label="Latitude" error={errors.latitude}><input type="number" step="any" {...t('latitude')} /></Field>
                    <Field label="Longitude" error={errors.longitude}><input type="number" step="any" {...t('longitude')} /></Field>
                    <div className="sm:col-span-2">
                        <Field label="Deskripsi" error={errors.deskripsi}>
                            <textarea rows={3} {...t('deskripsi')} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <button disabled={processing} className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
                            {edit ? 'Simpan perubahan' : 'Tambah restoran'}
                        </button>
                    </div>
                </form>

                {edit && <KelolaMenu restoran={restoran} menus={menus} />}
            </div>
        </AdminLayout>
    );
}
