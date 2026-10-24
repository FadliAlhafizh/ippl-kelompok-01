
import React, { useState } from "react";

const bannerImage =
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=1800&q=85";

function Navbar() {
    return (
        <header className="bg-[#0d0d0d] text-white">
            <nav className="mx-auto flex min-h-14 max-w-5xl items-center justify-between px-5">
                <a href="/" className="text-lg font-bold text-green-700">
                    SmartFoodie
                </a>

                <div className="hidden items-center gap-6 text-xs md:flex">
                    <a href="/" className="hover:text-green-500">Home</a>
                    <a href="/#restoran" className="hover:text-green-500">Menu</a>
                    <a href="/#artikel" className="hover:text-green-500">Blog</a>
                    <a href="/#kategori" className="hover:text-green-500">Pages</a>
                    <a href="/#tentang" className="hover:text-green-500">About</a>
                    <a href="/#restoran" className="hover:text-green-500">Shop</a>
                    <a href="#kontak" className="hover:text-green-500">Contact</a>
                </div>

                <div className="flex items-center gap-4 text-lg">
                    <a href="/#restoran" aria-label="Cari">⌕</a>
                    <a href="/signin" aria-label="Akun">♙</a>
                    <a href="/#restoran" aria-label="Keranjang">♧</a>
                </div>
            </nav>
        </header>
    );
}

function PageBanner() {
    return (
        <section
            className="relative flex h-[160px] items-center justify-center bg-cover bg-center sm:h-[202px]"
            style={{ backgroundImage: `url("${bannerImage}")` }}
        >
            <div className="absolute inset-0 bg-[#071019]/65" />
            <h1 className="relative text-3xl font-normal text-white sm:text-[32px]">
                Sign In
            </h1>
        </section>
    );
}

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!email.trim() || !password) {
            setMessage("Silakan isi email dan password terlebih dahulu.");
            return;
        }

        setMessage(
            "Form berhasil divalidasi. Autentikasi Laravel belum dihubungkan."
        );
    }

    return (
        <div className="w-full max-w-[268px] bg-white px-5 py-5 shadow-[0_0_35px_rgba(210,165,90,0.10)] sm:px-5">
            <h2 className="mb-5 text-sm font-bold text-[#292929]">
                Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2.5">
                <label className="flex h-[29px] items-center gap-2 border border-[#e4e4e4] px-2.5 focus-within:border-green-800">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4 shrink-0 text-gray-600"
                        aria-hidden="true"
                    >
                        <rect x="3" y="5" width="18" height="14" rx="1" />
                        <path d="m3 6 9 7 9-7" />
                    </svg>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                        aria-label="Email"
                        autoComplete="email"
                        required
                        className="min-w-0 flex-1 bg-transparent text-[10px] text-gray-700 outline-none placeholder:text-gray-500"
                    />
                </label>

                <label className="flex h-[29px] items-center gap-2 border border-[#e4e4e4] px-2.5 focus-within:border-green-800">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4 shrink-0 text-gray-600"
                        aria-hidden="true"
                    >
                        <rect x="5" y="10" width="14" height="11" rx="1" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        aria-label="Password"
                        autoComplete="current-password"
                        required
                        className="min-w-0 flex-1 bg-transparent text-[10px] text-gray-700 outline-none placeholder:text-gray-500"
                    />
                </label>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                    <label className="flex cursor-pointer items-center gap-1.5 text-[9px] text-gray-700">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(event) => setRemember(event.target.checked)}
                            className="h-3 w-3 accent-green-800"
                        />
                        Remember me?
                    </label>
                </div>

                <button
                    type="submit"
                    className="mt-3 h-7 w-full bg-green-900 text-[10px] font-medium text-white transition hover:bg-green-800"
                >
                    Sign In
                </button>

                {message && (
                    <p
                        role="status"
                        className="pt-1 text-[10px] leading-4 text-green-800"
                    >
                        {message}
                    </p>
                )}

                <div className="flex justify-end pt-0.5">
                    <a
                        href="/forgot-password"
                        className="text-[9px] text-gray-400 hover:text-green-800"
                    >
                        Forgot password?
                    </a>
                </div>

                <div className="flex items-center gap-2.5 py-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="border border-gray-200 px-1 py-0.5 text-[9px] text-gray-500">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setMessage("Login Google belum dihubungkan.")
                    }
                    className="flex h-7 w-full items-center justify-center gap-3 border border-gray-200 text-[10px] text-gray-600 transition hover:bg-gray-50"
                >
                    <span className="font-bold text-blue-600">G</span>
                    Sign in with Google
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setMessage("Login Apple belum dihubungkan.")
                    }
                    className="flex h-7 w-full items-center justify-center gap-3 border border-gray-200 text-[10px] text-gray-600 transition hover:bg-gray-50"
                >
                    <span className="text-sm text-black">●</span>
                    Sign in with Apple
                </button>

                <p className="pt-2 text-center text-[10px] text-gray-500">
                    Belum punya akun?{" "}
                    <a href="/signup" className="font-semibold text-green-800 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
}

function Footer() {
    const columns = [
        {
            title: "Useful Links",
            links: ["About", "News", "Partners", "Team", "Menu", "Contact"],
        },
        {
            title: "Help?",
            links: ["FAQ", "Term & Condition", "Reporting", "Documentation", "Privacy"],
        },
    ];

    return (
        <footer id="kontak" className="bg-[#0d0d0d] text-white">
            <div className="mx-auto max-w-5xl px-5 pb-12 pt-14">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-xl font-bold">
                        <span className="text-green-700">Still</span> You Need Our Support?
                    </h2>
                    <p className="mt-2 text-[11px] text-gray-300">
                        Temukan pilihan kuliner favoritmu bersama SmartFoodie.
                    </p>
                    <div className="mt-5 h-px bg-green-900/70" />
                </div>

                <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-bold">About Us.</h3>
                        <p className="mt-5 text-[11px] leading-5 text-gray-300">
                            SmartFoodie membantu kamu menemukan restoran dan
                            pilihan makanan sesuai selera, lokasi, dan kebutuhan.
                        </p>
                        <div className="mt-4 flex gap-3">
                            <span className="flex h-10 w-10 items-center justify-center bg-green-900 text-xl">
                                ◷
                            </span>
                            <div className="text-[10px] leading-4 text-gray-300">
                                <p className="font-medium text-white">Opening Hours</p>
                                <p>Mon - Sat (08.00 - 18.00)</p>
                                <p>Sunday - Closed</p>
                            </div>
                        </div>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-bold">{column.title}</h3>
                            <ul className="mt-5 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="/"
                                            className="text-[11px] text-gray-300 transition hover:text-green-500"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-sm font-bold">Install App</h3>
                        <p className="mt-5 text-[11px] leading-5 text-gray-300">
                            Akses SmartFoodie dengan mudah dari perangkatmu.
                        </p>
                        <p className="mt-4 text-[10px] text-gray-400">
                            SmartFoodie Web App
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#4b4b4b]">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-[10px] text-white/90 sm:flex-row sm:text-left">
                    <p>Copyright © {new Date().getFullYear()} SmartFoodie. All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <a href="/">Privacy Policy</a>
                        <a href="/">Terms of Use</a>
                        <a href="/">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function SignIn() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />
            <PageBanner />

            <main className="flex min-h-[530px] items-center justify-center px-5 py-16">
                <SignInForm />
            </main>

            <Footer />
        </div>
    );
}
