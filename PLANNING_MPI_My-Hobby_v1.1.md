# PLANNING DOCUMENT — MEDIA PEMBELAJARAN INTERAKTIF (MPI)
# **"My Hobby — Let's Play & Talk!"**
### Instructional Design Document (IDD) · Bahasa Inggris SD Kelas III (Fase B)

---

## 0. KONTROL DOKUMEN

| Item | Keterangan |
|---|---|
| Kode Dokumen | MPI-MH-PLN-001 |
| Nama Produk | My Hobby — Let's Play & Talk! |
| Jenis Produk | Media Pembelajaran Interaktif (MPI) berbasis HTML5, offline |
| Versi | 1.1 |
| Status | DRAFT — menunggu review ahli materi & ahli media |
| Tanggal | 23 November 2026 |
| Penyusun | _(nama penyusun)_ |
| Reviewer | Ahli Materi (guru Bahasa Inggris SD) · Ahli Media · Kepala Sekolah / Pengawas |
| Dokumen Rujukan | RPTM Pertemuan 7 PKGSD-MBI (Chapter 5: My Hobby) · Buku Bahasa Inggris SD/MI Kelas 3 Chapter 5 · Ruang GTK Topic 3 – Module 4 |
| Produk Terkait | Gim Edukasi "Hobby Hunt" (`../Gim Edukasi/PLANNING_GIM_Hobby-Hunt_v1.1.md`) — berbagi karakter, kosakata, dan aset audio |
| Prompt Set Produksi | `PROMPT_SET_MPI_My-Hobby_v1.0.md` (folder yang sama) — prompt gambar, PDF cetak, naskah suara, musik, dan kode |

### Riwayat Revisi

| Versi | Tanggal | Perubahan | Oleh |
|---|---|---|---|
| 0.1 | 23 Nov 2026 | Draf awal planning MPI dari RPTM Pertemuan 7 | Penyusun |
| 1.0 | 23 Nov 2026 | Disusun ulang ke format standar studio; difokuskan untuk penggunaan di kelas SD | Penyusun |
| 1.1 | 23 Nov 2026 | Tambah Prompt Set siap pakai (Lampiran 20.4); tambah warna aksen HB07 & HB08 | Penyusun |

### Daftar Isi
1. Ringkasan Proyek
2. Tim & Peran (RACI)
3. Analisis Kebutuhan
4. Desain Pembelajaran
5. Ruang Lingkup Konten
6. Skenario Penggunaan di Kelas SD
7. Arsitektur Informasi & Navigasi
8. Storyboard
9. Panduan Gaya Visual
10. Audio & Naskah Suara (VO)
11. UX & Aksesibilitas Anak SD
12. Spesifikasi Teknis
13. Keamanan & Privasi Anak
14. Daftar Aset (Asset Register)
15. Rencana Produksi & Milestone
16. Quality Assurance & Uji Penerimaan
17. Evaluasi Media
18. Daftar Risiko
19. Panduan Cepat Guru
20. Lampiran

---

## 1. RINGKASAN PROYEK

### 1.1 Satu Kalimat Produk
MPI offline yang dipakai **guru SD di depan kelas (proyektor)** untuk mengajak murid kelas III **mengenal 6 hobi, bergerak (TPR), bermain tebak gaya, dan bertanya-jawab "Do you like…?"** secara lisan.

### 1.2 Masalah
- Murid kelas III baru mengenal bahasa Inggris; kemampuan membaca teks Inggris masih terbatas.
- Guru SD sering mengajar Bahasa Inggris tanpa latar belakang pendidikan Bahasa Inggris → butuh **model pelafalan** dan **contoh Classroom English** yang siap pakai.
- Banyak sekolah tidak punya internet stabil dan hanya punya 1 laptop + proyektor.

### 1.3 Solusi
Satu paket MPI yang:
1. **Audio-first** — setiap kata & kalimat bisa diputar ulang sebagai model pelafalan.
2. **Bergerak & bermain** — lagu TPR, Charades digital, spinner tanya-jawab.
3. **Membimbing guru** — setiap layar punya *Teacher Notes* berisi Classroom English dan langkah mengajar.
4. **100% offline** — cukup salin folder dan buka di browser.

### 1.4 Lingkup

| Termasuk (In Scope) | Tidak Termasuk (Out of Scope) |
|---|---|
| 12 layar/scene sesuai alur 1 pertemuan (2 JP) | Akun login / server / sinkronisasi online |
| 6 kosakata inti + 2 kosakata pengayaan | Penilaian pelafalan otomatis (speech recognition) |
| Lagu TPR, Charades, dialog model, spinner, Find Someone Who, kuis cepat, refleksi | Konten Chapter lain |
| Teacher's Corner + lembar cetak (LKPD, observasi) | Aplikasi Android/iOS native |

### 1.5 Indikator Keberhasilan Produk

| Metrik | Target |
|---|---|
| Skor validasi ahli materi & ahli media | ≥ 3,25 dari 4 (kategori "sangat layak") |
| Guru dapat menjalankan MPI tanpa pelatihan khusus | ≥ 80% guru uji coba berhasil di percobaan pertama |
| Murid mencapai indikator I-1 s.d. I-5 (bagian 4.3) | ≥ 75% murid |
| Respons senang murid (refleksi emoji) | ≥ 80% memilih 😃 / 🙂 |

---

## 2. TIM & PERAN (RACI)

| Peran | Tugas Utama | Analisis | Storyboard | Aset | Coding | QA | Rilis |
|---|---|---|---|---|---|---|---|
| Product Owner / Penanggung Jawab | Keputusan lingkup & prioritas | A | A | C | C | A | A |
| Instructional Designer | Desain pembelajaran, storyboard | R | R | C | C | R | C |
| Ahli Materi (Guru B. Inggris SD) | Validasi isi & pelafalan | C | C | C | I | R | I |
| Ilustrator | Karakter, ikon, latar | I | C | R | I | I | I |
| Pengisi Suara (VO) | Rekam kosakata & dialog | I | I | R | I | C | I |
| Developer | Implementasi HTML5/JS | I | C | C | R | C | R |
| QA / Penguji | Uji fungsi & uji kelas | I | I | I | C | R | C |

