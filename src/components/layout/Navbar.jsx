import { ChevronDown, HeartHandshake, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NAV_CATEGORIES, NAV_QUICK_LINKS, SECTION_IDS, SECTION_TO_CATEGORY } from '../../data/navigation'
import useActiveSection from '../../hooks/useActiveSection'
import useScrolledPast from '../../hooks/useScrolledPast'
import useTheme from '../../hooks/useTheme'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
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
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const burgerRef = useRef(null)
  const dropdownTimeoutRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const solid = scrolled || menuOpen

  // Determine active category
  const activeCategory = active ? SECTION_TO_CATEGORY[active] : null

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return undefined
    const handler = (e) => {
      if (!e.target.closest('[data-nav-dropdown]')) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [dropdownOpen])

  const handleCategoryEnter = (key) => {
    clearTimeout(dropdownTimeoutRef.current)
    setDropdownOpen(key)
  }

  const handleCategoryLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(null), 200)
  }

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

            {/* ===== Desktop Navigation: Category Dropdowns ===== */}
            <nav aria-label="Navigasi utama" className="hidden xl:block" data-nav-dropdown>
              <ul className="flex items-center gap-1">
                {NAV_CATEGORIES.map((cat) => {
                  const isActiveCategory = activeCategory === cat.key
                  const isOpen = dropdownOpen === cat.key

                  return (
                    <li
                      key={cat.key}
                      className="relative"
                      onMouseEnter={() => handleCategoryEnter(cat.key)}
                      onMouseLeave={handleCategoryLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(isOpen ? null : cat.key)}
                        aria-expanded={isOpen}
                        className={cn(
                          'relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300',
                          isActiveCategory
                            ? 'text-ink font-semibold'
                            : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        {isActiveCategory && (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-surface-muted ring-1 ring-line"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative flex items-center gap-1.5">
                          <span aria-hidden="true" className="text-base leading-none">
                            {cat.emoji}
                          </span>
                          {cat.label}
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              'size-3.5 transition-transform duration-200',
                              isOpen && 'rotate-180',
                            )}
                          />
                        </span>
                      </button>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2"
                            onMouseEnter={() => handleCategoryEnter(cat.key)}
                            onMouseLeave={handleCategoryLeave}
                          >
                            <div className="glass w-72 rounded-2xl p-2 shadow-float ring-1 ring-line">
                              {cat.links.map((link) => {
                                const Icon = link.icon
                                const isLinkActive = active === link.id
                                return (
                                  <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={() => setDropdownOpen(null)}
                                    className={cn(
                                      'group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200',
                                      isLinkActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-surface-muted',
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        'mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg transition-colors',
                                        isLinkActive
                                          ? 'bg-primary/15 text-primary'
                                          : 'bg-surface-muted text-ink-faint group-hover:text-primary',
                                      )}
                                    >
                                      <Icon aria-hidden="true" className="size-4" />
                                    </span>
                                    <div className="min-w-0">
                                      <p
                                        className={cn(
                                          'text-sm font-semibold',
                                          isLinkActive ? 'text-primary' : 'text-ink',
                                        )}
                                      >
                                        {link.label}
                                      </p>
                                      <p className="mt-0.5 text-xs leading-snug text-ink-faint">
                                        {link.desc}
                                      </p>
                                    </div>
                                  </a>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}

                {/* Quick access links */}
                <li className="ml-1 h-5 w-px bg-line" aria-hidden="true" />
                {NAV_QUICK_LINKS.map((link) => {
                  const isActive = active === link.id
                  return (
                    <li key={link.id} className="shrink-0">
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors duration-300',
                          isActive
                            ? 'text-primary'
                            : 'text-ink-faint hover:text-ink',
                        )}
                      >
                        {link.label}
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
