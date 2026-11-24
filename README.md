# My Hobby — Let's Play & Talk!

Media Pembelajaran Interaktif (MPI) Bahasa Inggris untuk **SD Kelas III (Fase B) — Chapter 5: My Hobby**.
Dipakai guru di depan kelas dengan laptop + proyektor untuk 1 pertemuan (2 JP × 35 menit):
kosakata 6 hobi, lagu dan gerak, charades, menyimak, dialog "Do you like ___?", Find Someone Who,
Quick Check, dan refleksi.

▶️ **Buka online:** https://tretanjamal.github.io/my-hobby-mpi/

> **Status: build 0.9.** Kode sudah lengkap (DEV-01 – 06) dan lolos uji, tetapi gambar, suara, font, dan PDF
> cetaknya belum dibuat. Untuk sementara, gambar tampil sebagai kotak pengganti dan suara tampil sebagai teks.

## Cara memakai

- **Offline dari laptop (disarankan di kelas):** unduh repo ini (*Code → Download ZIP*), ekstrak,
  lalu klik dua kali `build/index.html`. Tidak perlu internet.
- **Online:** buka tautan di atas di Chrome atau Edge.
- Tombol keyboard: panah kanan/kiri = pindah scene, Spasi = putar suara, N = Teacher Notes, M = Menu, F = layar penuh.
- Panduan lengkap untuk guru ada di [`build/README.txt`](build/README.txt).

## Isi repo

```
build/                         MPI siap pakai (ini yang diterbitkan ke GitHub Pages)
  index.html                   halaman utama
  js/  data/  css/             kode, isi materi, tampilan
  assets/                      tempat gambar, animasi, suara, dan font (masih kosong)
  print/                       tempat PDF cetak (LKPD dan bahan cetak lain)
tools/optimasi_gambar.py       memperkecil ukuran gambar (Python + Pillow)
PLANNING_MPI_My-Hobby_v1.1.md   rancangan MPI (IDD)
PROMPT_SET_MPI_My-Hobby_v1.0.md prompt pembuatan gambar, PDF, suara, dan musik
QA_LAPORAN_MPI_v0.9.md          hasil uji build 0.9
```

## Menambahkan aset dan memperbarui

1. Buat aset dari `PROMPT_SET_MPI_My-Hobby_v1.0.md`, lalu simpan ke folder `build/assets/...` dan `build/print/`
   sesuai nama file di prompt set. **Nama file harus sama persis, termasuk huruf besar/kecil**,
   karena GitHub Pages membedakannya.
2. Perkecil gambar: `python tools/optimasi_gambar.py`
3. Unggah perubahan:
   ```
   git add -A
   git commit -m "Tambah aset"
   git push
   ```
   GitHub Pages diperbarui otomatis dalam 1–2 menit (tab *Actions*).

## Produk terkait

Gim edukasi **"Hobby Hunt: Do You Like...?"** untuk latihan mandiri dan Classroom Mode, dengan karakter,
kosakata, dan sebagian aset yang sama: https://github.com/tretanjamal/hobby-hunt-game
