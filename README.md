# My Hobby — Let's Play & Talk!

Media Pembelajaran Interaktif (MPI) Bahasa Inggris untuk **SD Kelas III (Fase B) — Chapter 5: My Hobby**.
Dipakai guru di depan kelas dengan laptop + proyektor untuk 1 pertemuan (2 JP × 35 menit):
kosakata 6 hobi, lagu dan gerak, charades, menyimak, dialog "Do you like ___?", Find Someone Who,
Quick Check, dan refleksi.

▶️ **Buka online:** https://tretanjamal.github.io/my-hobby-mpi/

> **Status: build 1.0-rc.** Kode lengkap (DEV-01 – 06) dan **semua aset sudah ada**: 32 gambar, 91 suara
> (narasi, lagu "My Hobby", efek), 3 font, dan 6 PDF bahan cetak. Aset dibuat otomatis oleh generator di repo gim
> ([hobby-hunt-game/tools/aset_otomatis](https://github.com/tretanjamal/hobby-hunt-game/tree/main/tools/aset_otomatis)).
> Narasi memakai suara bawaan Windows dan bisa ditimpa rekaman asli kapan saja.

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
  assets/                      gambar, animasi, suara, dan font
  print/                       6 PDF cetak: flashcard, kartu charades, 2 LKPD, refleksi murid, observasi guru
tools/optimasi_gambar.py       memperkecil ukuran gambar (Python + Pillow)
PLANNING_MPI_My-Hobby_v1.1.md   rancangan MPI (IDD)
PROMPT_SET_MPI_My-Hobby_v1.0.md prompt pembuatan gambar, PDF, suara, dan musik
QA_LAPORAN_MPI_v0.9.md          hasil uji build 0.9
```

## Mengganti aset

1. Untuk membuat ulang semua aset, pakai generator di repo gim (lihat tautan di atas). Untuk mengganti dengan
   buatan sendiri (gambar dari prompt set, rekaman suara, lagu resmi), simpan file dengan **nama yang sama persis,
   termasuk huruf besar/kecil**, karena GitHub Pages membedakannya. Jika lagu diganti, sesuaikan `songTiming`
   di `build/data/content.js`.
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
