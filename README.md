# DuskveilSMP Store

Website jasa: pembuatan website, developer server Minecraft, **custom plugin Minecraft**, aplikasi custom, dan optimasi server lag.

## Isi folder
- `index.html` — halaman utama
- `assets/style.css` — tampilan & animasi
- `assets/app.js` — logika (login, pembayaran, dashboard admin, keamanan) + **katalog harga default**
- `firestore.rules` — aturan keamanan Firestore

## Menjalankan
Buka `index.html` di browser → langsung jalan dalam **Mode Demo** (data di localStorage browser).
Demo: "Masuk" → "Masuk sebagai Admin (Demo)" untuk membuka Dashboard Admin.

## Mengubah yang dijual (harga, paket, visibilitas)
- **Lewat Dashboard:** Admin → tab **Katalog & Harga** → ubah harga / matikan paket → *Simpan Katalog*.
- **Lewat kode:** edit objek `SERVICES` di `assets/app.js` (nama paket, fitur, harga default).
- Layanan **Custom Plugin Minecraft** ada di `SERVICES.plg`; daftar contoh ide plugin ada di `IDEAS`.
- **Daftar Akun** hanya menampilkan akun yang benar-benar mendaftar (tidak ada data palsu).

## Kontak
Isi `CONTACT` di `assets/app.js` (Discord / WhatsApp / Email). Tombol kontak hanya muncul jika diisi.

## Mengaktifkan Firebase (login Google & daftar akun sungguhan)
1. Buat project di https://console.firebase.google.com
2. Authentication → Sign-in method → aktifkan **Google**
3. Firestore Database → buat database → tab Rules → tempel isi `firestore.rules`
   (ganti email admin di rules). Koleksi yang dipakai: `users` (privat), `profiles` (publik), `orders`, `settings`.
4. Project settings → Your apps → Web app → salin config ke `FIREBASE_CONFIG` di `assets/app.js`, isi juga `ADMIN_EMAILS`
5. Authentication → Settings → Authorized domains → tambahkan domainmu
6. Login Google tidak jalan lewat `file://` — gunakan hosting (Firebase Hosting, Vercel, Netlify, GitHub Pages) atau `npx serve .`

> Mode Demo: akun hanya tersimpan di browser pengunjung itu sendiri. Agar **Daftar Akun** menampilkan semua member asli, aktifkan Firebase.

## Pembayaran otomatis (WAJIB backend untuk produksi)
Flow di website saat ini **simulasi**. Untuk produksi:
1. Backend (Cloud Functions / Node / PHP) membuat transaksi di Midtrans / Xendit / Tripay dan **menghitung harga dari katalog di server** (jangan percaya harga dari browser)
2. Tampilkan QR / nomor VA dari gateway di modal pembayaran
3. Gateway memanggil **webhook** → backend (Admin SDK) mengubah `status` order menjadi `lunas`
4. Hapus simulasi `markPaid` di `assets/app.js`

Dengan Firestore Rules yang disertakan, browser **tidak bisa** menandai pesanan lunas (hanya admin/backend) — ini disengaja.

## Keamanan
- Anti F12/DevTools hanya penghalang sisi client, bukan keamanan sebenarnya.
- Keamanan nyata: Firestore Rules, validasi webhook, dan role admin di server.
