import React, { useEffect, useState } from "react";

// Batas akurasi lokasi (meter). Di atas ini dianggap "tidak akurat".
const BATAS_AKURASI = 1000;

export default function RestoranSekitar() {
    // status: "mencari" | "berhasil" | "manual"
    const [status, setStatus] = useState("mencari");
    const [pesan, setPesan] = useState("");
    const [daftar, setDaftar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lokasiManual, setLokasiManual] = useState("");

    // Mengambil daftar restoran dari backend (RestoranController@tampilkanDaftarSekitar)
    const ambilRestoran = async (params) => {
        setLoading(true);
        try {
            const response = await fetch(
                `/restoran-sekitar?${new URLSearchParams(params)}`,
                { headers: { Accept: "application/json" } }
            );
            if (!response.ok) throw new Error("Gagal mengambil data");
            const data = await response.json();
            setDaftar(Array.isArray(data) ? data : []);
        } catch (error) {
            setDaftar([]);
            setPesan("Terjadi kesalahan saat mengambil data restoran.");
        } finally {
            setLoading(false);
        }
    };

    const gunakanManual = (teks) => {
        setPesan(teks);
        setStatus("manual");
    };

    // Skenario utama (langkah 2-4): minta izin lokasi, deteksi koordinat, tampilkan restoran
    const deteksiLokasi = () => {
        setStatus("mencari");
        setPesan("");

        if (!navigator.geolocation) {
            gunakanManual("Lokasi tidak akurat, gunakan lokasi manual");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (posisi) => {
                if (posisi.coords.accuracy > BATAS_AKURASI) {
                    gunakanManual("Lokasi tidak akurat, gunakan lokasi manual");
                    return;
                }
                setStatus("berhasil");
                ambilRestoran({
                    latitude: posisi.coords.latitude,
                    longitude: posisi.coords.longitude,
                });
            },
            // izin ditolak / gagal -> skenario eksepsional
            () => gunakanManual("Lokasi tidak akurat, gunakan lokasi manual"),
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Saat dashboard dibuka, langsung minta lokasi
    useEffect(() => {
        deteksiLokasi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Skenario eksepsional (langkah 2-3): pengguna memasukkan lokasi manual
    const cariManual = (event) => {
        event.preventDefault();
        if (!lokasiManual.trim()) return;
        ambilRestoran({ manual_location: lokasiManual.trim() });
    };

    return (
        <section id="restoran-sekitar" className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                        Dekat denganmu
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                        Restoran Sekitar
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        Daftar restoran terdekat berdasarkan lokasimu saat ini.
                    </p>
                </div>

                {status === "mencari" && (
                    <p className="text-center text-sm text-gray-500">
                        Mengizinkan akses lokasi untuk menampilkan restoran terdekat...
                    </p>
                )}

                {status === "manual" && (
                    <form
                        onSubmit={cariManual}
                        className="mx-auto mb-8 max-w-xl rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
                            {pesan}
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={lokasiManual}
                                onChange={(event) => setLokasiManual(event.target.value)}
                                placeholder="Masukkan lokasi, misalnya: Bandung"
                                className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-700"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                            >
                                Cari
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={deteksiLokasi}
                            className="mt-3 text-xs font-medium text-green-800 hover:underline"
                        >
                            ⌖ Coba deteksi lokasi lagi
                        </button>
                    </form>
                )}

                {loading && (
                    <p className="text-center text-sm text-gray-500">Memuat restoran...</p>
                )}

                {!loading && status !== "mencari" && daftar.length === 0 && (
                    <div className="rounded-xl bg-gray-50 px-5 py-12 text-center">
                        <p className="font-bold text-gray-800">Belum ada restoran yang ditemukan</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Coba gunakan lokasi manual atau kata kunci lain.
                        </p>
                    </div>
                )}

                {!loading && daftar.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {daftar.map((restoran) => (
                            <article
                                key={restoran.restoranid}
                                className="overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-gray-800">{restoran.nama}</h3>
                                    <span className="shrink-0 text-sm font-semibold text-amber-500">
                                        ★ {Number(restoran.rating).toFixed(1)}
                                    </span>
                                </div>
                                <span className="mt-2 inline-block rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                                    {restoran.kategori}
                                </span>
                                <p className="mt-3 text-sm leading-5 text-gray-500">
                                    ⌖ {restoran.alamat}
                                </p>
                                {restoran.distance !== undefined && restoran.distance !== null && (
                                    <p className="mt-3 border-t border-gray-100 pt-3 text-xs font-semibold text-green-800">
                                        {Number(restoran.distance).toFixed(1)} km dari lokasimu
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
