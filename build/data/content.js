/* =========================================================
   MPI "My Hobby — Let's Play & Talk!" — Data Konten
   Sumber: PLANNING_MPI_My-Hobby_v1.1.md (bagian 5, 6, 8)
   Catatan: disimpan sebagai .js (bukan .json) agar MPI bisa
   dibuka langsung dari file:// tanpa server.
   ========================================================= */
window.CONTENT = {
  meta: {
    title: "My Hobby",
    subtitle: "Let's Play & Talk!",
    version: "0.1.0 (DEV-01)",
    grade: "Bahasa Inggris SD Kelas III (Fase B) — Chapter 5: My Hobby"
  },

  /* 5.1 Kosakata */
  hobbies: [
    { id: "hb01", word: "swimming",         meaning: "berenang",           tpr: "Mendayung tangan gaya dada",           color: "#1E88E5", core: true },
    { id: "hb02", word: "playing football", meaning: "bermain sepak bola", tpr: "Menendang bola",                       color: "#43A047", core: true },
    { id: "hb03", word: "dancing",          meaning: "menari",             tpr: "Mengayunkan tangan & tubuh",           color: "#8E24AA", core: true },
    { id: "hb04", word: "singing",          meaning: "menyanyi",           tpr: "Memegang mikrofon di depan mulut",     color: "#D81B60", core: true },
    { id: "hb05", word: "reading books",    meaning: "membaca buku",       tpr: "Membuka telapak tangan seperti buku",  color: "#EF6C00", core: true },
    { id: "hb06", word: "riding a bike",    meaning: "bersepeda",          tpr: "Memegang stang & mengayuh kaki",       color: "#F9A825", core: true },
    { id: "hb07", word: "drawing",          meaning: "menggambar",         tpr: "Menggerakkan pensil di udara",         color: "#00897B", core: false },
    { id: "hb08", word: "cooking",          meaning: "memasak",            tpr: "Mengaduk panci",                       color: "#795548", core: false }
  ],

  /* 4.2 – 4.3 Tujuan & indikator */
  goals: [
    { icon: "🗣️", text: "I can say my hobby.",   audio: "vo_sc02_goal1", color: "#1E88E5" },
    { icon: "🕺", text: "I can move and sing.",  audio: "vo_sc02_goal2", color: "#8E24AA" },
    { icon: "🤝", text: "I can ask my friend.",  audio: "vo_sc02_goal3", color: "#43A047" }
  ],
  learningObjectives: [
    "TP-1 Menyebutkan nama hobi dalam bahasa Inggris dengan pelafalan yang dapat dipahami.",
    "TP-2 Merespons kata hobi yang didengar dengan gerakan yang sesuai (TPR).",
    "TP-3 Menanyakan kesukaan teman dengan \"Do you like ___?\" dan menjawab \"Yes, I do. / No, I don't.\" secara berpasangan."
  ],
  indicators: [
    "I-1 Menyebutkan ≥ 5 dari 6 nama hobi saat ditunjukkan gambar",
    "I-2 Memperagakan gerakan yang tepat saat mendengar kata hobi",
    "I-3 Menebak hobi dari gerakan teman: \"It is ___!\"",
    "I-4 Mengajukan \"Do you like ___?\" dengan intonasi naik",
    "I-5 Menjawab \"Yes, I do / No, I don't\" sesuai kenyataan",
    "I-6 Melakukan ≥ 3 kali tanya-jawab bergiliran"
  ],

  /* 5.3 Classroom English */
  /* Setiap baris: [ungkapan, file audio] — audio sesuai prompt set K-01 (null = tanpa audio) */
  classroomEnglish: [
    { stage: "Membuka",     lines: [["Good morning, class!", "vo_ce_01"], ["How are you today?", "vo_ce_02"], ["Are you ready?", "vo_ce_03"]] },
    { stage: "Instruksi",   lines: [["Look at the picture.", "vo_ce_04"], ["Listen and repeat.", "vo_ce_05"], ["Stand up, please.", "vo_ce_06"], ["Sit down, please.", "vo_ce_07"]] },
    { stage: "TPR",         lines: [["Sing along and do the gesture!", "vo_ce_08"], ["Show me swimming!", null]] },
    { stage: "Permainan",   lines: [["Let's play Charades!", "vo_ce_09"], ["It's your turn!", "vo_ce_10"], ["Show your card!", "vo_ce_11"], ["Guess the action!", "vo_ce_12"]] },
    { stage: "Berpasangan", lines: [["Ask your partner: Do you like...?", "vo_ce_13"], ["Now swap!", "vo_ce_14"], ["Walk around the class.", "vo_ce_15"]] },
    { stage: "Pujian",      lines: [["Great job!", "vo_praise_01"], ["Fantastic effort!", "vo_praise_02"], ["Well done!", "vo_praise_03"], ["Nice try!", "vo_praise_04"]] },
    { stage: "Menutup",     lines: [["How do you feel today?", "vo_ce_16"], ["See you next time!", "vo_ce_17"]] }
  ],

  /* Lembar observasi (planning 17.3) */
  observation: {
    aspects: [
      { short: "Pelafalan",  full: "Pelafalan kata hobi",          rubric: ["Belum dapat diucapkan", "Dapat dipahami dengan bantuan", "Jelas, 1–2 kekeliruan kecil", "Jelas & tepat"] },
      { short: "Bertanya",   full: "Bertanya \"Do you like…?\"",     rubric: ["Belum mampu", "Perlu contoh", "Lancar, intonasi datar", "Lancar, intonasi naik"] },
      { short: "Menjawab",   full: "Menjawab Yes/No",               rubric: ["Belum mampu", "Perlu bantuan", "Tepat setelah jeda", "Tepat & spontan"] },
      { short: "Keberanian", full: "Keberanian berinteraksi",       rubric: ["Belum mau berbicara", "Berbicara jika didampingi", "Mau berbicara saat giliran", "Aktif mengajak teman"] }
    ],
    levels: ["1 Perlu Bimbingan", "2 Cukup", "3 Baik", "4 Sangat Baik"]
  },

  pronunciationTips: [
    "Akhiran -ing dibaca /ɪŋ/ — bunyi sengau di belakang, huruf g tidak dibaca jelas: swimm-ing, danc-ing.",
    "bike dibaca /baɪk/ — \"baik\", bukan \"bike\" sesuai ejaan.",
    "reading dibaca /ˈriːdɪŋ/ — \"ri-ding\" dengan i panjang.",
    "football dibaca /ˈfʊtbɔːl/ — \"fut-bol\".",
    "Pertanyaan Yes/No (Do you like…?) diucapkan dengan intonasi NAIK ↗ di akhir.",
    "Jawaban (Yes, I do. / No, I don't.) diucapkan dengan intonasi TURUN ↘."
  ],

  /* SC-06 dialog model */
  dialog: [
    { panel: "img_comic_p1.png", speaker: "Bima", role: "A", text: "Do you like swimming?", tone: "up",   audio: "vo_dialog_l01" },
    { panel: "img_comic_p2.png", speaker: "Sari", role: "B", text: "No, I don't.",          tone: "down", audio: "vo_dialog_l02" },
    { panel: "img_comic_p3.png", speaker: "Bima", role: "A", text: "Do you like singing?",  tone: "up",   audio: "vo_dialog_l03" },
    { panel: "img_comic_p4.png", speaker: "Sari", role: "B", text: "Yes, I do!",            tone: "down", audio: "vo_dialog_l04" }
  ],

  /* SC-04 lirik (lagu cadangan orisinal, prompt set K-02).
     Baris 1–6 terhubung ke hobi HB01–HB06 (animasi TPR ikut menyala).
     Jika memakai lagu resmi SIMBI, ganti lirik & songTiming di bawah. */
  songLyrics: [
    "I like swimming, swim, swim, swim!",
    "I like football, kick, kick, kick!",
    "I like dancing, turn, turn, turn!",
    "I like singing, la, la, la!",
    "I like reading, read, read, read!",
    "I like riding, ride my bike!",
    "Do you like it? Yes, I do!",
    "What's your hobby? Tell me too!",
    "Do you like it? Yes, I do!",
    "My hobby, your hobby, me and you!"
  ],
  chorusFrom: 6,

  /* Penanda waktu lirik (detik), cocok dengan mus_hobby_song.mp3 buatan tools/aset_otomatis/suara/buat_suara.py
     (±109 BPM, 8 ketukan = 4,4 detik per baris). Jika memakai lagu lain, sesuaikan angka ini.
     intro = detik baris pertama, lineSec = lama tiap baris, cycles = jumlah putaran bait+refrein. */
  songTiming: { intro: 4.4, lineSec: 4.4, cycles: 2 },

  reflection: [
    { text: "I can say 6 hobbies.",            audio: "vo_reflect_01" },
    { text: "I am brave to move and speak.",   audio: "vo_reflect_02" }
  ],

  printables: [
    { file: "print_flashcards.pdf",            name: "Flashcard 8 hobi (A4)" },
    { file: "print_charades_cards.pdf",        name: "Kartu Charades (bolak-balik)" },
    { file: "print_lkpd_findsomeonewho.pdf",   name: "LKPD Find Someone Who" },
    { file: "print_lkpd_icandomore.pdf",       name: "LKPD I Can Do More" },
    { file: "print_refleksi_murid.pdf",        name: "Lembar Refleksi Murid" },
    { file: "print_observasi_guru.pdf",        name: "Lembar Observasi Guru" }
  ],

  /* Bagian 6 & 8 — daftar scene. teacherOnly = tidak masuk alur linear. */
  scenes: [
    { id: "SC-00", title: "My Hobby",          menu: "Start",                time: "—",  mainAudio: "mus_intro",
      steps: ["Buka MPI sebelum murid masuk kelas.", "Tekan F untuk layar penuh, lalu klik START."],
      ce: ["Good morning, class!", "Are you ready?"] },

    { id: "SC-01", title: "Hello!",            menu: "Hello!",               time: "5'", mainAudio: "vo_sc01_bima",
      steps: ["Tunjuk Bima yang sedang bersepeda dan tanyakan kegiatannya.", "Terima jawaban dalam bahasa Indonesia, lalu modelkan dalam bahasa Inggris.", "Tekan Spasi untuk memutar suara Bima."],
      ce: ["Look! What is Bima doing?", "Today we will talk about hobbies."] },

    { id: "SC-02", title: "Today I can…",      menu: "Today I Can",          time: "3'", mainAudio: "vo_sc02_goal1",
      keys: "Spasi buka kartu berikutnya",
      steps: ["Buka kartu satu per satu (klik kartu atau tekan Spasi).", "Ucapkan tujuan bersama murid sambil memperagakan ikon.", "Jelaskan singkat dalam bahasa Indonesia bila perlu."],
      ce: ["Today I can…", "Say it with me!"] },

    { id: "SC-03", title: "Let's Learn",       menu: "Let's Learn",          time: "8'", mainAudio: "vo_ce_05",
      keys: "Spasi ulang kata · R mode Point to… / soal berikutnya · Esc tutup kartu",
      steps: ["Klik kartu: kartu membesar, kata diputar 2× dan gerakan TPR tampil.", "Putar setiap kata 2–3 kali: keras, pelan, lalu berbisik (🐢 untuk versi lambat).", "Mode \"Point to…\": murid menunjuk gambar yang disebut, guru mengklik kartu yang ditunjuk murid.", "Tekankan bunyi /ŋ/ di akhir -ing."],
      ce: ["Listen and repeat.", "Say it louder!", "Point to swimming!"] },

    { id: "SC-04", title: "Sing & Move",       menu: "Sing & Move",          time: "5'", mainAudio: "mus_hobby_song",
      keys: "Spasi putar/hentikan lagu · R Bima Says berikutnya",
      steps: ["Minta murid berdiri dan pastikan ruang gerak aman.", "Putar lagu: lirik dan gerakan TPR menyala bergantian. Jika lagu belum ada, klik baris lirik sambil Anda bernyanyi.", "Mode \"Bima Says\": murid bergerak hanya jika ada kata \"Bima says\"; jika tidak, murid diam."],
      ce: ["Stand up, please!", "Sing along and do the gesture!"] },

    { id: "SC-05", title: "Game Time: Charades", menu: "Charades",           time: "10'", mainAudio: "vo_ce_09",
      keys: "R ambil kartu · T mulai/jeda timer · 1 / 2 jawaban benar Team A / B",
      steps: ["Bagi kelas menjadi Team A dan Team B (giliran ditandai ⭐; klik nama tim untuk mengubah).", "Tekan R: kartu tampil 3 detik untuk pemeran, murid lain menutup mata.", "Tekan T untuk memulai timer, lalu tim menebak dengan kalimat lengkap: \"It is swimming!\"", "Jawaban benar: tekan 1 / 2 (atau +1 ✅) — kartu terbuka, skor bertambah, giliran pindah. Waktu habis: kartu terbuka otomatis.", "Tombol −1 untuk koreksi skor; ↺ Reset untuk permainan baru."],
      ce: ["Let's play Charades!", "Team A, it's your turn!", "Show your card!", "Guess the action!", "What is my hobby?"] },

    { id: "SC-06", title: "Let's Listen",      menu: "Let's Listen",         time: "6'", mainAudio: "vo_dialog_l01",
      keys: "Spasi karaoke · Esc hentikan",
      steps: ["Klik panel untuk memutar satu kalimat; 🎤 Karaoke memutar keempat kalimat berurutan dengan sorotan.", "\"Class is A\": suara Bima dibisukan dan kelas mengucapkan kalimat Bima saat muncul 🗣 Your turn!; lalu \"Class is B\" untuk bagian Sari.", "Bagi kelas dua sisi: kiri = Bima, kanan = Sari, lalu tukar.", "Perhatikan intonasi naik ↗ pada pertanyaan dan turun ↘ pada jawaban."],
      ce: ["Listen carefully.", "Who likes singing?", "You are A, I am B."] },

    { id: "SC-07", title: "Let's Talk",        menu: "Let's Talk",           time: "8'", mainAudio: "vo_ce_13",
      keys: "R / klik SPIN putar roda · Spasi ulang pertanyaan",
      steps: ["Modelkan dulu bersama satu murid.", "Putar roda: kalimat \"Do you like ___?\" terisi dan diputar; Partner yang bertanya mengulanginya, pasangan menjawab jujur.", "Klik \"Yes, I do.\" / \"No, I don't.\" untuk contoh jawaban.", "🔄 Swap roles untuk bertukar peran setiap ronde."],
      ce: ["Ask your partner: Do you like…?", "Now swap!", "Great job!"] },

    { id: "SC-08", title: "Find Someone Who",  menu: "Find Someone Who",     time: "10'", mainAudio: "vo_ce_15",
      keys: "T mulai/jeda timer 5 menit · Enter pindah kotak nama",
      steps: ["Bagikan LKPD Find Someone Who, lalu tekan T untuk timer 5 menit.", "Murid berkeliling bertanya: \"Do you like…?\" / \"What is your hobby?\"", "Saat melapor, klik kotak dan ketik nama teman (Enter = kotak berikutnya). Nama tidak disimpan.", "↺ Clear mengosongkan nama dan timer."],
      ce: ["Walk around the class.", "What is your hobby?", "Who likes dancing? Tell me!"] },

    { id: "SC-09", title: "Quick Check",       menu: "Quick Check",          time: "5'", mainAudio: "vo_sc09_intro",
      keys: "Spasi ulang kata · A / B / C jawaban kelas · R soal berikutnya",
      steps: ["6 soal, setiap hobi inti sekali dengan urutan acak.", "Murid mengangkat kartu A/B/C atau jari 1/2/3; klik (atau tekan A/B/C) jawaban mayoritas kelas.", "Jawaban benar menyala hijau; bila salah, jawaban yang benar ikut ditunjukkan.", "Di akhir tampil skor kelas dan kata yang perlu diulang — catat murid yang belum tepat di Lembar Observasi."],
      ce: ["Listen and choose.", "Show me A, B, or C!"] },

    { id: "SC-10", title: "My Reflection",     menu: "My Reflection",        time: "5'", mainAudio: "vo_reflect_01",
      keys: "Spasi bacakan pernyataan berikutnya",
      steps: ["Klik 🔊 (atau Spasi) untuk membacakan pernyataan; murid mengangkat tangan per emoji.", "Klik emoji sebanyak jumlah murid yang mengangkat tangan (− untuk koreksi); grafik batang menunjukkan persentasenya.", "Tanyakan \"What is your favorite word?\" dan klik kata yang disebut murid — kata terfavorit berwarna kuning.", "Akhiri dengan pujian. Angka bertahan selama MPI terbuka; ↺ Reset untuk kelas berikutnya."],
      ce: ["How do you feel today?", "Show me your face!", "Fantastic effort, everyone!"] },

    { id: "SC-11", title: "I Can Do More",     menu: "I Can Do More",        time: "5'", mainAudio: "vo_hb07_normal",
      keys: "Spasi putar kedua kata",
      steps: ["Kenalkan drawing dan cooking untuk murid yang sudah mencapai TP: klik kartu (kata diputar 2× + gerakan), 🐢 untuk versi lambat.", "Ajak murid memperagakan gerakannya, lalu bertanya: \"Do you like drawing?\"", "Bagikan LKPD I Can Do More sebagai tugas rumah."],
      ce: ["Who can say a new hobby?", "See you next time!"] },

    { id: "SC-12", title: "Teacher's Corner",  menu: "Teacher's Corner",     time: "—",  mainAudio: null, teacherOnly: true,
      steps: ["Halaman khusus guru: modul singkat, Classroom English beraudio, tips & contoh pelafalan, lembar observasi, dan bahan cetak.", "Lembar observasi tersimpan otomatis di perangkat ini; cetak dengan 🖨 dan hapus dengan 🗑 (klik dua kali) setelah dicatat."],
      ce: [] }
  ]
};