_R = Responsible · A = Accountable · C = Consulted · I = Informed. Satu orang boleh memegang beberapa peran._

---

## 3. ANALISIS KEBUTUHAN

### 3.1 Persona Murid
> **Nama:** Alya, 8 tahun, kelas III SD.
> **Kemampuan:** mengenal beberapa kata Inggris (colors, numbers) dari lagu & video; belum lancar membaca teks Inggris.
> **Suka:** bernyanyi, bergerak, kompetisi tim, stiker/bintang.
> **Tantangan:** malu berbicara di depan kelas, cepat bosan bila hanya mendengar penjelasan.
> **Implikasi desain:** gambar besar, audio jelas, instruksi pendek, banyak gerakan, kegiatan berpasangan/kelompok sebelum tampil individu.

### 3.2 Persona Guru
> **Nama:** Pak Dedi, guru kelas III (bukan lulusan Pendidikan Bahasa Inggris).
> **Kebutuhan:** contoh pelafalan yang benar, kalimat Classroom English siap pakai, media yang mudah dioperasikan, tidak bergantung internet.
> **Implikasi desain:** tombol audio di setiap kata, *Teacher Notes* per layar, shortcut keyboard, panduan cepat 1 halaman.

### 3.3 Lingkungan Sekolah

| Aspek | Kondisi Umum SD | Keputusan Desain |
|---|---|---|
| Perangkat | 1 laptop + proyektor/TV + speaker | MPI dioperasikan guru (*teacher-led*) |
| Internet | Tidak stabil / tidak ada | Semua aset lokal, tanpa CDN |
| Spesifikasi laptop | Windows, RAM 4 GB, browser Chrome/Edge | Total ukuran < 150 MB, tanpa framework berat |
| Ruang kelas | 20–32 murid, cahaya terang | Kontras tinggi, kata target ≥ 48 pt |
| Alokasi waktu | 2 JP × 35 menit per pertemuan | Alur dirancang 70 menit, modular |

### 3.4 Analisis Kurikulum
- **Kurikulum:** Kurikulum Merdeka, Bahasa Inggris Fase B, kelas III.
- **Elemen utama:** Menyimak–Berbicara (fokus), dengan dukungan Membaca–Memirsa (gambar & kata).
- **Pendekatan:** Pembelajaran Mendalam — **berkesadaran** (murid tahu tujuan), **bermakna** (bicara tentang hobi sendiri), **menggembirakan** (lagu & permainan); pengalaman belajar **memahami → mengaplikasi → merefleksi**.

---

## 4. DESAIN PEMBELAJARAN

### 4.1 Capaian Pembelajaran (ringkas, Fase B – Menyimak–Berbicara)
Murid menggunakan bahasa Inggris lisan sederhana untuk berinteraksi dan bertukar informasi tentang hal-hal yang dekat dengan dirinya (termasuk kesukaan/hobi) di lingkungan kelas, dengan bantuan gambar, gerakan, dan contoh dari guru.

### 4.2 Tujuan Pembelajaran (TP)
Setelah mengikuti pembelajaran dengan MPI, murid kelas III mampu:
- **TP-1** Menyebutkan nama hobi dalam bahasa Inggris dengan pelafalan yang dapat dipahami.
- **TP-2** Merespons kata hobi yang didengar dengan gerakan yang sesuai (TPR).
- **TP-3** Menanyakan kesukaan teman dengan "Do you like ___?" dan menjawab "Yes, I do. / No, I don't." secara berpasangan.

### 4.3 Indikator Ketercapaian

| Kode | Indikator | TP | Cara Mengukur |
|---|---|---|---|
| I-1 | Menyebutkan ≥ 5 dari 6 nama hobi saat ditunjukkan gambar | TP-1 | Kuis cepat (SC-09) + observasi |
| I-2 | Memperagakan gerakan yang tepat saat mendengar kata hobi | TP-2 | Observasi saat SC-04 & SC-05 |
| I-3 | Menebak hobi dari gerakan teman: "It is ___!" | TP-1, 2 | Observasi Charades (SC-05) |
| I-4 | Mengajukan "Do you like ___?" dengan intonasi naik | TP-3 | Observasi pasangan (SC-07) |
| I-5 | Menjawab "Yes, I do / No, I don't" sesuai kenyataan | TP-3 | Observasi pasangan (SC-07, SC-08) |
| I-6 | Melakukan ≥ 3 kali tanya-jawab bergiliran | TP-3 | Lembar Find Someone Who (SC-08) |

### 4.4 Alur Tujuan Pembelajaran (ATP) dalam MPI
`Mengenal kata (dengar–lihat–ulang)` → `Menghubungkan kata & gerakan` → `Menggunakan kata secara spontan (permainan)` → `Mendengar contoh dialog` → `Bertanya-jawab berpasangan` → `Interaksi bebas di kelas` → `Refleksi`

### 4.5 Strategi Pembelajaran

| Strategi | Penerapan di MPI | Scene |
|---|---|---|
| Total Physical Response (TPR) | Lagu hobi + gerakan; permainan "Bima Says" | SC-03, SC-04 |
| Game-Based Learning | Charades tim dengan timer & skor | SC-05 |
| Modelling & Guided Practice | Dialog bergambar dengan audio per kalimat | SC-06 |
| Task-Based Learning | Tugas bertanya pada pasangan & teman sekelas | SC-07, SC-08 |
| Asesmen Formatif | Kuis cepat, observasi guru, refleksi emoji | SC-09, SC-10 |
| Diferensiasi | Tombol "Hide word", kecepatan audio lambat, pengayaan "I Can Do More" | SC-03, SC-11 |

