import {
  ChevronDown,
  HeartHandshake,
  Hospital,
  Menu,
  Wind,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  NAV_DIRECT_LINKS,
  NAV_DROPDOWNS,
  SECTION_IDS,
  SECTION_TO_DROPDOWN,
} from '../../data/navigation'
import useActiveSection from '../../hooks/useActiveSection'
import useScrolledPast from '../../hooks/useScrolledPast'
import useTheme from '../../hooks/useTheme'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'

/**
 * Navbar utama yang rapih, elegan, dan mudah dipahami.
 * Menghindari teks terpotong atau wrap berantakan pada desktop maupun mobile.
 */
export default function Navbar() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)
  const scrolled = useScrolledPast(16)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const burgerRef = useRef(null)
  const closeTimerRef = useRef(null)
  const navContainerRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const solid = scrolled || menuOpen

  // Dropdown aktif berdasarkan section yang sedang dilihat user
  const activeDropdownKey = active ? SECTION_TO_DROPDOWN[active] : null

  // Tutup dropdown jika user klik di luar navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  // Handler hover dengan sedikit delay agar tidak flickering
  const handleMouseEnter = (key) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpenDropdown(key)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  return (
    <>
      <header
        id="site-header"
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-soft',
          scrolled ? 'pt-2' : 'pt-3 sm:pt-4',
        )}
      >
        <div className="shell max-w-7xl">
          <div
            className={cn(
              'flex h-16 items-center justify-between gap-2 sm:gap-4 rounded-full px-3 sm:px-4 ring-1 transition-[background-color,box-shadow,border-color] duration-500 ease-soft',
              solid ? 'glass shadow-float ring-line' : 'ring-transparent',
            )}
          >
            {/* Logo */}
            <Logo onClick={closeMenu} />

            {/* Desktop Navigation */}
            <nav
              ref={navContainerRef}
              aria-label="Navigasi utama"
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-1">
                {/* 3 Dropdowns Utama */}
                {NAV_DROPDOWNS.map((group) => {
                  const isCurrentActive = activeDropdownKey === group.key
                  const isOpen = openDropdown === group.key

                  return (
                    <li
                      key={group.key}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(group.key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : group.key)}
                        aria-expanded={isOpen}
                        className={cn(
                          'relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200',
                          isCurrentActive
                            ? 'text-primary font-semibold'
                            : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        {isCurrentActive && (
                          <motion.span
                            layoutId="nav-active-pill"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/25"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{group.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            'relative z-10 size-3.5 opacity-70 transition-transform duration-200',
                            isOpen && 'rotate-180 opacity-100',
                          )}
                        />
                      </button>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="absolute top-full left-0 z-50 mt-2 min-w-[340px] max-w-sm"
                            onMouseEnter={() => handleMouseEnter(group.key)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="glass rounded-2xl p-2.5 shadow-float ring-1 ring-line">
                              {/* Header deskripsi kategori */}
                              <div className="px-3 py-2 border-b border-line/60 mb-1">
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                                  {group.fullLabel}
                                </p>
                                <p className="text-xs text-ink-faint mt-0.5">
                                  {group.desc}
                                </p>
                              </div>

                              {/* Daftar link */}
                              <div className="space-y-0.5">
                                {group.links.map((item) => {
                                  const Icon = item.icon
                                  const isLinkActive = active === item.id

                                  return (
                                    <a
                                      key={item.id}
                                      href={`#${item.id}`}
                                      onClick={() => setOpenDropdown(null)}
                                      className={cn(
                                        'group flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-150',
                                        isLinkActive
                                          ? 'bg-primary/15 text-primary'
                                          : 'hover:bg-surface-muted text-ink',
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          'mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg transition-colors',
                                          isLinkActive
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-surface-muted text-ink-soft group-hover:bg-primary/10 group-hover:text-primary',
                                        )}
                                      >
                                        <Icon aria-hidden="true" className="size-4" />
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                                          {item.label}
                                        </p>
                                        <p className="text-xs text-ink-faint leading-snug mt-0.5">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </a>
                                  )
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}

                {/* Garis pemisah lembut */}
                <li className="mx-1.5 h-4 w-px bg-line/80" aria-hidden="true" />

                {/* 2 Tautan Langsung Prioritas Tinggi */}
                {NAV_DIRECT_LINKS.map((link) => {
                  const Icon = link.icon
                  const isActive = active === link.id

                  return (
                    <li key={link.id} className="shrink-0">
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200',
                          link.highlight
                            ? isActive
                              ? 'bg-primary text-white shadow-sm font-semibold'
                              : 'bg-primary/10 text-primary hover:bg-primary/20 font-semibold ring-1 ring-primary/25'
                            : isActive
                              ? 'text-primary font-semibold'
                              : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4 shrink-0" />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Aksi Kanan: Theme Toggle, Bantuan CTA, & Hamburger */}
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle theme={theme} onToggle={toggle} />

              <span className="hidden xl:inline-flex">
                <Button
                  href="#bantuan"
                  variant="warm"
                  size="sm"
                  iconLeft={HeartHandshake}
                >
                  Butuh bantuan?
                </Button>
              </span>

              {/* Hamburger Button untuk Mobile & Tablet */}
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="menu-seluler"
                aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                className="grid size-10 place-items-center rounded-full text-ink ring-1 ring-line-strong transition-colors hover:bg-surface-muted lg:hidden shrink-0"
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

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        active={active}
        returnFocusRef={burgerRef}
      />
    </>
  )
}
