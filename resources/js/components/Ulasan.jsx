import React from 'react';
import { Bintang, PilihBintang } from './ui';

/** Bagian "Customer Review" pada Figma. */
export function Testimoni({ ulasan }) {
    if (!ulasan || ulasan.length === 0) return null;
    return (
        <section className="mt-20 text-center" aria-labelledby="judul-ulasan">
            <p className="font-script text-lg text-brand">Testimonials</p>
            <h2 id="judul-ulasan" className="mt-2 text-4xl font-bold text-ink">Customer Review</h2>
            <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
                {ulasan.map((u) => (
                    <figure key={u.id} className="flex flex-col rounded-2xl bg-brand-soft p-4">
                        <Bintang nilai={u.nilai} size={18} className="gap-1" />
                        <blockquote className="mt-5 line-clamp-5 flex-1 text-[13px] leading-5 text-gray-700">{u.komentar}</blockquote>
                        <figcaption className="mt-5 flex items-center justify-end gap-3">
                            <span className="min-w-0 text-right">
                                <b className="block truncate text-[13px] text-ink">{u.nama}</b>
                                {u.restoran && <span className="block truncate text-xs text-gray-500">{u.restoran}</span>}
                            </span>
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand text-sm font-semibold text-white">
                                {u.nama.charAt(0).toUpperCase()}
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}

/** "Post a comment" pada Figma — dipakai juga oleh halaman detail menu. */
export function FormUlasan({ form, kirim, sudahAda }) {
    return (
        <form onSubmit={kirim} className="mx-auto mt-16 max-w-2xl">
            <h2 className="text-lg font-bold text-ink">{sudahAda ? 'Ubah rating & ulasanmu' : 'Post a comment'}</h2>
            <div className="mt-3 flex items-center gap-3 border-t border-line pt-4 text-xs text-gray-500">
                <PilihBintang nilai={form.data.nilai} onChange={(n) => form.setData('nilai', n)} />
                <span>Add Rating</span>
            </div>
            <textarea value={form.data.komentar} onChange={(e) => form.setData('komentar', e.target.value)} rows={5}
                placeholder="Tulis ulasanmu (opsional)" aria-label="Komentar"
                className="mt-4 w-full border border-line p-3 text-[13px] outline-none focus:border-brand" />
            {(form.errors.nilai || form.errors.komentar) && (
                <p className="mt-1 text-sm text-red-600">{form.errors.nilai ?? form.errors.komentar}</p>
            )}
            <button disabled={form.processing || !form.data.nilai}
                className="mt-4 bg-brand px-6 py-2.5 text-[13px] text-white hover:bg-brand-dark disabled:opacity-50">
                {sudahAda ? 'Simpan perubahan' : 'Post a comment'}
            </button>
        </form>
    );
}
