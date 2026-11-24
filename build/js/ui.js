/* =========================================================
   UI helper: pembuat elemen, aset bergambar + placeholder,
   ikon SVG, dan toast.
   ========================================================= */
window.UI = (function () {
  "use strict";

  /* Folder aset berdasarkan awalan nama file (planning 12.2–12.3) */
  const IMG_FOLDERS = [
    ["img_char_",  "assets/img/char/"],
    ["img_hobby_", "assets/img/hobby/"],
    ["img_comic_", "assets/img/comic/"],
    ["img_logo",   "assets/img/"],
    ["bg_",        "assets/img/bg/"],
    ["ui_",        "assets/img/ui/"],
    ["anim_",      "assets/anim/"]
  ];

  function assetPath(file) {
    for (const [prefix, folder] of IMG_FOLDERS) {
      if (file.startsWith(prefix)) return folder + file;
    }
    return "assets/" + file;
  }

  /* el("div", {class, style, onClick, ...}, ...children) */
  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value === false || value == null) continue;
      if (key === "class") node.className = value;
      else if (key === "style" && typeof value === "object") Object.assign(node.style, value);
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    for (const child of children.flat(Infinity)) {
      if (child == null || child === false) continue;
      node.append(child.nodeType ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  function placeholder(file, label) {
    return el("div", { class: "ph" },
      el("span", { class: "ph-icon" }, "🖼"),
      el("span", { class: "ph-name" }, file),
      label ? el("span", { class: "ph-label" }, label) : null
    );
  }

  /* Gambar aset; jika file belum ada, tampil kotak placeholder bertuliskan nama file. */
  function asset(file, opts) {
    const { cls = "", alt = "", label = "", quiet = false } = opts || {};
    const box = el("div", { class: "asset " + cls, "data-file": file });
    const img = el("img", { src: assetPath(file), alt: alt || file, draggable: "false" });
    img.addEventListener("error", () => {
      img.remove();
      if (quiet) { box.classList.add("missing-quiet"); return; }   // tanpa placeholder; desain CSS cadangan yang tampil
      box.classList.add("missing");
      box.append(placeholder(file, label));
    }, { once: true });
    box.append(img);
    return box;
  }

  /* Animasi TPR dari strip 4 frame berjajar (prompt set bagian E).
     Strip mentah langsung dianimasikan dengan CSS steps(4) — tidak perlu dipotong.
     Animasi berjalan bila elemen (atau induknya) diberi kelas "play"/"active". */
  function sprite(file, opts) {
    const { cls = "", label = "", quiet = false } = opts || {};
    const box = el("div", { class: "sprite-box " + cls, "data-file": file });
    const sp = el("div", { class: "sprite" });
    box.append(sp);
    const img = new Image();
    img.onload = () => {
      const frameRatio = (img.naturalWidth / 4) / img.naturalHeight;
      sp.style.aspectRatio = String(frameRatio);
      sp.style.backgroundImage = 'url("' + assetPath(file) + '")';
      sp.classList.add("ready");
    };
    img.onerror = () => {
      sp.remove();
      if (quiet) { box.classList.add("missing-quiet"); return; }
      box.classList.add("missing");
      box.append(placeholder(file, label));
    };
    img.src = assetPath(file);
    return box;
  }

  /* Ulangi animasi CSS satu kali pada elemen */
  function replay(node, cls) {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
    node.addEventListener("animationend", () => node.classList.remove(cls), { once: true });
  }

  /* Hujan konfeti singkat di atas elemen container */
  function confetti(container) {
    const colors = ["#1E88E5", "#43A047", "#8E24AA", "#D81B60", "#EF6C00", "#F9A825"];
    const layer = el("div", { class: "confetti" });
    for (let i = 0; i < 60; i++) {
      layer.append(el("i", { style: {
        left: Math.random() * 100 + "%",
        background: colors[i % colors.length],
        animationDelay: Math.random() * 0.35 + "s",
        animationDuration: 1.1 + Math.random() * 0.8 + "s",
        transform: "rotate(" + Math.random() * 360 + "deg)"
      } }));
    }
    container.append(layer);
    setTimeout(() => layer.remove(), 2400);
  }

  const pick = (list, avoid) => {
    const pool = list.length > 1 ? list.filter((x) => x !== avoid) : list;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  /* Ikon SVG sederhana untuk tombol tetap (diganti aset ui_icons_nav_sheet bila sudah ada) */
  const ICONS = {
    home:  '<path d="M8 30 32 10l24 20"/><path d="M15 26v26h12V39h10v13h12V26"/>',
    back:  '<path d="M38 12 18 32l20 20"/>',
    next:  '<path d="M26 12l20 20-20 20"/>',
    sound: '<path d="M10 25h10l13-11v36L20 39H10z"/><path d="M42 23c4 5 4 13 0 18"/><path d="M48 17c8 9 8 21 0 30"/>',
    notes: '<rect x="14" y="10" width="36" height="44" rx="5"/><path d="M22 22h20M22 31h20M22 40h12"/>',
    close: '<path d="M16 16l32 32M48 16 16 48"/>',
    lock:  '<rect x="14" y="28" width="36" height="26" rx="5"/><path d="M22 28v-7a10 10 0 0 1 20 0v7"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  let toastTimer = null;
  function toast(message, ms) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), ms || 2600);
  }

  /* Penanda fitur yang dikerjakan pada tahap pengembangan berikutnya */
  function todo(stage) {
    return () => toast("Fitur ini dibuat pada tahap " + stage + ".");
  }

  return { el, asset, sprite, replay, pick, confetti, assetPath, icon, toast, todo };
})();
