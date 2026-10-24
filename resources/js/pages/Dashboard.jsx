
import React, { useMemo, useState } from "react";

const restaurants = [
    {
        id: 1,
        name: "Warung Nasi Padang Sederhana",
        category: "Nusantara",
        rating: 4.8,
        reviews: 128,
        distance: 0.8,
        price: 25000,
        location: "Pusat Kota",
        description: "Masakan Padang dengan pilihan lauk yang beragam.",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85",
    },
    {
        id: 2,
        name: "Kopi Senja & Eatery",
        category: "Cafe",
        rating: 4.7,
        reviews: 96,
        distance: 1.2,
        price: 35000,
        location: "Kawasan Kota",
        description: "Tempat santai dengan kopi dan aneka hidangan.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85",
    },
    {
        id: 3,
        name: "Sushi Garden",
        category: "Jepang",
        rating: 4.9,
        reviews: 156,
        distance: 1.5,
        price: 45000,
        location: "Pusat Kota",
        description: "Aneka sushi dan hidangan Jepang yang lezat.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=85",
    },
    {
        id: 4,
        name: "Dapur Ayam Bakar",
        category: "Nusantara",
        rating: 4.6,
        reviews: 84,
        distance: 2.1,
        price: 22000,
        location: "Area Kuliner",
        description: "Ayam bakar dengan bumbu rempah khas Indonesia.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=85",
    },
    {
        id: 5,
        name: "Green Bowl Kitchen",
        category: "Sehat",
        rating: 4.8,
        reviews: 102,
        distance: 1.7,
        price: 38000,
        location: "Pusat Kota",
        description: "Pilihan salad, sayuran, dan makanan sehat.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
    },
    {
        id: 6,
        name: "Grill House",
        category: "Western",
        rating: 4.7,
        reviews: 115,
        distance: 2.5,
        price: 55000,
        location: "Area Kuliner",
        description: "Steak dan hidangan panggang dengan cita rasa istimewa.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85",
    },
];

const articles = [
    {
        title: "Chocolate Truffle Cake With Honey Flavor",
        date: "02 Jan 2026",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85",
        description: "Nikmati hidangan penutup dengan cita rasa manis yang cocok menemani waktu santai.",
    },
    {
        title: "Fresh Food for a Better Day",
        date: "05 Jan 2026",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=85",
        description: "Pilihan makanan segar untuk membantu memenuhi kebutuhan nutrisi harian.",
    },
    {
        title: "Discover the Taste of Good Food",
        date: "10 Jan 2026",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85",
        description: "Temukan berbagai inspirasi hidangan menarik dari beragam pilihan kuliner.",
    },
];

const categories = [
    {
        name: "Manis",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=500&q=85",
    },
    {
        name: "Asin",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85",
    },
    {
        name: "Gurih",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=85",
    },
    {
        name: "Pedas",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=85",
    },
];

const rupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);

function SectionTitle({ eyebrow, title, description }) {
    return (
        <div className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                {description}
            </p>
        </div>
    );
}

