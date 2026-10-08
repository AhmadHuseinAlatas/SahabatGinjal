import badge from '../../assets/brand/logo-badge.jpg'
import { cn } from '../../lib/cn'

/** Lencana logo SahabatGinjal di dalam lingkaran putih. */
export function BrandBadge({ className, alt = '', ...props }) {
  return (
    <span
      className={cn('relative block overflow-hidden rounded-full bg-white ring-1 ring-black/5', className)}
    >
      <img
        src={badge}
        alt={alt}
        width="720"
        height="720"
        decoding="async"
        className="size-full object-cover"
        {...props}
      />
    </span>
  )
}

/** Logo + nama, sebagai tautan kembali ke atas halaman. */
export default function Logo({ className, onClick }) {
  return (
    <a
      href="#beranda"
      onClick={onClick}
      aria-label="SahabatGinjal, kembali ke atas halaman"
      className={cn('group inline-flex shrink-0 items-center gap-2.5 sm:gap-3 rounded-full', className)}
    >
      <BrandBadge className="size-9 sm:size-10 shadow-sm transition-transform duration-500 ease-soft group-hover:-rotate-12" />
      <span aria-hidden="true" className="font-display text-lg sm:text-[1.25rem] leading-none tracking-tight text-ink whitespace-nowrap">
        Sahabat<em className="text-primary">Ginjal</em>
      </span>
    </a>
  )
}