---

## 5. RUANG LINGKUP KONTEN

### 5.1 Kosakata

| ID | Kata | Arti | Gerakan TPR | Status |
|---|---|---|---|---|
| HB01 | swimming | berenang | mendayung tangan gaya dada | Inti |
| HB02 | playing football | bermain sepak bola | menendang bola | Inti |
| HB03 | dancing | menari | mengayunkan tangan & tubuh | Inti |
| HB04 | singing | menyanyi | memegang mikrofon di depan mulut | Inti |
| HB05 | reading books | membaca buku | membuka telapak tangan seperti buku | Inti |
| HB06 | riding a bike | bersepeda | memegang stang & mengayuh kaki | Inti |
| HB07 | drawing | menggambar | menggerakkan pensil di udara | Pengayaan |
| HB08 | cooking | memasak | mengaduk panci | Pengayaan |

> Mengikuti Lampiran 1 RPTM ("reading books", "riding a bike") agar selaras dengan audio & kartu resmi.

### 5.2 Ungkapan

| ID | Fungsi | Ungkapan |
|---|---|---|
| EX01 | Bertanya kesukaan | Do you like ___? ↗ |
| EX02 | Menjawab ya | Yes, I do. |
| EX03 | Menjawab tidak | No, I don't. |
| EX04 | Charades – bertanya | What is my hobby? |
| EX05 | Charades – menebak | It is ___! / You like ___! |
| EX06 | Menanyakan hobi | What is your hobby? |
| EX07 | Menyatakan hobi | I like ___. |

### 5.3 Classroom English (untuk guru)

| Tahap | Ungkapan |
|---|---|
| Membuka | Good morning, class! · How are you today? · Are you ready? |
| Instruksi | Look at the picture. · Listen and repeat. · Stand up, please. · Sit down, please. |
| TPR | Sing along and do the gesture! · Show me *swimming*! |
| Permainan | Let's play Charades! · It's your turn! · Show your card! · Guess the action! |
| Pasangan | Ask your partner: Do you like…? · Now swap! · Walk around the class. |
| Pujian | Great job! · Fantastic effort! · Well done! · Nice try! |
| Menutup | How do you feel today? · See you next time! |

---

## 6. SKENARIO PENGGUNAAN DI KELAS SD (2 JP × 35 menit)

| Bagian | Waktu | Scene | Aktivitas Guru | Aktivitas Murid | Pengalaman Belajar |
|---|---|---|---|---|---|
| **Pendahuluan** | 5' | SC-01 | Menyapa, menunjukkan Bima yang bersepeda | Menjawab sapaan, menebak kegiatan Bima | Memahami |
| | 3' | SC-02 | Menyampaikan tujuan dengan ikon | Mengulang "Today I can…" | Berkesadaran |
| **Inti** | 8' | SC-03 | Memutar audio, memandu *listen and repeat* | Mendengar, menirukan, menunjuk gambar | Memahami |
| | 5' | SC-04 | Memandu lagu & gerakan | Bernyanyi sambil bergerak | Menggembirakan |
| | 10' | SC-05 | Memandu Charades 2 tim | Memperagakan & menebak | Mengaplikasi |
| | 6' | SC-06 | Memutar dialog per kalimat | Mendengar, menirukan dialog | Memahami |
| | 8' | SC-07 | Memasangkan murid, memutar spinner | Bertanya-jawab berpasangan | Mengaplikasi |
| | 10' | SC-08 | Memandu Find Someone Who | Berkeliling bertanya ke teman | Mengaplikasi (bermakna) |
| | 5' | SC-09 | Memandu kuis cepat | Menjawab dengan menunjuk/kartu jawaban | Asesmen |
| **Penutup** | 5' | SC-10 | Memandu refleksi emoji, menyimpulkan | Memilih emoji, menyebut kata favorit | Merefleksi |
| | 5' | SC-11 | Memberi tugas pengayaan | Mencatat tugas "I Can Do More" | Pengayaan |
| **Total** | **70'** | | | | |

> **Fleksibel:** jika waktu sekolah terbatas, pertemuan dapat dipecah — Pertemuan A (SC-01 s.d. SC-05), Pertemuan B (SC-06 s.d. SC-11).

---

## 7. ARSITEKTUR INFORMASI & NAVIGASI

```
SC-00 Start
   │
   ▼
SC-01 Hello! ─► SC-02 Today I Can… ─► MENU UTAMA
                                         │
        ┌──────────────┬─────────────────┼─────────────────┬────────────────┐
        ▼              ▼                 ▼                 ▼                ▼
   SC-03 Let's    SC-04 Sing &     SC-05 Game Time:   SC-06 Let's     SC-07 Let's
   Learn          Move             Charades           Listen          Talk
                                                                        │
        ┌──────────────┬─────────────────┬────────────────────────────────┘
        ▼              ▼                 ▼
   SC-08 Find     SC-09 Quick      SC-10 My           SC-11 I Can      SC-12 Teacher's
   Someone Who    Check            Reflection         Do More          Corner 🔒
```

**Aturan navigasi**
- Mode **Lesson** (default): urutan linear dengan tombol ◀ Back / Next ▶.
- Mode **Menu**: guru dapat melompat ke scene mana pun (untuk mengulang atau memecah pertemuan).
- **Teacher's Corner** dibuka dengan menahan ikon 🔒 selama 2 detik (agar tidak tertekan murid).

**Shortcut keyboard guru**

| Tombol | Fungsi |
|---|---|
| → / ← | Scene berikut / sebelumnya |
| Spasi | Putar / ulang audio utama |
| R | Acak kartu / putar spinner |
| T | Mulai / hentikan timer |
| 1 / 2 | Tambah skor Team A / Team B |
| N | Tampilkan / sembunyikan Teacher Notes |
| M | Ke Menu Utama |
| F | Layar penuh |

