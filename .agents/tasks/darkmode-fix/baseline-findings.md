# Baseline findings (sebelum perbaikan)

Harness: puppeteer-core + Chrome, build `dist/` disajikan lewat `vite preview` (port 4173), tema dark/light × 390/834/1440, reduced-motion, scroll penuh.

| # | Lokasi | Tema | Lebar | Masalah |
|---|--------|------|-------|---------|
| 1 | `#bantuan` panel (`CrisisHelp.jsx` baris 13) | dark | semua | Latar tetap `bg-coral-50` rgb(253,243,241), luminans 0.913. `dark:bg-coral-950/40` tidak menghasilkan CSS karena `--color-coral-950` tidak ada di `@theme`. |
| 2 | `#judul-bantuan` | dark | semua | Kontras 1.06 (perlu 3.0, teks besar) |
| 3 | `#bantuan` paragraf `text-ink-soft` (2×) | dark | semua | Kontras 1.63 |
| 4 | `#bantuan` tautan `112` `text-warm` | dark | semua | Kontras 1.75 |
| 5 | `#bantuan` "lalu tekan 8" `text-ink-faint` | dark | semua | Kontras 4.47 (kartu `bg-surface/90` di atas panel terang) |
| 6 | `#pilihan` tab aktif | dark+light | semua | Positif palsu: latar tab aktif adalah `<span>` absolut saudara, bukan leluhur. Dihitung manual: dark #071512 di #86cd9e = 9.9:1, light #fff di #25643a = 7.1:1. Lulus. |
| 7 | `#langkah` tombol "Salin semua" disabled | dark+light | semua | 3.84 / 2.73. Kontrol nonaktif dikecualikan dari WCAG 1.4.3. Dibiarkan. |

Allowlist (sengaja terang, tidak diubah): latar putih `BrandBadge` (`ui/Logo.jsx`, header/hero/footer) untuk logo JPEG; di `#tenang` tombol `light` "Mulai bernapas" dan pill pola napas aktif `bg-white text-night-950` di atas panel night-sky yang selalu gelap.

Tidak ada: overflow horizontal (390/834/1440), error/warning konsol, pageerror, latar terang lain, menu seluler terang (latar `bg-canvas/85` gelap).

# Perbaikan

- `src/components/sections/CrisisHelp.jsx`: `dark:bg-coral-950/40` → `dark:bg-coral-400/10`. Sama dengan kartu krisis MoodCheck dan pill 119 di Footer. Menyelesaikan temuan 1–5 sekaligus (teks token sudah benar, yang salah hanya latarnya).
- Grep seluruh `src/` tidak menemukan shade lain yang tidak terdefinisi.

# Hasil akhir

- Panel `#bantuan` dark: rgba coral-400 / 0.1 dikomposit = rgb(34,41,35), luminans 0.02 di 390/834/1440. Judul 12.95:1, paragraf 8.41:1. Light tidak berubah (coral-50, judul 14.02:1).
- Ganti tema lewat ThemeToggle dari light → dark: `html.dark` aktif, `sg-theme=dark` tersimpan, panel ikut gelap (luminans 0.02).
- Dark: 0 latar terang di luar allowlist; 0 kegagalan kontras di luar temuan 6 (positif palsu) dan 7 (disabled).
- Light: tidak ada kegagalan baru dibanding baseline.
- Interaksi dark 1440 (balik kartu mitos, pilih mood termasuk "Putus asa" dengan blok krisis, centang item tas, buka FAQ, ganti tab dialisis, simpan pertanyaan): tanpa temuan baru, tanpa error konsol.
- Screenshot setiap section di 390 dan 1440 untuk kedua tema sudah dicek. Tidak ada yang tetap terang di mode malam.
- Catatan: cincin dekoratif di EmptyState MoodCheck (`bg-tide-300/40`) tampak agak terang di malam hari, tetapi kecil, `aria-hidden`, dan sesuai gaya. Dibiarkan.
