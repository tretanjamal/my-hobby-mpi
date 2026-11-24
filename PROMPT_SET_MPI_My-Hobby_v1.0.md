# PROMPT SET SIAP PAKAI — MPI "My Hobby — Let's Play & Talk!"
### Production Prompt Library · Bahasa Inggris SD Kelas III (Fase B)

---

## KONTROL DOKUMEN

| Item | Keterangan |
|---|---|
| Kode Dokumen | MPI-MH-PRM-001 |
| Versi | 1.0 |
| Tanggal | 23 November 2026 |
| Dokumen Induk | `PLANNING_MPI_My-Hobby_v1.1.md` (bagian 8 Storyboard, 9 Gaya Visual, 10 Audio, 14 Aset) |
| Target Alat | **Gambar:** ChatGPT (pembuatan gambar) · **Bahan cetak:** ChatGPT (membuat PDF dari gambar yang diunggah) · **Suara:** alat Text-to-Speech / rekaman guru · **Musik:** generator musik AI / rekaman · **Kode:** ChatGPT atau Claude Code |
| Dipakai Juga Oleh | Gim "Hobby Hunt" — aset berkode **SHR-** dipakai bersama; cukup dibuat sekali di sini |

---

## 0. CARA PAKAI

### 0.1 Urutan Eksekusi (wajib berurutan)
| Urutan | Bagian | Isi | Jumlah Prompt |
|---|---|---|---|
| 1 | A | Style Anchor (tempel pertama di setiap chat baru) | 1 |
| 2 | B | Character sheet Bima & Sari (**SHR**) | 2 |
| 3 | C | Pose karakter | 10 |
| 4 | D | Kartu ilustrasi hobi (**SHR**) | 8 |
| 5 | E | Frame gerakan TPR | 8 |
| 6 | F | Latar scene | 5 |
| 7 | G | Panel komik dialog | 4 |
| 8 | H | UI kit & ikon | 9 |
| 9 | I | Logo | 1 |
| 10 | J | Bahan cetak (PDF) | 6 |
| 11 | K | Audio: naskah TTS, lagu, SFX | 3 set |
| 12 | L | Prompt pengembangan (kode) | 6 |

### 0.2 Aturan Kerja di ChatGPT
1. **Satu chat per bagian** (mis. chat "MPI – C Pose Karakter"). Pesan pertama selalu **Style Anchor (A-01)**.
2. Untuk semua gambar yang memuat Bima/Sari: **unggah character sheet final** (`SHR-CHR-01`, `SHR-CHR-02`) bersama prompt.
3. **Satu prompt = satu gambar.** Jika hasil kurang tepat, pakai **prompt perbaikan** (0.4), jangan menulis ulang dari nol agar gaya tetap konsisten.
4. Unduh hasil → **ganti nama sesuai kolom "File"** → simpan ke folder tujuan.
5. Centang status di **Pelacak Eksekusi** (bagian M) dan catat sumber di Lampiran Lisensi planning.
6. **Jangan minta teks di dalam gambar** (kecuali logo). Semua kata Inggris ditambahkan lewat kode agar ejaannya pasti benar dan bisa diganti.

### 0.3 Ukuran Gambar
| Kode | Ukuran ChatGPT | Dipakai untuk |
|---|---|---|
| SQ | 1024 × 1024 (persegi) | Kartu hobi, ikon, panel komik |
| LS | 1536 × 1024 (landscape) | Latar, character sheet, strip frame |
| PT | 1024 × 1536 (portrait) | Pose karakter berdiri |

> Latar 16:9: potong hasil LS menjadi 1536 × 864, lalu tampilkan dengan `background-size: cover`.

### 0.4 Prompt Perbaikan Cepat
| Masalah | Tempel prompt ini |
|---|---|
| Latar tidak transparan | `Keep everything exactly the same, but make the background fully transparent (PNG with alpha).` |
| Wajah/pakaian karakter berubah | `Redraw using the uploaded character sheet exactly: same face, hair, skin tone, uniform, colors, and proportions. Change nothing else.` |
| Muncul huruf/angka | `Remove every letter, word, and number from the image. Keep everything else identical.` |
| Terlalu ramai | `Simplify the image: fewer small details, bigger shapes, more empty space around the main subject.` |
| Gerakan kurang jelas | `Make the action pose bigger and more exaggerated so a child can recognize the hobby from far away.` |
| Gaya bergeser | `Match the style guide from my first message: flat vector, thick rounded dark outlines, one soft shadow tone, chibi proportions.` |
| Tangan/jari aneh | `Fix the hands: each hand has five simple rounded fingers in a natural position. Keep everything else the same.` |

### 0.5 Ceklis Mutu Setiap Gambar
- [ ] Karakter sama dengan character sheet (wajah, kulit, seragam, proporsi)
- [ ] Tidak ada teks, logo, merek, atau tanda air
- [ ] Latar transparan bila diminta
- [ ] Masih jelas saat diperkecil 25% (uji keterbacaan dari belakang kelas)
- [ ] Gerakan hobi sesuai gerakan TPR di planning
- [ ] Pakaian sopan dan sesuai anak SD; tidak ada stereotip
- [ ] Tangan, jari, dan mata wajar

### 0.6 Palet Warna Hobi (untuk prompt)
| ID | Hobi | Warna Aksen |
|---|---|---|
| HB01 | swimming | `#1E88E5` biru |
| HB02 | playing football | `#43A047` hijau |
| HB03 | dancing | `#8E24AA` ungu |
| HB04 | singing | `#D81B60` merah muda |
| HB05 | reading books | `#EF6C00` oranye |
| HB06 | riding a bike | `#F9A825` kuning |
| HB07 | drawing | `#00897B` hijau toska |
| HB08 | cooking | `#795548` cokelat |

### 0.7 Status Pemakaian Aset di Build MPI (per DEV-06, 24 Nov 2026)
Tidak semua gambar di prompt set dipakai oleh kode MPI. Kerjakan yang **WAJIB** lebih dulu.