---

## 8. STORYBOARD

Format setiap scene: **Tujuan · Tata Letak · Teks Layar · Naskah VO · Interaksi · Umpan Balik · Teacher Notes · Aset**.

### SC-00 — Start
| Komponen | Isi |
|---|---|
| Tujuan | Layar siap tampil sebelum kelas dimulai |
| Tata Letak | Logo "My Hobby" di tengah, Bima & Sari di kiri-kanan, 6 ikon hobi melayang pelan |
| Teks Layar | MY HOBBY — Let's Play & Talk! · [ START ] |
| VO | — (musik intro pendek, mulai setelah START) |
| Interaksi | Klik START / Enter → layar penuh + SC-01 |
| Aset | `img_logo`, `img_char_bima_wave`, `img_char_sari_wave`, `icon_hobby_*`, `mus_intro` |

### SC-01 — Hello!
| Komponen | Isi |
|---|---|
| Tujuan | Apersepsi; memancing rasa ingin tahu |
| Tata Letak | Bima di tengah sedang bersepeda (animasi), balon kata |
| Teks Layar | "Hi! I'm Bima. I like riding a bike!" |
| VO | `vo_sc01_bima`: "Hi, friends! I'm Bima. I like riding a bike! What about you?" |
| Interaksi | Klik Bima → animasi diulang + VO; klik Sari → "Hi! I'm Sari. I like singing!" |
| Teacher Notes | "Good morning, class! Look! What is Bima doing?" — terima jawaban dalam bahasa Indonesia, lalu modelkan dalam bahasa Inggris. |
| Aset | `anim_bima_bike`, `anim_sari_sing`, `vo_sc01_bima`, `vo_sc01_sari` |

### SC-02 — Today I Can…
| Komponen | Isi |
|---|---|
| Tujuan | Murid mengetahui tujuan belajar (berkesadaran) |
| Tata Letak | 3 kartu ikon besar berurutan |
| Teks Layar | 🗣️ I can say my hobby. · 🕺 I can move and sing. · 🤝 I can ask my friend. |
| VO | Setiap kartu dibacakan saat diklik |
| Interaksi | Klik kartu → membalik + VO |
| Teacher Notes | Ucapkan bersama murid sambil memperagakan ikon. Jelaskan singkat dalam bahasa Indonesia bila perlu. |

### SC-03 — Let's Learn (Kosakata)
| Komponen | Isi |
|---|---|
| Tujuan | TP-1, TP-2 — mengenal 6 kata hobi |
| Tata Letak | Grid 3×2 kartu bergambar (warna sesuai hobi) |
| Teks Layar | Nama hobi di bawah gambar (bisa disembunyikan) |
| VO | `vo_hb01`…`vo_hb06` (normal & lambat) |
| Interaksi | Klik kartu → zoom, animasi gerakan, VO 2×. Tombol: 🔊 ulang · 🐢 lambat · 👁️ Hide word · 🎲 "Point to…" (MPI menyebut kata acak, murid menunjuk) |
| Umpan Balik | Mode "Point to…": guru klik kartu yang ditunjuk murid → ✅ bintang + "Great job!" / ❌ "Try again!" |
| Teacher Notes | "Listen and repeat." (ulang 2–3×, keras–pelan–berbisik). "Point to *swimming*!" Tekankan bunyi /ŋ/ di akhir *-ing*. |
| Aset | `img_hobby_hb01..06`, `anim_tpr_hb01..06`, `vo_hb01..06_normal/slow`, `sfx_correct`, `sfx_tryagain` |

### SC-04 — Sing & Move (TPR)
| Komponen | Isi |
|---|---|
| Tujuan | TP-2 — mengaitkan kata dengan gerakan; ice breaking |
| Tata Letak | Video/animasi lirik; ikon gerakan muncul sinkron dengan lirik |
| Teks Layar | Lirik lagu (kata hobi disorot warna) |
| Audio | Lagu hobi resmi (SIMBI) |
| Interaksi | ▶ Play / ⏸ Pause / 🔁 Ulang. Mode **"Bima Says"**: MPI menyebut "Bima says: swimming!" → murid bergerak; sesekali tanpa "Bima says" → murid diam |
| Teacher Notes | "Stand up, please! Sing along and do the gesture!" Pastikan ruang gerak aman. |
| Aset | `mus_hobby_song`, `data_lyrics_timing.json`, `vo_bimasays_*` |

### SC-05 — Game Time: Charades
| Komponen | Isi |
|---|---|
| Tujuan | TP-1, TP-2 — produksi kata secara spontan |
| Tata Letak | Kartu tertutup di tengah, timer melingkar, papan skor Team A (kiri) & Team B (kanan) |
| Teks Layar | "What is my hobby?" · "It is ___!" |
| Interaksi | (1) Klik **Pick a card** → kartu tampil 3 detik lalu tertutup (hanya pemeran yang melihat; murid lain diminta menutup mata) (2) **T** mulai timer 30 detik (3) Tim menebak (4) Klik ✅ → skor +1, kartu terbuka + VO |
| Umpan Balik | Benar: konfeti + "Great job!" · Waktu habis: kartu terbuka + "Nice try!" |
| Teacher Notes | "Let's play Charades! Team A, it's your turn! Show your card! Guess the action!" Dorong tim menjawab dengan kalimat lengkap "It is swimming!" |
| Aset | `ui_card_back`, `ui_timer`, `ui_scoreboard`, `sfx_tick`, `sfx_buzzer`, `sfx_confetti` |

