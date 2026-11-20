<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

/** UC1 — Membuat Akun dan Login (FR-01) */
class AuthController extends Controller
{
    public function showSignin()
    {
        return Inertia::render('SignIn');
    }

    public function signin(Request $request)
    {
        $kredensial = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($kredensial, $request->boolean('remember'))) {
            throw ValidationException::withMessages(['email' => 'Email atau password salah']);
        }

        $request->session()->regenerate();

        return Auth::user()->isAdmin()
            ? redirect()->route('admin.restoran.index')
            : redirect()->intended(route('home'));
    }

    public function showSignup()
    {
        return Inertia::render('SignUp');
    }

    public function signup(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if (User::where('email', $data['email'])->exists()) {
            throw ValidationException::withMessages(['email' => 'Email sudah terdaftar, silahkan login']);
        }

        User::create($data); // password di-hash otomatis lewat cast 'hashed'

        return redirect()->route('signin')->with('success', 'Pendaftaran Berhasil, silakan login.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('signin');
    }
}
