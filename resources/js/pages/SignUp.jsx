import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { AuthPage, InputIkon, Pemisah, TombolSosial, kartu } from '../components/AuthCard';
import { IconCheck, IconLock, IconMail, IconUser } from '../components/Icons';

export default function SignUp() {
    const { data, setData, post, processing, errors } = useForm({ name: '', email: '', password: '' });
    const [remember, setRemember] = useState(true);
    const [info, setInfo] = useState('');

    const galatServer = errors.email || errors.name || errors.password;
    const pesan = galatServer || info;
    const galat = Boolean(galatServer || info.startsWith('Silakan') || info.startsWith('Password'));

    const kirim = (e) => {
        e.preventDefault();
        if (!data.name.trim() || !data.email.trim() || !data.password) {
            setInfo('Silakan lengkapi semua kolom.');
            return;
        }
        if (data.password.length < 8) {
            setInfo('Password minimal 8 karakter.');
            return;
        }
        setInfo('');
        post('/signup');
    };

    return (
        <Layout judul="Sign Up">
            <AuthPage>
                <section className={kartu} aria-labelledby="judul-daftar">
                    <h2 id="judul-daftar" className="mb-5 text-base font-bold text-[#292929]">Sign Up</h2>

                    <form onSubmit={kirim} className="space-y-3" noValidate>
                        <InputIkon ikon={IconUser} type="text" placeholder="Name" value={data.name}
                            onChange={(e) => setData('name', e.target.value)} autoComplete="name" required />
                        <InputIkon ikon={IconMail} type="email" placeholder="Email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} autoComplete="email" required />
                        <InputIkon ikon={IconLock} type="password" placeholder="Password" value={data.password}
                            onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" required />

                        <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-700">
                            <input type="checkbox" className="sr-only" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                            <span className={`flex h-4 w-4 items-center justify-center ${remember ? 'bg-brand text-white' : 'border border-gray-400'}`}>
                                {remember && <IconCheck className="h-3 w-3" />}
                            </span>
                            Remember me?
                        </label>

                        <button type="submit" disabled={processing}
                            className="mt-2 h-[33px] w-full bg-brand text-[13px] text-white transition hover:bg-brand-dark disabled:opacity-60">
                            Sign Up
                        </button>

                        {pesan && <p role="status" className={`text-xs leading-4 ${galat ? 'text-red-600' : 'text-brand'}`}>{pesan}</p>}

                        <p className="text-right text-xs text-gray-500">Forget password?</p>

                        <Pemisah />

                        <TombolSosial jenis="google" label="Sign up with Google" onClick={() => setInfo('Pendaftaran Google belum dihubungkan.')} />
                        <TombolSosial jenis="apple" label="Sign up with Apple" onClick={() => setInfo('Pendaftaran Apple belum dihubungkan.')} />

                        <p className="pt-3 text-center text-xs text-gray-500">
                            Sudah punya akun?{' '}
                            <Link href="/signin" className="font-semibold text-brand hover:underline">Sign In</Link>
                        </p>
                    </form>
                </section>
            </AuthPage>
        </Layout>
    );
}
