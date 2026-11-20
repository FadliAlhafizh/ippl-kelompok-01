<?php

namespace Tests\Feature;

use App\Models\Favorit;
use App\Models\Preferensi;
use App\Models\Rating;
use App\Models\Restoran;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SmartFoodieTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
        $this->seed(DatabaseSeeder::class);
    }

    private function user(): User
    {
        return User::where('email', 'test@example.com')->first();
    }

    // ---------- UC1 ----------
    public function test_uc1_signup_menyimpan_akun_dan_mengarah_ke_login(): void
    {
        $this->post('/signup', ['name' => 'Ani', 'email' => 'ani@example.com', 'password' => 'rahasia123'])
            ->assertRedirect('/signin');
        $this->assertDatabaseHas('users', ['email' => 'ani@example.com', 'role' => 'user']);
        $this->assertNotSame('rahasia123', User::where('email', 'ani@example.com')->first()->password);
    }

    public function test_uc1_signup_email_duplikat_menampilkan_pesan(): void
    {
        $this->post('/signup', ['name' => 'X', 'email' => 'test@example.com', 'password' => 'rahasia123'])
            ->assertSessionHasErrors(['email' => 'Email sudah terdaftar, silahkan login']);
    }

    public function test_uc1_login_berhasil_dan_gagal(): void
    {
        $this->post('/signin', ['email' => 'test@example.com', 'password' => 'salah'])
            ->assertSessionHasErrors(['email' => 'Email atau password salah']);
        $this->assertGuest();

        $this->post('/signin', ['email' => 'test@example.com', 'password' => 'password'])->assertRedirect('/');
        $this->assertAuthenticated();
    }

    public function test_halaman_wajib_login(): void
    {
        $this->get('/')->assertRedirect('/signin');
        $this->get('/restoran/1')->assertRedirect('/signin');
    }

    // ---------- UC2 ----------
    public function test_uc2_restoran_sekitar_diurutkan_berdasarkan_jarak(): void
    {
        $this->actingAs($this->user())
            ->get('/?latitude=-6.9733&longitude=107.6303')
            ->assertInertia(fn (Assert $p) => $p->component('Dashboard')
                ->where('lokasi.gps', true)
                ->where('restorans.0.nama', 'Warung Nasi Padang Sederhana')
                ->where('restorans.0.jarak', 0));
    }

    public function test_uc2_lokasi_manual(): void
    {
        $this->actingAs($this->user())->get('/?manual_location=Dago')
            ->assertInertia(fn (Assert $p) => $p->has('restorans', 1)->where('restorans.0.nama', 'Sushi Garden'));
    }

    // ---------- UC3 ----------
    public function test_uc3_cari_restoran_atau_menu(): void
    {
        $this->actingAs($this->user())->get('/?q=Rendang')
            ->assertInertia(fn (Assert $p) => $p->has('restorans', 1)->where('restorans.0.restoranid', 1));
    }

    public function test_uc3_tidak_ada_hasil_memberi_saran(): void
    {
        $this->actingAs($this->user())->get('/?q=zzzxxx')
            ->assertInertia(fn (Assert $p) => $p->has('restorans', 0)->has('saran'));
    }

    // ---------- UC4 ----------
    public function test_uc4_filter_kategori_rating_harga(): void
    {
        $u = $this->user();
        $this->actingAs($u)->get('/?kategori=Jepang')
            ->assertInertia(fn (Assert $p) => $p->has('restorans', 1));
        $this->actingAs($u)->get('/?harga_max=25000')
            ->assertInertia(fn (Assert $p) => $p->where('restorans', fn ($r) => collect($r)->every(fn ($x) => $x['harga_rata'] <= 25000)));
        $this->actingAs($u)->get('/?rating_min=5')
            ->assertInertia(fn (Assert $p) => $p->where('restorans', fn ($r) => collect($r)->every(fn ($x) => $x['rating'] >= 5)));
        $this->actingAs($u)->get('/?sort=rating')
            ->assertInertia(fn (Assert $p) => $p->where('restorans.0.rating', 5));
    }

    // ---------- UC5 ----------
    public function test_uc5_detail_restoran(): void
    {
        $this->actingAs($this->user())->get('/restoran/1')
            ->assertInertia(fn (Assert $p) => $p->component('Restoran/Detail')
                ->has('menus', 3)->has('ulasan', 2)->where('restoran.nama', 'Warung Nasi Padang Sederhana'));
        $this->actingAs($this->user())->get('/restoran/999')->assertNotFound();
    }

    // ---------- UC6 ----------
    public function test_uc6_simpan_preferensi(): void
    {
        $u = User::factory()->create();
        $this->actingAs($u)->put('/preferensi', ['jenis_makanan' => ['Manis'], 'pantangan' => ['Kacang']])
            ->assertSessionHasNoErrors();
        $this->assertSame(['Manis'], $u->fresh()->preferensi->jenis_makanan);

        $this->actingAs($u)->put('/preferensi', ['jenis_makanan' => ['Bukan Pilihan']])
            ->assertSessionHasErrors('jenis_makanan.0');
    }

    // ---------- UC7 ----------
    public function test_uc7_rating_dan_ulasan_memperbarui_rata_rata(): void
    {
        $u = User::factory()->create();
        $this->actingAs($u)->post('/restoran/6/rating', ['nilai' => 5, 'komentar' => 'Enak'])->assertSessionHasNoErrors();
        $this->assertDatabaseHas('rating', ['user_id' => $u->id, 'restoranid' => 6, 'nilai' => 5]);
        $this->assertSame(4.0, Restoran::find(6)->rating); // (3 + 5) / 2

        // kirim ulang = ubah, bukan duplikat
        $this->actingAs($u)->post('/restoran/6/rating', ['nilai' => 1]);
        $this->assertSame(1, Rating::where('user_id', $u->id)->where('restoranid', 6)->count());

        $this->actingAs($u)->post('/restoran/6/rating', ['nilai' => 9])->assertSessionHasErrors('nilai');
    }

    // ---------- UC8 ----------
    public function test_uc8_toggle_favorit(): void
    {
        $u = User::factory()->create();
        $this->actingAs($u)->post('/favorit/2');
        $this->assertTrue(Favorit::where('user_id', $u->id)->where('restoranid', 2)->exists());
        $this->actingAs($u)->post('/favorit/2');
        $this->assertFalse(Favorit::where('user_id', $u->id)->where('restoranid', 2)->exists());
    }

    // ---------- UC9 ----------
    public function test_uc9_rekomendasi_memakai_preferensi_dan_menghindari_pantangan(): void
    {
        // Test User: suka Pedas & Gurih, pantang Seafood -> Seafood Pak Haji (id 7) tidak boleh muncul
        $this->actingAs($this->user())->get('/')
            ->assertInertia(fn (Assert $p) => $p->where('hasPreferensi', true)
                ->where('rekomendasi', function ($r) {
                    $r = collect($r);
                    return $r->isNotEmpty()
                        && ! $r->pluck('restoranid')->contains(7)
                        && $r->first()['alasan'] !== [];
                }));
    }

    // ---------- UC10 ----------
    public function test_uc10_update_profil(): void
    {
        $u = $this->user();
        $this->actingAs($u)->put('/profile', [
            'name' => 'Nama Baru', 'email' => 'test@example.com', 'no_telepon' => '081234567890',
            'tanggal_lahir' => '2000-05-01', 'lokasi' => 'Bandung',
        ])->assertSessionHasNoErrors();
        $this->assertSame('Nama Baru', $u->fresh()->name);
        $this->assertSame('081234567890', $u->fresh()->no_telepon);

        $this->actingAs($u)->put('/profile', ['name' => 'X', 'email' => 'budi@example.com'])
            ->assertSessionHasErrors('email');
    }

    public function test_profil_tidak_bisa_mengubah_role(): void
    {
        $u = $this->user();
        $this->actingAs($u)->put('/profile', ['name' => 'X', 'email' => $u->email, 'role' => 'admin']);
        $this->assertFalse($u->fresh()->isAdmin());
    }

    // ---------- UC11 ----------
    public function test_uc11_admin_crud_restoran_dan_menu(): void
    {
        $admin = User::where('role', 'admin')->first();

        $this->actingAs($admin)->post('/admin/restoran', [
            'nama' => 'Bakso Baru', 'kategori' => 'Nusantara', 'alamat' => 'Jl. Baru 1',
        ])->assertSessionHasNoErrors();
        $r = Restoran::where('nama', 'Bakso Baru')->firstOrFail();

        $this->actingAs($admin)->put("/admin/restoran/{$r->restoranid}", [
            'nama' => 'Bakso Lama', 'kategori' => 'Nusantara', 'alamat' => 'Jl. Baru 1',
        ]);
        $this->assertSame('Bakso Lama', $r->fresh()->nama);

        $this->actingAs($admin)->post("/admin/restoran/{$r->restoranid}/menu", [
            'nama_menu' => 'Bakso Urat', 'harga' => 15000, 'kategori' => 'Nusantara', 'tags' => 'Gurih, Pedas',
        ])->assertSessionHasNoErrors();
        $this->assertSame(['Gurih', 'Pedas'], $r->menu()->first()->tags);

        $this->actingAs($admin)->delete("/admin/restoran/{$r->restoranid}");
        $this->assertDatabaseMissing('restoran', ['restoranid' => $r->restoranid]);
        $this->assertSame(0, \App\Models\Menu::where('restoranid', $r->restoranid)->count());
    }

    public function test_uc11_user_biasa_ditolak(): void
    {
        $this->actingAs($this->user())->get('/admin/restoran')->assertForbidden();
        $this->actingAs($this->user())->post('/admin/restoran', ['nama' => 'x'])->assertForbidden();
    }
}
