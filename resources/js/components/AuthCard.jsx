import React from 'react';

export const kartu = 'w-full max-w-[320px] bg-white px-6 py-6 shadow-[0_0_40px_rgba(255,170,80,0.16)]';

/** Halaman tengah berisi satu kartu (Sign In / Sign Up / Profile). */
export function AuthPage({ children }) {
    return <div className="flex min-h-[560px] items-center justify-center px-5 py-16">{children}</div>;
}

/** Kolom input dengan ikon di kiri, tinggi 33px seperti Figma. */
export function InputIkon({ ikon: Ikon, ...props }) {
    return (
        <label className="flex h-[33px] items-center gap-2 border border-line px-2.5 focus-within:border-brand">
            <Ikon className="h-4 w-4 shrink-0 text-gray-600" />
            <input {...props} aria-label={props.placeholder}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-gray-700 outline-none placeholder:text-gray-500" />
        </label>
    );
}

export function Pemisah() {
    return (
        <div className="flex items-center gap-2 py-3" role="separator">
            <div className="h-px flex-1 bg-line" />
            <span className="border border-line px-1.5 py-0.5 text-[11px] text-gray-600">OR</span>
            <div className="h-px flex-1 bg-line" />
        </div>
    );
}

const GoogleG = () => (
    <span aria-hidden="true" className="bg-gradient-to-br from-blue-500 via-red-500 to-green-500 bg-clip-text text-base font-bold text-transparent">G</span>
);
const Apple = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
        <path d="M12 7.500c-1.600-1.400-5.500-1-5.500 4 0 3.800 2.200 8 4.200 8 .9 0 1.100-.5 1.300-.5s.4.500 1.300.5c2 0 4.200-4.200 4.200-8 0-5-3.900-5.400-5.500-4Z" />
        <path d="M12.200 6.500c0-1.800 1-3 2.600-3.500-.1 1.800-.9 3-2.600 3.500Z" />
    </svg>
);

export function TombolSosial({ jenis, label, onClick }) {
    return (
        <button type="button" onClick={onClick}
            className="relative flex h-8 w-full items-center justify-center border border-line text-[13px] text-gray-700 transition hover:bg-gray-50">
            <span className="absolute left-3.5">{jenis === 'google' ? <GoogleG /> : <Apple />}</span>
            {label}
        </button>
    );
}
