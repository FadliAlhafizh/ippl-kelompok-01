<?php

namespace Database\Seeders;

use App\Models\Favorit;
use App\Models\Menu;
use App\Models\Preferensi;
use App\Models\Rating;
use App\Models\Restoran;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Aman dijalankan ulang: data contoh hanya dibuat sekali.
        if (Restoran::exists()) {
            return;
        }

        // Akun demo (password: "password")
        $akun = fn (array $a) => User::where('email', $a['email'])->first() ?? User::factory()->create($a);
        $akun(['name' => 'Admin SmartFoodie', 'email' => 'admin@smartfoodie.test', 'role' => 'admin']);
        $user = $akun(['name' => 'Test User', 'email' => 'test@example.com']);
        $budi = $akun(['name' => 'Budi', 'email' => 'budi@example.com']);

        Preferensi::updateOrCreate(['user_id' => $user->id], [
            'jenis_makanan' => ['Pedas', 'Gurih'],
            'pantangan' => ['Seafood'],
        ]);

        $img = fn ($id) => "https://images.unsplash.com/{$id}?auto=format&fit=crop&w=800&q=80";

        $data = [
            ['Warung Nasi Padang Sederhana', 'Nusantara', 'Jl. Telekomunikasi No. 1, Dayeuhkolot', 'Bandung', -6.9733, 107.6303, 'photo-1565557623262-b51c2513a641', 'Masakan Padang dengan lauk beragam.', [
                ['Rendang Sapi', 28000, 'Nusantara', ['Gurih', 'Pedas', 'Tinggi Protein', 'Daging Sapi'], 'Rendang empuk berbumbu rempah.'],
                ['Gulai Ayam', 24000, 'Nusantara', ['Gurih', 'Tinggi Protein'], 'Ayam kuah gulai kental.'],
                ['Sayur Daun Singkong', 9000, 'Nusantara', ['Vegetarian', 'Rendah Kalori'], 'Daun singkong santan.'],
            ]],
            ['Kopi Senja & Eatery', 'Cafe', 'Jl. Buah Batu No. 55', 'Bandung', -6.9470, 107.6360, 'photo-1554118811-1e0d58224f24', 'Tempat santai dengan kopi dan aneka hidangan.', [
                ['Kopi Susu Gula Aren', 22000, 'Cafe', ['Manis', 'Susu'], 'Espresso, susu, gula aren.'],
                ['Roti Bakar Cokelat', 20000, 'Cafe', ['Manis', 'Gluten', 'Susu'], 'Roti bakar cokelat keju.'],
                ['Nasi Goreng Kampung', 32000, 'Cafe', ['Gurih', 'Pedas', 'Telur'], 'Nasi goreng pedas dengan telur.'],
            ]],
            ['Sushi Garden', 'Jepang', 'Jl. Dago No. 120', 'Bandung', -6.8850, 107.6130, 'photo-1579871494447-9811cf80d66c', 'Aneka sushi dan hidangan Jepang.', [
                ['Salmon Sushi Set', 65000, 'Jepang', ['Asin', 'Seafood', 'Tinggi Protein'], 'Delapan potong sushi salmon.'],
                ['Chicken Katsu Don', 42000, 'Jepang', ['Gurih', 'Tinggi Protein', 'Telur'], 'Katsu ayam di atas nasi.'],
                ['Edamame', 18000, 'Jepang', ['Asin', 'Vegetarian', 'Rendah Kalori'], 'Kedelai rebus garam laut.'],
            ]],
            ['Dapur Ayam Bakar', 'Nusantara', 'Jl. Moh. Toha No. 80', 'Bandung', -6.9440, 107.6230, 'photo-1532550907401-a500c9a57435', 'Ayam bakar bumbu rempah khas Indonesia.', [
                ['Ayam Bakar Madu', 22000, 'Nusantara', ['Manis', 'Gurih', 'Tinggi Protein'], 'Ayam bakar olesan madu.'],
                ['Ayam Bakar Pedas', 23000, 'Nusantara', ['Pedas', 'Gurih', 'Tinggi Protein'], 'Ayam bakar sambal level 5.'],
                ['Lalapan Sayur', 8000, 'Nusantara', ['Vegetarian', 'Rendah Kalori'], 'Sayuran segar dan sambal.'],
            ]],
            ['Green Bowl Kitchen', 'Sehat', 'Jl. Riau No. 17', 'Bandung', -6.9090, 107.6200, 'photo-1512621776951-a57141f2eefd', 'Salad, sayuran, dan makanan sehat.', [
                ['Garden Salad Bowl', 38000, 'Sehat', ['Vegetarian', 'Rendah Kalori', 'Asin'], 'Salad sayur dengan dressing lemon.'],
                ['Grilled Chicken Bowl', 45000, 'Sehat', ['Tinggi Protein', 'Rendah Kalori', 'Gurih'], 'Dada ayam panggang dan quinoa.'],
                ['Smoothie Mangga', 25000, 'Sehat', ['Manis', 'Vegetarian'], 'Mangga, yoghurt nabati.'],
            ]],
            ['Grill House', 'Western', 'Jl. Setiabudi No. 200', 'Bandung', -6.8620, 107.5930, 'photo-1546833999-b9f581a1996d', 'Steak dan hidangan panggang.', [
                ['Sirloin Steak', 85000, 'Western', ['Gurih', 'Tinggi Protein', 'Daging Sapi'], 'Sirloin 200 gram.'],
                ['Chicken Wings Pedas', 38000, 'Western', ['Pedas', 'Gurih', 'Tinggi Protein'], 'Sayap ayam saus pedas.'],
                ['Caesar Salad', 35000, 'Western', ['Asin', 'Telur', 'Gluten'], 'Romaine, crouton, parmesan.'],
            ]],
            ['Seafood Pak Haji', 'Seafood', 'Jl. Cihampelas No. 33', 'Bandung', -6.8930, 107.6040, 'photo-1559339352-11d035aa65de', 'Seafood bakar dan saus padang.', [
                ['Udang Saus Padang', 52000, 'Seafood', ['Pedas', 'Gurih', 'Seafood', 'Tinggi Protein'], 'Udang saus padang pedas.'],
                ['Kerang Rebus', 30000, 'Seafood', ['Asin', 'Seafood'], 'Kerang rebus bumbu jahe.'],
            ]],
            ['Warung Vegan Sari', 'Sehat', 'Jl. Gegerkalong No. 9', 'Bandung', -6.8760, 107.5970, 'photo-1540420773420-3366772f4999', 'Masakan nabati rasa rumahan.', [
                ['Gado-gado Vegan', 20000, 'Sehat', ['Vegetarian', 'Gurih', 'Rendah Kalori', 'Kacang'], 'Sayur rebus saus kacang.'],
                ['Tempe Mendoan', 10000, 'Sehat', ['Vegetarian', 'Gurih'], 'Tempe goreng tepung.'],
                ['Es Cincau', 8000, 'Sehat', ['Manis', 'Vegetarian'], 'Cincau hijau gula merah.'],
            ]],
        ];

        foreach ($data as [$nama, $kategori, $alamat, $city, $lat, $lng, $foto, $desk, $menus]) {
            $r = Restoran::create([
                'nama' => $nama, 'kategori' => $kategori, 'alamat' => $alamat, 'city' => $city,
                'latitude' => $lat, 'longitude' => $lng, 'deskripsi' => $desk,
                'gambar' => $img($foto), 'rating' => 0,
            ]);
            foreach ($menus as [$mn, $harga, $mk, $tags, $md]) {
                Menu::create(['restoranid' => $r->restoranid, 'nama_menu' => $mn, 'harga' => $harga,
                    'kategori' => $mk, 'tags' => $tags, 'deskripsi' => $md]);
            }
        }

        // Ulasan contoh
        $contoh = [
            [1, $user, 5, 'Rendangnya juara, porsi pas.'],
            [1, $budi, 4, 'Enak, antreannya agak panjang.'],
            [2, $budi, 4, 'Tempat nyaman buat mengerjakan tugas.'],
            [3, $user, 5, 'Salmon segar.'],
            [4, $budi, 5, 'Ayam bakarnya wangi dan murah.'],
            [5, $user, 4, 'Porsi sehat dan mengenyangkan.'],
            [6, $budi, 3, 'Steak lumayan, agak mahal.'],
            [7, $budi, 4, 'Udang saus padangnya mantap.'],
            [8, $user, 5, 'Gado-gado terbaik.'],
        ];
        foreach ($contoh as [$rid, $u, $nilai, $komentar]) {
            Rating::create(['user_id' => $u->id, 'restoranid' => $rid, 'nilai' => $nilai, 'komentar' => $komentar]);
        }
        Restoran::all()->each->hitungUlangRating();

        Favorit::create(['user_id' => $user->id, 'restoranid' => 1]);
    }
}
