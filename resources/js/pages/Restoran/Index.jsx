import { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';

const BATAS_AKURASI = 1000;

export default function Index({ restoranSekitar, restorans }) {

    const daftar = restoranSekitar ?? restorans ?? [];

    // status: 'mencari' | 'berhasil' | 'manual'
    const [status, setStatus] = useState('mencari');
    const [pesan, setPesan] = useState('');
    const [lokasiManual, setLokasiManual] = useState('');

    useEffect(() => {
        if (!navigator.geolocation) {
            gunakanManual('Lokasi tidak akurat, gunakan lokasi manual');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (posisi) => {
                if (posisi.coords.accuracy > BATAS_AKURASI) {
                    gunakanManual('Lokasi tidak akurat, gunakan lokasi manual');
                    return;
                }
                setStatus('berhasil');
                router.get(
                    '/restoran-sekitar',
                    {
                        latitude: posisi.coords.latitude,
                        longitude: posisi.coords.longitude,
                    },
                    { preserveState: true, replace: true }
                );
            },
            () => gunakanManual('Lokasi tidak akurat, gunakan lokasi manual'),
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    function gunakanManual(teks) {
        setPesan(teks);
        setStatus('manual');
    }
    function cariManual(e) {
        e.preventDefault();
        if (!lokasiManual.trim()) return;
        router.get(
            '/restoran-sekitar',
            { manual_location: lokasiManual.trim() },
            { preserveState: true, replace: true }
        );
    }

    return (
        <div style={s.halaman}>
            <h1 style={s.judul}>Restoran Sekitar</h1>

            {status === 'mencari' && (
                <p style={s.info}>Mengizinkan akses lokasi untuk menampilkan restoran terdekat...</p>
            )}

            {status === 'manual' && (
                <form onSubmit={cariManual} style={s.form}>
                    <p style={s.peringatan}>{pesan}</p>
                    <div style={s.baris}>
                        <input
                            type="text"
                            value={lokasiManual}
                            onChange={(e) => setLokasiManual(e.target.value)}
                            placeholder="Masukkan lokasi, misalnya: Bandung"
                            style={s.input}
                        />
                        <button type="submit" style={s.tombol}>Cari</button>
                    </div>
                </form>
            )}

            {daftar.length === 0 ? (
                <p style={s.info}>Belum ada restoran yang ditemukan.</p>
            ) : (
                <ul style={s.daftar}>
                    {daftar.map((r) => (
                        <li key={r.restoranid} style={s.kartu}>
                            <div style={s.barisAtas}>
                                <Link href={`/restoran/${r.restoranid}`} style={s.nama}>
                                    {r.nama}
                                </Link>
                                <span style={s.rating}>★ {Number(r.rating).toFixed(1)}</span>
                            </div>
                            <p style={s.detail}>{r.kategori}</p>
                            <p style={s.detail}>{r.alamat}</p>
                            {r.distance !== undefined && r.distance !== null && (
                                <p style={s.jarak}>{Number(r.distance).toFixed(1)} km dari Anda</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const s = {
    halaman: { maxWidth: 720, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' },
    judul: { fontSize: 24, marginBottom: 16 },
    info: { color: '#555' },
    form: { marginBottom: 16 },
    peringatan: { color: '#b45309', background: '#fef3c7', padding: '8px 12px', borderRadius: 6 },
    baris: { display: 'flex', gap: 8 },
    input: { flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6 },
    tombol: { padding: '8px 16px', background: '#ea580c', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer' },
    daftar: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 },
    kartu: { border: '1px solid #e5e5e5', borderRadius: 8, padding: 16 },
    barisAtas: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    nama: { fontWeight: 600, fontSize: 18, color: '#111', textDecoration: 'none' },
    rating: { color: '#ca8a04', fontWeight: 600 },
    detail: { margin: '4px 0', color: '#555' },
    jarak: { margin: '4px 0 0', color: '#ea580c', fontSize: 14 },
};
