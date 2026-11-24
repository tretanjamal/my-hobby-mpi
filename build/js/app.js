/* =========================================================
   Router scene, navigasi, Teacher Notes, Menu, pintasan
   keyboard, dan penskalaan kanvas 1920×1080.
   (planning bagian 7 & 8; prompt set DEV-01)
   ========================================================= */
window.App = (function () {
  "use strict";

  const { el, icon, toast } = UI;
  const C = window.CONTENT;
  const ALL = C.scenes;
  const LESSON = ALL.filter((s) => !s.teacherOnly);           // alur linear SC-00 … SC-11
  const byId = (id) => ALL.find((s) => s.id === id);
  const $ = (id) => document.getElementById(id);

  const stage = $("stage");
  const root = $("scene-root");
  const state = { scene: null, handler: {}, notesOpen: false, menuOpen: false, returnTo: "SC-00" };

  /* ---------- Penskalaan kanvas (letterbox) ---------- */
  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = "translate(-50%, -50%) scale(" + s + ")";
  }

  /* ---------- Navigasi ---------- */
  function go(id) {
    const scene = byId(id);
    if (!scene) return;
    AudioMgr.stop();
    if (state.handler && typeof state.handler.leave === "function") state.handler.leave();
    if (!scene.teacherOnly) state.returnTo = id;

    state.scene = scene;
    root.innerHTML = "";
    const node = el("section", { class: "scene " + id.toLowerCase(), "data-scene": id });
    root.append(node);
    const render = window.SCENES && window.SCENES[id];
    state.handler = (render && render(node, api)) || {};

    updateChrome();
    renderNotes();
    closeMenu();
    try { history.replaceState(null, "", "#" + id); } catch (e) { /* abaikan */ }
  }

  function lessonIndex() { return LESSON.indexOf(state.scene); }

  function next() {
    if (state.scene.teacherOnly) return;
    const i = lessonIndex();
    if (i < LESSON.length - 1) go(LESSON[i + 1].id);
  }

  function back() {
    if (state.scene.teacherOnly) { go(state.returnTo); return; }
    const i = lessonIndex();
    if (i > 0) go(LESSON[i - 1].id);
  }

  function start() {
    toggleFullscreen(true);
    go("SC-01");
    AudioMgr.play("mus_intro");
  }

  function playMain() {
    if (typeof state.handler.playMain === "function") { state.handler.playMain(); return; }
    if (state.scene.mainAudio) AudioMgr.play(state.scene.mainAudio);
    else toast("Scene ini tidak memiliki audio utama.");
  }

  /* Aksi khusus scene: random (R), timer (T), scoreA (1), scoreB (2) */
  function action(name) {
    if (typeof state.handler.onAction === "function") state.handler.onAction(name);
  }

  /* ---------- Tombol tetap & progres ---------- */
  function setupChrome() {
    $("btn-audio").innerHTML = icon("sound");
    $("btn-menu").innerHTML = icon("home");
    $("btn-back").innerHTML = icon("back");
    $("btn-next").innerHTML = icon("next");
    $("btn-notes").innerHTML = icon("notes");

    $("btn-audio").addEventListener("click", playMain);
    $("btn-menu").addEventListener("click", toggleMenu);
    $("btn-back").addEventListener("click", back);
    $("btn-next").addEventListener("click", next);
    $("btn-notes").addEventListener("click", () => toggleNotes());

    AudioMgr.onChange((playing) => $("btn-audio").classList.toggle("playing", playing));

    const progress = $("progress");
    LESSON.forEach((s) => progress.append(el("span", { title: s.id + " " + s.menu })));

    /* Lepas fokus setelah klik agar Spasi/Enter tidak memicu tombol terakhir */
    document.addEventListener("click", (e) => {
      const b = e.target.closest && e.target.closest("button");
      if (b) b.blur();
    });
  }

  function updateChrome() {
    const s = state.scene;
    const i = lessonIndex();
    $("btn-back").disabled = !s.teacherOnly && i <= 0;
    $("btn-next").disabled = s.teacherOnly || i >= LESSON.length - 1;
    $("btn-audio").disabled = !s.mainAudio && typeof state.handler.playMain !== "function";
    [...$("progress").children].forEach((dot, k) => {
      dot.className = k === i ? "now" : (k < i ? "done" : "");
    });
  }

  /* ---------- Teacher Notes ---------- */
  function renderNotes() {
    const s = state.scene;
    const notes = $("notes");
    notes.innerHTML = "";
    const closeBtn = el("button", { class: "chrome-btn small close", "aria-label": "Tutup catatan", html: icon("close") });
    closeBtn.addEventListener("click", () => toggleNotes(false));
    notes.append(...[
      closeBtn,
      el("h2", {}, s.title),
      el("div", { class: "meta" }, s.id + "  ·  Waktu: " + s.time),
      s.keys ? el("div", { class: "keys" }, "⌨ " + s.keys) : null,
      el("h3", {}, "Langkah Guru"),
      el("ol", {}, s.steps.map((t) => el("li", {}, t))),
      s.ce.length ? el("h3", {}, "Classroom English") : null,
      s.ce.length ? el("div", { class: "ce" }, s.ce.map((t) => el("span", {}, t))) : null,
      el("h3", {}, "Pintasan Keyboard"),
      el("div", {}, "→ / ← pindah scene · Spasi suara · N catatan · M menu · F layar penuh")
    ].filter(Boolean));
  }

  function toggleNotes(force) {
    state.notesOpen = typeof force === "boolean" ? force : !state.notesOpen;
    $("notes").classList.toggle("open", state.notesOpen);
    $("notes").setAttribute("aria-hidden", String(!state.notesOpen));
  }

  /* ---------- Menu ---------- */
  function renderMenu() {
    const menu = $("menu");
    menu.innerHTML = "";
    const grid = el("div", { class: "menu-grid" });

    LESSON.forEach((s) => {
      grid.append(el("button", {
        class: "menu-tile" + (state.scene === s ? " current" : ""),
        onClick: () => go(s.id)
      },
        el("span", { class: "t" }, s.menu),
        el("span", { class: "m" }, el("span", {}, s.id), el("span", {}, s.time))
      ));
    });

    /* Teacher's Corner: tahan 2 detik (planning bagian 7) */
    const lock = el("button", { class: "menu-tile lock", "aria-label": "Teacher's Corner — tahan 2 detik" },
      el("span", { class: "fill" }),
      el("span", { class: "t", html: '<span style="display:inline-block;width:34px;height:34px;vertical-align:-4px">' + icon("lock") + "</span> Teacher's Corner" }),
      el("span", { class: "m" }, el("span", {}, "SC-12"), el("span", {}, "tahan 2 detik"))
    );
    let holdTimer = null;
    const cancel = () => { clearTimeout(holdTimer); lock.classList.remove("holding"); };
    lock.addEventListener("pointerdown", () => {
      lock.classList.add("holding");
      holdTimer = setTimeout(() => { cancel(); go("SC-12"); }, 2000);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => lock.addEventListener(ev, cancel));
    grid.append(lock);

    menu.append(
      el("h2", {}, "Menu"),
      grid,
      el("p", { class: "menu-hint" }, "Pilih kegiatan untuk melompat langsung. Tekan M atau Esc untuk menutup menu.")
    );
  }

  function toggleMenu(force) {
    state.menuOpen = typeof force === "boolean" ? force : !state.menuOpen;
    if (state.menuOpen) renderMenu();
    $("menu").classList.toggle("open", state.menuOpen);
    $("menu").setAttribute("aria-hidden", String(!state.menuOpen));
  }
  function closeMenu() { if (state.menuOpen) toggleMenu(false); }

  /* ---------- Layar penuh ---------- */
  function toggleFullscreen(onlyEnter) {
    const doc = document;
    if (!doc.fullscreenElement) {
      const req = doc.documentElement.requestFullscreen;
      if (req) req.call(doc.documentElement).catch(() => {});
    } else if (!onlyEnter && doc.exitFullscreen) {
      doc.exitFullscreen().catch(() => {});
    }
  }

  /* ---------- Keyboard (planning bagian 7) ---------- */
  function onKey(e) {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    switch (e.key) {
      case "ArrowRight": e.preventDefault(); next(); return;
      case "ArrowLeft":  e.preventDefault(); back(); return;
      case " ":          e.preventDefault(); if (!e.repeat) playMain(); return;
      case "Enter":      if (state.scene.id === "SC-00") { e.preventDefault(); start(); } return;
      case "Escape":     closeMenu(); toggleNotes(false); action("escape"); return;
    }
    if (e.repeat) return;
    switch (e.key.toLowerCase()) {
      case "n": toggleNotes(); break;
      case "m": toggleMenu(); break;
      case "f": toggleFullscreen(); break;
      case "r": action("random"); break;
      case "t": action("timer"); break;
      case "1": action("scoreA"); break;
      case "2": action("scoreB"); break;
      case "a": case "b": case "c": action("choose-" + e.key.toLowerCase()); break;
    }
  }

  /* ---------- Mulai ---------- */
  const api = { go, next, back, start, playMain, toast, audio: AudioMgr, content: C };

  function boot() {
    setupChrome();
    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("keydown", onKey);
    const fromHash = decodeURIComponent(location.hash.replace("#", ""));
    go(byId(fromHash) ? fromHash : "SC-00");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  return api;
})();
