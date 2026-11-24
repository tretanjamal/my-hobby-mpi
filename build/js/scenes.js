/* =========================================================
   Tata letak scene SC-00 … SC-12 (planning bagian 8).
   DEV-01: tata letak + placeholder aset + audio utama.
   Interaksi lengkap ditambahkan bertahap:
     DEV-02 → SC-01–SC-04 · DEV-03 → SC-05
     DEV-04 → SC-06–SC-09 · DEV-05 → SC-10–SC-12
   Setiap renderer menerima (root, api) dan boleh
   mengembalikan handler { playMain, onAction, leave }.
   ========================================================= */
window.SCENES = (function () {
  "use strict";

  const { el, asset, sprite, replay, pick, todo } = UI;
  const C = window.CONTENT;
  const core = () => C.hobbies.filter((h) => h.core);
  const hobby = (id) => C.hobbies.find((h) => h.id === id);
  const PRAISE = ["vo_praise_01", "vo_praise_02", "vo_praise_03"];

  function button(label, onClick, cls) {
    return el("button", { class: "btn " + (cls || ""), onClick }, label);
  }

  /* Pengatur timer per scene agar semuanya dibersihkan saat pindah scene */
  function timers() {
    const ids = new Set();
    return {
      later(fn, ms) { const id = setTimeout(() => { ids.delete(id); fn(); }, ms); ids.add(id); return id; },
      clear() { ids.forEach(clearTimeout); ids.clear(); }
    };
  }

  /* Data yang bertahan selama MPI terbuka (hilang bila halaman dimuat ulang) */
  const memory = {
    reflection: C.reflection.map(() => [0, 0, 0]),
    fav: {},
    tcTab: "A. Modul Singkat"
  };

  /* Lembar observasi guru — disimpan di perangkat ini saja (localStorage), bisa dihapus */
  const OBS_KEY = "mpi-myhobby-observasi-v1";
  const blankRow = () => ({ name: "", s: [0, 0, 0, 0], note: "" });
  function loadObs() {
    try {
      const data = JSON.parse(localStorage.getItem(OBS_KEY) || "null");
      if (data && Array.isArray(data.rows)) return data;
    } catch (e) { /* penyimpanan tidak tersedia */ }
    return { kelas: "", tanggal: new Date().toLocaleDateString("id-ID"), rows: Array.from({ length: 5 }, blankRow) };
  }
  function saveObs(data) {
    try { localStorage.setItem(OBS_KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }
  function clearObs() { try { localStorage.removeItem(OBS_KEY); } catch (e) { /* abaikan */ } }

  function title(scene) {
    const s = C.scenes.find((x) => x.id === scene);
    return el("div", { class: "scene-title" }, el("h1", {}, s.title), el("span", { class: "sc-id" }, s.id));
  }

  function hobbyCard(h, extraClass) {
    return el("div", { class: "card hobby-card accent-top " + (extraClass || ""), style: { borderTopColor: h.color } },
      asset("img_hobby_" + h.id + ".png", { label: h.word }),
      el("div", { class: "word" }, h.word)
    );
  }

  return {
    /* ---------- SC-00 Start ---------- */
    "SC-00": (root, api) => {
      root.append(
        asset("bg_cover.png", { cls: "scene-bg" }),
        el("div", { class: "cover" },
          asset("img_char_bima_wave.png", { cls: "cover-char", label: "Bima menyapa" }),
          el("div", { class: "cover-center" },
            asset("img_logo.png", { cls: "cover-logo", label: "My Hobby — Let's Play & Talk!" }),
            el("button", { class: "btn primary btn-start", onClick: api.start }, "START")
          ),
          asset("img_char_sari_wave.png", { cls: "cover-char", label: "Sari menyapa" })
        )
      );
    },

    /* ---------- SC-01 Hello! ----------
       Klik Bima/Sari → animasi diulang + suara. Spasi = suara Bima. */
    "SC-01": (root) => {
      const people = [
        { img: "img_char_bima_bike.png", label: "Bima bersepeda", text: "Hi! I'm Bima. I like riding a bike!", audio: "vo_sc01_bima", anim: "ride" },
        { img: "img_char_sari_sing.png", label: "Sari bernyanyi", text: "Hi! I'm Sari. I like singing!",       audio: "vo_sc01_sari", anim: "sway" }
      ];
      const items = people.map((p) => {
        const bubble = el("div", { class: "bubble" }, p.text);
        const figure = asset(p.img, { cls: "char-lg", label: p.label });
        const item = el("button", { class: "duo-item tappable", "aria-label": p.text }, bubble, figure);
        const act = () => { replay(figure, p.anim); replay(bubble, "pop"); AudioMgr.play(p.audio); };
        item.addEventListener("click", act);
        return { item, act };
      });
      root.append(
        asset("bg_schoolyard.png", { cls: "scene-bg" }),
        title("SC-01"),
        el("div", { class: "duo" }, items.map((x) => x.item))
      );
      return { playMain: items[0].act };
    },

    /* ---------- SC-02 Today I can… ----------
       3 kartu tertutup; klik/Spasi → kartu membalik + suara. */
    "SC-02": (root) => {
      let pointer = 0;
      const cards = C.goals.map((g, i) => {
        const card = el("button", { class: "goal-flip", "aria-label": "Goal " + (i + 1) },
          el("div", { class: "flip-inner" },
            el("div", { class: "face back", style: { background: g.color } }, el("span", { class: "num" }, String(i + 1))),
            el("div", { class: "face front card goal" },
              el("div", { class: "icon", style: { background: g.color + "22", borderColor: g.color } }, g.icon),
              el("p", {}, g.text)
            )
          )
        );
        card.addEventListener("click", () => reveal(i));
        return card;
      });
      function reveal(i) {
        cards[i].classList.add("flipped");
        AudioMgr.play(C.goals[i].audio);
        pointer = (i + 1) % cards.length;
      }
      root.append(
        asset("bg_schoolyard.png", { cls: "scene-bg" }),
        title("SC-02"),
        el("div", { class: "goal-row" }, cards)
      );
      return { playMain: () => reveal(pointer) };
    },

    /* ---------- SC-03 Let's Learn ----------
       Klik kartu → zoom + suara 2× + animasi TPR. Tombol: Again, Slow, Hide word, Point to…
       Mode Point to…: MPI menyebut kata acak, guru mengklik kartu yang ditunjuk murid. */
    "SC-03": (root) => {
      const words = core();
      const t = timers();
      const st = { selected: null, pointing: false, target: null, solved: false, score: 0, hidden: false };
      const cards = new Map();

      const grid = el("div", { class: "hobby-grid" }, words.map((h) => {
        const c = hobbyCard(h, "tappable");
        c.setAttribute("role", "button");
        c.addEventListener("click", () => onCard(h, c));
        cards.set(h.id, c);
        return c;
      }));
      const toolbar = el("div", { class: "toolbar" });
      const zoomLayer = el("div", { class: "zoom-layer" });

      const sayWord = (h, slow) => AudioMgr.play("vo_" + h.id + (slow ? "_slow" : "_normal"), { times: slow ? 1 : 2 });
      const needSelection = (fn) => () => {
        if (!st.selected) { UI.toast("Klik salah satu kartu terlebih dahulu."); return; }
        fn(st.selected);
      };
      const again = needSelection((h) => sayWord(h, false));
      const slow = needSelection((h) => sayWord(h, true));

      function toggleHide() {
        st.hidden = !st.hidden;
        root.classList.toggle("hide-words", st.hidden);
        renderToolbar();
      }

      function renderToolbar() {
        toolbar.innerHTML = "";
        if (!st.pointing) {
          toolbar.append(
            button("🔁 Again", again),
            button("🐢 Slow", slow),
            button(st.hidden ? "👁 Show word" : "👁 Hide word", toggleHide),
            button("🎲 Point to…", startPoint, "primary")
          );
          return;
        }
        const banner = st.solved
          ? el("div", { class: "point-banner ok" }, "✅ ", el("b", {}, st.target.word), " — Great job!")
          : el("div", { class: "point-banner" }, "👉 Point to … ", el("span", { class: "listen" }, "🔊"));
        toolbar.append(
          banner,
          el("div", { class: "point-score" }, "⭐ " + st.score),
          button("🔊 Repeat", () => AudioMgr.play("vo_pointto_" + st.target.id)),
          button("🎲 Next", nextTarget, "primary"),
          button("✖ Exit", exitPoint)
        );
      }

      function openZoom(h) {
        st.selected = h;
        zoomLayer.innerHTML = "";
        const close = () => closeZoom();
        zoomLayer.append(
          el("div", { class: "zoom-backdrop", onClick: close }),
          el("div", { class: "card zoom-card accent-top", style: { borderTopColor: h.color } },
            el("div", { class: "zoom-media" },
              asset("img_hobby_" + h.id + ".png", { cls: "zoom-img", label: h.word }),
              sprite("anim_tpr_" + h.id + ".png", { cls: "zoom-sprite play", label: "gerakan TPR" })
            ),
            el("div", { class: "word zoom-word" }, h.word),
            el("div", { class: "zoom-meta" }, h.meaning + "  ·  Gerakan: " + h.tpr),
            el("div", { class: "btn-row" },
              button("🔁 Again", () => sayWord(h, false)),
              button("🐢 Slow", () => sayWord(h, true)),
              button("✖ Close", close)
            )
          )
        );
        zoomLayer.classList.add("open");
        sayWord(h, false);
      }
      function closeZoom() { zoomLayer.classList.remove("open"); zoomLayer.innerHTML = ""; }

      function startPoint() { closeZoom(); st.pointing = true; st.score = 0; root.classList.add("pointing"); nextTarget(); }
      function exitPoint() {
        st.pointing = false; t.clear();
        root.classList.remove("pointing");
        cards.forEach((c) => c.classList.remove("correct"));
        AudioMgr.stop();
        renderToolbar();
      }
      function nextTarget() {
        t.clear();
        st.solved = false;
        st.target = pick(words, st.target);
        cards.forEach((c) => c.classList.remove("correct"));
        renderToolbar();
        AudioMgr.play("vo_pointto_" + st.target.id);
      }

      function onCard(h, c) {
        if (!st.pointing) { openZoom(h); return; }
        if (st.solved) return;
        if (h === st.target) {
          st.solved = true;
          st.score += 1;
          c.classList.add("correct");
          replay(c, "pop");
          AudioMgr.sfx("sfx_correct");
          renderToolbar();
          t.later(() => AudioMgr.play(pick(PRAISE)), 450);
        } else {
          replay(c, "shake");
          AudioMgr.sfx("sfx_tryagain");
          AudioMgr.play("vo_tryagain", { silent: true });
        }
      }

      root.append(asset("bg_classroom_soft.png", { cls: "scene-bg" }), title("SC-03"), grid, toolbar, zoomLayer);
      renderToolbar();

      return {
        playMain() {
          if (st.pointing) AudioMgr.play("vo_pointto_" + st.target.id);
          else if (st.selected) sayWord(st.selected, false);
          else AudioMgr.play("vo_ce_05");
        },
        onAction(a) {
          if (a === "random") (st.pointing ? nextTarget : startPoint)();
          if (a === "escape") closeZoom();
        },
        leave() { t.clear(); }
      };
    },

    /* ---------- SC-04 Sing & Move ----------
       Lagu dengan sorotan lirik + animasi TPR; klik baris lirik untuk menyorot manual.
       Mode Bima Says: 70% "Bima says: …" (bergerak), 30% tanpa (diam). */
    "SC-04": (root) => {
      const words = core();
      const t = timers();
      const st = { mode: "song", line: -1, call: null };

      /* Penanda waktu lirik → [{ t, line }] */
      const timing = [];
      const { intro, lineSec, cycles } = C.songTiming;
      for (let c = 0; c < cycles; c++) {
        C.songLyrics.forEach((_, i) => timing.push({ t: intro + (c * C.songLyrics.length + i) * lineSec, line: i }));
      }
      const lineAt = (sec) => {
        let found = -1;
        for (const m of timing) { if (m.t <= sec) found = m.line; else break; }
        return found;
      };

      const lyricNodes = C.songLyrics.map((line, i) => el("p", {
        class: (i >= C.chorusFrom ? "chorus " : "") + "tappable",
        onClick: () => highlight(i)
      }, line));
      const lyricsCard = el("div", { class: "card lyrics" }, lyricNodes);
      const saysCard = el("div", { class: "card says hidden" });

      const cells = new Map();
      const tprGrid = el("div", { class: "tpr-grid" }, words.map((h) => {
        const cell = el("button", { class: "card tpr-cell tappable", "aria-label": h.word },
          sprite("anim_tpr_" + h.id + ".png", { label: "gerakan TPR" }),
          el("span", { style: { color: h.color } }, h.word)
        );
        cell.addEventListener("click", () => { activate(h.id); AudioMgr.play("vo_" + h.id + "_normal"); });
        cells.set(h.id, cell);
        return cell;
      }));
      const toolbar = el("div", { class: "toolbar" });

      function activate(id) { cells.forEach((cell, key) => cell.classList.toggle("active", key === id)); }

      function highlight(i) {
        st.line = i;
        lyricNodes.forEach((n, k) => n.classList.toggle("active", k === i));
        activate(i >= 0 && i < words.length ? words[i].id : null);
      }

      function playSong() {
        setMode("song");
        renderToolbar(true);
        AudioMgr.play("mus_hobby_song", {
          silent: true,
          onTime: (sec) => { const i = lineAt(sec); if (i !== st.line) highlight(i); }
        }).then((status) => {
          highlight(-1);
          renderToolbar(false);
          if (status === "error") UI.toast("Lagu belum tersedia (mus_hobby_song.mp3). Klik baris lirik untuk menyorot sambil Anda bernyanyi.", 4500);
        });
      }
      function stopSong() { AudioMgr.stop(); }

      function setMode(mode) {
        st.mode = mode;
        lyricsCard.classList.toggle("hidden", mode !== "song");
        saysCard.classList.toggle("hidden", mode !== "bima");
        if (mode === "song") { saysCard.innerHTML = ""; st.call = null; } else highlight(-1);
        renderToolbar(false);
      }

      function bimaCall() {
        t.clear();
        if (st.mode !== "bima") { AudioMgr.stop(); setMode("bima"); }
        const h = pick(words, st.call && st.call.hobby);
        const says = Math.random() < 0.7;
        st.call = { hobby: h, says };
        const audio = (says ? "vo_bimasays_" : "vo_plain_") + h.id;
        const word = h.word.charAt(0).toUpperCase() + h.word.slice(1);
        const hint = el("div", { class: "says-hint" }, "…");
        saysCard.innerHTML = "";
        saysCard.append(
          asset("img_char_bima_point.png", { cls: "says-bima", label: "Bima" }),
          el("div", { class: "says-body" },
            el("div", { class: "says-text" }, says ? ["Bima says: ", el("b", {}, h.word + "!")] : el("b", {}, word + "!")),
            hint
          )
        );
        replay(saysCard, "pop");
        activate(null);
        const showHint = () => {
          hint.className = "says-hint " + (says ? "move" : "freeze");
          hint.textContent = says ? "✅ Move!" : "✋ Don't move!";
          if (says) activate(h.id);
        };
        AudioMgr.play(audio, { silent: true }).then((status) => {
          if (status === "stopped") return;
          if (status === "error") UI.toast("Audio belum tersedia: " + audio + ".mp3 — bacakan perintahnya.");
          t.later(showHint, status === "error" ? 1500 : 400);
        });
      }

      function renderToolbar(playing) {
        toolbar.innerHTML = "";
        if (st.mode === "song") {
          toolbar.append(
            playing ? button("⏹ Stop", stopSong) : button("▶ Play song", playSong, "primary"),
            button("🙋 Bima Says", bimaCall, "warm")
          );
        } else {
          toolbar.append(
            button("🎲 Next call", bimaCall, "warm"),
            button("🔁 Repeat", () => st.call && AudioMgr.play((st.call.says ? "vo_bimasays_" : "vo_plain_") + st.call.hobby.id)),
            button("🎵 Lyrics", () => { AudioMgr.stop(); t.clear(); activate(null); setMode("song"); })
          );
        }
      }

      root.append(
        asset("bg_classroom_soft.png", { cls: "scene-bg" }),
        title("SC-04"),
        el("div", { class: "song" }, el("div", { class: "song-left" }, lyricsCard, saysCard), tprGrid),
        toolbar
      );
      renderToolbar(false);

      return {
        playMain() {
          if (st.mode === "bima") {
            if (st.call) AudioMgr.play((st.call.says ? "vo_bimasays_" : "vo_plain_") + st.call.hobby.id);
            return;
          }
          if (AudioMgr.currentId() === "mus_hobby_song") stopSong(); else playSong();
        },
        onAction(a) { if (a === "random") bimaCall(); },
        leave() { t.clear(); }
      };
    },

    /* ---------- SC-05 Game Time: Charades ---------- */
    "SC-05": (root) => {
      const words = core();
      const t = timers();
      const RING = 2 * Math.PI * 54;
      const st = { card: null, phase: "idle", turn: "A", score: { A: 0, B: 0 }, duration: 30, left: 30, running: false, endAt: 0, interval: null, lastSec: null };
      const other = (k) => (k === "A" ? "B" : "A");

      /* --- Tim --- */
      const teams = {};
      ["A", "B"].forEach((k) => {
        const scoreEl = el("div", { class: "score" }, "0");
        const card = el("div", { class: "card team " + k.toLowerCase() },
          el("button", { class: "team-name", title: "Jadikan giliran Team " + k, onClick: () => setTurn(k) }, "Team " + k),
          scoreEl,
          el("div", { class: "turn-badge" }, "⭐ Your turn!"),
          el("div", { class: "team-btns" },
            button("−1", () => addScore(k, -1), "small-btn"),
            button("+1 ✅", () => correct(k), "small-btn success")
          )
        );
        teams[k] = { card, scoreEl };
      });

      /* --- Kartu bolak-balik --- */
      const front = el("div", { class: "face ch-front" });
      const back = el("div", { class: "face ch-back" },
        el("span", { class: "q" }, "?"),
        asset("ui_card_back.png", { cls: "ch-back-img", quiet: true })
      );
      const peekBadge = el("div", { class: "peek-badge hidden" });
      const flip = el("div", { class: "ch-flip" }, el("div", { class: "flip-inner" }, back, front), peekBadge);

      /* --- Timer lingkaran --- */
      const timerEl = el("div", { class: "ch-timer", html:
        '<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="trk" cx="60" cy="60" r="54"/><circle class="fg" cx="60" cy="60" r="54"/></svg><span class="sec"></span>' });
      const ringFg = timerEl.querySelector(".fg");
      const secEl = timerEl.querySelector(".sec");
      ringFg.style.strokeDasharray = String(RING);
      const segBtns = [20, 30, 45].map((s) => el("button", { class: "seg-btn", onClick: () => setDuration(s) }, s + "s"));

      const prompt = el("div", { class: "prompt-line" });
      const pickBtn = button("🎴 Pick a card", drawCard, "primary");
      const timerBtn = button("", toggleTimer);
      const revealBtn = button("👀 Reveal", reveal);

      function setPrompt(text) { prompt.textContent = text; }

      function setTurn(k) {
        st.turn = k;
        ["A", "B"].forEach((x) => teams[x].card.classList.toggle("turn", x === k));
        if (st.phase === "idle" || st.phase === "done") setPrompt("Team " + k + ", it's your turn! Pick a card.");
      }

      function addScore(k, d) {
        st.score[k] = Math.max(0, st.score[k] + d);
        teams[k].scoreEl.textContent = String(st.score[k]);
      }

      /* --- Timer --- */
      function renderTimer() {
        secEl.textContent = String(Math.ceil(st.left));
        ringFg.style.strokeDashoffset = String(RING * (1 - st.left / st.duration));
        timerEl.classList.toggle("low", st.running && st.left <= 5);
        timerBtn.textContent = st.running ? "⏸ Pause" : "⏱ Start timer";
        segBtns.forEach((b) => b.classList.toggle("active", b.textContent === st.duration + "s"));
      }
      function startTimer() {
        if (st.left <= 0) st.left = st.duration;
        st.running = true;
        st.endAt = performance.now() + st.left * 1000;
        st.lastSec = Math.ceil(st.left);
        clearInterval(st.interval);
        st.interval = setInterval(tick, 100);
        renderTimer();
      }
      function pauseTimer() {
        if (!st.running) return;
        st.running = false;
        clearInterval(st.interval);
        st.interval = null;
        renderTimer();
      }
      function tick() {
        st.left = Math.max(0, (st.endAt - performance.now()) / 1000);
        const s = Math.ceil(st.left);
        if (s !== st.lastSec) { st.lastSec = s; if (s > 0 && s <= 10) AudioMgr.sfx("sfx_tick"); }
        renderTimer();
        if (st.left <= 0) timeUp();
      }
      function toggleTimer() { st.running ? pauseTimer() : startTimer(); }
      function setDuration(s) {
        st.duration = s;
        if (!st.running) st.left = s;
        renderTimer();
      }

      /* --- Alur ronde --- */
      function fillFront(h) {
        front.innerHTML = "";
        front.style.borderTopColor = h.color;
        front.append(asset("img_hobby_" + h.id + ".png", { label: h.word }), el("div", { class: "word" }, h.word));
      }
      function showFront() {
        t.clear();
        peekBadge.classList.add("hidden");
        flip.classList.add("flipped");
        st.phase = "revealed";
      }

      function drawCard() {
        if (st.phase === "peek") return;
        t.clear();
        pauseTimer();
        st.left = st.duration;
        renderTimer();
        st.card = pick(words, st.card);
        fillFront(st.card);
        flip.classList.add("flipped");
        st.phase = "peek";
        AudioMgr.sfx("sfx_click");
        setPrompt("Team " + st.turn + " actor: look! Everyone else: close your eyes! 🙈");
        let n = 3;
        const count = () => {
          peekBadge.classList.remove("hidden");
          peekBadge.textContent = "👀 Actor only · " + n;
          if (n === 0) {
            flip.classList.remove("flipped");
            peekBadge.classList.add("hidden");
            st.phase = "hidden";
            setPrompt("Team " + st.turn + ": act it out! Guess: What is my hobby?");
            AudioMgr.play("vo_ex04", { silent: true });          // "What is my hobby?"
            return;
          }
          n -= 1;
          t.later(count, 1000);
        };
        count();
      }

      function reveal() {
        if (!st.card) { UI.toast("Ambil kartu terlebih dahulu (🎴 Pick a card)."); return; }
        pauseTimer();
        showFront();
        setPrompt("It is " + st.card.word + "!");
        AudioMgr.play("vo_ex05_" + st.card.id);
      }

      function sayAnswerThen(praiseId) {
        const praise = () => AudioMgr.play(praiseId, { silent: true });
        if (!st.card) { praise(); return; }
        AudioMgr.play("vo_ex05_" + st.card.id).then((s) => { if (s !== "stopped") praise(); });
      }

      function endRound() {
        st.phase = "done";
        const next = other(st.turn);
        st.turn = next;
        ["A", "B"].forEach((x) => teams[x].card.classList.toggle("turn", x === next));
      }

      function correct(k) {
        pauseTimer();
        addScore(k, 1);
        replay(teams[k].scoreEl, "pop");
        UI.confetti(root);
        AudioMgr.sfx("sfx_confetti");
        if (st.card && st.phase !== "revealed") showFront();
        setPrompt("✅ Team " + k + ": Great job!" + (st.card ? "  It is " + st.card.word + "!" : ""));
        sayAnswerThen("vo_praise_01");
        endRound();
      }

      function timeUp() {
        pauseTimer();
        AudioMgr.sfx("sfx_buzzer");
        if (st.card) showFront();
        setPrompt("⏰ Time's up! " + (st.card ? "It is " + st.card.word + ". " : "") + "Nice try!");
        sayAnswerThen("vo_praise_04");
        endRound();
      }

      root.append(
        asset("bg_gametime_stage.png", { cls: "scene-bg" }),
        title("SC-05"),
        el("div", { class: "charades" },
          teams.A.card,
          el("div", { class: "charades-center" },
            el("div", { class: "ch-top" },
              timerEl,
              el("div", { class: "seg", title: "Durasi timer" }, segBtns),
              button("↺ Reset", () => { addScore("A", -st.score.A); addScore("B", -st.score.B); st.card = null; t.clear(); flip.classList.remove("flipped"); peekBadge.classList.add("hidden"); st.phase = "idle"; pauseTimer(); st.left = st.duration; renderTimer(); setTurn("A"); }, "small-btn")
            ),
            flip,
            prompt,
            el("div", { class: "btn-row" }, pickBtn, timerBtn, revealBtn)
          ),
          teams.B.card
        )
      );
      setTurn("A");
      setPrompt("Let's play Charades! Team A, pick a card.");
      renderTimer();

      return {
        onAction(a) {
          if (a === "random") drawCard();
          else if (a === "timer") toggleTimer();
          else if (a === "scoreA") correct("A");
          else if (a === "scoreB") correct("B");
        },
        leave() { t.clear(); pauseTimer(); }
      };
    },

    /* ---------- SC-06 Let's Listen ----------
       Klik panel → kalimatnya diputar. Karaoke → 4 kalimat diputar berurutan dengan sorotan.
       "Class is A/B" → suara peran itu dibisukan; kelas mengucapkan bagiannya. */
    "SC-06": (root) => {
      const t = timers();
      const st = { run: 0, mode: null, warned: false };
      const wait = (ms) => new Promise((res) => t.later(res, ms));

      const panels = C.dialog.map((d, i) => {
        const yourTurn = el("div", { class: "your-turn hidden" }, "🗣 Your turn!");
        const node = el("button", { class: "card panel tappable", "aria-label": d.speaker + ": " + d.text },
          el("div", { class: "who" }, (i + 1) + ". " + d.speaker + " (" + d.role + ")"),
          el("div", { class: "panel-art" },
            asset(d.panel, { label: "panel komik" }),
            el("div", { class: "speech " + (d.role === "A" ? "left" : "right") },
              d.text, el("span", { class: "tone " + d.tone }, d.tone === "up" ? " ↗" : " ↘")),
            yourTurn
          )
        );
        node.addEventListener("click", () => playOne(i));
        return { node, yourTurn };
      });

      const toolbar = el("div", { class: "toolbar" });

      function focus(i, classTurn) {
        panels.forEach((p, k) => {
          p.node.classList.toggle("speaking", k === i);
          p.yourTurn.classList.toggle("hidden", !(k === i && classTurn));
        });
      }

      function stopAll() {
        st.run += 1;
        st.mode = null;
        t.clear();
        AudioMgr.stop();
        focus(-1);
        renderToolbar();
      }

      function noteMissing() {
        if (st.warned) return;
        st.warned = true;
        UI.toast("Audio dialog belum tersedia — bacakan kalimat yang disorot.", 3500);
      }

      function playOne(i) {
        stopAll();
        const my = st.run;
        focus(i, false);
        AudioMgr.play(C.dialog[i].audio).then(() => { if (my === st.run) focus(-1); });
      }

      async function playAll(muteRole) {
        stopAll();
        const my = st.run;
        st.mode = muteRole || "all";
        renderToolbar();
        for (let i = 0; i < C.dialog.length; i++) {
          if (my !== st.run) return;
          const d = C.dialog[i];
          if (d.role === muteRole) {
            focus(i, true);
            await wait(2800);                       // jeda untuk kelas mengucapkan kalimatnya
          } else {
            focus(i, false);
            const s = await AudioMgr.play(d.audio, { silent: true });
            if (s === "stopped" || my !== st.run) return;
            if (s === "error") { noteMissing(); await wait(2200); } else await wait(400);
          }
        }
        if (my === st.run) { st.mode = null; focus(-1); renderToolbar(); }
      }

      function renderToolbar() {
        toolbar.innerHTML = "";
        const on = (m) => (st.mode === m ? " on" : "");
        toolbar.append(
          button("🎤 Karaoke", () => playAll(null), "primary" + on("all")),
          button("🗣 Class is A (Bima)", () => playAll("A"), on("A")),
          button("🗣 Class is B (Sari)", () => playAll("B"), on("B")),
          button("⏹ Stop", stopAll)
        );
      }

      root.append(
        asset("bg_classroom_soft.png", { cls: "scene-bg" }),
        title("SC-06"),
        el("div", { class: "comic" }, panels.map((p) => p.node)),
        toolbar
      );
      renderToolbar();

      return {
        playMain: () => playAll(null),
        onAction(a) { if (a === "escape") stopAll(); },
        leave() { st.run += 1; t.clear(); }
      };
    },

    /* ---------- SC-07 Let's Talk ----------
       Roda 6 hobi (digambar dengan CSS agar irisan & ikon selalu pas).
       R / klik SPIN → roda berputar, kalimat "Do you like ___?" terisi + suara. */
    "SC-07": (root) => {
      const words = core();
      const t = timers();
      const SLICE = 360 / words.length;
      const st = { rot: 0, spinning: false, current: null, round: 0, swapped: false };

      const gradient = "conic-gradient(" + words.map((h, i) => h.color + " " + i * SLICE + "deg " + (i + 1) * SLICE + "deg").join(", ") + ")";
      const wheel = el("div", { class: "wheel", style: { background: gradient } },
        words.map((h, i) => {
          const angle = i * SLICE + SLICE / 2;
          return el("div", { class: "wheel-label", style: { transform: "translate(-50%, -50%) rotate(" + angle + "deg) translateY(-168px)" } },
            asset("img_hobby_" + h.id + ".png", { cls: "wheel-img", quiet: true }),
            el("span", { class: "wheel-word" }, h.word)
          );
        })
      );
      const hub = el("button", { class: "wheel-hub", onClick: spin }, "SPIN");
      const wheelWrap = el("div", { class: "wheel-wrap" }, wheel, el("div", { class: "wheel-pointer" }), hub);

      const blank = el("span", { class: "blank" });
      const roleA = el("div", { class: "role a" });
      const roleB = el("div", { class: "role b" });
      const askerLine = el("div", { class: "round" });
      const roundLine = el("span", { class: "round" });

      const frameA = el("button", { class: "card frame tappable", onClick: () => st.current && AudioMgr.play("vo_ex01_" + st.current.id) },
        roleA,
        el("p", {}, "Do you like ", blank, "?", el("span", { class: "tone up" }, " ↗"))
      );
      const frameB = el("div", { class: "card frame" },
        roleB,
        el("div", { class: "answers" },
          el("button", { class: "answer-chip yes", onClick: () => AudioMgr.play("vo_ex02") }, "Yes, I do."),
          el("button", { class: "answer-chip no", onClick: () => AudioMgr.play("vo_ex03") }, "No, I don't.")
        )
      );

      function renderRoles() {
        const asker = st.swapped ? 2 : 1;
        const answerer = st.swapped ? 1 : 2;
        roleA.textContent = String(asker);
        roleB.textContent = String(answerer);
        askerLine.textContent = "🙋 Partner " + asker + " asks  ·  🙂 Partner " + answerer + " answers";
        roundLine.textContent = "Round " + Math.max(1, st.round);
      }

      function spin() {
        if (st.spinning) return;
        const h = pick(words, st.current);
        const i = words.indexOf(h);
        const jitter = (Math.random() - 0.5) * SLICE * 0.5;
        const target = ((360 - (i * SLICE + SLICE / 2 + jitter)) % 360 + 360) % 360;
        const cur = ((st.rot % 360) + 360) % 360;
        st.rot += 360 * 4 + ((target - cur + 360) % 360);
        st.spinning = true;
        blank.textContent = "";
        blank.className = "blank";
        AudioMgr.stop();
        AudioMgr.sfx("sfx_click");
        wheel.style.transform = "rotate(" + st.rot + "deg)";
        let finished = false;
        const done = () => {
          if (finished) return;
          finished = true;
          st.spinning = false;
          st.current = h;
          st.round += 1;
          blank.textContent = h.word;
          blank.className = "blank filled";
          blank.style.color = h.color;
          replay(frameA, "pop");
          renderRoles();
          AudioMgr.play("vo_ex01_" + h.id);
        };
        wheel.addEventListener("transitionend", done, { once: true });
        t.later(done, 3500);                       // cadangan bila transitionend tidak terpicu
      }

      root.append(
        asset("bg_classroom_soft.png", { cls: "scene-bg" }),
        title("SC-07"),
        el("div", { class: "talk" },
          wheelWrap,
          el("div", { class: "frames" },
            askerLine,
            frameA,
            frameB,
            el("div", { class: "btn-row" },
              button("🎡 Spin", spin, "primary"),
              button("🔄 Swap roles", () => { st.swapped = !st.swapped; renderRoles(); replay(roleA, "pop"); replay(roleB, "pop"); }),
              roundLine
            )
          )
        )
      );
      renderRoles();

      return {
        playMain() { if (st.current) AudioMgr.play("vo_ex01_" + st.current.id); else AudioMgr.play("vo_ce_13"); },
        onAction(a) { if (a === "random") spin(); },
        leave() { t.clear(); }
      };
    },

    /* ---------- SC-08 Find Someone Who ----------
       Timer 5 menit (T / klik). Guru mengetik nama teman saat murid melapor.
       Nama TIDAK disimpan — hilang saat pindah scene. */
    "SC-08": (root) => {
      const st = { total: 300, left: 300, running: false, endAt: 0, interval: null };
      const timerBtn = el("button", { class: "timer-pill", title: "Mulai/jeda timer (T)", onClick: toggle });
      const inputs = [];

      const fmt = (sec) => {
        const s = Math.ceil(sec);
        return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      };
      function render() {
        const done = st.left <= 0;
        timerBtn.textContent = (done ? "⏰ " : st.running ? "⏸ " : "⏱ ") + fmt(st.left);
        timerBtn.classList.toggle("running", st.running);
        timerBtn.classList.toggle("low", st.running && st.left <= 30);
        timerBtn.classList.toggle("done", done);
      }
      function tick() {
        st.left = Math.max(0, (st.endAt - performance.now()) / 1000);
        if (st.left <= 0) {
          pause();
          AudioMgr.sfx("sfx_buzzer");
          UI.toast("⏰ Time's up! Back to your seats, please.", 4000);
        }
        render();
      }
      function start() {
        if (st.left <= 0) st.left = st.total;
        st.running = true;
        st.endAt = performance.now() + st.left * 1000;
        clearInterval(st.interval);
        st.interval = setInterval(tick, 250);
        render();
      }
      function pause() { st.running = false; clearInterval(st.interval); st.interval = null; render(); }
      function toggle() { st.running ? pause() : start(); }
      function clearAll() { pause(); st.left = st.total; inputs.forEach((i) => { i.value = ""; }); render(); }

      const boxes = core().map((h, idx) => {
        const input = el("input", {
          class: "name-input", type: "text", maxlength: "40", autocomplete: "off", spellcheck: "false",
          placeholder: "Friend's name…", "aria-label": "Nama teman yang suka " + h.word
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") { e.preventDefault(); (inputs[idx + 1] || inputs[0]).focus(); }
          if (e.key === "Escape") input.blur();
        });
        inputs.push(input);
        return el("div", { class: "card fsw-box accent-top", style: { borderTopColor: h.color } },
          asset("img_hobby_" + h.id + ".png", { label: h.word }),
          el("div", { class: "txt" },
            el("div", { class: "find" }, "Find someone who likes " + h.word + "."),
            el("label", { class: "name-label" }, "Friend's name:", input)
          )
        );
      });

      root.append(
        asset("bg_classroom_soft.png", { cls: "scene-bg" }),
        title("SC-08"),
        el("div", { class: "fsw-top" }, timerBtn, button("↺ Clear", clearAll, "small-btn")),
        el("div", { class: "fsw" }, boxes)
      );
      render();

      return {
        onAction(a) { if (a === "timer") toggle(); },
        leave() { clearInterval(st.interval); }
      };
    },

    /* ---------- SC-09 Quick Check ----------
       6 soal "Listen and choose" (tiap hobi inti sekali, acak). Guru mengklik jawaban mayoritas kelas
       (atau tekan A / B / C). R / Next ▶ = soal berikutnya. Akhir: skor kelas + kata yang perlu diulang. */
    "SC-09": (root) => {
      const words = core();
      const t = timers();
      const st = { items: [], i: 0, answered: false, correct: 0, missed: [] };

      const shuffle = (list) => {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
      };

      const head = el("div", { class: "quiz-head" });
      const body = el("div", { class: "quiz-body" });
      const toolbar = el("div", { class: "toolbar" });
      let optionNodes = [];

      function build() {
        st.items = shuffle(words).map((h) => ({ target: h, options: shuffle([h].concat(shuffle(words.filter((x) => x !== h)).slice(0, 2))) }));
        st.i = 0; st.correct = 0; st.missed = []; st.answered = false;
      }

      const item = () => st.items[st.i];
      const playWord = () => AudioMgr.play("vo_" + item().target.id + "_normal", { times: 2 });

      function renderItem(withIntro) {
        st.answered = false;
        head.innerHTML = "";
        head.append(
          el("span", {}, "🔊 Listen and choose."),
          el("span", { class: "round" }, "Item " + (st.i + 1) + " / " + st.items.length),
          el("span", { class: "point-score" }, "⭐ " + st.correct)
        );
        body.innerHTML = "";
        optionNodes = item().options.map((h, k) => {
          const node = el("button", { class: "card option tappable", "aria-label": "Pilihan " + "ABC"[k] },
            el("div", { class: "letter" }, "ABC"[k]),
            asset("img_hobby_" + h.id + ".png", { label: h.word })
          );
          node.addEventListener("click", () => choose(k));
          return node;
        });
        body.append(el("div", { class: "quiz-options" }, optionNodes));
        toolbar.innerHTML = "";
        toolbar.append(button("🔊 Listen again", playWord), button("Next ▶", next, "primary hidden next-btn"));
        if (withIntro) AudioMgr.play("vo_sc09_intro", { silent: true }).then((s) => { if (s !== "stopped") playWord(); });
        else playWord();
      }

      function choose(k) {
        if (st.answered || st.i >= st.items.length) return;
        st.answered = true;
        const it = item();
        const chosen = it.options[k];
        const right = it.options.indexOf(it.target);
        optionNodes[right].classList.add("correct");
        if (chosen === it.target) {
          st.correct += 1;
          replay(optionNodes[k], "pop");
          AudioMgr.sfx("sfx_correct");
          t.later(() => AudioMgr.play(pick(PRAISE), { silent: true }), 400);
        } else {
          optionNodes[k].classList.add("wrong");
          replay(optionNodes[k], "shake");
          st.missed.push(it.target);
          AudioMgr.sfx("sfx_tryagain");
          t.later(() => AudioMgr.play("vo_ex05_" + it.target.id, { silent: true }), 400);
        }
        head.querySelector(".point-score").textContent = "⭐ " + st.correct;
        toolbar.querySelector(".next-btn").classList.remove("hidden");
      }

      function next() {
        if (st.i >= st.items.length) { build(); renderItem(true); return; }
        if (!st.answered) { UI.toast("Klik jawaban kelas terlebih dahulu."); return; }
        t.clear();
        st.i += 1;
        if (st.i >= st.items.length) renderResult(); else renderItem(false);
      }

      function renderResult() {
        AudioMgr.stop();
        head.innerHTML = "";
        head.append(el("span", {}, "🏁 Quick Check — Result"));
        const total = st.items.length;
        const stars = el("div", { class: "stars-row" }, st.items.map((_, k) => el("span", { class: k < st.correct ? "on" : "" }, "★")));
        const missedBox = st.missed.length
          ? el("div", { class: "missed" },
              el("p", {}, "Let's practise these words again:"),
              el("div", { class: "btn-row" }, st.missed.map((h) => el("button", { class: "answer-chip", style: { borderColor: h.color }, onClick: () => AudioMgr.play("vo_" + h.id + "_normal") }, "🔊 " + h.word))))
          : el("p", { class: "perfect" }, "Perfect! Every word is correct! 🎉");
        body.innerHTML = "";
        body.append(el("div", { class: "card quiz-result" }, el("h2", {}, "Class score: " + st.correct + " / " + total), stars, missedBox));
        toolbar.innerHTML = "";
        toolbar.append(button("↺ Try again", () => { build(); renderItem(true); }, "primary"));
        if (st.correct >= total - 1) { UI.confetti(root); AudioMgr.sfx("sfx_confetti"); AudioMgr.play("vo_praise_02", { silent: true }); }
      }

      root.append(asset("bg_classroom_soft.png", { cls: "scene-bg" }), title("SC-09"), head, body, toolbar);
      build();
      renderItem(true);

      return {
        playMain() { if (st.i < st.items.length) playWord(); },
        onAction(a) {
          if (a === "random") next();
          if (a.startsWith("choose-")) choose("abc".indexOf(a.slice(7)));
        },
        leave() { t.clear(); }
      };
    },

    /* ---------- SC-10 My Reflection ----------
       Guru membacakan pernyataan (🔊), murid mengangkat tangan per emoji, guru mengklik emoji
       untuk menambah jumlah (− untuk mengurangi). Grafik batang menunjukkan persentase.
       Baris terakhir: hitung kata favorit kelas. Angka bertahan selama MPI terbuka. */
    "SC-10": (root, api) => {
      const FACES = [
        { f: "😃", label: "Sangat bisa / sangat senang", color: "#2E9E5B" },
        { f: "🙂", label: "Bisa / senang",               color: "#F9A825" },
        { f: "😐", label: "Perlu belajar / malu",        color: "#8FA9D6" }
      ];
      let pointer = 0;

      const rows = C.reflection.map((r, idx) => {
        const counts = memory.reflection[idx];
        const bar = el("div", { class: "stack-bar" });
        const totalEl = el("span", { class: "bar-total" });
        const faces = FACES.map((F, k) => {
          const countEl = el("span", { class: "count" });
          const btn = el("button", { class: "emoji", title: "+1 " + F.label, "aria-label": F.label + " tambah satu" }, F.f, countEl);
          btn.addEventListener("click", () => change(k, 1));
          const minus = el("button", { class: "emoji-minus", title: "−1", "aria-label": F.label + " kurangi satu", onClick: () => change(k, -1) }, "−");
          return { wrap: el("div", { class: "emoji-wrap" }, btn, minus), btn, countEl };
        });
        function change(k, d) {
          counts[k] = Math.max(0, counts[k] + d);
          if (d > 0) replay(faces[k].btn, "pop");
          render();
        }
        function render() {
          const total = counts.reduce((a, b) => a + b, 0);
          faces.forEach((x, k) => { x.countEl.textContent = String(counts[k]); });
          bar.innerHTML = "";
          if (!total) bar.append(el("span", { class: "bar-empty" }, "Klik emoji untuk mencatat jumlah murid"));
          else counts.forEach((c, k) => {
            if (c) bar.append(el("span", { class: "bar-seg", title: FACES[k].label, style: { width: (c / total) * 100 + "%", background: FACES[k].color } }, FACES[k].f + " " + Math.round((c / total) * 100) + "%"));
          });
          totalEl.textContent = total + " murid";
        }
        render();
        return el("div", { class: "card reflect-row" },
          el("div", { class: "reflect-main" },
            el("div", { class: "reflect-q" },
              el("button", { class: "say-btn", "aria-label": "Putar pernyataan", onClick: () => AudioMgr.play(r.audio) }, "🔊"),
              el("p", {}, (idx + 1) + ". " + r.text)
            ),
            el("div", { class: "bar-line" }, bar, totalEl)
          ),
          el("div", { class: "emojis" }, faces.map((x) => x.wrap))
        );
      });

      /* Kata favorit kelas */
      const favChips = core().map((h) => {
        const n = el("span", { class: "fav-count" });
        const chip = el("button", { class: "fav-chip", style: { borderColor: h.color } }, h.word, n);
        chip.addEventListener("click", () => { memory.fav[h.id] = (memory.fav[h.id] || 0) + 1; replay(chip, "pop"); renderFav(); });
        return { h, chip, n };
      });
      function renderFav() {
        const max = Math.max(0, ...favChips.map((x) => memory.fav[x.h.id] || 0));
        favChips.forEach((x) => {
          const c = memory.fav[x.h.id] || 0;
          x.n.textContent = c ? String(c) : "";
          x.chip.classList.toggle("top", c > 0 && c === max);
        });
      }
      renderFav();

      const resetBtn = button("↺ Reset", () => {
        memory.reflection.forEach((arr) => arr.fill(0));
        memory.fav = {};
        AudioMgr.stop();
        api.go("SC-10");
      }, "small-btn");

      root.append(
        asset("bg_reflection_sky.png", { cls: "scene-bg" }),
        title("SC-10"),
        el("div", { class: "reflect" },
          rows,
          el("div", { class: "card reflect-row fav-row" },
            el("p", { class: "fav" }, "👑 My favorite word is …"),
            el("div", { class: "fav-chips" }, favChips.map((x) => x.chip)),
            resetBtn
          )
        )
      );

      return {
        playMain() {
          AudioMgr.play(C.reflection[pointer].audio);
          pointer = (pointer + 1) % C.reflection.length;
        }
      };
    },

    /* ---------- SC-11 I Can Do More ----------
       Kartu drawing & cooking: klik → kata diputar 2× + animasi TPR; 🐢 = versi lambat. */
    "SC-11": (root) => {
      const items = ["hb07", "hb08"].map((id) => {
        const h = hobby(id);
        const card = hobbyCard(h, "tappable");
        card.setAttribute("role", "button");
        const slow = el("button", { class: "corner-btn", title: "Versi lambat", "aria-label": "Putar lambat " + h.word }, "🐢");
        slow.addEventListener("click", (e) => { e.stopPropagation(); say(h, true); });
        card.append(sprite("anim_tpr_" + id + ".png", { cls: "corner-sprite", quiet: true }), slow);
        card.addEventListener("click", () => say(h, false));
        return { h, card };
      });

      function say(h, slow) {
        const item = items.find((x) => x.h === h);
        items.forEach((x) => x.card.classList.toggle("active", x === item));
        replay(item.card, "pop");
        return AudioMgr.play("vo_" + h.id + (slow ? "_slow" : "_normal"), { times: slow ? 1 : 2 }).then((s) => {
          if (s !== "stopped") item.card.classList.remove("active");
          return s;
        });
      }

      root.append(
        asset("bg_reflection_sky.png", { cls: "scene-bg" }),
        title("SC-11"),
        el("div", { class: "more" },
          items.map((x) => x.card),
          el("div", { class: "card task" },
            el("h2", {}, "Your task"),
            el("p", {}, "1. Draw your hobby."),
            el("p", {}, "2. Tell your family:"),
            el("p", {}, "“I like ________.”"),
            el("a", { class: "btn small-btn task-link", href: "print/print_lkpd_icandomore.pdf", target: "_blank" }, "🖨 LKPD I Can Do More")
          )
        )
      );

      return {
        playMain() {
          say(items[0].h, false).then((s) => { if (s !== "stopped") say(items[1].h, false); });
        }
      };
    },

    /* ---------- SC-12 Teacher's Corner ----------
       A modul singkat · B Classroom English beraudio · C pelafalan + contoh kata ·
       D lembar observasi (tersimpan di perangkat, bisa dicetak & dihapus) · E bahan cetak. */
    "SC-12": (root) => {
      const ASP = C.observation.aspects;
      const obs = loadObs();
      const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
      const sum = (row) => row.s.reduce((a, b) => a + b, 0);

      function observationPanel() {
        const status = el("span", { class: "save-status" });
        const markSaved = () => { status.textContent = saveObs(obs) ? "✓ Tersimpan di perangkat ini" : "⚠ Browser ini tidak mengizinkan penyimpanan"; };
        const tbody = el("tbody");

        function renderRows() {
          tbody.innerHTML = "";
          obs.rows.forEach((row, ri) => {
            const totalCell = el("td", { class: "num" }, String(sum(row) || "–"));
            const scoreCells = ASP.map((asp, ai) => {
              const group = el("div", { class: "score-group" });
              [1, 2, 3, 4].forEach((v) => {
                const b = el("button", { class: "score-btn" + (row.s[ai] === v ? " on" : ""), title: asp.full + " — " + v + ": " + asp.rubric[v - 1] }, String(v));
                b.addEventListener("click", () => {
                  row.s[ai] = row.s[ai] === v ? 0 : v;
                  [...group.children].forEach((x, k) => x.classList.toggle("on", row.s[ai] === k + 1));
                  totalCell.textContent = String(sum(row) || "–");
                  markSaved();
                });
                group.append(b);
              });
              return el("td", {}, group);
            });
            const nameIn = el("input", { class: "obs-input", type: "text", value: row.name, placeholder: "Nama murid", maxlength: "40", "aria-label": "Nama murid " + (ri + 1) });
            nameIn.addEventListener("input", () => { row.name = nameIn.value; markSaved(); });
            const noteIn = el("input", { class: "obs-input", type: "text", value: row.note, placeholder: "Catatan", maxlength: "80", "aria-label": "Catatan murid " + (ri + 1) });
            noteIn.addEventListener("input", () => { row.note = noteIn.value; markSaved(); });
            const del = el("button", { class: "row-del", title: "Hapus baris ini" }, "✕");
            del.addEventListener("click", () => {
              obs.rows.splice(ri, 1);
              if (!obs.rows.length) obs.rows.push(blankRow());
              renderRows();
              markSaved();
            });
            tbody.append(el("tr", {}, el("td", { class: "num" }, String(ri + 1)), el("td", {}, nameIn), scoreCells, totalCell, el("td", {}, noteIn), el("td", {}, del)));
          });
        }

        const kelasIn = el("input", { class: "obs-input short", type: "text", value: obs.kelas, placeholder: "mis. III A", maxlength: "20" });
        kelasIn.addEventListener("input", () => { obs.kelas = kelasIn.value; markSaved(); });
        const tglIn = el("input", { class: "obs-input short", type: "text", value: obs.tanggal, maxlength: "20" });
        tglIn.addEventListener("input", () => { obs.tanggal = tglIn.value; markSaved(); });

        const addBtn = button("＋ Tambah murid", () => {
          if (obs.rows.length >= 40) { UI.toast("Maksimal 40 murid per lembar."); return; }
          obs.rows.push(blankRow());
          renderRows();
          markSaved();
          const inputs = tbody.querySelectorAll("tr:last-child .obs-input");
          if (inputs[0]) inputs[0].focus();
        }, "small-btn");

        /* Hapus semua: klik dua kali dalam 3 detik (tanpa dialog browser) */
        let armed = null;
        const clearBtn = button("🗑 Hapus semua data", () => {
          if (!armed) {
            clearBtn.textContent = "⚠ Klik lagi untuk menghapus";
            clearBtn.classList.add("warn");
            armed = setTimeout(() => { armed = null; clearBtn.textContent = "🗑 Hapus semua data"; clearBtn.classList.remove("warn"); }, 3000);
            return;
          }
          clearTimeout(armed);
          armed = null;
          clearObs();
          const fresh = loadObs();
          obs.kelas = fresh.kelas; obs.tanggal = fresh.tanggal; obs.rows = fresh.rows;
          kelasIn.value = obs.kelas; tglIn.value = obs.tanggal;
          clearBtn.textContent = "🗑 Hapus semua data";
          clearBtn.classList.remove("warn");
          renderRows();
          status.textContent = "Data dihapus dari perangkat ini.";
        }, "small-btn");

        function printSheet() {
          const head = "<tr><th>No</th><th>Nama Murid</th>" + ASP.map((a) => "<th class=c>" + esc(a.short) + "<br>(1–4)</th>").join("") + "<th class=c>Jumlah</th><th>Catatan</th></tr>";
          const body = obs.rows.map((r, i) => "<tr><td class=c>" + (i + 1) + "</td><td>" + esc(r.name) + "</td>" +
            r.s.map((v) => "<td class=c>" + (v || "") + "</td>").join("") + "<td class=c>" + (sum(r) || "") + "</td><td>" + esc(r.note) + "</td></tr>").join("");
          const rubric = "<tr><th>Aspek</th>" + C.observation.levels.map((l) => "<th>" + esc(l) + "</th>").join("") + "</tr>" +
            ASP.map((a) => "<tr><th>" + esc(a.full) + "</th>" + a.rubric.map((d) => "<td>" + esc(d) + "</td>").join("") + "</tr>").join("");
          const html = "<!doctype html><html lang=id><head><meta charset=utf-8><title>Lembar Observasi — My Hobby</title><style>" +
            "body{font-family:Arial,sans-serif;margin:20px;color:#222}h1{font-size:18px;margin:0 0 4px}p{margin:2px 0 12px;font-size:13px}" +
            "table{border-collapse:collapse;width:100%;margin-bottom:14px;font-size:12px}th,td{border:1px solid #555;padding:5px 6px;vertical-align:top;text-align:left}" +
            "th{background:#eee}.c{text-align:center;width:62px}@page{size:A4 landscape;margin:12mm}</style></head><body>" +
            "<h1>Lembar Observasi Berbicara — Bahasa Inggris Kelas III, Chapter 5: My Hobby</h1>" +
            "<p>Kelas: " + esc(obs.kelas) + " &nbsp;·&nbsp; Tanggal: " + esc(obs.tanggal) + " &nbsp;·&nbsp; Guru: ____________________</p>" +
            "<table><thead>" + head + "</thead><tbody>" + body + "</tbody></table><table>" + rubric + "</table></body></html>";
          const w = window.open("", "_blank");
          if (!w) { UI.toast("Jendela cetak diblokir. Izinkan pop-up untuk MPI ini, lalu coba lagi."); return; }
          w.document.open(); w.document.write(html); w.document.close();
          w.focus();
          setTimeout(() => w.print(), 300);
        }

        renderRows();
        return [
          el("h2", {}, "Lembar Observasi Berbicara"),
          el("div", { class: "obs-head" },
            el("label", {}, "Kelas ", kelasIn),
            el("label", {}, "Tanggal ", tglIn),
            addBtn,
            button("🖨 Cetak", printSheet, "small-btn"),
            clearBtn
          ),
          el("p", { class: "tc-note" }, "Klik angka 1–4 untuk memberi skor (klik lagi untuk membatalkan). Arahkan kursor ke angka untuk melihat deskriptornya."),
          el("div", { class: "obs-wrap" },
            el("table", { class: "obs-table" },
              el("thead", {}, el("tr", {},
                el("th", {}, "No"), el("th", {}, "Nama"),
                ASP.map((a) => el("th", { title: a.full }, a.short)),
                el("th", {}, "Jumlah"), el("th", {}, "Catatan"), el("th", {}, "")
              )),
              tbody
            )
          ),
          el("div", { class: "obs-foot" }, status),
          el("details", { class: "rubric" },
            el("summary", {}, "Lihat rubrik lengkap"),
            el("table", { class: "obs-table rubric-table" },
              el("thead", {}, el("tr", {}, el("th", {}, "Aspek"), C.observation.levels.map((l) => el("th", {}, l)))),
              el("tbody", {}, ASP.map((a) => el("tr", {}, el("th", {}, a.full), a.rubric.map((d) => el("td", {}, d)))))
            )
          ),
          el("p", { class: "tc-note" }, "🔒 Data hanya tersimpan di browser perangkat ini (tidak dikirim ke internet). Hapus data setelah dicatat di buku nilai.")
        ];
      }

      const panels = {
        "A. Modul Singkat": () => [
          el("h2", {}, "Modul Singkat — 2 JP × 35 menit"),
          el("h3", {}, "Tujuan Pembelajaran"),
          el("ul", {}, C.learningObjectives.map((t) => el("li", {}, t))),
          el("h3", {}, "Indikator"),
          el("ul", {}, C.indicators.map((t) => el("li", {}, t))),
          el("h3", {}, "Alur"),
          el("ul", {}, C.scenes.filter((s) => !s.teacherOnly && s.id !== "SC-00").map((s) => el("li", {}, s.id + " " + s.title + " — " + s.time)))
        ],
        "B. Classroom English": () => [
          el("h2", {}, "Classroom English"),
          el("p", { class: "tc-note" }, "Klik ungkapan untuk mendengar contoh pengucapannya."),
          C.classroomEnglish.map((g) => [
            el("h3", {}, g.stage),
            el("div", {}, g.lines.map(([text, audio]) => audio
              ? el("button", { class: "chip chip-btn", onClick: () => AudioMgr.play(audio) }, "🔊 " + text)
              : el("span", { class: "chip" }, text)))
          ])
        ],
        "C. Pelafalan": () => [
          el("h2", {}, "Tips Pelafalan"),
          el("ul", {}, C.pronunciationTips.map((t) => el("li", {}, t))),
          el("h3", {}, "Contoh Kata"),
          el("table", { class: "obs-table words-table" },
            el("thead", {}, el("tr", {}, el("th", {}, "Kata"), el("th", {}, "Arti"), el("th", {}, "Gerakan TPR"), el("th", {}, "Dengar"))),
            el("tbody", {}, C.hobbies.map((h) => el("tr", {},
              el("td", {}, el("b", { style: { color: h.color } }, h.word), h.core ? "" : " (pengayaan)"),
              el("td", {}, h.meaning),
              el("td", {}, h.tpr),
              el("td", {},
                el("button", { class: "chip chip-btn", onClick: () => AudioMgr.play("vo_" + h.id + "_normal") }, "🔊 Normal"),
                el("button", { class: "chip chip-btn", onClick: () => AudioMgr.play("vo_" + h.id + "_slow") }, "🐢 Lambat"))
            )))
          )
        ],
        "D. Lembar Observasi": observationPanel,
        "E. Unduhan Cetak": () => {
          const report = el("div", { class: "asset-report" });
          return [
            el("h2", {}, "Bahan Cetak"),
            el("ul", {}, C.printables.map((p) => el("li", {}, el("a", { href: "print/" + p.file, target: "_blank" }, p.name), " — ", el("code", {}, p.file)))),
            el("p", { class: "tc-note" }, "Jika tautan tidak terbuka, berarti PDF-nya belum dibuat: jalankan prompt set MPI bagian J, lalu simpan hasilnya ke folder print/ dengan nama file di atas."),
            el("p", { class: "tc-note" }, "Lembar observasi yang sudah diisi di MPI bisa dicetak dari tab D (tombol 🖨 Cetak)."),
            el("h3", {}, "Kelengkapan File MPI"),
            button("🔍 Periksa kelengkapan file", () => checkAssets(report), "small-btn"),
            report
          ];
        }
      };

      /* Memeriksa apakah setiap gambar, suara, dan font yang dipakai MPI sudah ada di folder assets/ */
      async function checkAssets(out) {
        const M = window.ASSET_MANIFEST;
        out.innerHTML = "";
        out.append(el("p", {}, "⏳ Memeriksa file…"));
        const probeImage = (file) => new Promise((res) => {
          const img = new Image();
          img.onload = () => res(true);
          img.onerror = () => res(false);
          img.src = UI.assetPath(file);
        });
        const probeAudio = (id) => new Promise((res) => {
          const a = new Audio();
          let done = false;
          const finish = (ok) => { if (!done) { done = true; res(ok); } };
          a.preload = "metadata";
          a.addEventListener("loadedmetadata", () => finish(true), { once: true });
          a.addEventListener("error", () => finish(false), { once: true });
          setTimeout(() => finish(false), 6000);
          a.src = AudioMgr.path(id);
        });
        const audioIds = M.voice.concat(M.music, M.sfx);
        const [imgOk, audOk, fontOk] = await Promise.all([
          Promise.all(M.images.map(probeImage)),
          Promise.all(audioIds.map(probeAudio)),
          Promise.all(M.fonts.map((family) => {
            const faces = [...document.fonts].filter((f) => f.family.replace(/"/g, "") === family);
            return faces.length ? faces[0].load().then(() => true, () => false) : Promise.resolve(false);
          }))
        ]);
        const missing = (list, oks, pathOf) => list.filter((_, i) => !oks[i]).map(pathOf);
        const groups = [
          { name: "Gambar", total: M.images.length, miss: missing(M.images, imgOk, UI.assetPath) },
          { name: "Suara (VO, musik, SFX)", total: audioIds.length, miss: missing(audioIds, audOk, AudioMgr.path) },
          { name: "Font", total: M.fonts.length, miss: missing(M.fonts, fontOk, (f) => f + " (lihat assets/fonts/BACA-SAYA.txt)") }
        ];
        out.innerHTML = "";
        groups.forEach((g) => {
          const have = g.total - g.miss.length;
          out.append(el("p", { class: "asset-line " + (g.miss.length ? "warn" : "ok") },
            (g.miss.length ? "⚠ " : "✅ ") + g.name + ": " + have + " / " + g.total + " tersedia"));
          if (g.miss.length) {
            out.append(el("details", {}, el("summary", {}, "Lihat " + g.miss.length + " file yang belum ada"),
              el("ul", { class: "missing-list" }, g.miss.map((p) => el("li", {}, el("code", {}, p))))));
          }
        });
        out.append(el("p", { class: "tc-note" }, "File PDF di folder print/ tidak dapat diperiksa otomatis — buka tautan di atas untuk mengeceknya."));
      }

      const panel = el("div", { class: "card tc-panel" });
      const tabs = el("div", { class: "tc-tabs" });
      const show = (name) => {
        memory.tcTab = name;
        panel.innerHTML = "";
        panel.scrollTop = 0;
        panel.append(...[panels[name]()].flat(Infinity));
        [...tabs.children].forEach((b) => b.classList.toggle("active", b.textContent === name));
      };
      Object.keys(panels).forEach((name) => tabs.append(el("button", { class: "tc-tab", onClick: () => show(name) }, name)));
      root.append(title("SC-12"), el("div", { class: "tc" }, tabs, panel));
      show(panels[memory.tcTab] ? memory.tcTab : "A. Modul Singkat");
    }
  };
})();
