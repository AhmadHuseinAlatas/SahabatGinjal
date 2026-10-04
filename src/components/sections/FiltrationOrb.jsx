import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { BrandBadge } from '../ui/Logo'

const PATH_IN = 'M 6 332 C 52 338, 92 318, 124 282'
const PATH_OUT = 'M 276 118 C 308 82, 348 62, 394 66'

const DROPS_IN = [
  { r: 6, begin: '0s' },
  { r: 4.5, begin: '-1.2s' },
  { r: 3.5, begin: '-2.4s' },
]
const DROPS_OUT = [
  { r: 6, begin: '-0.6s', fill: 'var(--color-tide-400)' },
  { r: 4.5, begin: '-1.8s', fill: 'var(--color-leaf-400)' },
  { r: 3.5, begin: '-3s', fill: 'var(--color-tide-300)' },
]

function Tag({ className, children }) {
  return (
    <span
      className={`glass absolute animate-float rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink shadow-card ring-1 ring-line sm:text-sm ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * Ilustrasi "darah kotor masuk, darah bersih keluar" dengan logo sebagai pusat penyaring.
 * Murni dekoratif.
 */
export default function FiltrationOrb() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollShift = useTransform(scrollY, [0, 700], [0, -60])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 18 })
  const yMouse = useSpring(my, { stiffness: 60, damping: 18 })
  const y = useTransform(() => yMouse.get() + scrollShift.get())

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 18)
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 18)
  }
  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[30rem]"
    >
      <motion.div style={{ x, y }} className="absolute inset-0">
        {/* cahaya */}
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)] blur-2xl" />

        {/* cincin */}
        <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-tide-400/40" />
        <div className="absolute inset-[14%] animate-spin-reverse rounded-full border border-dashed border-leaf-400/40" />
        <div className="absolute inset-[19%] rounded-full bg-surface/60 ring-1 ring-line" />

        {/* jalur darah */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="orb-in" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-coral-400)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-coral-500)" />
            </linearGradient>
            <linearGradient id="orb-out" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-tide-400)" />
              <stop offset="100%" stopColor="var(--color-leaf-400)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path id="orb-path-in" d={PATH_IN} stroke="url(#orb-in)" strokeWidth="10" strokeLinecap="round" />
          <path id="orb-path-out" d={PATH_OUT} stroke="url(#orb-out)" strokeWidth="10" strokeLinecap="round" />
          <path
            d={PATH_IN}
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-dash"
          />
          <path
            d={PATH_OUT}
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-dash"
          />

          {!reduce && (
            <g>
              {DROPS_IN.map((drop) => (
                <circle key={drop.begin} r={drop.r} fill="var(--color-coral-500)">
                  <animateMotion dur="3.6s" begin={drop.begin} repeatCount="indefinite">
                    <mpath href="#orb-path-in" />
                  </animateMotion>
                </circle>
              ))}
              {DROPS_OUT.map((drop) => (
                <circle key={drop.begin} r={drop.r} fill={drop.fill}>
                  <animateMotion dur="3.6s" begin={drop.begin} repeatCount="indefinite">
                    <mpath href="#orb-path-out" />
                  </animateMotion>
                </circle>
              ))}
            </g>
          )}
        </svg>

        {/* logo sebagai "penyaring" */}
        <div className="absolute inset-[21%]">
          <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-tide-400/60" />
          <BrandBadge className="size-full shadow-float" />
        </div>

        <Tag className="bottom-[14%] left-0">darah masuk</Tag>
        <Tag className="top-[8%] right-0 [animation-delay:-2.5s]">darah bersih</Tag>
        <Tag className="right-[4%] bottom-[2%] [animation-delay:-4.5s]">mesin jadi ginjal keduamu</Tag>
      </motion.div>
    </div>
  )
}
