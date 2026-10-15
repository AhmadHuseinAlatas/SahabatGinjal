import { Droplets, HeartPulse, Home, Hospital, ShieldCheck, Wind } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '../../lib/cn'

const DOCK_ITEMS = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'skrining', label: 'Cek Ginjal', icon: ShieldCheck },
  { id: 'pilihan', label: 'Dialisis', icon: HeartPulse },
  { id: 'cairan', label: 'Minum', icon: Droplets },
  { id: 'rumah-sakit', label: 'Cari RS', icon: Hospital },
  { id: 'tenang', label: 'Tenang', icon: Wind },
]

/**
 * Mobile Bottom Navigation Dock.
 * Terkunci diam di bawah layar (fixed hold) dan tidak berpindah/bergoyang saat scroll ke bawah.
 * Pilihan tab hanya berpindah ketika ditekan oleh pengguna.
 */
export default function MobileBottomBar({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('beranda')

  const handleClick = (e, id) => {
    e.preventDefault()
    setActiveTab(id)
    if (onNavigate) {
      onNavigate(id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Navigasi cepat ponsel"
      className="fixed inset-x-0 bottom-0 z-50 w-full max-w-full overflow-hidden transform-none select-none border-t border-line-strong bg-surface/96 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-xl dark:shadow-black/60 lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group relative flex flex-1 flex-col items-center justify-center py-1 text-center transition-all duration-200 active:scale-95',
                isActive ? 'text-primary font-bold' : 'text-ink-soft hover:text-ink',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-bar-indicator"
                  aria-hidden="true"
                  className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  'grid size-8 place-items-center rounded-xl transition-colors',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-ink-soft group-hover:text-ink',
                )}
              >
                <Icon className="size-4.5" />
              </span>
              <span className="mt-0.5 text-[10px] leading-tight tracking-tight">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