### SC-06 — Let's Listen (Dialog Model)
| Komponen | Isi |
|---|---|
| Tujuan | TP-3 — mendengar contoh tanya-jawab |
| Tata Letak | Komik 4 panel: Bima & Sari di taman |
| Naskah | P1 Bima: "Do you like swimming?" ↗ · P2 Sari: "No, I don't." · P3 Bima: "Do you like singing?" ↗ · P4 Sari: "Yes, I do!" |
| Audio | Mengacu Chapter 5 Pertemuan 3_Audio1 (Lampiran 3 RPTM); bila berbeda, gunakan naskah audio resmi |
| Interaksi | Klik panel → VO per kalimat · Mode **Karaoke** (teks disorot saat diputar) · Tanda ↗ ↘ untuk intonasi · Tombol **Role A / Role B** (salah satu suara dibisukan, kelas mengisi) |
| Teacher Notes | "Listen carefully. Who likes singing?" Bagi kelas dua sisi: kiri = Bima, kanan = Sari, lalu tukar. |
| Aset | `img_comic_p1..p4`, `vo_dialog_l01..l04` |

### SC-07 — Let's Talk (Berpasangan)
| Komponen | Isi |
|---|---|
| Tujuan | TP-3 — tanya-jawab berpasangan |
| Tata Letak | Spinner 6 hobi di kiri; *sentence frame* di kanan |
| Teks Layar | A: Do you like **[hobi]**? · B: Yes, I do. / No, I don't. |
| Interaksi | **R** putar spinner → hobi terpilih + VO pertanyaan · Tombol **Swap roles** · Penghitung ronde |
| Teacher Notes | Modelkan dulu dengan 1 murid. "Ask your partner: Do you like…? Now swap!" Jawaban harus jujur — "No, I don't" juga benar. |
| Aset | `ui_spinner`, `vo_ex01_hb01..06`, `vo_ex02`, `vo_ex03` |

### SC-08 — Find Someone Who
| Komponen | Isi |
|---|---|
| Tujuan | I-6 — interaksi bebas di kelas |
| Tata Letak | 6 kotak hobi (format Lampiran 4 RPTM) + timer 5 menit |
| Teks Layar | "Find someone who likes ___" · Friend's name: ____ |
| Interaksi | Timer berjalan saat murid berkeliling (lembar cetak). Setelah selesai, guru mengetik nama di kotak saat *report back* → tampil di layar |
| Teacher Notes | "Walk around the class. Ask your friends: What is your hobby? / Do you like…?" Saat melapor: "Who likes dancing? Tell me!" |
| Aset | `print_lkpd_findsomeonewho.pdf`, `ui_box_hobby_*` |

### SC-09 — Quick Check (Asesmen Formatif)
| Komponen | Isi |
|---|---|
| Tujuan | Mengukur I-1 secara cepat |
| Format | 6 soal "Listen and choose": VO kata → 3 gambar berlabel A/B/C |
| Interaksi | Murid mengangkat kartu A/B/C (atau jari 1/2/3); guru mengklik jawaban mayoritas → jawaban benar terungkap |
| Umpan Balik | Rekap "Class score: 5/6 ⭐" — kata yang sering salah ditandai untuk diulang |
| Teacher Notes | Catat murid yang belum tepat di Lembar Observasi (SC-12). |

### SC-10 — My Reflection
| Komponen | Isi |
|---|---|
| Tujuan | Refleksi diri (Lampiran 5 RPTM) |
| Teks Layar | 1. I can say 6 hobbies. · 2. I am brave to move and speak. → 😃 / 🙂 / 😐 · "My favorite word is…" |
| Interaksi | Guru membacakan, murid mengangkat tangan per emoji; guru memasukkan jumlah → grafik sederhana |
| Teacher Notes | "How do you feel today? Show me your face!" Akhiri dengan pujian: "Fantastic effort, everyone!" |

### SC-11 — I Can Do More (Pengayaan)
| Komponen | Isi |
|---|---|
| Tujuan | Pengayaan untuk murid yang sudah mencapai TP |
| Konten | Kartu HB07 *drawing* & HB08 *cooking* + tugas: "Draw your hobby. Tell your family: I like ___." |
| Aset | `img_hobby_hb07..08`, `vo_hb07..08`, `print_lkpd_icandomore.pdf` |

### SC-12 — Teacher's Corner 🔒
| Tab | Isi |
|---|---|
| A. Modul Singkat | TP, indikator, langkah 70 menit (bagian 6) |
| B. Classroom English | Daftar bagian 5.3 + tombol audio untuk tiap ungkapan |
| C. Pelafalan | Kata sulit & tips: *-ing* /ŋ/, *bike* /baɪk/, intonasi naik pada Yes/No question |
| D. Lembar Observasi | Rubrik bagian 17.3, bisa dicentang & dicetak |
| E. Unduhan Cetak | Flashcard, kartu Charades, LKPD Find Someone Who, LKPD I Can Do More, Refleksi |

---

## 9. PANDUAN GAYA VISUAL

### 9.1 Arah Visual
Ceria, hangat, khas sekolah dasar Indonesia; ilustrasi vektor datar dengan garis tepi tebal & sudut membulat; karakter beragam dan inklusif.

### 9.2 Palet Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `bg` | `#FFF8EC` | Latar utama |
| `ink` | `#2D2A32` | Teks utama |
| `primary` | `#2B59C3` | Tombol navigasi |
| `success` | `#2E9E5B` | Jawaban benar |
| `soft-alert` | `#E8833A` | "Try again" (bukan merah) |
| `hb-swimming` | `#1E88E5` | Aksen HB01 |
| `hb-football` | `#43A047` | Aksen HB02 |
| `hb-dancing` | `#8E24AA` | Aksen HB03 |
| `hb-singing` | `#D81B60` | Aksen HB04 |
| `hb-reading` | `#EF6C00` | Aksen HB05 |
| `hb-bike` | `#F9A825` | Aksen HB06 (teks di atasnya wajib `ink`) |
| `hb-drawing` | `#00897B` | Aksen HB07 (pengayaan) |
| `hb-cooking` | `#795548` | Aksen HB08 (pengayaan) |

### 9.3 Tipografi

