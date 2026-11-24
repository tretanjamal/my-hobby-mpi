# LAPORAN QA — MPI "My Hobby — Let's Play & Talk!"

| Item | Keterangan |
|---|---|
| Kode Dokumen | MPI-MH-QA-001 |
| Versi Build | 0.9 (kode lengkap DEV-01 s.d. DEV-06; aset gambar & suara belum ada) |
| Tanggal Uji | 24 November 2026 |
| Acuan | `PLANNING_MPI_My-Hobby_v1.1.md` bagian 12.4 (performa) dan 16 (QA) |
| Lingkungan Uji | Browser bawaan Claude (Chromium) melalui server lokal; viewport desktop dan 1024 × 768 |
| Status | **Kode siap.** Menunggu aset (32 gambar, 91 suara, 3 font, 6 PDF) sebelum rilis 1.0 |

---

## 1. Hasil Uji (planning 16.1)

| ID | Skenario | Hasil | Catatan |
|---|---|---|---|
| QA-01 | Buka tanpa internet | ✅ Lulus (kode) | Tidak ada URL eksternal, `fetch`, XHR, atau modul ES. Data dimuat lewat `<script>` biasa sehingga jalan dari `file://`. Pengujian langsung dari `file://` dengan aset lengkap belum dilakukan. |
| QA-02 | Navigasi → / ← SC-00 s.d. SC-12 | ✅ Lulus | Maju SC-00 → SC-11 dan mundur kembali tanpa macet; tombol Back/Next nonaktif di ujung; Menu dapat melompat ke ke-12 scene; Teacher's Corner (tahan 2 detik) kembali ke scene terakhir. |
| QA-03 | Audio kartu kosakata | ✅ Lulus (logika) | Nama file suara tiap kartu sesuai kata; suara utama tidak pernah tumpang tindih. Belum diuji dengan suara asli. |
| QA-04 | Charades: ambil kartu berulang | ✅ Lulus | 15× ambil: 0 kartu berulang berturut-turut, keenam hobi muncul. |
| QA-05 | Timer & skor | ✅ Lulus | Timer 20/30/45 dtk, jeda, waktu habis (kartu terbuka, giliran pindah), skor +1/−1, Reset. |
| QA-06 | Proyektor 1024 × 768 | ✅ Lulus | Kanvas diskalakan 0,533 dan seluruhnya terlihat (letterbox). Teks untuk murid ≥ 14 px nyata; tabel observasi guru ±11 px (khusus layar guru). |
| QA-07 | Laptop RAM 4 GB, muat < 2 dtk | ⏳ Belum dapat diuji | Kode + data hanya 161 KB. Waktu muat akan ditentukan ukuran aset → gunakan `tools/optimasi_gambar.py`. |
| QA-08 | Cetak dari Teacher's Corner | ◐ Sebagian | Lembar observasi: HTML cetak diperiksa (judul, baris skor, rubrik, A4 landscape, nama di-*escape*). Dialog cetak tidak dibuka saat uji. 6 PDF bahan cetak belum dibuat. |
| QA-09 | Hapus data observasi | ✅ Lulus | Klik dua kali dalam 3 detik → penyimpanan kosong; data bertahan setelah halaman dimuat ulang sebelum dihapus. |

Pemeriksaan tambahan setiap tahap DEV: tidak ada error konsol di 13 scene; tidak ada elemen keluar batas layar (pemeriksaan otomatis posisi semua elemen).

---

## 2. Temuan & Perbaikan DEV-06

