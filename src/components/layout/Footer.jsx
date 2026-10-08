import { ExternalLink, Phone } from 'lucide-react'
import {
  NAV_COMMUNITY_LINKS,
  NAV_DIRECT_LINKS,
  NAV_DROPDOWNS,
} from '../../data/navigation'
import { SOURCES } from '../../data/site'
import { BrandBadge } from '../ui/Logo'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-line">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* Kolom 1: Brand & Kontak Darurat */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <BrandBadge className="size-14 shadow-card" />
            <p className="font-display text-2xl leading-none tracking-tight">
              Sahabat<em className="text-primary">Ginjal</em>
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Sahabat setia kesehatan ginjal & cuci darah di Indonesia. Edukasi terpercaya, panduan hidup, dan ruang tenang.
          </p>
          <a
            href="tel:119"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-coral-500/10 px-4 py-2 text-xs font-semibold text-coral-700 dark:text-coral-300 ring-1 ring-coral-500/25 transition-colors hover:bg-coral-500/20"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            Bantuan Krisis: 119 (ext. 8)
          </a>
        </div>

        {/* Kolom 2: Edukasi & Cuci Darah */}
        <div>
          <h2 className="kicker text-ink-faint mb-3">Edukasi & Dialisis</h2>
          <ul className="space-y-2 text-sm">
            {NAV_DROPDOWNS[0].links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-ink-soft hover:text-primary transition-colors block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {NAV_DROPDOWNS[1].links.slice(0, 3).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-ink-soft hover:text-primary transition-colors block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Panduan Pasien & Fitur Utama */}
        <div>
          <h2 className="kicker text-ink-faint mb-3">Panduan & Fasilitas</h2>
          <ul className="space-y-2 text-sm">
            {NAV_DIRECT_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-primary font-semibold hover:underline block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {NAV_DROPDOWNS[2].links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-ink-soft hover:text-primary transition-colors block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {NAV_COMMUNITY_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-ink-soft hover:text-primary transition-colors block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Disclaimer & Rujukan Medis */}
        <div>
          <div className="rounded-2xl bg-surface-muted/70 p-4 ring-1 ring-line">
            <h2 className="kicker text-ink-faint">Penting Dibaca</h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Isi website ini bertujuan sebagai edukasi dan pendampingan moral, <strong className="font-semibold text-ink">bukan pengganti nasihat dokter</strong>. Selalu konsultasikan kondisi dan batas cairanmu dengan tim medis.
            </p>
            <p className="mt-3 text-[11px] font-semibold text-ink-faint">Rujukan Medis:</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {SOURCES.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[11px] text-ink-soft ring-1 ring-line transition-colors hover:text-primary"
                >
                  {source.label}
                  <ExternalLink aria-hidden="true" className="size-2.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} SahabatGinjal. Dibuat dengan penuh kepedulian untuk para pejuang ginjal di Indonesia.</p>
          <p>Satu napas, satu langkah pada satu waktu.</p>
        </div>
      </div>
    </footer>
  )
}
