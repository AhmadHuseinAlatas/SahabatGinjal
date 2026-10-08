import { ExternalLink, Phone } from 'lucide-react'
import { NAV_CATEGORIES } from '../../data/navigation'
import { SOURCES } from '../../data/site'
import { BrandBadge } from '../ui/Logo'

// Dihitung sekali saat modul dimuat, bukan di setiap render.
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_repeat(2,0.8fr)_1.2fr] lg:gap-8">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-4">
            <BrandBadge className="size-16 shadow-card" />
            <p className="font-display text-2xl leading-none tracking-tight">
              Sahabat<em className="text-primary">Ginjal</em>
            </p>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">
            Komunitas kesehatan ginjal &amp; cuci darah. Ruang tenang untuk memahami, satu napas
            pada satu waktu.
          </p>
          <a
            href="tel:119"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-coral-50 px-4 py-2.5 text-sm font-semibold text-warm ring-1 ring-coral-200 transition-colors hover:bg-coral-100 dark:bg-coral-400/10 dark:ring-coral-400/25 dark:hover:bg-coral-400/15"
          >
            <Phone aria-hidden="true" className="size-4" />
            Sedang berat sekali? Telepon 119, tekan 8
          </a>
        </div>

        {/* Categorized Nav Columns — show first 2 categories */}
        {NAV_CATEGORIES.slice(0, 2).map((cat) => (
          <nav key={cat.key} aria-labelledby={`footer-${cat.key}`}>
            <h2 id={`footer-${cat.key}`} className="kicker text-ink-faint">
              <span className="mr-1.5" aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </h2>
            <ul className="mt-5 grid gap-2.5">
              {cat.links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-ink-soft transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Remaining categories + Penting dibaca */}
        <div>
          {/* Show remaining categories inline */}
          {NAV_CATEGORIES.slice(2).map((cat) => (
            <nav key={cat.key} aria-labelledby={`footer-${cat.key}`} className="mb-8 last:mb-0">
              <h2 id={`footer-${cat.key}`} className="kicker text-ink-faint">
                <span className="mr-1.5" aria-hidden="true">{cat.emoji}</span>
                {cat.label}
              </h2>
              <ul className="mt-4 grid gap-2">
                {cat.links.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="text-ink-soft transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="mt-8 rounded-2xl bg-surface-muted/60 p-5 ring-1 ring-line">
            <h2 className="kicker text-ink-faint">Penting dibaca</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              SahabatGinjal adalah halaman edukasi dan dukungan emosional. Isinya{' '}
              <strong className="font-semibold text-ink">bukan nasihat medis</strong> dan tidak
              menggantikan pemeriksaan, diagnosis, atau instruksi dokter serta tim dialisismu.
            </p>
            <p className="mt-3 text-xs text-ink-faint">Rujukan umum:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-ink-soft ring-1 ring-line transition-colors hover:text-primary hover:ring-line-strong"
                  >
                    {source.label}
                    <ExternalLink aria-hidden="true" className="size-3" />
                    <span className="sr-only">(membuka tab baru)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} SahabatGinjal.</p>
          <p>Dibuat untuk siapa pun yang sedang menunggu di kursi itu.</p>
        </div>
      </div>
    </footer>
  )
}