| # | Temuan | Lokasi | Perbaikan |
|---|---|---|---|
| 1 | `sfx_confetti.mp3` ada di daftar aset tetapi tidak pernah diputar | `build/js/scenes.js:571`, `:998` | Diputar saat jawaban benar Charades dan saat skor Quick Check tinggi |
| 2 | `vo_ex04` ("What is my hobby?") tidak pernah diputar | `build/js/scenes.js:536` | Diputar saat kartu Charades tertutup setelah diintip |
| 3 | Tidak ada cara memeriksa kelengkapan aset | — | `build/data/assets.js` (daftar 32 gambar, 91 suara, 3 font) + tombol **🔍 Periksa kelengkapan file** di Teacher's Corner tab E (`build/js/scenes.js:1344`) |
| 4 | Gambar ChatGPT 1–3 MB, melebihi batas 300 KB (planning 12.4) | — | `tools/optimasi_gambar.py`: perkecil + kurangi warna, nama file tetap, salinan asli disimpan |
| 5 | Panduan guru belum ada | — | `build/README.txt` (planning bagian 19, ditambah privasi data & pemecahan masalah) |
| 6 | Prompt I-01 dan bagian K tidak menyebut folder simpan | `PROMPT_SET_MPI_My-Hobby_v1.0.md` | Folder simpan ditambahkan |
| 7 | 10 prompt gambar tidak dipakai kode MPI | `PROMPT_SET_MPI_My-Hobby_v1.0.md` bagian 0.7 | Diberi status WAJIB / OPSIONAL / dipakai Gim |

### Perbaikan pada tahap sebelumnya (ringkas)
| Tahap | Perbaikan |
|---|---|
| DEV-01 | Label latar tampil vertikal; tokoh cover menimpa tombol; grid menabrak judul; teks "null" di Teacher Notes; tombol Menu tertutup Menu |
| DEV-02 | Kartu zoom bergeser saat animasi muncul |
| DEV-05 | Tabel observasi terpotong menjadi 2 baris |

---

## 3. Risiko Tersisa

| Risiko | Dampak | Tindakan |
|---|---|---|
| Font asli (Fredoka, Baloo 2, Nunito) lebih lebar dari font cadangan | Teks panjang bisa membungkus berbeda | Setelah font dipasang, cek ulang SC-03, SC-07, SC-08 |
| Posisi balon kosong di gambar komik (G-01 – G-04) belum diketahui | Teks balon mungkin tidak tepat menutup balon gambar | Sesuaikan `.speech` di `css/style.css` setelah gambar masuk |
| Waktu lirik lagu masih perkiraan (110 BPM) | Sorotan lirik tidak pas | Ubah `songTiming` di `data/content.js` setelah lagu final ada |
| Strip TPR dari ChatGPT tidak rata 4 frame | Animasi "melompat" | Gunakan prompt perbaikan sprite (prompt set 0.4); bila perlu potong ulang |
| Uji di laptop sekolah sungguhan belum dilakukan | QA-07 belum terbukti | Uji lapangan (planning 17.2) |

---

## 4. Cara Membuat Paket ZIP untuk Sekolah

1. Pastikan aset lengkap: buka MPI → Teacher's Corner → tab E → **🔍 Periksa kelengkapan file** → semua ✅.
2. Kecilkan gambar (sekali saja, dari folder `MPI/tools`):
   ```powershell
   python optimasi_gambar.py
   ```
3. Buat ZIP dari **isi** folder `build` (jalankan dari folder `MPI`):
   ```powershell
   Compress-Archive -Path .\build\* -DestinationPath .\MPI-MyHobby_v1.0.zip -Force
   ```
4. Uji ZIP di laptop lain: ekstrak → klik dua kali `index.html` → jalankan alur SC-00 s.d. SC-11 tanpa internet.
5. Bagikan ZIP + `README.txt` (sudah ada di dalam ZIP).

> Folder `tools/`, dokumen planning, prompt set, dan laporan ini **tidak** ikut ke ZIP karena berada di luar `build/`.

---

## 5. Checklist Rilis 1.0

- [ ] 32 gambar wajib tersedia (Teacher's Corner → Periksa kelengkapan file)
- [ ] 91 file suara tersedia
- [ ] 3 font terpasang di `assets/fonts/`
- [ ] 6 PDF bahan cetak di `print/`
- [ ] Semua gambar ≤ 300 KB (`python optimasi_gambar.py --cek`)
- [ ] Uji dari `file://` di Chrome & Edge dengan aset lengkap
- [ ] Uji di proyektor kelas + speaker
- [ ] Validasi ahli materi & media (planning 17.1) skor ≥ 3,25
