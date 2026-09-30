import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

const VARIANTS = {
  primary:
    'bg-brand text-brand-ink shadow-[0_14px_30px_-14px_rgb(15_42_34/0.6)] hover:bg-brand-hover',
  secondary: 'bg-surface/80 text-ink ring-1 ring-line-strong hover:bg-surface',
  ghost: 'text-ink hover:bg-surface-muted',
  warm: 'bg-coral-600 text-white shadow-[0_14px_30px_-14px_rgb(196_75_56/0.7)] hover:bg-coral-700',
  light: 'bg-white text-night-950 hover:bg-leaf-50',
  outlineLight: 'text-white ring-1 ring-white/25 hover:bg-white/10',
}

const SIZES = {
  sm: 'min-h-10 gap-1.5 px-4 text-sm',
  md: 'min-h-12 gap-2 px-6 text-[0.95rem]',
  lg: 'min-h-14 gap-2.5 px-7 text-base',
}

/**
 * Tombol atau tautan berbentuk pil dengan umpan balik gerak kecil.
 * Pakai `href` untuk tautan, tanpa `href` menjadi <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconLeft: IconLeft,
  type = 'button',
  className,
  children,
  ...props
}) {
  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      type={href ? undefined : type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={cn(
        'group inline-flex select-none items-center justify-center rounded-full font-semibold transition-colors duration-300 disabled:pointer-events-none disabled:opacity-45',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {IconLeft && <IconLeft aria-hidden="true" className="size-4 shrink-0" />}
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </Component>
  )
}