| Status | Prompt | Keterangan |
|---|---|---|
| **WAJIB** (dipakai layar MPI) | SHR-CHR-01/02 (acuan), C-01, C-02, C-05, C-06, C-10, SHR-HB-01 – 08, E-01 – 08, F-01 – 05, G-01 – 04, H-04, I-01 | 32 gambar yang dicek oleh tombol **🔍 Periksa kelengkapan file** di Teacher's Corner (tab E) |
| **WAJIB untuk bahan cetak** | H-08 (dipakai J-05), H-04 (dipakai J-02) | Diunggah ke ChatGPT saat membuat PDF |
| **Dipakai Gim, bukan MPI** | H-05, H-06, H-08 | Disalin ke folder Gim Edukasi (prompt set Gim bagian B) |
| **OPSIONAL** (belum dipakai) | C-03, C-04, C-07, C-08, C-09, H-01, H-02, H-03, H-07, H-09 | Ikon & tombol MPI sudah digambar dengan kode; boleh dilewati atau disimpan untuk pengembangan berikutnya |

> Setelah gambar terkumpul, jalankan `MPI/tools/optimasi_gambar.py` agar setiap file ≤ 300 KB (planning 12.4).

---

## A. STYLE ANCHOR

### A-01 · Style Anchor (pesan pertama setiap chat)
```text
STYLE GUIDE — apply to every image I ask for in this chat.
Flat 2D vector illustration for Indonesian elementary school children aged 8–9.
Thick, smooth, rounded outlines in dark plum (#2D2A32). Simple cel shading with only one soft shadow tone.
Rounded, friendly shapes. Chibi proportions: head about one third of the total body height, big expressive eyes, small simple hands with five rounded fingers.
Bright, cheerful, high-contrast colors. Default background: warm cream (#FFF8EC) unless I ask for a transparent background.
Clean, uncluttered composition with generous empty space so it is readable on a classroom projector.
Culturally Indonesian setting. Modest, age-appropriate clothing.
Absolutely no text, letters, numbers, logos, brand names, or watermarks unless I explicitly ask for them.
Reply only "OK" and wait for my next prompt.
```

---

## B. CHARACTER SHEET (SHR — dipakai MPI & Gim)

### SHR-CHR-01 · Character Sheet Bima
| File | Ukuran | Latar | Simpan ke |
|---|---|---|---|
| `img_char_bima_sheet.png` | LS | Cream | `build/assets/img/char/` |
```text
Character design sheet of BIMA, an 8-year-old Indonesian boy, following the style guide.
Appearance: warm medium-brown skin, round face, big dark-brown eyes, short black hair with a small cowlick at the front, friendly wide smile.
Outfit: Indonesian public elementary school uniform — white short-sleeved button shirt with a small red-and-white badge on the left pocket, short red necktie, red knee-length shorts, black belt, white socks, black school shoes.
Layout: three full-body views in one row, same size, evenly spaced — front view, three-quarter view, side view. Below them, a row of four head close-ups showing expressions: happy, surprised, thinking, proud.
Plain cream background, no text or labels.
```

### SHR-CHR-02 · Character Sheet Sari
| File | Ukuran | Latar | Simpan ke |
|---|---|---|---|
| `img_char_sari_sheet.png` | LS | Cream | `build/assets/img/char/` |
```text
Character design sheet of SARI, an 8-year-old Indonesian girl, following the style guide.
Appearance: warm light-brown skin, round face, big dark eyes, rosy cheeks, gentle cheerful smile.
Outfit: white school hijab covering hair and neck, white long-sleeved button shirt with a small red-and-white badge on the left pocket, short red necktie, long red skirt reaching the ankles, white socks, black school shoes.
Layout: three full-body views in one row, same size, evenly spaced — front view, three-quarter view, side view. Below them, a row of four head close-ups showing expressions: happy, surprised, thinking, proud.
Plain cream background, no text or labels.
```

> ✅ Setelah kedua sheet disetujui, **semua prompt berikutnya yang memuat Bima/Sari wajib mengunggah sheet ini**.

---

## C. POSE KARAKTER (unggah SHR-CHR-01 / 02)

Semua: ukuran **PT**, **latar transparan**, simpan ke `build/assets/img/char/`.

### C-01 · Bima Menyapa — `img_char_bima_wave.png`
```text
Using the uploaded character sheet of Bima exactly: full-body Bima standing, facing the viewer, waving hello with his right hand raised high, big happy smile. Centered, transparent background, no text.
```

### C-02 · Bima Menunjuk — `img_char_bima_point.png`
```text
Using the uploaded character sheet of Bima exactly: full-body Bima standing in three-quarter view, pointing with his right index finger to the right side of the image as if showing something, curious smile. Centered, transparent background, no text.
```

### C-03 · Bima Senang — `img_char_bima_happy.png`
```text
Using the uploaded character sheet of Bima exactly: full-body Bima jumping slightly with both fists raised in celebration, eyes shut with joy, big open smile. Centered, transparent background, no text.
```

### C-04 · Bima Berpikir — `img_char_bima_think.png`
```text
Using the uploaded character sheet of Bima exactly: full-body Bima standing, one hand on his chin, eyes looking up, thinking expression. Centered, transparent background, no text.
```

### C-05 · Bima Bersepeda — `img_char_bima_bike.png`
```text
Using the uploaded character sheet of Bima exactly: Bima riding a small red children's bicycle, side view facing right, wearing a yellow bicycle helmet over his hair, both hands on the handlebars, one foot pushing a pedal, happy expression, small motion lines behind the wheels. Transparent background, no text.
```

### C-06 · Sari Menyapa — `img_char_sari_wave.png`
```text
Using the uploaded character sheet of Sari exactly: full-body Sari standing, facing the viewer, waving hello with her left hand raised high, big happy smile. Centered, transparent background, no text.
```

### C-07 · Sari Menunjuk — `img_char_sari_point.png`
```text
Using the uploaded character sheet of Sari exactly: full-body Sari standing in three-quarter view, pointing with her left index finger to the left side of the image as if showing something, curious smile. Centered, transparent background, no text.
```

### C-08 · Sari Senang — `img_char_sari_happy.png`
```text
Using the uploaded character sheet of Sari exactly: full-body Sari clapping her hands with joy, eyes shut happily, big open smile, small sparkle shapes around her. Centered, transparent background, no text.
```

