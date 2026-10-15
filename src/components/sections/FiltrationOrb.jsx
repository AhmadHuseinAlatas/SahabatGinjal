import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const PATH_FULL =
  'M 6 332 C 52 338, 92 318, 124 282 C 156 246, 175 222, 200 200 C 225 178, 244 154, 276 118 C 308 82, 348 62, 394 66'

const DROPS = [
  { r: 5.5, begin: '0s' },
  { r: 4.2, begin: '-1.15s' },
  { r: 5.0, begin: '-2.3s' },
  { r: 3.8, begin: '-3.45s' },
]

const CAPILLARY_OFFSETS = [-24, -16, -8, 0, 8, 16, 24]

function Tag({ className, children }) {
  return (
    <span
      className={`glass absolute animate-float rounded-full px-2.5 py-1 text-[11px] font-semibold text-ink shadow-card ring-1 ring-line sm:px-3.5 sm:py-1.5 sm:text-xs md:text-sm ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * Visualisasi Inti Dialisis Kaca Futuristik (Biomedical Dialyzer Core).
 * Menggambarkan proses hemodialisis: darah kotor masuk, difilter lewat
 * membran semipermeabel transparan, dan keluar menjadi darah bersih.
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
      className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden"
    >
      <motion.div style={{ x, y }} className="absolute inset-0">
        {/* Pendaran cahaya latar (Ambient Glow) */}
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)] blur-2xl opacity-60" />

        {/* Cincin orbit luar dengan putaran halus */}
        <div className="absolute inset-[5%] animate-spin-slow rounded-full border border-dashed border-tide-400/30" />
        <div className="absolute inset-[13%] animate-spin-reverse rounded-full border border-dashed border-leaf-400/30" />
        <div className="absolute inset-[18%] rounded-full bg-surface/40 ring-1 ring-line backdrop-blur-[2px]" />

        {/* Visualisasi Dialyzer & Sirkulasi Darah Murni Vektor SVG */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          <defs>
            {/* Gradasi dinamis sepanjang jalur darah */}
            <linearGradient id="orb-flow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-coral-500)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--color-coral-500)" />
              <stop offset="45%" stopColor="var(--color-coral-400)" />
              <stop offset="52%" stopColor="var(--color-tide-300)" />
              <stop offset="65%" stopColor="var(--color-tide-400)" />
              <stop offset="85%" stopColor="var(--color-leaf-400)" />
              <stop offset="100%" stopColor="var(--color-leaf-400)" stopOpacity="0" />
            </linearGradient>

            {/* Gradasi kaca gelap transparan untuk tabung dialyzer */}
            <radialGradient id="dialyzer-glass" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="var(--color-night-800)" stopOpacity="0.75" />
              <stop offset="65%" stopColor="var(--color-night-900)" stopOpacity="0.88" />
              <stop offset="100%" stopColor="var(--color-night-950)" stopOpacity="0.95" />
            </radialGradient>

            {/* Rim light neon halus (coral -> cyan -> emerald) */}
            <linearGradient id="dialyzer-rim" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-coral-400)" stopOpacity="0.75" />
              <stop offset="48%" stopColor="var(--color-tide-400)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--color-leaf-400)" stopOpacity="0.9" />
            </linearGradient>

            {/* Pendaran serat kapiler filter */}
            <linearGradient id="capillary-fiber-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--color-coral-400)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--color-tide-300)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--color-leaf-300)" stopOpacity="0.4" />
            </linearGradient>

            {/* Pendaran pusat inti filtrasi */}
            <radialGradient id="core-node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-tide-300)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="var(--color-tide-500)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* ── Gradient ginjal kiri (coral/warm) ── */}
            <radialGradient id="kidney-L-fill" cx="38%" cy="45%" r="62%">
              <stop offset="0%" stopColor="#f2aa9c" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#da6552" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#c44b38" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="kidney-L-medulla" cx="55%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#f2aa9c" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#da6552" stopOpacity="0.05" />
            </radialGradient>
            <linearGradient id="kidney-L-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f2aa9c" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#e98370" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#da6552" stopOpacity="0.55" />
            </linearGradient>

            {/* ── Gradient ginjal kanan (cyan/cool) ── */}
            <radialGradient id="kidney-R-fill" cx="62%" cy="45%" r="62%">
              <stop offset="0%" stopColor="#bfe2f2" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#52a4cd" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3a8fbb" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="kidney-R-medulla" cx="45%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#bfe2f2" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#52a4cd" stopOpacity="0.05" />
            </radialGradient>
            <linearGradient id="kidney-R-stroke" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfe2f2" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#92cfe8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#52a4cd" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Jalur darah kontinu (Darah Kotor -> Tabung Filter -> Darah Bersih) */}
          <path
            id="orb-path-full"
            d={PATH_FULL}
            stroke="url(#orb-flow)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Garis putus-putus bersinar di dalam jalur aliran */}
          <path
            d={PATH_FULL}
            stroke="white"
            strokeOpacity="0.75"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-dash"
          />

          {/* ============================================================== */}
          {/* TABUNG DIALYZER KACA TRANSPARAN (PUSAT PENYARING HEMODIALISIS) */}
          {/* ============================================================== */}
          <g className="transition-transform duration-700 ease-soft">
            {/* Cincin denyut ritmis (Subtle Rhythmic Pulse Rim) */}
            <circle
              cx="200"
              cy="200"
              r="110"
              fill="none"
              stroke="url(#dialyzer-rim)"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="animate-spin-slow opacity-40"
            />
            <circle
              cx="200"
              cy="200"
              r="104"
              fill="none"
              stroke="var(--color-tide-300)"
              strokeWidth="0.75"
              strokeDasharray="2 6"
              className="animate-spin-reverse opacity-35"
            />

            {/* Piringan Kaca Gelap Transparan (Frosted Glass Core) */}
            <circle
              cx="200"
              cy="200"
              r="98"
              fill="url(#dialyzer-glass)"
              stroke="url(#dialyzer-rim)"
              strokeWidth="1.75"
              className="drop-shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            />

            {/* Inner Glass Rim Highlight */}
            <circle
              cx="200"
              cy="200"
              r="96"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.12"
            />

            {/* Refleksi kilau kaca melengkung di bagian atas */}
            <path
              d="M 130 162 A 86 86 0 0 1 270 162"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />

            {/* ========================================================== */}
            {/* GINJAL REALISTIS — ANATOMI BEAN-SHAPE YANG INDAH             */}
            {/* ========================================================== */}

            {/* ══════════════════════════════════════════════════════════ */}
            {/*  GINJAL KIRI  (Sisi Darah Masuk · Coral Warm)              */}
            {/* ══════════════════════════════════════════════════════════ */}
            <g>
              {/* Bayangan halus di bawah ginjal */}
              <ellipse cx="152" cy="240" rx="26" ry="5" fill="rgba(218,101,82,0.08)" />

              {/* ── Bentuk utama: bean-shape anatomis besar & halus ── */}
              {/* Kontur luar (kapsul fibrosa) */}
              <path
                d="M 150 152
                   C 140 152, 130 158, 124 168
                   C 118 178, 116 192, 116 200
                   C 116 208, 118 222, 124 232
                   C 130 242, 140 248, 150 248
                   C 156 248, 162 244, 166 238
                   C 170 232, 172 224, 172 218
                   C 172 214, 170 210, 168 206
                   C 166 202, 166 198, 168 194
                   C 170 190, 172 186, 172 182
                   C 172 176, 170 168, 166 162
                   C 162 156, 156 152, 150 152 Z"
                fill="url(#kidney-L-fill)"
                stroke="url(#kidney-L-stroke)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />

              {/* Batas korteks-medula (garis dalam organik) */}
              <path
                d="M 150 160
                   C 142 160, 134 165, 129 173
                   C 124 181, 122 192, 122 200
                   C 122 208, 124 219, 129 227
                   C 134 235, 142 240, 150 240
                   C 154 240, 158 237, 161 233
                   C 164 229, 165 224, 165 219
                   C 165 215, 164 212, 162 208
                   C 160 204, 160 196, 162 192
                   C 164 188, 165 185, 165 181
                   C 165 176, 164 171, 161 167
                   C 158 163, 154 160, 150 160 Z"
                fill="url(#kidney-L-medulla)"
                stroke="var(--color-coral-300)"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                strokeDasharray="4 3"
              />

              {/* ── Piramida medula (bentuk organik membulat) ── */}
              {/* Piramida atas */}
              <path
                d="M 130 174 C 134 173, 140 177, 148 182
                   C 152 184, 156 187, 160 190
                   C 156 192, 148 189, 140 186
                   C 134 184, 130 180, 130 174 Z"
                fill="rgba(218,101,82,0.12)"
                stroke="var(--color-coral-400)"
                strokeWidth="0.4"
                strokeOpacity="0.25"
              />
              {/* Piramida tengah (terbesar) */}
              <path
                d="M 127 192 C 131 190, 138 193, 146 197
                   C 152 200, 158 203, 162 205
                   C 158 207, 152 205, 146 203
                   C 138 200, 131 198, 127 201
                   C 126 197, 126 194, 127 192 Z"
                fill="rgba(218,101,82,0.14)"
                stroke="var(--color-coral-400)"
                strokeWidth="0.4"
                strokeOpacity="0.28"
              />
              {/* Piramida bawah */}
              <path
                d="M 130 214 C 134 210, 140 212, 148 216
                   C 152 218, 156 220, 160 222
                   C 156 224, 148 222, 140 220
                   C 134 218, 130 220, 130 214 Z"
                fill="rgba(218,101,82,0.11)"
                stroke="var(--color-coral-400)"
                strokeWidth="0.4"
                strokeOpacity="0.22"
              />

              {/* ── Pelvis renalis (rongga pengumpul, bentuk corong halus) ── */}
              <path
                d="M 162 190
                   C 165 194, 166 197, 166 200
                   C 166 203, 165 206, 162 210"
                fill="none"
                stroke="var(--color-coral-300)"
                strokeWidth="1.8"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
              {/* Rongga pelvis dalam */}
              <path
                d="M 163 192
                   C 165 196, 165.5 198, 165.5 200
                   C 165.5 202, 165 204, 163 208"
                fill="none"
                stroke="var(--color-coral-200)"
                strokeWidth="0.8"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />

              {/* ── Kaliks (cabang pelvis ke piramida, kurva halus) ── */}
              <path d="M 155 185 C 158 187, 161 189, 162 190" fill="none" stroke="var(--color-coral-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />
              <path d="M 158 200 C 161 200, 163 200, 166 200" fill="none" stroke="var(--color-coral-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />
              <path d="M 155 215 C 158 213, 161 211, 162 210" fill="none" stroke="var(--color-coral-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />

              {/* ── Pembuluh darah renalis kiri ── */}
              {/* Arteri renalis (tebal, keluar dari hilum ke node pusat) */}
              <path
                d="M 168 196 C 174 195, 180 196, 186 198"
                stroke="var(--color-coral-400)"
                strokeWidth="2"
                strokeOpacity="0.55"
                strokeLinecap="round"
              />
              {/* Vena renalis (lebih tipis, paralel di bawah arteri) */}
              <path
                d="M 168 205 C 174 206, 180 205, 186 203"
                stroke="var(--color-coral-300)"
                strokeWidth="1.2"
                strokeOpacity="0.35"
                strokeLinecap="round"
                strokeDasharray="3 2"
              />
              {/* Ureter (turun dari pelvis ke bawah) */}
              <path
                d="M 164 210 C 166 218, 168 228, 168 236"
                stroke="var(--color-coral-300)"
                strokeWidth="0.9"
                strokeOpacity="0.25"
                strokeLinecap="round"
              />
            </g>

            {/* ══════════════════════════════════════════════════════════ */}
            {/*  GINJAL KANAN  (Sisi Darah Bersih · Cyan-Emerald Cool)    */}
            {/* ══════════════════════════════════════════════════════════ */}
            <g>
              {/* Bayangan halus di bawah ginjal */}
              <ellipse cx="248" cy="240" rx="26" ry="5" fill="rgba(82,164,205,0.08)" />

              {/* ── Bentuk utama: mirror bean-shape ── */}
              <path
                d="M 250 152
                   C 260 152, 270 158, 276 168
                   C 282 178, 284 192, 284 200
                   C 284 208, 282 222, 276 232
                   C 270 242, 260 248, 250 248
                   C 244 248, 238 244, 234 238
                   C 230 232, 228 224, 228 218
                   C 228 214, 230 210, 232 206
                   C 234 202, 234 198, 232 194
                   C 230 190, 228 186, 228 182
                   C 228 176, 230 168, 234 162
                   C 238 156, 244 152, 250 152 Z"
                fill="url(#kidney-R-fill)"
                stroke="url(#kidney-R-stroke)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />

              {/* Batas korteks-medula */}
              <path
                d="M 250 160
                   C 258 160, 266 165, 271 173
                   C 276 181, 278 192, 278 200
                   C 278 208, 276 219, 271 227
                   C 266 235, 258 240, 250 240
                   C 246 240, 242 237, 239 233
                   C 236 229, 235 224, 235 219
                   C 235 215, 236 212, 238 208
                   C 240 204, 240 196, 238 192
                   C 236 188, 235 185, 235 181
                   C 235 176, 236 171, 239 167
                   C 242 163, 246 160, 250 160 Z"
                fill="url(#kidney-R-medulla)"
                stroke="var(--color-tide-300)"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                strokeDasharray="4 3"
              />

              {/* ── Piramida medula (organik membulat, mirrored) ── */}
              <path
                d="M 270 174 C 266 173, 260 177, 252 182
                   C 248 184, 244 187, 240 190
                   C 244 192, 252 189, 260 186
                   C 266 184, 270 180, 270 174 Z"
                fill="rgba(82,164,205,0.12)"
                stroke="var(--color-tide-400)"
                strokeWidth="0.4"
                strokeOpacity="0.25"
              />
              <path
                d="M 273 192 C 269 190, 262 193, 254 197
                   C 248 200, 242 203, 238 205
                   C 242 207, 248 205, 254 203
                   C 262 200, 269 198, 273 201
                   C 274 197, 274 194, 273 192 Z"
                fill="rgba(82,164,205,0.14)"
                stroke="var(--color-tide-400)"
                strokeWidth="0.4"
                strokeOpacity="0.28"
              />
              <path
                d="M 270 214 C 266 210, 260 212, 252 216
                   C 248 218, 244 220, 240 222
                   C 244 224, 252 222, 260 220
                   C 266 218, 270 220, 270 214 Z"
                fill="rgba(82,164,205,0.11)"
                stroke="var(--color-tide-400)"
                strokeWidth="0.4"
                strokeOpacity="0.22"
              />

              {/* ── Pelvis renalis kanan ── */}
              <path
                d="M 238 190
                   C 235 194, 234 197, 234 200
                   C 234 203, 235 206, 238 210"
                fill="none"
                stroke="var(--color-tide-300)"
                strokeWidth="1.8"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M 237 192
                   C 235 196, 234.5 198, 234.5 200
                   C 234.5 202, 235 204, 237 208"
                fill="none"
                stroke="var(--color-tide-200)"
                strokeWidth="0.8"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />

              {/* ── Kaliks kanan ── */}
              <path d="M 245 185 C 242 187, 239 189, 238 190" fill="none" stroke="var(--color-tide-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />
              <path d="M 242 200 C 239 200, 237 200, 234 200" fill="none" stroke="var(--color-tide-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />
              <path d="M 245 215 C 242 213, 239 211, 238 210" fill="none" stroke="var(--color-tide-300)" strokeWidth="0.9" strokeOpacity="0.3" strokeLinecap="round" />

              {/* ── Pembuluh darah renalis kanan ── */}
              <path
                d="M 232 196 C 226 195, 220 196, 214 198"
                stroke="var(--color-tide-400)"
                strokeWidth="2"
                strokeOpacity="0.55"
                strokeLinecap="round"
              />
              <path
                d="M 232 205 C 226 206, 220 205, 214 203"
                stroke="var(--color-leaf-400)"
                strokeWidth="1.2"
                strokeOpacity="0.35"
                strokeLinecap="round"
                strokeDasharray="3 2"
              />
              {/* Ureter kanan */}
              <path
                d="M 236 210 C 234 218, 232 228, 232 236"
                stroke="var(--color-tide-300)"
                strokeWidth="0.9"
                strokeOpacity="0.25"
                strokeLinecap="round"
              />
            </g>

            {/* ========================================================== */}
            {/* SERAT-SERAT KAPILER MEMBRAN DIALYZER (HOLLOW FIBER FILTER) */}
            {/* ========================================================== */}
            {CAPILLARY_OFFSETS.map((offset, idx) => {
              const xPos = 200 + offset
              const curveX = 200 + offset * 1.15
              return (
                <path
                  key={offset}
                  d={`M ${xPos} 146 Q ${curveX} 200 ${xPos} 254`}
                  stroke="url(#capillary-fiber-grad)"
                  strokeWidth={offset === 0 ? '1.5' : '1.1'}
                  strokeDasharray="3 4"
                  strokeOpacity={0.42 + (idx % 2) * 0.22}
                  className="animate-dash"
                />
              )
            })}

            {/* ========================================================== */}
            {/* PUSAT NODE FILTRASI AKTIF (DENYUT RITMIS SIRKULASI) */}
            {/* ========================================================== */}
            {/* Pendaran ritmis inti */}
            <circle
              cx="200"
              cy="200"
              r="22"
              fill="url(#core-node-glow)"
              className="animate-pulse"
              opacity="0.65"
            />

            {/* Node inti kaca dialisis */}
            <circle
              cx="200"
              cy="200"
              r="15"
              fill="rgba(11, 31, 27, 0.88)"
              stroke="url(#dialyzer-rim)"
              strokeWidth="1.4"
            />

            {/* Simbol sirkulasi pertukaran dialisat (dual micro arrows) */}
            <path
              d="M 194.5 195 A 6.5 6.5 0 0 1 205.5 195"
              fill="none"
              stroke="var(--color-tide-300)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <polygon points="206.5,192 207.5,196.5 203,196" fill="var(--color-tide-300)" />
            <path
              d="M 205.5 205 A 6.5 6.5 0 0 1 194.5 205"
              fill="none"
              stroke="var(--color-coral-400)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <polygon points="193.5,208 192.5,203.5 197,204" fill="var(--color-coral-400)" />

            {/* Label telemetri medis: DIALYZER (Atas) */}
            <g opacity="0.8">
              <rect
                x="162"
                y="126"
                width="76"
                height="15"
                rx="7.5"
                fill="rgba(17, 42, 37, 0.65)"
                stroke="rgba(146, 207, 232, 0.22)"
                strokeWidth="0.75"
              />
              <text
                x="200"
                y="136.5"
                textAnchor="middle"
                fill="var(--color-tide-300)"
                fontSize="7.5"
                fontWeight="600"
                letterSpacing="0.16em"
              >
                DIALYZER
              </text>
            </g>

            {/* Label telemetri medis: FILTER AKTIF (Bawah) */}
            <g opacity="0.8">
              <rect
                x="154"
                y="259"
                width="92"
                height="15"
                rx="7.5"
                fill="rgba(17, 42, 37, 0.65)"
                stroke="rgba(85, 177, 118, 0.22)"
                strokeWidth="0.75"
              />
              <circle cx="166" cy="266.5" r="2.2" fill="var(--color-leaf-400)" />
              <text
                x="173"
                y="269.5"
                fill="var(--color-leaf-300)"
                fontSize="6.8"
                fontWeight="600"
                letterSpacing="0.1em"
              >
                MEMBRAN AKTIF
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* PARTIKEL ALIRAN DARAH (TRANSISI MERAH -> UNGU/CYAN -> EMERALD) */}
          {/* ============================================================== */}
          {!reduce && (
            <g>
              {DROPS.map((drop) => (
                <circle key={drop.begin} r={drop.r} fill="var(--color-coral-500)">
                  {/* Animasi pergerakan partikel sepanjang jalur utuh */}
                  <animateMotion dur="4.6s" begin={drop.begin} repeatCount="indefinite">
                    <mpath href="#orb-path-full" />
                  </animateMotion>

                  {/* Transisi warna: Merah (kotor) -> Cyan (disaring) -> Emerald (bersih) */}
                  <animate
                    attributeName="fill"
                    dur="4.6s"
                    begin={drop.begin}
                    repeatCount="indefinite"
                    values="#da6552; #e98370; #92cfe8; #52a4cd; #55b176"
                    keyTimes="0; 0.28; 0.50; 0.72; 1"
                  />

                  {/* Sedikit pulsasi ukuran partikel saat masuk ke membran filtrasi */}
                  <animate
                    attributeName="r"
                    dur="4.6s"
                    begin={drop.begin}
                    repeatCount="indefinite"
                    values={`${drop.r}; ${drop.r + 1.2}; ${drop.r + 0.8}; ${drop.r}; ${drop.r}`}
                    keyTimes="0; 0.30; 0.50; 0.72; 1"
                  />
                </circle>
              ))}
            </g>
          )}
        </svg>

        {/* Label informatif mengambang */}
        <Tag className="bottom-[14%] left-1.5 sm:left-1">darah masuk</Tag>
        <Tag className="top-[8%] right-1.5 sm:right-1 [animation-delay:-2.5s]">darah bersih</Tag>
        <Tag className="right-2 sm:right-[4%] bottom-[2%] [animation-delay:-4.5s]">
          mesin jadi ginjal keduamu
        </Tag>
      </motion.div>
    </div>
  )
}
