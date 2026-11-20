# SmartFoodie

Aplikasi web pencari & rekomendasi kuliner (Laravel 12 + Inertia + React + Tailwind).
Implementasi dari dokumen **DPPL-001/2025 – Kelompok 03**.

## Menjalankan

```bash
composer install
npm install
cp .env.example .env && php artisan key:generate   # lewati bila .env sudah ada
php artisan migrate --seed        # tambah tabel baru + data contoh (aman dijalankan ulang)
npm run dev                       # terminal 1
php artisan serve                 # terminal 2  ->  http://127.0.0.1:8000
php artisan test                  # 18 test, satu (atau lebih) per use case
```

Akun contoh (password: `password`):

| Peran | Email |
|---|---|
| Pencari kuliner | `test@example.com` (sudah punya preferensi: Pedas, Gurih; pantangan Seafood) |
| Admin | `admin@smartfoodie.test` |

> Bila ingin mengulang dari nol: `php artisan migrate:fresh --seed`.

## Matriks kerunutan FR → Use Case → Implementasi

| FR | Use Case | Route | Controller | Halaman | Test |
|---|---|---|---|---|---|
| FR-01 | #1 Membuat Akun & Login | `/signup`, `/signin`, `/logout` | `AuthController` | `SignUp`, `SignIn` | `test_uc1_*` |
| FR-02 | #2 Melihat Restoran Sekitar | `GET /` (`latitude`, `longitude`, `manual_location`) | `RestoranController@index` | `Dashboard` | `test_uc2_*` |
| FR-03 | #3 Mencari Restoran/Menu | `GET /?q=` | `RestoranController@index` | `Dashboard` | `test_uc3_*` |
| FR-04 | #4 Memfilter Restoran | `GET /?kategori&harga_max&rating_min&jarak_max&sort` | `RestoranController@index` | `Dashboard` | `test_uc4_*` |
| FR-05 | #5 Melihat Detail Restoran | `GET /restoran/{id}` | `RestoranController@detail` | `Restoran/Detail` | `test_uc5_*` |
| FR-06 | #6 Mengatur Preferensi | `GET/PUT /preferensi` | `ProfileController@*Preferensi` | `Preferensi` | `test_uc6_*` |
| FR-07 | #7 Rating & Ulasan | `POST /restoran/{id}/rating` | `RatingController@store` | `Restoran/Detail` | `test_uc7_*` |
| FR-08 | #8 Restoran Favorit | `POST /favorit/{id}`, `GET /favorit` | `FavoritController` | `Favorit`, kartu restoran | `test_uc8_*` |
| FR-09 | #9 Rekomendasi | (di `GET /`) | `RekomendasiService` | `Dashboard` | `test_uc9_*` |
| FR-10 | #10 Mengatur Profil | `GET/PUT /profile` | `ProfileController@show/update` | `Profile` | `test_uc10_*` |
| FR-11 | #11 Mengelola Data Restoran | `/admin/restoran…`, `/admin/menu/{id}` | `Admin\RestoranController` | `Admin/Restoran/Index`, `Form` | `test_uc11_*` |

Tabel database: `users` (+`no_telepon`, `tanggal_lahir`, `lokasi`, `role`), `restoran`
(+`latitude`, `longitude`, `city`, `deskripsi`, `gambar`), `menu`, `rating`, `favorit`, `preferensi`.

## Keputusan implementasi (perlu diketahui saat presentasi)

- **Autentikasi memakai session (web/Inertia)**, bukan token Sanctum, sehingga tidak ada endpoint API. Semua halaman selain Sign In/Sign Up wajib login (sesuai pre-kondisi di DPPL).
- **Jarak dihitung di PHP (Haversine)**, bukan di SQL, agar jalan di SQLite tanpa fungsi trigonometri dan bebas SQL injection. Untuk data ribuan restoran, pindahkan ke query spasial.
- **Rekomendasi** = rating (maks 50) + kecocokan preferensi (maks 30) + kedekatan (maks 20). Menu yang mengandung pantangan diabaikan; restoran tanpa menu aman tidak ditampilkan.
- **Rating restoran** dihitung ulang (rata-rata) setiap ada rating baru; satu pengguna satu rating per restoran (mengirim ulang = mengubah).
- Pre-kondisi UC7 "pernah mengunjungi restoran" **belum bisa diverifikasi** sistem (tidak ada data kunjungan/pesanan).
- Tombol login Google/Apple pada wireframe masih placeholder.

## Perbaikan yang disarankan pada dokumen DPPL

1. UC11 (hal. 51): deskripsi, pre/post-kondisi masih salinan UC Login → ganti dengan *Admin mengelola data restoran; pre: admin login; post: data restoran tersimpan*.
2. Gambar03 (Profile): tombol "Update Savings" → "Update Profile".
3. FR-10 menyebut profil memuat preferensi, pantangan, lokasi; UI profil hanya nama, tanggal lahir, no. HP, email → tambahkan field lokasi dan tautan ke halaman preferensi (sudah dilakukan di aplikasi).
4. ID layar & nomor "Antarmuka" bentrok (ID 003 dipakai UC2/3/4/6/9; Antarmuka 004–009 tidak berurutan).
5. Tabel kelas 3.3 hanya berisi `User` dan `Restaurant`, padahal diagram kelas 3.2 punya 10+ kelas → lengkapi (Menu, Rating, Favorit, Preferensi, Rekomendasi, Admin).
6. Sequence UC1 menggabungkan Daftar dan Login; UC9 tidak menampilkan database. Samakan dengan alur aplikasi di atas.
