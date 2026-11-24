"""
Optimasi gambar MPI "My Hobby" (planning bagian 12.4: gambar <= 300 KB per file).

Gambar hasil ChatGPT biasanya 1-3 MB per file. Skrip ini:
  1. memperkecil ukuran sesuai jenis aset (latar 1920 px, lainnya 1024 px; strip TPR 1536 px),
  2. mengurangi jumlah warna (cocok untuk ilustrasi vektor datar) dengan transparansi tetap,
  3. menyimpan ulang dengan NAMA FILE YANG SAMA, sehingga kode tidak perlu diubah.

File asli disalin dulu ke folder cadangan (_asli/) di samping folder assets.

Pemakaian (butuh Python 3 + Pillow: pip install pillow):
    python optimasi_gambar.py                 # proses semua PNG di ../build/assets
    python optimasi_gambar.py --cek           # hanya laporan ukuran, tanpa mengubah file
    python optimasi_gambar.py --warna 128     # kurangi warna lebih banyak (file lebih kecil)
"""
import argparse
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow belum terpasang. Jalankan: pip install pillow")

BATAS_KB = 300
HERE = Path(__file__).resolve().parent
ASSETS = HERE.parent / "build" / "assets"
CADANGAN = HERE.parent / "build_asli_gambar"


def ukuran_maks(path: Path) -> int:
    nama = path.name
    if nama.startswith("bg_"):
        return 1920
    if nama.startswith("anim_"):
        return 1536          # strip 4 frame: tiap frame tetap +-384 px
    return 1024


def optimasi(path: Path, warna: int) -> tuple[int, int]:
    sebelum = path.stat().st_size
    img = Image.open(path)
    img.load()
    batas = ukuran_maks(path)
    if max(img.size) > batas:
        img.thumbnail((batas, batas), Image.LANCZOS)
    if img.mode not in ("RGBA", "RGB"):
        img = img.convert("RGBA")
    if img.mode == "RGBA":
        hasil = img.quantize(colors=warna, method=Image.Quantize.FASTOCTREE)
    else:
        hasil = img.quantize(colors=warna, method=Image.Quantize.MEDIANCUT)
    hasil.save(path, format="PNG", optimize=True)
    return sebelum, path.stat().st_size


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--cek", action="store_true", help="hanya tampilkan laporan ukuran")
    ap.add_argument("--warna", type=int, default=192, help="jumlah warna maksimum (default 192)")
    args = ap.parse_args()

    files = sorted(p for p in ASSETS.rglob("*.png"))
    if not files:
        print("Belum ada file PNG di", ASSETS)
        return

    total_sebelum = total_sesudah = 0
    for f in files:
        kb = f.stat().st_size / 1024
        if args.cek:
            tanda = "  OK " if kb <= BATAS_KB else "BESAR"
            print(f"[{tanda}] {kb:8.0f} KB  {f.relative_to(ASSETS)}")
            total_sebelum += f.stat().st_size
            continue
        cad = CADANGAN / f.relative_to(ASSETS)
        if not cad.exists():
            cad.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, cad)
        s, d = optimasi(f, args.warna)
        total_sebelum += s
        total_sesudah += d
        tanda = "  OK " if d / 1024 <= BATAS_KB else "BESAR"
        print(f"[{tanda}] {s/1024:7.0f} KB -> {d/1024:6.0f} KB  {f.relative_to(ASSETS)}")

    if args.cek:
        print(f"\nTotal: {total_sebelum/1024/1024:.1f} MB untuk {len(files)} file")
    else:
        print(f"\nTotal: {total_sebelum/1024/1024:.1f} MB -> {total_sesudah/1024/1024:.1f} MB")
        print("Salinan asli tersimpan di:", CADANGAN)
        print("Jika masih ada yang BESAR, ulangi dengan --warna 128 atau 96.")


if __name__ == "__main__":
    main()
