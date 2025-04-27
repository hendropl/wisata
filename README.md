# 🌴 Wisata Bali – Web Pariwisata Bali

**Wisata Bali** adalah platform  yang menyediakan informasi lengkap mengenai destinasi wisata di Bali. Aplikasi ini dilengkapi dengan fitur pencarian, rekomendasi destinasi, manajemen data wisata, serta sistem pemesanan tiket, baik untuk pengguna maupun admin.

---

## ✨ Fitur Utama

### Untuk Pengguna:
- **Beranda**: Menampilkan banner dan rekomendasi destinasi wisata.
- **Pencarian**: Cari destinasi berdasarkan kata kunci.
- **Daftar Destinasi**: Informasi lengkap tentang tempat wisata (gambar, deskripsi, rating).
- **Blog**: Artikel-artikel menarik seputar wisata di Bali.
- **Checkout Tiket**: Memesan tiket wisata langsung dari aplikasi.
- **Profil Pengguna & Login**: Sistem otentikasi pengguna.

### Untuk Admin:
- **Dashboard**: Menampilkan statistik kunjungan pengguna.
- **Manajemen Wisata**: Tambah, edit, dan hapus destinasi wisata.
- **Manajemen Pengguna**: Kelola akun pengguna dan admin.

---

## 🧩 Komponen Utama

### Halaman Pengguna:
- `HomeScreen.tsx` – Beranda aplikasi.
- `DestinationScreen.tsx` – Daftar destinasi wisata.
- `DetailScreen.tsx` – Detail informasi destinasi.
- `CheckoutScreen.tsx` – Halaman pemesanan tiket.
- `BlogScreen.tsx` – Artikel wisata.
- `LoginScreen.tsx` – Login pengguna.

### Halaman Admin:
- `Dashboard.tsx` – Dashboard admin.
- `ManajemenWisata.tsx` – Kelola data destinasi wisata.
- `ManajemenUser.tsx` – Kelola data pengguna.
- `LoginAdmin.tsx` – Login admin.

### Komponen Pendukung:
- Sistem navigasi menggunakan **React Navigation**.
- Manajemen state destinasi menggunakan **Context API**.
- Komponen UI kustom untuk tampilan yang konsisten.

---

## 🛠️ Teknologi yang Digunakan
- **React Native** – Framework utama pengembangan aplikasi.
- **TypeScript** – Menjamin keamanan tipe data.
- **React Navigation** – Navigasi antar halaman.
- **React Native Vector Icons** – Ikon aplikasi.
- **React Native Charts** – Visualisasi data statistik (dashboard admin).
- **Context API** – Manajemen state aplikasi.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Jalankan aplikasi**:
   ```bash
   npx react-native run-android
   # atau
   npx react-native run-ios
   ```

---

## 🧭 Struktur Navigasi

### Alur Pengguna:
- **Home** → **Destination** → **Detail** → **Checkout**
- **Blog**
- **Login User**

![Struktur Navigasi Halaman User](https://github.com/user-attachments/assets/a5c67950-581e-4125-95b1-a3bef5d9e947)

### Alur Admin:
- **Login Admin** → **Dashboard** → **Manajemen Wisata/User**

![Struktur Navigasi Halaman Admin](https://github.com/user-attachments/assets/c5a126fa-684c-4c54-b8cb-02d83ab6ea17)

---

## 🤝 Kontribusi

Kontribusi sangat terbuka untuk siapa saja yang ingin mengembangkan aplikasi ini.  
Silakan buat **Issue** untuk melaporkan bug atau mengusulkan fitur baru, atau langsung buat **Pull Request** untuk perbaikan dan pengembangan fitur.