| Elemen | Font | Ukuran (1080p) |
|---|---|---|
| Kata target | Fredoka SemiBold | 64–72 px |
| Judul scene | Fredoka SemiBold | 48 px |
| Instruksi / kalimat | Baloo 2 Medium | 36 px |
| Teacher Notes | Nunito Regular | 22 px |

Font berlisensi OFL dan **disimpan lokal** di folder `assets/fonts/`.

### 9.4 Tata Letak
- Kanvas 1920×1080 (16:9), *safe area* 80 px dari tepi (aman untuk proyektor yang memotong tepi).
- Tombol navigasi minimal 96×96 px; posisi tetap: ◀ kiri bawah, ▶ kanan bawah, 🏠 kanan atas, 🔊 kiri atas.

### 9.5 Karakter

| Karakter | Deskripsi | Pose yang Dibutuhkan |
|---|---|---|
| Bima | Laki-laki, 8 tahun, seragam merah-putih, suka bersepeda | wave, point, happy, think, bike |
| Sari | Perempuan berjilbab, 8 tahun, suka menyanyi | wave, point, happy, think, sing |

> Karakter yang sama dipakai di Gim Edukasi "Hobby Hunt" untuk konsistensi.

---

## 10. AUDIO & NASKAH SUARA (VO)

### 10.1 Spesifikasi
| Item | Ketentuan |
|---|---|
| Master | WAV 44,1 kHz / 16-bit, mono |
| Distribusi | MP3 128 kbps (kompatibel semua browser) |
| Loudness | Rata-rata −16 LUFS; puncak ≤ −1 dBTP |
| Arah suara | Jelas, ramah, tempo lambat–sedang; pertanyaan dengan intonasi naik yang tegas |
| Pengisi suara | Anak laki-laki (Bima), anak perempuan (Sari), dewasa (narator/guru) |

### 10.2 Daftar Naskah VO (ringkas)

