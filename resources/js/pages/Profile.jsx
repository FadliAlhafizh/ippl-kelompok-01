
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
                    <a href="/">Home</a>
                    <a href="/#restoran">Menu</a>
                    <a href="/#artikel">Blog</a>
                    <a href="/#kategori">Pages</a>
                    <a href="/#tentang">About</a>
                    <a href="/#restoran">Shop</a>
                    <a href="#kontak">Contact</a>
                </div>

                <div className="flex items-center gap-4 text-lg">
                    <a href="/#restoran" aria-label="Cari">⌕</a>
                    <a href="/profile" aria-label="Profil">♙</a>
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
                Profile
            </h1>
        </section>
    );
}

function ProfileForm() {
    const [name, setName] = useState("Bob Smith");
    const [birthDate, setBirthDate] = useState("2022-12-12");
    const [phone, setPhone] = useState("+1 16538552163");
    const [email, setEmail] = useState("Bob.smith22@gmail.com");
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        setMessage(
            "Perubahan profil tervalidasi. Penyimpanan ke database belum dihubungkan."
        );
    }

    return (
        <section className="w-full max-w-[268px] bg-white px-7 py-5 shadow-[0_0_35px_rgba(210,165,90,0.10)] sm:max-w-[268px]">
            <h2 className="mb-4 text-center text-xs font-bold text-[#292929]">
                Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                    <label
                        htmlFor="profile-name"
                        className="mb-1.5 ml-3 block text-[8px] font-semibold text-gray-600"
                    >
                        Nama
                    </label>
                    <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                        className="h-[34px] w-full rounded border border-gray-200 px-3 text-[9px] text-gray-600 outline-none focus:border-green-800"
                    />
                </div>

                <div>
                    <label
                        htmlFor="profile-birthdate"
                        className="mb-1.5 ml-3 block text-[8px] font-semibold text-gray-600"
                    >
                        Tanggal Lahir
                    </label>
                    <input
                        id="profile-birthdate"
                        type="date"
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
                        className="h-[34px] w-full rounded border border-gray-200 px-3 text-[9px] text-gray-600 outline-none focus:border-green-800"
                    />
                </div>

                <div>
                    <label
                        htmlFor="profile-phone"
                        className="mb-1.5 ml-3 block text-[8px] font-semibold text-gray-600"
                    >
                        No. HP
                    </label>
                    <div className="flex h-[34px] items-center gap-2 rounded border border-gray-200 px-3 focus-within:border-green-800">
                        <span aria-hidden="true" className="text-sm">🇺🇸</span>
                        <span aria-hidden="true" className="text-[10px] text-gray-500">⌄</span>
                        <input
                            id="profile-phone"
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            autoComplete="tel"
                            className="min-w-0 flex-1 bg-transparent text-[9px] text-gray-600 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="profile-email"
                        className="mb-1.5 ml-3 block text-[8px] font-semibold text-gray-600"
                    >
                        Email Address
                    </label>
                    <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                        className="h-[34px] w-full rounded border border-gray-200 px-3 text-[9px] text-gray-600 outline-none focus:border-green-800"
                    />
                </div>

                <div className="flex flex-col items-center pt-3">
                    <button
                        type="submit"
                        className="rounded border border-gray-700 px-4 py-2 text-[10px] font-semibold text-gray-900 transition hover:border-green-800 hover:bg-green-900 hover:text-white"
                    >
                        Update Savings
                    </button>

                    {message && (
                        <p role="status" className="mt-3 text-center text-[9px] leading-4 text-green-800">
                            {message}
                        </p>
                    )}
                </div>
            </form>
        </section>
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
            links: ["FAQ", "Term & Condition", "Reporting", "Documentation", "Support Policy", "Privacy"],
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
                        Don’t wait, make a smart and logical choice here. It’s pretty easy.
                    </p>
                    <div className="mt-5 h-px bg-green-900/70" />
                </div>

                <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-bold">About Us.</h3>
                        <p className="mt-5 text-[11px] leading-5 text-gray-300">
                            SmartFoodie membantu pengguna menemukan restoran
                            dan makanan sesuai selera serta kebutuhan.
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
                        <div className="mt-12 space-y-3 text-[11px] text-gray-300">
                            <p>SmartFoodie Web App</p>
                            <p>Secured Payment Gateways</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#4b4b4b]">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-[10px] text-white/90 sm:flex-row sm:text-left">
                    <p>Copyright © 2022 by SmartFoodie. All Rights Reserved.</p>
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

export default function Profile() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />
            <PageBanner />

            <main className="flex min-h-[530px] items-center justify-center px-5 py-16">
                <ProfileForm />
            </main>

            <Footer />
        </div>
    );
}
