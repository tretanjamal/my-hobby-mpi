/* =========================================================
   Pemutar audio: hanya satu suara utama berbunyi pada satu
   waktu (planning QA-03). SFX diputar terpisah.
   Memakai elemen <audio> agar tetap jalan dari file://.

   play(id, { times, onTime, silent }) → Promise yang selesai
   dengan status: "ended" | "stopped" | "error".
   ========================================================= */
window.AudioMgr = (function () {
  "use strict";

  const FOLDERS = { vo_: "assets/audio/vo/", mus_: "assets/audio/music/", sfx_: "assets/audio/sfx/" };
  let current = null;            // { id, el, finish }
  const listeners = new Set();

  function path(id) {
    const prefix = Object.keys(FOLDERS).find((p) => id.startsWith(p));
    return (prefix ? FOLDERS[prefix] : "assets/audio/") + id + ".mp3";
  }

  function notify(playing) { listeners.forEach((fn) => fn(playing)); }

  function stop() {
    if (!current) return;
    const c = current;
    current = null;
    c.el.pause();
    notify(false);
    c.finish("stopped");
  }

  function play(id, opts) {
    const { times = 1, onTime = null, silent = false } = opts || {};
    stop();
    if (!id) return Promise.resolve("error");

    return new Promise((resolve) => {
      const a = new Audio(path(id));
      let count = 0;
      let done = false;
      const me = {
        id,
        el: a,
        finish(status) { if (!done) { done = true; resolve(status); } }
      };
      current = me;
      notify(true);

      const end = (status) => {
        if (current === me) { current = null; notify(false); }
        me.finish(status);
      };

      if (onTime) a.addEventListener("timeupdate", () => { if (current === me) onTime(a.currentTime); });
      a.addEventListener("ended", () => {
        count += 1;
        if (count < times && current === me) {
          a.currentTime = 0;
          a.play().catch(() => {});
          return;
        }
        end("ended");
      });
      a.addEventListener("error", () => {
        if (!silent && current === me) UI.toast("Audio belum tersedia: " + id + ".mp3");
        end("error");
      }, { once: true });
      a.play().catch(() => { /* ditangani oleh event error */ });
    });
  }

  /* Efek suara pendek; diam saja bila file belum ada. */
  function sfx(id) {
    const a = new Audio(path(id));
    a.play().catch(() => {});
  }

  function onChange(fn) { listeners.add(fn); }

  return {
    play, stop, sfx, path, onChange,
    isPlaying: () => !!current,
    currentId: () => (current ? current.id : null)
  };
})();