### C-09 · Sari Berpikir — `img_char_sari_think.png`
```text
Using the uploaded character sheet of Sari exactly: full-body Sari standing, index finger touching her cheek, eyes looking up, thinking expression. Centered, transparent background, no text.
```

### C-10 · Sari Bernyanyi — `img_char_sari_sing.png`
```text
Using the uploaded character sheet of Sari exactly: full-body Sari singing happily into a pink handheld microphone held in her right hand, eyes closed, mouth open in song, three small music note symbols floating near her. Centered, transparent background, no text.
```

---

## D. KARTU ILUSTRASI HOBI (SHR — dipakai MPI & Gim)

Semua: ukuran **SQ**, latar **cream + lingkaran lembut warna aksen**, unggah character sheet yang sesuai, simpan ke `build/assets/img/hobby/`.
Pembagian tokoh sengaja **tidak stereotip** (Bima menari & memasak, Sari bermain bola).

### SHR-HB-01 · Swimming — `img_hobby_hb01.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Bima: Bima swimming happily in a bright blue pool, wearing a blue rash-guard shirt and swim shorts, swim goggles on his forehead, both arms clearly doing a breaststroke movement in front of his chest, small water splashes. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #1E88E5 behind him. Simple enough to recognize from the back of a classroom.
```

### SHR-HB-02 · Playing Football — `img_hobby_hb02.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Sari: Sari playing football on a small patch of green grass, wearing a school PE outfit — long-sleeved green sports shirt, long track pants, white sports hijab, sneakers — her right leg kicking a black-and-white football, determined happy face. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #43A047 behind her.
```

### SHR-HB-03 · Dancing — `img_hobby_hb03.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Bima: Bima dancing joyfully in his school uniform, both arms swinging to one side, body leaning with the movement, one foot lifted, big smile, small motion lines around his arms. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #8E24AA behind him.
```

### SHR-HB-04 · Singing — `img_hobby_hb04.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Sari: Sari singing into a handheld microphone held right in front of her mouth, eyes closed happily, three music note symbols floating around her. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #D81B60 behind her.
```

### SHR-HB-05 · Reading Books — `img_hobby_hb05.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Sari: Sari sitting cross-legged, holding a big open storybook with both hands spread like an open book, smiling while reading, a small stack of colorful books beside her (blank covers). Large and centered. Background: cream (#FFF8EC) with a big soft circle in #EF6C00 behind her.
```

### SHR-HB-06 · Riding a Bike — `img_hobby_hb06.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Bima: Bima riding a small red children's bicycle, three-quarter view, wearing a yellow helmet, both hands gripping the handlebars, legs pedaling, happy face, small motion lines. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #F9A825 behind him.
```

### SHR-HB-07 · Drawing — `img_hobby_hb07.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Sari: Sari drawing a simple sun and flower on a sheet of paper resting on a small easel, holding a crayon in her right hand, a box of colorful crayons beside her, focused happy face. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #00897B behind her.
```

### SHR-HB-08 · Cooking — `img_hobby_hb08.png`
```text
Square flashcard illustration, no text. Using the uploaded character sheet of Bima: Bima wearing a small yellow apron over his school uniform, stirring a pot with a wooden spoon on a low wooden table (no fire, no stove, child-safe), a little steam rising, proud happy face. Large and centered. Background: cream (#FFF8EC) with a big soft circle in #795548 behind him.
```

---

## E. FRAME GERAKAN TPR (untuk animasi)

Setiap gambar berisi **4 frame berjajar** yang nanti dipotong menjadi animasi CSS/sprite.
Semua: ukuran **LS**, **latar transparan**, unggah character sheet, simpan ke `build/assets/anim/`.

> Pola prompt sama untuk semua; hanya baris "Movement" yang berbeda.

### E-01 · TPR Swimming — `anim_tpr_hb01.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and the same foot position in every frame, transparent background, no borders, no text.
Character: Bima from the uploaded character sheet, standing on dry ground in his school uniform (a mime gesture, not in water).
Movement: breaststroke arm gesture — frame 1 hands together in front of chest, frame 2 arms pushing forward, frame 3 arms sweeping out to the sides, frame 4 hands returning to the chest.
```

### E-02 · TPR Playing Football — `anim_tpr_hb02.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Sari from the uploaded character sheet, in her school uniform (a mime gesture, no ball).
Movement: kicking gesture — frame 1 standing ready, frame 2 right leg swinging back, frame 3 right leg kicking forward, frame 4 arms up in celebration.
```

### E-03 · TPR Dancing — `anim_tpr_hb03.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Bima from the uploaded character sheet, in his school uniform.
Movement: simple dance — frame 1 both arms swinging to the left, frame 2 arms up high, frame 3 both arms swinging to the right, frame 4 arms down with a little hop.
```

### E-04 · TPR Singing — `anim_tpr_hb04.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Sari from the uploaded character sheet, in her school uniform, using her fist as a pretend microphone.
Movement: frame 1 fist raised to mouth, frame 2 mouth wide open singing with head tilted left, frame 3 head tilted right, frame 4 other arm stretched out to the side like a performer.
```

### E-05 · TPR Reading Books — `anim_tpr_hb05.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Sari from the uploaded character sheet, in her school uniform, no real book (a mime gesture).
Movement: frame 1 palms pressed together in front of chest, frame 2 palms slowly opening like a book, frame 3 palms fully open with eyes looking down reading, frame 4 smiling at the open palms.
```

### E-06 · TPR Riding a Bike — `anim_tpr_hb06.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Bima from the uploaded character sheet, in his school uniform, standing (a mime gesture, no bicycle).
Movement: both fists held forward as if gripping handlebars — frame 1 left knee up, frame 2 both feet down, frame 3 right knee up, frame 4 both feet down with a big smile.
```

### E-07 · TPR Drawing — `anim_tpr_hb07.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Sari from the uploaded character sheet, in her school uniform, holding a pencil.
Movement: drawing a big circle in the air with the pencil — frame 1 pencil at top, frame 2 pencil at right, frame 3 pencil at bottom, frame 4 pencil at left with a proud smile.
```

### E-08 · TPR Cooking — `anim_tpr_hb08.png`
```text
Sprite strip of 4 animation frames in one horizontal row, equal size, evenly spaced, same character at the same scale and position in every frame, transparent background, no borders, no text.
Character: Bima from the uploaded character sheet, in his school uniform, holding a wooden spoon (a mime gesture, no pot).
Movement: stirring in a circle — frame 1 spoon on the left, frame 2 spoon at the front, frame 3 spoon on the right, frame 4 lifting the spoon to taste with a happy face.
```

---

## F. LATAR SCENE

Semua: ukuran **LS**, simpan ke `build/assets/img/bg/`. Latar dibuat **tenang dan rendah detail** agar kartu & teks di depannya tetap terbaca.

### F-01 · Latar Cover (SC-00) — `bg_cover.png`
```text
Wide background illustration for a title screen, no characters, no text. A cheerful Indonesian elementary school front yard on a sunny morning: a simple one-story school building with red roof tiles, a flagpole with a red-and-white flag, two shady trees, green grass, a few clouds. Soft pastel colors, low detail, with a large empty area in the center for a title logo. Style guide applies.
```

### F-02 · Latar Halaman Sekolah (SC-01, SC-02) — `bg_schoolyard.png`
```text
Wide background illustration, no characters, no text. Indonesian elementary school yard: green grass, a paved path, a small bike rack, a tree with a round bench, flowers along a fence, blue sky. Soft colors, low detail, open empty space in the lower middle where characters will stand. Style guide applies.
```

### F-03 · Latar Kelas (SC-03 s.d. SC-09) — `bg_classroom_soft.png`
```text
Wide background illustration, no characters, no text. A bright Indonesian elementary classroom viewed from the front: a green chalkboard (blank), wooden desks in rows, a window with sunlight, a few colorful paper decorations on the wall. Very soft, slightly faded pastel colors and low detail, so content placed on top stays easy to read. Style guide applies.
```

### F-04 · Latar Panggung Game Time (SC-05) — `bg_gametime_stage.png`
```text
Wide background illustration, no characters, no text. A small, fun school stage with simple curtains in purple and yellow, two spotlights, bunting flags (blank, no letters) across the top, a clear empty floor in the center. Festive but not cluttered. Style guide applies.
```

### F-05 · Latar Refleksi (SC-10, SC-11) — `bg_reflection_sky.png`
```text
Wide background illustration, no characters, no text. A calm late-afternoon sky over a school field: soft orange and pink gradient sky, gentle round clouds, a distant row of small trees, short green grass. Very soft and peaceful, low detail. Style guide applies.
```

---

## G. PANEL KOMIK DIALOG (SC-06)

Semua: ukuran **SQ**, unggah **kedua** character sheet, simpan ke `build/assets/img/comic/`.
Balon kata **kosong** — kalimat ditambahkan lewat kode.

### G-01 · Panel 1 — `img_comic_p1.png`
```text
Comic panel, square, no text anywhere. Setting: a school park with a small swimming pool visible in the background. Bima (from his uploaded sheet) on the left, facing Sari, eyebrows raised, one hand gesturing toward the pool as if asking a question. Sari (from her uploaded sheet) on the right, listening. An EMPTY white speech bubble above Bima's head with its tail pointing to him. Style guide applies.
```

### G-02 · Panel 2 — `img_comic_p2.png`
```text
Comic panel, square, no text anywhere. Same park setting with the pool in the background. Sari on the right gently shaking her head with a small polite smile, one hand raised and waving "no". Bima on the left listening. An EMPTY white speech bubble above Sari's head with its tail pointing to her. Style guide applies.
```

### G-03 · Panel 3 — `img_comic_p3.png`
```text
Comic panel, square, no text anywhere. Same park setting, now a small outdoor stage with a microphone stand visible in the background. Bima on the left pointing at the microphone stand with a curious, hopeful face, asking a question. Sari on the right looking at the stage. An EMPTY white speech bubble above Bima's head with its tail pointing to him. Style guide applies.
```

### G-04 · Panel 4 — `img_comic_p4.png`
```text
Comic panel, square, no text anywhere. Same setting with the small stage. Sari on the right beaming with joy, giving a thumbs-up and nodding, small sparkles around her. Bima on the left smiling back. An EMPTY white speech bubble above Sari's head with its tail pointing to her. Style guide applies.
```

---

## H. UI KIT & IKON

Semua: **latar transparan**, simpan ke `build/assets/img/ui/`. Lembar ikon dipotong per ikon setelah diunduh.

### H-01 · Ikon Navigasi — `ui_icons_nav_sheet.png` (SQ)
```text
Icon sheet: 8 round button icons arranged in a 4 by 2 grid, equal size, evenly spaced, transparent background, no text.
Each icon is a white symbol on a solid circle in #2B59C3 with a thick dark plum outline and a soft drop shadow:
1 home house, 2 left arrow (back), 3 right arrow (next), 4 speaker with sound waves, 5 small turtle (slow audio), 6 eye with a slash (hide), 7 dice, 8 padlock.
Flat vector, consistent stroke width, child-friendly.
```

### H-02 · Ikon Hobi Kecil — `ui_icons_hobby_sheet.png` (SQ)
```text
Icon sheet: 8 simple flat object icons in a 4 by 2 grid, equal size, evenly spaced, transparent background, no text, no people.
1 swimming goggles (blue #1E88E5), 2 football (green #43A047 accent), 3 dancing shoes with motion lines (purple #8E24AA), 4 handheld microphone (pink #D81B60), 5 open book (orange #EF6C00), 6 small bicycle (yellow #F9A825), 7 crayon and paper (teal #00897B), 8 cooking pot with wooden spoon (brown #795548).
Thick dark plum outlines, one soft shadow tone, readable at small sizes.
```

### H-03 · Ikon Tujuan Belajar (SC-02) — `ui_icons_goals_sheet.png` (LS)
```text
Three large round icons in one row, equal size, evenly spaced, transparent background, no text.
1 a smiling mouth with a speech bubble (speaking), 2 a cheerful child silhouette dancing with motion lines (moving), 3 two children facing each other with a question-mark speech bubble between them (asking a friend).
Soft colors: blue, purple, green. Thick dark plum outlines.
```

### H-04 · Punggung Kartu Charades — `ui_card_back.png` (PT)
```text
The back of a playing card for a children's guessing game, portrait, rounded corners, transparent background outside the card.
Design: deep blue (#2B59C3) card with a cream border, a big friendly cream question-mark symbol in the center, small stars and confetti shapes around it. No other text.
```

### H-05 · Timer & Bel — `ui_timer_sheet.png` (SQ)
```text
Two items side by side, transparent background, no text, no numbers:
1 a big empty circular timer ring (thick track in light grey with a bright orange progress arc covering three quarters), 2 a cute round alarm clock with a happy face.
Flat vector, thick dark plum outlines.
```

### H-06 · Papan Skor Tim — `ui_team_banners.png` (LS)
```text
Two blank shield-shaped team banners side by side, transparent background, no text, no numbers:
left banner in blue (#2B59C3) with a star emblem, right banner in orange (#EF6C00) with a lightning emblem. Each has an empty cream area in the middle for a score. Flat vector, thick dark plum outlines.
```

### H-07 · Roda Spinner — `ui_spinner_wheel.png` (SQ) — *OPSIONAL, boleh dilewati*
> Sejak DEV-04, roda di SC-07 digambar langsung dengan kode agar irisan, warna, dan posisi hobi selalu pas dengan hasil putaran. Gambar ini hanya perlu dibuat bila ingin dipakai untuk bahan cetak atau promosi.
```text
A flat spinner wheel seen from the front, transparent background, no text, no icons inside the slices.
Six equal slices colored in this clockwise order: #1E88E5, #43A047, #8E24AA, #D81B60, #EF6C00, #F9A825. Cream hub in the center, thick dark plum outline, a separate red triangle pointer placed at the top outside the wheel.
```

### H-08 · Emoji Refleksi — `ui_emoji_sheet.png` (LS)
```text
Three original round face icons in one row, equal size, transparent background, no text:
1 very happy — big open grin and sparkly eyes (bright yellow), 2 happy — gentle closed-mouth smile (light yellow), 3 unsure — small flat mouth and eyes looking aside (pale blue).
Flat vector, thick dark plum outlines, simple and friendly.
```

### H-09 · Hadiah & Efek — `ui_rewards_sheet.png` (SQ)
```text
Reward items sheet in a 3 by 2 grid, transparent background, no text:
1 a big shiny gold star, 2 an empty star outline, 3 a gold trophy, 4 a round sticker badge with a smiling star, 5 a cluster of colorful confetti pieces, 6 a green check mark in a circle.
Flat vector, thick dark plum outlines, cheerful colors.
```

---

## I. LOGO

### I-01 · Logo MPI — `img_logo.png` (LS, transparan)
Simpan ke: `build/assets/img/`
```text
Title logo for a children's English learning app. This is the only image where text is allowed.
Main text exactly: "My Hobby" — big, rounded, bubbly letters in #2B59C3 with a thick cream outline and a dark plum outer outline.
Subtitle below exactly: "Let's Play & Talk!" — smaller rounded letters in #EF6C00.
Small decorations around the text: a football, a microphone, a book, a bicycle, and music notes.
Transparent background. Check that every word is spelled exactly as written.
```

---

## J. BAHAN CETAK (ChatGPT membuat PDF)

Unggah gambar yang disebut, lalu tempel prompt. Simpan ke `build/print/`.

### J-01 · Flashcard A4 — `print_flashcards.pdf`
Unggah: `img_hobby_hb01.png` s.d. `img_hobby_hb08.png`
```text
Create a print-ready PDF (A4 portrait, 1 cm margins) using the 8 uploaded hobby images.
Layout: 2 columns × 3 rows of flashcards per page (2 pages). Each card has rounded corners, a dashed cutting border, the image on top, and the word below in a large, clear, rounded sans-serif font, lowercase, dark color #2D2A32:
swimming, playing football, dancing, singing, reading books, riding a bike, drawing, cooking.
Under each word, add the Indonesian meaning in smaller grey text: berenang, bermain sepak bola, menari, menyanyi, membaca buku, bersepeda, menggambar, memasak.
Give me the PDF file to download.
```

### J-02 · Kartu Charades — `print_charades_cards.pdf`
Unggah: `img_hobby_hb01.png` s.d. `img_hobby_hb06.png`, `ui_card_back.png`
```text
Create a print-ready PDF (A4 portrait) of charades cards for children.
Page 1: 6 cards (2 columns × 3 rows) — each with a hobby image and the word in large rounded font: swimming, playing football, dancing, singing, reading books, riding a bike. Dashed cutting lines.
Page 2: the card-back image repeated in the same 2 × 3 positions, mirrored horizontally so it lines up for double-sided printing.
Add a small footer on page 1: "Act it out! Ask: What is my hobby?"
Give me the PDF file to download.
```

### J-03 · LKPD Find Someone Who — `print_lkpd_findsomeonewho.pdf`
Unggah: `img_hobby_hb01.png` s.d. `img_hobby_hb06.png`
```text
Create a one-page print-ready worksheet PDF (A4 portrait) for grade 3 children.
Header: "Find Someone Who" (large, rounded font), then a line "Name: ____________  Class: ______".
Instruction box: "Walk around the class. Ask your friends: Do you like ...? Write your friend's name!"
Grid: 2 columns × 3 rows of boxes. Each box shows one uploaded hobby image, the sentence "Find someone who likes [hobby]." and a writing line "Friend's name: ____________".
Hobbies in order: swimming, playing football, dancing, singing, reading books, riding a bike.
Bottom: a speech-bubble reminder: "Do you like ...? — Yes, I do. / No, I don't."
Clean, large fonts, plenty of white space. Give me the PDF file to download.
```

### J-04 · LKPD I Can Do More — `print_lkpd_icandomore.pdf`
Unggah: `img_hobby_hb07.png`, `img_hobby_hb08.png`
```text
Create a one-page enrichment worksheet PDF (A4 portrait) for grade 3 children titled "I Can Do More!".
Part 1 "New words": the two uploaded images with the words "drawing" and "cooking" under them, and a small checkbox "I can say it!" next to each.
Part 2 "Draw your hobby": a large empty rounded frame for drawing.
Part 3 "Tell your family": the sentence frame "I like ______________." with a writing line, and a small line "Family signature: ________".
Large rounded fonts, child-friendly, plenty of white space. Give me the PDF file to download.
```

### J-05 · Lembar Refleksi Murid — `print_refleksi_murid.pdf`
Unggah: `ui_emoji_sheet.png`
```text
Create a one-page self-reflection sheet PDF (A4 portrait) for grade 3 children, written in Indonesian.
Title: "Refleksi Diriku". Line: "Nama: ____________  Kelas: ______".
Instruction: "Berikan tanda centang (✓) pada wajah yang paling sesuai dengan perasaanmu!"
Table with 3 columns — Pernyataan | Pilihan Wajah | Catatanku:
Row 1: "Saya bisa menyebutkan 6 nama hobi dalam bahasa Inggris." | three faces from the uploaded image labelled "Sangat Bisa", "Bisa", "Perlu Belajar" with a checkbox under each | "Kata favoritku: ________"
Row 2: "Saya berani memperagakan gerakan hobi dan mengucapkannya di depan teman." | the same three faces labelled "Sangat Senang", "Senang", "Malu" | "Perasaanku: ________"
Large fonts, generous row height. Give me the PDF file to download.
```

### J-06 · Lembar Observasi Guru — `print_observasi_guru.pdf`
```text
Create a print-ready teacher observation sheet PDF (A4 landscape) in Indonesian.
Title: "Lembar Observasi Berbicara — Bahasa Inggris Kelas III, Chapter 5: My Hobby". Lines for "Kelas", "Tanggal", "Guru".
Table with columns: No | Nama Murid | Pelafalan Kata Hobi (1–4) | Bertanya "Do you like...?" (1–4) | Menjawab Yes/No (1–4) | Keberanian Berinteraksi (1–4) | Jumlah | Catatan. Provide 30 numbered rows.
Below the table, a rubric box:
4 = Sangat Baik, 3 = Baik, 2 = Cukup, 1 = Perlu Bimbingan.
Pelafalan: 4 jelas & tepat; 3 jelas, 1–2 kekeliruan kecil; 2 dapat dipahami dengan bantuan; 1 belum dapat diucapkan.
Bertanya: 4 lancar, intonasi naik; 3 lancar, intonasi datar; 2 perlu contoh; 1 belum mampu.
Menjawab: 4 tepat & spontan; 3 tepat setelah jeda; 2 perlu bantuan; 1 belum mampu.
Keberanian: 4 aktif mengajak teman; 3 mau berbicara saat giliran; 2 berbicara jika didampingi; 1 belum mau berbicara.
Give me the PDF file to download.
```

---

## K. AUDIO

> ChatGPT versi web **tidak menghasilkan file audio** untuk diunduh. Gunakan alat Text-to-Speech (TTS) pilihan Anda atau **rekam suara guru** dengan naskah di bawah. Spesifikasi akhir: MP3 128 kbps, mono, rata-rata −16 LUFS (lihat planning bagian 10.1).
> **Simpan ke:** `vo_*.mp3` → `build/assets/audio/vo/` · `mus_*.mp3` → `build/assets/audio/music/` · `sfx_*.mp3` → `build/assets/audio/sfx/`. Nama file = kolom `id` + `.mp3`.

### K-01 · Naskah VO Siap TTS / Rekam (format `id|pembicara|teks|arahan`)
Pembicara: **NAR** = narator dewasa (jelas, ramah) · **BIM** = anak laki-laki ±8 th · **SAR** = anak perempuan ±8 th · **GURU** = guru dewasa.
```text
vo_sc01_bima|BIM|Hi, friends! I'm Bima. I like riding a bike! What about you?|ceria, ramah
vo_sc01_sari|SAR|Hi! I'm Sari. I like singing!|ceria
vo_sc02_goal1|NAR|I can say my hobby.|jelas, perlahan
vo_sc02_goal2|NAR|I can move and sing.|jelas, perlahan
vo_sc02_goal3|NAR|I can ask my friend.|jelas, perlahan
vo_hb01_normal|NAR|swimming|tempo normal
vo_hb01_slow|NAR|swim... ming|lambat, per suku kata
vo_hb02_normal|NAR|playing football|tempo normal
vo_hb02_slow|NAR|play... ing... foot... ball|lambat, per suku kata
vo_hb03_normal|NAR|dancing|tempo normal
vo_hb03_slow|NAR|dan... cing|lambat, per suku kata
vo_hb04_normal|NAR|singing|tempo normal
vo_hb04_slow|NAR|sing... ing|lambat, per suku kata
vo_hb05_normal|NAR|reading books|tempo normal
vo_hb05_slow|NAR|read... ing... books|lambat, per suku kata
vo_hb06_normal|NAR|riding a bike|tempo normal
vo_hb06_slow|NAR|rid... ing... a... bike|lambat, per suku kata
vo_hb07_normal|NAR|drawing|tempo normal
vo_hb07_slow|NAR|draw... ing|lambat, per suku kata
vo_hb08_normal|NAR|cooking|tempo normal
vo_hb08_slow|NAR|cook... ing|lambat, per suku kata
vo_pointto_hb01|NAR|Point to swimming!|instruksi ceria
vo_pointto_hb02|NAR|Point to playing football!|instruksi ceria
vo_pointto_hb03|NAR|Point to dancing!|instruksi ceria
vo_pointto_hb04|NAR|Point to singing!|instruksi ceria
vo_pointto_hb05|NAR|Point to reading books!|instruksi ceria
vo_pointto_hb06|NAR|Point to riding a bike!|instruksi ceria
vo_bimasays_hb01|BIM|Bima says: swimming!|bermain, semangat
vo_bimasays_hb02|BIM|Bima says: playing football!|bermain, semangat
vo_bimasays_hb03|BIM|Bima says: dancing!|bermain, semangat
vo_bimasays_hb04|BIM|Bima says: singing!|bermain, semangat
vo_bimasays_hb05|BIM|Bima says: reading books!|bermain, semangat
vo_bimasays_hb06|BIM|Bima says: riding a bike!|bermain, semangat
vo_plain_hb01|BIM|Swimming!|bermain, tanpa "Bima says"
vo_plain_hb02|BIM|Playing football!|bermain
vo_plain_hb03|BIM|Dancing!|bermain
vo_plain_hb04|BIM|Singing!|bermain
vo_plain_hb05|BIM|Reading books!|bermain
vo_plain_hb06|BIM|Riding a bike!|bermain
vo_ex01_hb01|BIM|Do you like swimming?|intonasi NAIK di akhir
vo_ex01_hb02|BIM|Do you like playing football?|intonasi NAIK di akhir
vo_ex01_hb03|BIM|Do you like dancing?|intonasi NAIK di akhir
vo_ex01_hb04|BIM|Do you like singing?|intonasi NAIK di akhir
vo_ex01_hb05|BIM|Do you like reading books?|intonasi NAIK di akhir
vo_ex01_hb06|BIM|Do you like riding a bike?|intonasi NAIK di akhir
vo_ex02|SAR|Yes, I do.|senang, intonasi turun
vo_ex03|SAR|No, I don't.|sopan, intonasi turun
vo_ex04|BIM|What is my hobby?|menantang, ceria
vo_ex05_hb01|SAR|It is swimming!|yakin
vo_ex05_hb02|SAR|It is playing football!|yakin
vo_ex05_hb03|SAR|It is dancing!|yakin
vo_ex05_hb04|SAR|It is singing!|yakin
vo_ex05_hb05|SAR|It is reading books!|yakin
vo_ex05_hb06|SAR|It is riding a bike!|yakin
vo_dialog_l01|BIM|Do you like swimming?|dialog, intonasi naik
vo_dialog_l02|SAR|No, I don't.|dialog
vo_dialog_l03|BIM|Do you like singing?|dialog, intonasi naik
vo_dialog_l04|SAR|Yes, I do!|dialog, gembira
vo_sc09_intro|NAR|Listen and choose.|instruksi
vo_reflect_01|NAR|I can say six hobbies.|tenang
vo_reflect_02|NAR|I am brave to move and speak.|tenang
vo_praise_01|NAR|Great job!|antusias
vo_praise_02|NAR|Fantastic effort!|antusias
vo_praise_03|NAR|Well done!|antusias
vo_praise_04|NAR|Nice try!|lembut, menyemangati
vo_tryagain|NAR|Try again!|lembut, menyemangati
vo_ce_01|GURU|Good morning, class!|ramah
vo_ce_02|GURU|How are you today?|ramah, intonasi naik
vo_ce_03|GURU|Are you ready?|semangat
vo_ce_04|GURU|Look at the picture.|instruksi jelas
vo_ce_05|GURU|Listen and repeat.|instruksi jelas
vo_ce_06|GURU|Stand up, please.|instruksi jelas
vo_ce_07|GURU|Sit down, please.|instruksi jelas
vo_ce_08|GURU|Sing along and do the gesture!|semangat
vo_ce_09|GURU|Let's play Charades!|semangat
vo_ce_10|GURU|It's your turn!|semangat
vo_ce_11|GURU|Show your card!|semangat
vo_ce_12|GURU|Guess the action!|semangat
vo_ce_13|GURU|Ask your partner: Do you like...?|instruksi jelas
vo_ce_14|GURU|Now swap!|instruksi jelas
vo_ce_15|GURU|Walk around the class.|instruksi jelas
vo_ce_16|GURU|How do you feel today?|lembut
vo_ce_17|GURU|See you next time!|ceria
```

### K-02 · Lagu Hobi Orisinal (cadangan bila lagu resmi SIMBI tidak dapat dipakai) — `mus_hobby_song.mp3`
Prompt untuk generator musik AI (atau dinyanyikan guru dengan nada lagu anak sederhana):
```text
Style: cheerful children's action song, 110 BPM, major key, ukulele, xylophone and light hand-clap percussion, clear child-friendly vocals, very clear English pronunciation, about 90 seconds, with short pauses after each hobby line so children can do the gesture.
Lyrics:
[Verse]
I like swimming, swim, swim, swim!
I like football, kick, kick, kick!
I like dancing, turn, turn, turn!
I like singing, la, la, la!
I like reading, read, read, read!
I like riding, ride my bike!
[Chorus]
Do you like it? Yes, I do!
What's your hobby? Tell me too!
Do you like it? Yes, I do!
My hobby, your hobby, me and you!
[Repeat verse and chorus]
```

### K-03 · Musik Intro & SFX — `mus_intro.mp3`, `sfx_*.mp3`
Prompt musik intro:
```text
A 10-second cheerful intro jingle for a children's English lesson app: ukulele and glockenspiel, bright and bouncy, ends with a soft "ta-da" chime. No vocals.
```
Daftar SFX (cari di pustaka SFX bebas royalti atau buat dengan generator SFX):
| File | Deskripsi |
|---|---|
| `sfx_click.mp3` | Bunyi "pop" lembut saat tombol ditekan (< 0,2 detik) |
| `sfx_correct.mp3` | Dentingan xylophone naik 3 nada, ceria (< 1 detik) |
| `sfx_tryagain.mp3` | Bunyi "boing" lembut dan lucu, tidak mengagetkan (< 1 detik) |
| `sfx_tick.mp3` | Detak jam halus untuk timer (loop) |
| `sfx_buzzer.mp3` | Bel ramah tanda waktu habis, bukan buzzer keras (< 1,5 detik) |
| `sfx_confetti.mp3` | Letupan konfeti + tepuk tangan anak singkat (± 2 detik) |

---

## L. PROMPT PENGEMBANGAN (KODE)

Dipakai di ChatGPT atau Claude Code. **Unggah/lampirkan `PLANNING_MPI_My-Hobby_v1.1.md`** pada prompt pertama. Jalankan berurutan; uji setiap tahap sebelum lanjut.

### DEV-01 · Kerangka & Navigasi
```text
You are building an offline HTML5 interactive learning media for Indonesian grade-3 English classes, following the attached planning document exactly.
Task: create the project skeleton in folder build/: index.html, css/style.css, js/app.js, js/audio.js, data/content.json.
Requirements:
- Vanilla HTML/CSS/JS only, no frameworks, no CDN, must work by double-clicking index.html (file://), so do not use fetch() for local JSON — load content via a <script> that defines window.CONTENT.
- 1920x1080 stage that scales to fit any screen (letterbox), 80px safe area.
- Scene router for SC-00 to SC-12 with Back/Next buttons, a Menu, and keyboard shortcuts: arrows, Space (play main audio), R, T, 1, 2, N (teacher notes), M (menu), F (fullscreen).
- Teacher Notes panel per scene (toggle with N), text from content.json.
- Use the color tokens and fonts from section 9 of the planning (fonts loaded locally from assets/fonts).
- Placeholder boxes where images are not yet available, using the exact asset file names from the planning.
Deliver all files completely.
```

### DEV-02 · SC-01 s.d. SC-04 (Sapaan, Tujuan, Kosakata, Lagu TPR)
```text
Continue the project. Implement scenes SC-01, SC-02, SC-03, and SC-04 exactly as in planning section 8.
- SC-03: 3x2 grid of hobby cards; clicking a card zooms it, plays vo_hbXX_normal twice, and shows the TPR animation (4-frame sprite strip anim_tpr_hbXX.png animated with CSS steps(4)). Buttons: replay, slow audio (vo_hbXX_slow), Hide word, and "Point to..." mode with teacher-marked correct/try-again feedback.
- SC-04: play mus_hobby_song.mp3 with synced lyric highlighting from data/lyrics_timing; add "Bima Says" mode that randomly plays vo_bimasays_hbXX or vo_plain_hbXX.
- Audio must never overlap: starting a new clip stops the previous one.
Deliver only changed and new files, completely.
```

### DEV-03 · SC-05 Game Time: Charades
```text
Continue the project. Implement SC-05 Charades as in planning section 8:
- "Pick a card" shows a random hobby card for 3 seconds then flips it face-down (ui_card_back.png); never the same card twice in a row.
- 30-second circular timer (T to start/stop) with sfx_tick and sfx_buzzer at zero.
- Two team scoreboards (keys 1 and 2, or click) with sfx_correct and confetti animation.
- "Reveal" button flips the card and plays vo_ex05_hbXX.
- Teacher settings: timer 20/30/45 s.
Deliver only changed and new files, completely.
```

### DEV-04 · SC-06 s.d. SC-09 (Dialog, Pasangan, Find Someone Who, Kuis)
```text
Continue the project. Implement SC-06 to SC-09 as in planning section 8:
- SC-06: 4 comic panels with speech-bubble text placed in HTML over the images; click a panel to play its line; Karaoke mode highlights each line while playing; Role A / Role B buttons mute one speaker's lines; show rising/falling intonation arrows.
- SC-07: spinner (ui_spinner_wheel.png) with hobby icons positioned in each slice by code; R spins with easing; shows the sentence frame "Do you like ___?" filled with the selected hobby and plays vo_ex01_hbXX; Swap roles button and round counter.
- SC-08: 6 hobby boxes with a 5-minute timer; teacher can type a name into each box during report back; names are NOT saved after leaving the scene.
- SC-09: 6 "listen and choose" items, 3 picture options labelled A/B/C; teacher clicks the class answer; show class score and list the missed words.
Deliver only changed and new files, completely.
```

### DEV-05 · SC-10 s.d. SC-12 (Refleksi, Pengayaan, Teacher's Corner)
```text
Continue the project. Implement SC-10, SC-11, and SC-12 as in planning section 8:
- SC-10: two reflection statements with audio; three emoji buttons with counters entered by the teacher; simple bar chart drawn with HTML/CSS.
- SC-11: cards for drawing and cooking with audio, plus the enrichment task.
- SC-12 Teacher's Corner: opened by holding the lock icon for 2 seconds; tabs A–E from the planning; Classroom English list with audio buttons (vo_ce_XX); observation rubric as a checkable table saved to localStorage with a "Clear all data" button; print tab linking to the PDFs in build/print/.
Deliver only changed and new files, completely.
```

### DEV-06 · QA & Paket Rilis
```text
Review the whole project against planning section 16 (QA-01 to QA-09) and section 12.4 (performance).
1. List every problem you find with file and line, then fix them.
2. Make sure every asset referenced in code exists under the exact file names in the planning; list missing assets.
3. Add a README.txt for teachers in Indonesian based on planning section 19 (Panduan Cepat Guru).
4. Explain how to package build/ as a ZIP for distribution to schools.
Deliver changed files completely.
```

---

## M. PELACAK EKSEKUSI

| ID | File Output | Bergantung Pada | Status |
|---|---|---|---|
| A-01 | — (pesan pembuka) | — | ☐ |
| SHR-CHR-01 | img_char_bima_sheet.png | A-01 | ☐ |
| SHR-CHR-02 | img_char_sari_sheet.png | A-01 | ☐ |
| C-01 – C-05 | img_char_bima_*.png | SHR-CHR-01 | ☐ ☐ ☐ ☐ ☐ |
| C-06 – C-10 | img_char_sari_*.png | SHR-CHR-02 | ☐ ☐ ☐ ☐ ☐ |
| SHR-HB-01 – 08 | img_hobby_hb01–08.png | SHR-CHR-01/02 | ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ |
| E-01 – E-08 | anim_tpr_hb01–08.png | SHR-CHR-01/02 | ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ |
| F-01 – F-05 | bg_*.png | A-01 | ☐ ☐ ☐ ☐ ☐ |
| G-01 – G-04 | img_comic_p1–p4.png | SHR-CHR-01/02 | ☐ ☐ ☐ ☐ |
| H-01 – H-09 | ui_*.png | A-01 | ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ |
| I-01 | img_logo.png | A-01 | ☐ |
| J-01 – J-06 | print_*.pdf | D, H-04, H-08 | ☐ ☐ ☐ ☐ ☐ ☐ |
| K-01 | vo_*.mp3 (83 file) | — | ☐ |
| K-02 – K-03 | mus_*.mp3, sfx_*.mp3 | — | ☐ |
| DEV-01 – 06 | build/ | Aset tersedia (boleh placeholder) | ☐ ☐ ☐ ☐ ☐ ☐ |

**Total:** 47 prompt gambar · 6 prompt PDF · 83 baris VO · 2 musik · 6 SFX · 6 prompt kode.
