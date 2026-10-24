import React, { useState } from 'react';
import api from '../api';

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register', formData);
      localStorage.setItem('token', response.data.access_token);
      alert('Registrasi Berhasil!');
      onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Daftar Akun</h2>
        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="John Doe"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Minimal 8 karakter"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ulangi password"
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        <p style={styles.footerText}>
          Sudah punya akun?{' '}
          <span style={styles.link} onClick={onSwitchToLogin}>
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}