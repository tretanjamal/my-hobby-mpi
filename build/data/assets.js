/* =========================================================
   Daftar seluruh file aset yang dipakai MPI.
   Dipakai oleh pemeriksa kelengkapan file di Teacher's Corner (tab E).
   Disusun dari data konten agar selalu sama dengan yang dipanggil kode.
   ========================================================= */
window.ASSET_MANIFEST = (function () {
  "use strict";

  const C = window.CONTENT;
  const core = C.hobbies.filter((h) => h.core).map((h) => h.id);
  const all = C.hobbies.map((h) => h.id);
  const unique = (list) => Array.from(new Set(list.filter(Boolean)));

  const images = unique([
    "bg_cover.png", "bg_schoolyard.png", "bg_classroom_soft.png", "bg_gametime_stage.png", "bg_reflection_sky.png",
    "img_logo.png",
    "img_char_bima_wave.png", "img_char_sari_wave.png", "img_char_bima_bike.png", "img_char_sari_sing.png", "img_char_bima_point.png",
    ...all.map((id) => "img_hobby_" + id + ".png"),
    ...all.map((id) => "anim_tpr_" + id + ".png"),
    ...C.dialog.map((d) => d.panel),
    "ui_card_back.png"
  ]);

  const voice = unique([
    "vo_sc01_bima", "vo_sc01_sari",
    ...C.goals.map((g) => g.audio),
    ...all.flatMap((id) => ["vo_" + id + "_normal", "vo_" + id + "_slow"]),
    ...core.map((id) => "vo_pointto_" + id),
    ...core.map((id) => "vo_bimasays_" + id),
    ...core.map((id) => "vo_plain_" + id),
    ...core.map((id) => "vo_ex01_" + id),
    "vo_ex02", "vo_ex03", "vo_ex04",
    ...core.map((id) => "vo_ex05_" + id),
    ...C.dialog.map((d) => d.audio),
    "vo_sc09_intro",
    ...C.reflection.map((r) => r.audio),
    "vo_praise_01", "vo_praise_02", "vo_praise_03", "vo_praise_04", "vo_tryagain",
    ...C.classroomEnglish.flatMap((g) => g.lines.map((line) => line[1]))
  ]);

  return {
    images,
    voice,
    music: ["mus_intro", "mus_hobby_song"],
    sfx: ["sfx_click", "sfx_correct", "sfx_tryagain", "sfx_tick", "sfx_buzzer", "sfx_confetti"],
    fonts: ["Fredoka", "Baloo 2", "Nunito"],
    print: C.printables.map((p) => p.file)
  };
})();