function RestaurantCard({ restaurant, isFavorite, onFavorite }) {
    return (
        <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() => onFavorite(restaurant.id)}
                    aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
                    aria-pressed={isFavorite}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-xl shadow-sm transition hover:scale-110"
                >
                    <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
                        {isFavorite ? "♥" : "♡"}
                    </span>
                </button>

                <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-3 py-1 text-xs font-medium text-green-800">
                    {restaurant.category}
                </span>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-800 transition group-hover:text-green-700">
                        {restaurant.name}
                    </h3>
                    <span className="shrink-0 text-sm font-semibold text-amber-500">
                        ★ {restaurant.rating}
                    </span>
                </div>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {restaurant.description}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <span>⌖ {restaurant.location}</span>
                    <span>{restaurant.reviews} ulasan</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Mulai dari</p>
                        <p className="font-bold text-green-800">
                            {rupiah(restaurant.price)}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            window.alert(
                                `Detail ${restaurant.name} akan dihubungkan dengan halaman detail restoran.`
                            )
                        }
                        className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-800 transition hover:bg-green-700 hover:text-white"
                    >
                        Lihat detail
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [sortBy, setSortBy] = useState("newest");
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState("");
    const [locationLoading, setLocationLoading] = useState(false);

    const pageSize = 6;

    const filteredRestaurants = useMemo(() => {
        let result = restaurants.filter((restaurant) => {
            const keyword = search.trim().toLowerCase();

            const matchesSearch =
                !keyword ||
                restaurant.name.toLowerCase().includes(keyword) ||
                restaurant.category.toLowerCase().includes(keyword) ||
                restaurant.description.toLowerCase().includes(keyword);

            const matchesCategory =
                activeCategory === "Semua" ||
                restaurant.category === activeCategory;

            return matchesSearch && matchesCategory;
        });

        if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "distance") {
            result.sort((a, b) => a.distance - b.distance);
        }

        return result;
    }, [search, activeCategory, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredRestaurants.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleRestaurants = filteredRestaurants.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const toggleFavorite = (id) => {
        setFavorites((previous) =>
            previous.includes(id)
                ? previous.filter((favoriteId) => favoriteId !== id)
                : [...previous, id]
        );
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            setLocation("Browser tidak mendukung deteksi lokasi.");
            return;
        }

        setLocationLoading(true);
        setLocation("Sedang mendeteksi lokasi...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(
                    `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                );
                setLocationLoading(false);
            },
            () => {
                setLocation("Lokasi tidak tersedia. Periksa izin browser.");
                setLocationLoading(false);
            },
            { enableHighAccuracy: false, timeout: 10000 }
        );
    };

    const updateSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const updateCategory = (value) => {
        setActiveCategory(value);
        setPage(1);
    };

    return (
        <div className="min-h-screen overflow-hidden bg-white text-gray-800">
            {/* NAVBAR */}
            <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                    <a href="#beranda" className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold tracking-tight">
                            <span className="text-green-800">Smart</span>
                            <span className="text-gray-900">Foodie</span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-7 text-sm md:flex">
                        <a href="#beranda" className="font-semibold text-green-800">
                            Home
                        </a>
                        <a href="#restoran" className="transition hover:text-green-700">
                            Menu
                        </a>
                        <a href="#artikel" className="transition hover:text-green-700">
                            Blog
                        </a>
                        <a href="#tentang" className="transition hover:text-green-700">
                            About
                        </a>
                        <a href="#kategori" className="transition hover:text-green-700">
                            Pages
                        </a>
                        <a href="#kontak" className="transition hover:text-green-700">
                            Contact
                        </a>
                    </nav>

                    <button
                        type="button"
                        onClick={detectLocation}
                        className="rounded-lg border border-green-100 px-3 py-2 text-sm font-medium text-green-800 transition hover:bg-green-50 sm:px-4"
                    >
                        ⌖ <span className="hidden sm:inline">Lokasi saya</span>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO */}
                <section
                    id="beranda"
                    className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:px-8"
                >
                    <div className="relative z-10">
                        <p className="mb-4 text-sm font-semibold italic text-green-700">
                            Healthy & Tasty Food
                        </p>

                        <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Enjoy Healthy Life
                            <br />
                            <span className="text-green-800">& Tasty Food.</span>
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                            Temukan restoran dan menu favorit yang sesuai dengan
                            selera, lokasi, dan kebutuhanmu bersama SmartFoodie.
                        </p>

                        <a
                            href="#restoran"
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-900"
                        >
                            Jelajahi restoran <span>→</span>
                        </a>

                        <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-500">
                            <span><strong className="text-green-800">6+</strong> pilihan restoran</span>
                            <span><strong className="text-green-800">4.8</strong> rating unggulan</span>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-green-100 blur-3xl" />
                        <div className="absolute -right-3 top-0 h-72 w-72 rounded-full bg-green-800 sm:h-96 sm:w-96" />

                        <img
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=90"
                            alt="Salad sehat dengan sayuran segar"
                            className="relative z-10 mx-auto h-72 w-full rounded-[45%_45%_45%_12%] object-cover shadow-xl sm:h-[410px]"
                        />

                        <div className="absolute -bottom-5 left-0 z-20 rounded-xl bg-white p-4 shadow-lg sm:-left-5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-2xl">
                                    ★
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">
                                        Pilihan kuliner
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Temukan favoritmu
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEARCH & RESTAURANTS */}
                <section id="restoran" className="bg-gray-50/80 py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    document.getElementById("daftar-restoran")?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}
                                className="flex flex-col gap-3 sm:flex-row"
                            >
                                <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4 focus-within:border-green-700">
                                    <span className="text-lg text-gray-400">⌕</span>
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) => updateSearch(event.target.value)}
                                        placeholder="Cari restoran atau makanan..."
                                        className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm outline-none focus:ring-0"
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => updateSearch("")}
                                            className="text-sm text-gray-400 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    disabled={locationLoading}
                                    className="rounded-lg border border-green-200 px-5 py-3 text-sm font-medium text-green-800 transition hover:bg-green-50 disabled:opacity-60"
                                >
                                    {locationLoading ? "Mendeteksi..." : "⌖ Cari lokasi"}
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                                >
                                    Cari sekarang
                                </button>
                            </form>

                            <div className="mt-3 text-xs text-gray-500">
                                {location
                                    ? `Lokasi: ${location}`
                                    : "Coba cari: nasi padang, cafe, sushi, atau makanan sehat"}
                            </div>
                        </div>

                        <div
                            id="daftar-restoran"
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
                        >
                            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-700">
                                        Explore culinary
                                    </p>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Our Restaurants
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {filteredRestaurants.length} restoran ditemukan
                                    </p>
                                </div>

                                <label className="flex items-center gap-2 text-sm text-gray-500">
                                    Urutkan:
                                    <select
                                        value={sortBy}
                                        onChange={(event) => setSortBy(event.target.value)}
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-700"
                                    >
                                        <option value="newest">Terbaru</option>
                                        <option value="rating">Rating tertinggi</option>
                                        <option value="price-low">Harga terendah</option>
                                        <option value="price-high">Harga tertinggi</option>
                                        <option value="distance">Terdekat</option>
                                    </select>
                                </label>
                            </div>

                            <div className="mb-7 flex flex-wrap gap-2">
                                {["Semua", "Nusantara", "Cafe", "Jepang", "Sehat", "Western"].map(
                                    (category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => updateCategory(category)}
                                            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                                                activeCategory === category
                                                    ? "bg-green-800 text-white"
                                                    : "border border-gray-200 bg-white text-gray-600 hover:border-green-700 hover:text-green-800"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    )
                                )}
                            </div>

                            {visibleRestaurants.length > 0 ? (
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {visibleRestaurants.map((restaurant) => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                            isFavorite={favorites.includes(restaurant.id)}
                                            onFavorite={toggleFavorite}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl bg-gray-50 px-5 py-14 text-center">
                                    <p className="text-3xl">⌕</p>
                                    <h3 className="mt-3 font-bold text-gray-800">
                                        Restoran tidak ditemukan
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Coba kata kunci atau kategori yang berbeda.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            updateSearch("");
                                            updateCategory("Semua");
                                        }}
                                        className="mt-4 text-sm font-semibold text-green-800 hover:underline"
                                    >
                                        Reset pencarian
                                    </button>
                                </div>
                            )}

                            {filteredRestaurants.length > pageSize && (
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setPage(currentPage - 1)}
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-green-800 hover:bg-green-50 disabled:opacity-30"
                                    >
                                        «
                                    </button>

                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                        (number) => (
                                            <button
                                                key={number}
                                                type="button"
                                                onClick={() => setPage(number)}
                                                className={`h-9 w-9 rounded-md text-sm ${
                                                    currentPage === number
                                                        ? "bg-green-800 text-white"
                                                        : "border border-gray-200 text-gray-600 hover:bg-green-50"
                                                }`}
                                            >
                                                {number}
                                            </button>
                                        )
                                    )}

                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setPage(currentPage + 1)}
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-green-800 hover:bg-green-50 disabled:opacity-30"
                                    >
                                        »
                                    </button>
                                </div>
                            )}
                        </div>

                        {favorites.length > 0 && (
                            <p className="mt-4 text-right text-sm text-gray-500">
                                ♥ {favorites.length} restoran tersimpan di favorit
                            </p>
                        )}
                    </div>
                </section>

                {/* FEATURED ARTICLES */}
                <section id="artikel" className="py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <SectionTitle
                            eyebrow="Inspirasi kuliner"
                            title="Restoran Terbaik"
                            description="Temukan inspirasi makanan, tempat makan menarik, dan pilihan kuliner untuk menemani harimu."
                        />

                        <div className="grid gap-6 md:grid-cols-3">
                            {articles.map((article) => (
                                <article
                                    key={article.title}
                                    className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        loading="lazy"
                                        className="h-56 w-full object-cover"
                                    />
                                    <div className="p-5">
                                        <p className="text-xs text-green-700">
                                            ▣ {article.date} <span className="mx-2">•</span> Kuliner
                                        </p>
                                        <h3 className="mt-3 font-bold leading-6 text-gray-800">
                                            {article.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {article.description}
                                        </p>
                                        <a
                                            href="#restoran"
                                            className="mt-4 inline-block text-sm font-semibold text-green-800 hover:underline"
                                        >
                                            Jelajahi kuliner →
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="tentang" className="bg-white py-16 sm:py-20">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85"
                                alt="Hidangan sehat"
                                loading="lazy"
                                className="mt-10 h-64 w-full rounded-xl object-cover sm:h-80"
                            />
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85"
                                    alt="Pizza"
                                    loading="lazy"
                                    className="h-40 w-full rounded-xl object-cover sm:h-52"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85"
                                    alt="Salad segar"
                                    loading="lazy"
                                    className="h-40 w-full rounded-xl object-cover sm:h-52"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold italic text-green-700">
                                About SmartFoodie
                            </p>
                            <h2 className="max-w-lg text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                Food is an important part of a balanced diet
                            </h2>
                            <p className="mt-5 text-sm leading-7 text-gray-500">
                                SmartFoodie membantu kamu menemukan restoran dan
                                makanan berdasarkan preferensi, lokasi, serta
                                informasi yang tersedia. Jelajahi pilihan kuliner
                                dengan lebih mudah dalam satu tempat.
                            </p>
                            <a
                                href="#restoran"
                                className="mt-6 inline-flex rounded-lg bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                            >
                                Jelajahi sekarang
                            </a>
                        </div>
                    </div>
                </section>

                {/* FOOD CATEGORY */}
                <section id="kategori" className="bg-gray-50/70 py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <SectionTitle
                            eyebrow="Temukan seleramu"
                            title="Food Category"
                            description="Jelajahi ragam rasa dan temukan pilihan makanan yang sesuai dengan seleramu."
                        />

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    onClick={() => {
                                        updateSearch("");
                                        updateCategory("Semua");
                                        document.getElementById("restoran")?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                    className="group text-center"
                                >
                                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                                        <img
                                            src={category.image}
                                            alt={`Kategori ${category.name}`}
                                            loading="lazy"
                                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
                                        />
                                    </div>
                                    <p className="mt-3 font-semibold text-gray-800 transition group-hover:text-green-800">
                                        {category.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY SMARTFOODIE */}
                <section className="py-16 sm:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85"
                                alt="Persiapan memasak"
                                loading="lazy"
                                className="h-64 w-full rounded-xl object-cover sm:h-80"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85"
                                alt="Makanan siap disajikan"
                                loading="lazy"
                                className="mt-12 h-64 w-full rounded-xl object-cover sm:h-80"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold italic text-green-700">
                                Why Choose Us
                            </p>
                            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                Why We Are the Best?
                            </h2>
                            <p className="mt-5 text-sm leading-7 text-gray-500">
                                Kami menghadirkan cara yang praktis untuk
                                mengeksplorasi restoran, membandingkan pilihan
                                kuliner, dan menemukan tempat makan sesuai
                                kebutuhanmu.
                            </p>

                            <div className="mt-7 grid grid-cols-2 gap-3">
                                {[
                                    ["⌕", "Pencarian mudah"],
                                    ["★", "Rating restoran"],
                                    ["♡", "Daftar favorit"],
                                    ["⌖", "Berbasis lokasi"],
                                ].map(([icon, label]) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 shadow-sm"
                                    >
                                        <span className="text-2xl text-green-800">
                                            {icon}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer id="kontak" className="bg-[#e8eee5]">
                <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
                    <div>
                        <a href="#beranda" className="text-xl font-extrabold">
                            <span className="text-green-800">Smart</span>
                            <span className="text-gray-900">Foodie</span>
                        </a>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            Temukan restoran, jelajahi menu, dan pilih kuliner
                            favoritmu dengan lebih mudah.
                        </p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                window.alert(
                                    "Fitur newsletter akan dihubungkan dengan backend."
                                );
                            }}
                            className="mt-4 flex overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Email kamu"
                                aria-label="Email newsletter"
                                className="min-w-0 flex-1 px-3 py-2 text-sm outline-none"
                            />
                            <button
                                type="submit"
                                aria-label="Berlangganan newsletter"
                                className="bg-green-800 px-4 text-white hover:bg-green-900"
                            >
                                →
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">Contact Us</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-600">
                            <li>⌖ Indonesia</li>
                            <li>✉ Email: smartfoodie@example.com</li>
                            <li>◷ Setiap hari</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">Quick Links</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-600">
                            <li><a href="#tentang" className="hover:text-green-800">Tentang kami</a></li>
                            <li><a href="#restoran" className="hover:text-green-800">Restoran</a></li>
                            <li><a href="#kategori" className="hover:text-green-800">Kategori makanan</a></li>
                            <li><a href="#artikel" className="hover:text-green-800">Artikel kuliner</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">Galeri Kuliner</h3>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {[
                                restaurants[0].image,
                                restaurants[2].image,
                                articles[0].image,
                                categories[0].image,
                                restaurants[4].image,
                                restaurants[5].image,
                            ].map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Galeri kuliner SmartFoodie"
                                    loading="lazy"
                                    className="h-16 w-full rounded-md object-cover"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-green-950 px-5 py-4 text-center text-xs text-white/80">
                    © {new Date().getFullYear()} SmartFoodie. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