| ID | Pembicara | Naskah |
|---|---|---|
| vo_sc01_bima | Bima | Hi, friends! I'm Bima. I like riding a bike! What about you? |
| vo_sc01_sari | Sari | Hi! I'm Sari. I like singing! |
| vo_hb01..08_normal / _slow | Narator | swimming · playing football · dancing · singing · reading books · riding a bike · drawing · cooking |
| vo_ex01_hb01..06 | Bima | Do you like swimming? (dst. untuk 6 hobi) |
| vo_ex02 | Sari | Yes, I do. |
| vo_ex03 | Sari | No, I don't. |
| vo_ex04 | Bima | What is my hobby? |
| vo_ex05_hb01..06 | Sari | It is swimming! (dst.) |
| vo_praise_01..04 | Narator | Great job! · Fantastic effort! · Well done! · Nice try! |
| vo_ce_* | Guru dewasa | Seluruh Classroom English bagian 5.3 (untuk Teacher's Corner) |

---

## 11. UX & AKSESIBILITAS ANAK SD

| Prinsip | Penerapan |
|---|---|
| Audio-first | Setiap teks Inggris memiliki tombol suara |
| Beban kognitif rendah | 1 tujuan per layar; maksimal 6 pilihan |
| Umpan balik positif | Tidak ada suara/warna "salah" yang menakutkan; gunakan "Try again!" |
| Terbaca dari belakang kelas | Kata target ≥ 64 px; kontras teks ≥ 4,5:1 |
| Ramah gerak | Gerakan TPR bisa dilakukan sambil duduk (alternatif untuk murid berkebutuhan khusus) |
| Aman untuk mata | Tidak ada kedipan > 3 kali/detik; animasi bisa dimatikan |
| Inklusif | Karakter beragam; tidak ada stereotip gender pada hobi (mis. anak laki-laki menari, anak perempuan bermain bola) |
| Bahasa | Instruksi untuk murid dalam bahasa Inggris sederhana; Teacher Notes dalam bahasa Indonesia |

---

## 12. SPESIFIKASI TEKNIS

### 12.1 Teknologi
- HTML5 + CSS3 + JavaScript (vanilla, tanpa framework/CDN).
- Dibuka langsung dari `index.html` di Chrome/Edge (tanpa server).
- Data konten dipisahkan di `data/content.js` agar mudah diperbarui tanpa mengubah kode. Formatnya `.js` (bukan `.json`) karena browser memblokir pembacaan file JSON lokal saat MPI dibuka dari `file://`.

### 12.2 Struktur Folder Produk
```
MPI/
├── PLANNING_MPI_My-Hobby_v1.1.md   ← dokumen ini
├── PROMPT_SET_MPI_My-Hobby_v1.0.md ← prompt produksi aset & kode
├── QA_LAPORAN_MPI_v0.9.md          ← hasil uji QA & cara membuat ZIP
├── tools/optimasi_gambar.py        ← pengecil gambar (≤ 300 KB), tidak ikut ZIP
└── build/                          ← isi folder ini yang di-ZIP untuk sekolah
    ├── index.html
    ├── README.txt          (panduan cepat guru)
    ├── css/style.css
    ├── js/
    │   ├── ui.js           (pembuat elemen, gambar + placeholder, ikon, toast)
    │   ├── audio.js        (pemutar audio: satu suara utama + SFX)
    │   ├── scenes.js       (tata letak & interaksi SC-00 … SC-12)
    │   └── app.js          (router scene, navigasi, menu, teacher notes, keyboard)
    ├── data/content.js     (kosakata, dialog, catatan guru, daftar scene)
    ├── data/assets.js      (daftar file aset untuk pemeriksa kelengkapan)
    ├── assets/
    │   ├── img/ (char, hobby, bg, comic, ui)   ├── anim/
    │   ├── audio/ (vo, music, sfx)             └── fonts/
    └── print/     (PDF flashcard, kartu charades, LKPD, refleksi)
```

### 12.3 Konvensi Penamaan Aset
`<jenis>_<kategori>_<id>[_varian].<ext>` — huruf kecil, garis bawah.
Contoh: `img_hobby_hb01.png`, `vo_hb03_slow.mp3`, `anim_tpr_hb06.webp`, `sfx_correct.mp3`.

### 12.4 Kompatibilitas & Performa

| Item | Target |
|---|---|
| Browser | Chrome & Edge versi terbaru di Windows 10/11 |
| Resolusi | Optimal 1920×1080; tetap rapi di 1366×768 dan 1024×768 |
| Ukuran total | < 150 MB |
| Waktu muat scene | < 2 detik di laptop RAM 4 GB |
| Gambar | WebP/PNG ≤ 300 KB per file |

---

## 13. KEAMANAN & PRIVASI ANAK
- Tidak ada iklan, tautan ke luar, atau pembelian dalam aplikasi.
- Tidak mengumpulkan data pribadi murid; nama di SC-08 hanya tampil sementara dan tidak disimpan.
- Data observasi guru disimpan lokal di perangkat guru dan dapat dihapus dengan satu tombol.
- Seluruh gambar dan audio orisinal atau berlisensi bebas yang jelas sumbernya (dicatat di Lampiran 20.2).

---

## 14. DAFTAR ASET (ASSET REGISTER)

| ID Aset | Deskripsi | Jumlah | Penanggung Jawab | Status |
|---|---|---|---|---|
| img_char_* | Pose Bima & Sari | 10 | Ilustrator | ☐ |
| img_hobby_hb01..08 | Ilustrasi hobi | 8 | Ilustrator | ☐ |
| anim_tpr_hb01..08 | Animasi gerakan TPR | 8 | Ilustrator | ☐ |
| img_comic_p1..p4 | Panel komik dialog | 4 | Ilustrator | ☐ |
| ui_* | Tombol, kartu, timer, spinner, skor, emoji | ±30 | Ilustrator | ☐ |
| vo_* | Kosakata, kalimat, pujian, Classroom English | ±60 | Pengisi Suara | ☐ |
| mus_* | Intro & lagu hobi (SIMBI) | 2 | Developer | ☐ |
| sfx_* | Klik, benar, coba lagi, tik, bel, konfeti | 6 | Developer | ☐ |
| print_* | Flashcard, kartu Charades, LKPD, refleksi, observasi | 6 | Instructional Designer | ☐ |

---

## 15. RENCANA PRODUKSI & MILESTONE

| Milestone | Luaran | Kriteria Selesai | Minggu |
|---|---|---|---|
| M0 – Kickoff | Dokumen planning ini disetujui | Ditandatangani Product Owner & Ahli Materi | 1 |
| M1 – Desain | Storyboard visual (wireframe) + naskah VO final | Semua scene punya wireframe; naskah divalidasi Ahli Materi | 1 |
| M2 – Prototipe | Navigasi + SC-03 & SC-05 berfungsi (aset sementara) | Dapat dicoba guru di proyektor | 2 |
| M3 – Alpha | Semua scene berfungsi, aset final ≥ 70% | Tidak ada bug kritis | 3 |
| M4 – Beta | Aset 100%, Teacher's Corner, bahan cetak | Lolos uji QA bagian 16 | 4 |
| M5 – Rilis 1.0 | Paket ZIP offline + Panduan Cepat Guru | Lolos validasi ahli & uji coba kelas | 5 |

---

## 16. QUALITY ASSURANCE & UJI PENERIMAAN

### 16.1 Kasus Uji Utama

| ID | Skenario | Hasil yang Diharapkan |
|---|---|---|
| QA-01 | Buka `index.html` tanpa internet | Semua scene, gambar, audio, font tampil normal |
| QA-02 | Navigasi → / ← dari SC-00 s.d. SC-12 | Tidak ada scene yang terlewat atau macet |
| QA-03 | Klik setiap kartu kosakata | Audio sesuai kata, tidak terpotong, tidak tumpang tindih |
| QA-04 | Charades: Pick a card 20× | Kartu acak, tidak sama dua kali berturut-turut |
| QA-05 | Timer 30 detik + skor 1/2 | Bel berbunyi tepat waktu; skor bertambah benar |
| QA-06 | Proyektor 1024×768 | Tidak ada teks terpotong; tombol tetap terlihat |
| QA-07 | Laptop RAM 4 GB | Waktu muat scene < 2 detik |
| QA-08 | Cetak lembar dari Teacher's Corner | PDF rapi di kertas A4 |
| QA-09 | Hapus data observasi | Data hilang dari penyimpanan lokal |

### 16.2 Tingkat Bug
- **Kritis:** MPI tidak bisa dibuka / scene macet / audio salah kata → wajib diperbaiki sebelum rilis.
- **Mayor:** fitur tidak berjalan tetapi ada cara lain → diperbaiki sebelum Beta.
- **Minor:** tampilan kurang rapi → boleh masuk versi 1.1.

### 16.3 Kriteria Penerimaan (Definition of Done)
- [ ] 13 layar (SC-00 s.d. SC-12) berjalan offline
- [ ] 8 kosakata lengkap dengan gambar, animasi, dan audio (normal & lambat)
- [ ] Charades: kartu acak, timer, skor 2 tim
- [ ] Dialog model dapat diputar per kalimat & mode Role A/B
- [ ] Teacher's Corner lengkap dengan Classroom English beraudio & bahan cetak
- [ ] Lolos QA-01 s.d. QA-09 tanpa bug kritis
- [ ] Skor validasi ahli ≥ 3,25

---

## 17. EVALUASI MEDIA

### 17.1 Validasi Ahli (skala 1–4)

| Aspek | Butir Penilaian |
|---|---|
| Materi | Kesesuaian dengan CP Fase B & TP · Ketepatan kosakata & ungkapan · Ketepatan pelafalan audio · Kesesuaian dengan buku Kelas 3 Chapter 5 |
| Pembelajaran | Memicu interaksi lisan murid · Penerapan TPR, permainan, tanya-jawab · Kesesuaian usia · Ada asesmen formatif |
| Media | Keterbacaan dari belakang kelas · Kemudahan navigasi · Kualitas gambar & audio · Konsistensi desain |
| Teknis | Berjalan offline · Tidak ada error · Kecepatan muat |

### 17.2 Tahapan Uji Coba di SD
1. **Uji perorangan:** 3 murid kelas III (kemampuan tinggi, sedang, rendah) → kejelasan gambar & audio.
2. **Uji kelompok kecil:** 8–10 murid → keterlaksanaan Charades & tanya-jawab.
3. **Uji lapangan:** 1 kelas penuh dengan guru kelas → keterlaksanaan alur 70 menit.

### 17.3 Lembar Observasi Guru (untuk murid)

| Aspek | 4 – Sangat Baik | 3 – Baik | 2 – Cukup | 1 – Perlu Bimbingan |
|---|---|---|---|---|
| Pelafalan kata hobi | Jelas & tepat | Jelas, 1–2 kekeliruan kecil | Dapat dipahami dengan bantuan | Belum dapat diucapkan |
| Bertanya "Do you like…?" | Lancar, intonasi naik | Lancar, intonasi datar | Perlu contoh | Belum mampu |
| Menjawab Yes/No | Tepat & spontan | Tepat setelah jeda | Perlu bantuan | Belum mampu |
| Keberanian berinteraksi | Aktif mengajak teman | Mau berbicara saat giliran | Berbicara jika didampingi | Belum mau berbicara |

---

## 18. DAFTAR RISIKO

| ID | Risiko | Peluang | Dampak | Mitigasi |
|---|---|---|---|---|
| R-01 | Speaker kelas tidak cukup keras | Sedang | Tinggi | Audio dinormalisasi; guru menirukan ulang; saran speaker eksternal |
| R-02 | Proyektor tidak tersedia | Sedang | Tinggi | Semua kegiatan punya versi cetak (flashcard, kartu Charades, LKPD) |
| R-03 | Murid malu berbicara | Tinggi | Sedang | Mulai dari menyanyi bersama → pasangan → kelompok → individu |
| R-04 | Kelas terlalu ramai saat Charades/Find Someone Who | Sedang | Sedang | Timer terlihat jelas; sinyal tenang "1-2-3, eyes on me!" |
| R-05 | Lisensi lagu/audio resmi tidak boleh disebar | Rendah | Tinggi | Pastikan izin penggunaan; siapkan lagu alternatif orisinal |
| R-06 | Waktu produksi terbatas | Sedang | Sedang | Prioritaskan SC-03, SC-05, SC-07 (inti); sisanya bertahap |

---

## 19. PANDUAN CEPAT GURU (1 Halaman)
1. Salin folder `build/` ke laptop → klik dua kali `index.html` → tekan **F** untuk layar penuh.
2. Gunakan **→** untuk lanjut, **Spasi** untuk memutar suara, **N** untuk melihat catatan guru.
3. Saat Charades: **R** ambil kartu · **T** timer · **1 / 2** skor tim.
4. Butuh bahan cetak? Buka **Teacher's Corner** (tahan 🔒 2 detik) → tab **Unduhan Cetak**.
5. Waktu terbatas? Pakai **Menu** untuk memilih kegiatan yang diperlukan saja.

---

## 20. LAMPIRAN

### 20.1 Referensi
- RPTM Pertemuan 7 PKGSD-MBI: Chapter 5 My Hobby (Lampiran 1–5).
- Buku Bahasa Inggris SD/MI Kelas 3, Chapter 5: My Hobby.
- Ruang GTK Topic 3 – Module 4: Asking about likes and dislikes.
- Audio pembelajaran resmi (SIMBI): lagu hobi; Chapter 5 Pertemuan 3_Audio1.

### 20.2 Catatan Lisensi Aset
| Aset | Sumber | Lisensi | Catatan |
|---|---|---|---|
| _(isi saat produksi)_ | | | |

### 20.3 Glosarium
- **MPI:** Media Pembelajaran Interaktif.
- **TPR (Total Physical Response):** belajar bahasa dengan merespons melalui gerakan tubuh.
- **Charades:** permainan tebak gaya.
- **VO (Voice Over):** rekaman suara narasi/dialog.
- **QA (Quality Assurance):** pengujian mutu produk.
- **RACI:** pembagian peran Responsible, Accountable, Consulted, Informed.

### 20.4 Prompt Set Siap Pakai
Seluruh prompt produksi ada di **`PROMPT_SET_MPI_My-Hobby_v1.0.md`** (folder yang sama):

| Bagian | Isi | Untuk Bagian Planning |
|---|---|---|
| A | Style Anchor (pesan pembuka ChatGPT) | 9 Gaya Visual |
| B–C | Character sheet & 10 pose Bima/Sari | 9.5 Karakter |
| D–E | 8 kartu hobi & 8 strip gerakan TPR | 5.1 Kosakata, 8 SC-03/SC-04 |
| F–I | 5 latar, 4 panel komik, 9 UI kit, logo | 8 Storyboard, 14 Aset |
| J | 6 bahan cetak PDF (flashcard, kartu Charades, LKPD, refleksi, observasi) | 8 SC-12, 17.3 |
| K | 83 baris naskah VO siap TTS, lagu hobi orisinal, musik intro, SFX | 10 Audio |
| L | 6 prompt pengembangan kode bertahap | 12 Teknis, 15 Milestone, 16 QA |
| M | Pelacak eksekusi | 15 Milestone |

Aset berkode **SHR-** (character sheet & kartu hobi) dipakai bersama oleh Gim "Hobby Hunt".

### 20.5 Persetujuan

| Peran | Nama | Tanda Tangan | Tanggal |
|---|---|---|---|
| Product Owner | | | |
| Ahli Materi | | | |
| Ahli Media | | | |
