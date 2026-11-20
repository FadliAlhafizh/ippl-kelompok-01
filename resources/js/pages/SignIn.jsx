import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Layout from '../components/Layout';
import { AuthPage, InputIkon, Pemisah, TombolSosial, kartu } from '../components/AuthCard';
import { IconCheck, IconLock, IconMail } from '../components/Icons';

export default function SignIn() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: true });
    const [info, setInfo] = useState('');

    const pesan = errors.email || errors.password || info || flash?.success || '';
    const galat = Boolean(errors.email || errors.password || info.startsWith('Silakan'));

    const kirim = (e) => {
        e.preventDefault();
        if (!data.email.trim() || !data.password) {
            setInfo('Silakan isi email dan password terlebih dahulu.');
            return;
        }
        setInfo('');
        post('/signin');
    };

    return (
        <Layout judul="Sign In">
            <AuthPage>
                <section className={kartu} aria-labelledby="judul-masuk">
                    <h2 id="judul-masuk" className="mb-5 text-base font-bold text-[#292929]">Sign In</h2>

                    <form onSubmit={kirim} className="space-y-3" noValidate>
                        <InputIkon ikon={IconMail} type="email" placeholder="Email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} autoComplete="email" required />
                        <InputIkon ikon={IconLock} type="password" placeholder="Password" value={data.password}
                            onChange={(e) => setData('password', e.target.value)} autoComplete="current-password" required />

                        <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-700">
                            <input type="checkbox" className="sr-only" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                            <span className={`flex h-4 w-4 items-center justify-center ${data.remember ? 'bg-brand text-white' : 'border border-gray-400'}`}>
                                {data.remember && <IconCheck className="h-3 w-3" />}
                            </span>
                            Remember me?
                        </label>

                        <button type="submit" disabled={processing}
                            className="mt-2 h-[33px] w-full bg-brand text-[13px] text-white transition hover:bg-brand-dark disabled:opacity-60">
                            Sign In
                        </button>

                        {pesan && <p role="status" className={`text-xs leading-4 ${galat ? 'text-red-600' : 'text-brand'}`}>{pesan}</p>}

                        <p className="text-right text-xs text-gray-500">Forget password?</p>

                        <Pemisah />

                        <TombolSosial jenis="google" label="Sign in with Google" onClick={() => setInfo('Login Google belum dihubungkan.')} />
                        <TombolSosial jenis="apple" label="Sign in with Apple" onClick={() => setInfo('Login Apple belum dihubungkan.')} />

                        <p className="pt-3 text-center text-xs text-gray-500">
                            Belum punya akun?{' '}
                            <Link href="/signup" className="font-semibold text-brand hover:underline">Sign Up</Link>
                        </p>
                    </form>
                </section>
            </AuthPage>
        </Layout>
    );
}
