import { HeartHandshake, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { NAV_LINKS, SECTION_IDS } from '../../data/navigation'
import useActiveSection from '../../hooks/useActiveSection'
import useScrolledPast from '../../hooks/useScrolledPast'
import useTheme from '../../hooks/useTheme'
import { cn } from '../../lib/cn'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'

/** Header mengambang: transparan di atas, menjadi kapsul kaca setelah digulir. */
export default function Navbar() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)
  const scrolled = useScrolledPast(16)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const solid = scrolled || menuOpen

  return (
    <>
      <header
        id="site-header"
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-soft',
          scrolled ? 'pt-2' : 'pt-4 sm:pt-5',
        )}
      >
        <div className="shell">
          <div
            className={cn(
              'flex h-16 items-center justify-between gap-3 rounded-full pr-2.5 pl-3 ring-1 transition-[background-color,box-shadow] duration-500 ease-soft sm:pl-4',
              solid ? 'glass shadow-float ring-line' : 'ring-transparent',
            )}
          >
            <Logo onClick={closeMenu} />

            <nav aria-label="Navigasi utama" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.id
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                          isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-surface-muted ring-1 ring-line"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} onToggle={toggle} />
              {/* Pembungkus yang menyembunyikan tombol di layar sempit, supaya
                  kelas display milik Button tidak saling bertabrakan. */}
              <span className="hidden sm:inline-flex">
                <Button href="#bantuan" variant="warm" size="sm" iconLeft={HeartHandshake}>
                  Butuh bantuan?
                </Button>
              </span>
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="menu-seluler"
                aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                className="grid size-11 place-items-center rounded-full text-ink ring-1 ring-line-strong transition-colors hover:bg-surface-muted xl:hidden"
              >
                {menuOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} returnFocusRef={burgerRef} />
    </>
  )
}
