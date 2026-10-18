import {
  Check,
  CloudRain,
  Copy,
  Pause,
  Play,
  Quote,
  Radio,
  ShieldCheck,
  Sparkles,
  Timer,
  Volume2,
  Waves,
  Wind,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { AFFIRMATIONS, BREATH_PATTERNS, STARS } from '../../data/calm'
import useBreathing from '../../hooks/useBreathing'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import {
  playAmbientSound,
  setAmbientVolume,
  SOUND_PRESETS,
  stopAmbientSound,
} from '../../lib/soundscape'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

const CALM_TABS = [
  { id: 'breathing', label: 'Latihan Napas', icon: Wind },
  { id: 'soundscape', label: 'Suara Ambien', icon: Waves },
  { id: 'affirmation', label: 'Kata Penguat', icon: Sparkles },
]

const ICON_MAP = {
  rain: CloudRain,
  waves: Waves,
  brown: Radio,
  meditation: Sparkles,
}

function formatTime(seconds) {
  if (seconds === null) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

/** Animasi equalizer suara dinamis */
function SoundWaveEqualizer({ isPlaying, colorClass = 'bg-primary' }) {
  if (!isPlaying) return null

  return (
    <div className="flex items-end gap-1 h-3.5 px-1" aria-hidden="true">
      {[40, 90, 60, 100, 75, 45].map((h, i) => (
        <motion.span
          key={i}
          animate={{ height: ['25%', `${h}%`, '30%'] }}
          transition={{
            repeat: Infinity,
            duration: 0.5 + i * 0.12,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
          className={cn('w-0.5 sm:w-1 rounded-full', colorClass)}
        />
      ))}
    </div>
  )
}

/** Taburan Bintang untuk Tampilan Mode Malam */
function Stars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `-${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/** Lingkaran Napas Zen yang Memukau, Jernih & Menenangkan */
function Breather() {
  const [patternId, setPatternId] = useState(BREATH_PATTERNS[0].id)
  const pattern = BREATH_PATTERNS.find((item) => item.id === patternId)
  const { running, current, left, cycles, start, stop } = useBreathing(pattern.phases)

  const choose = (id) => {
    stop()
    setPatternId(id)
  }

  // Radius & keliling SVG lingkaran countdown
  const radius = 86
  const circumference = 2 * Math.PI * radius
  const strokeOffset = current ? circumference * (1 - left / current.seconds) : circumference

  const isHolding = current?.key === 'hold'
  const isExhaling = current?.key === 'out'
  const isInhaling = current?.key === 'in'

  return (
    <div className="flex flex-col items-center">
      {/* Pilihan Pola Napas */}
      <div role="radiogroup" aria-label="Pola napas" className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {BREATH_PATTERNS.map((item) => {
          const active = item.id === patternId
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(item.id)}
              className={cn(
                'min-h-8 sm:min-h-8.5 rounded-full px-3.5 py-1 text-xs font-semibold ring-1 transition-all active:scale-95 cursor-pointer',
                active
                  ? 'bg-linear-to-r from-leaf-600 to-tide-600 text-white ring-leaf-500 shadow-sm'
                  : 'bg-surface/80 text-ink-soft ring-line hover:bg-surface hover:text-ink dark:bg-white/10 dark:text-white/80 dark:ring-white/20',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 max-w-xs text-center text-xs text-ink-soft dark:text-white/70">{pattern.hint}</p>

      {/* LINGKARAN NAPAS INTERAKTIF */}
      <div className="relative mt-5 sm:mt-6 grid size-52 place-items-center sm:size-60 lg:size-64 select-none">
        {/* Layer 1: Pendar Aura Dinamis Luar */}
        <motion.div
          animate={{
            scale: running ? (isInhaling ? 1.25 : isHolding ? 1.15 : 0.85) : 1,
            opacity: running ? (isInhaling ? 0.45 : isHolding ? 0.6 : 0.2) : 0.15,
          }}
          transition={{ duration: current ? current.seconds : 1.2, ease: 'easeInOut' }}
          className={cn(
            'absolute inset-0 rounded-full blur-xl pointer-events-none transition-colors duration-1000',
            isInhaling && 'bg-emerald-400',
            isHolding && 'bg-amber-400',
            isExhaling && 'bg-sky-400',
            !running && 'bg-leaf-300 dark:bg-tide-500',
          )}
        />

        {/* Layer 2: Ring Riak Konsentris */}
        <motion.div
          animate={{
            scale: running ? (isInhaling ? [1, 1.15, 1.08] : isHolding ? 1.08 : [1.08, 0.92]) : 1,
          }}
          transition={{ duration: current ? current.seconds : 2, ease: 'easeInOut' }}
          className="absolute inset-2 rounded-full border border-primary/25 dark:border-white/20 pointer-events-none"
        />

        {/* Layer 3: Orb Inti dengan Gradien Organik & Kontras Tinggi */}
        <motion.div
          animate={{
            scale: running ? (isInhaling ? 1.08 : isHolding ? 1.08 : 0.88) : 0.94,
          }}
          transition={{ duration: current ? current.seconds : 1, ease: 'easeInOut' }}
          className="breath-orb-light dark:breath-orb relative grid size-44 sm:size-48 lg:size-50 place-items-center rounded-full border border-line-strong dark:border-white/20 shadow-xl transition-all duration-700"
        >
          {/* SVG Progress Arc */}
          <svg
            className="absolute inset-0 -rotate-90 pointer-events-none size-full"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              className="text-line/40 dark:text-white/10"
              strokeWidth="4"
            />
            {running && (
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#calmBreathGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-1000 ease-linear"
              />
            )}
            <defs>
              <linearGradient id="calmBreathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c7d47" />
                <stop offset="50%" stopColor="#3a8fbb" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>

          {/* Konten Teks di Tengah Lingkaran */}
          <div className="relative text-center px-4">
            <motion.p
              key={current ? current.label : 'idle'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'font-display text-sm sm:text-base font-bold tracking-wide transition-colors',
                isInhaling && 'text-emerald-700 dark:text-emerald-300',
                isHolding && 'text-amber-700 dark:text-amber-300',
                isExhaling && 'text-tide-700 dark:text-tide-300',
                !running && 'text-ink dark:text-white',
              )}
            >
              {current ? current.label : 'Siap Relaksasi?'}
            </motion.p>

            <p className="mt-0.5 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink dark:text-white tabular-nums drop-shadow-xs">
              {current ? left : '–'}
            </p>

            <span className="mt-1 block text-[10px] font-semibold text-ink-soft dark:text-white/70">
              {running
                ? isInhaling
                  ? 'Tarik napas lewat hidung'
                  : isHolding
                    ? 'Tahan santai, bahu rileks'
                    : 'Embuskan pelan lewat bibir'
                : 'Tekan tombol di bawah'}
            </span>
          </div>
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? `${current.label}, ${left} detik tersisa` : ''}
      </p>

      {/* Tombol Mulai / Selesai */}
      <div className="mt-5 sm:mt-6">
        {running ? (
          <Button
            variant="warm"
            size="md"
            iconLeft={Pause}
            onClick={stop}
            className="shadow-md shadow-coral-500/25"
          >
            Selesai Bernapas
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            iconLeft={Play}
            onClick={start}
            className="shadow-lg shadow-leaf-500/25 transition-transform hover:scale-105 active:scale-95"
          >
            Mulai Bernapas Sekarang
          </Button>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-soft dark:text-white/70">
        Siklus tenang selesai: <span className="font-bold text-primary dark:text-sprout-400 tabular-nums">{cycles}</span>
      </p>
      <p className="mt-0.5 text-center text-[11px] text-ink-faint dark:text-white/60">
        Berhenti kapan saja jika kepala terasa pusing atau napas terasa berat.
      </p>
    </div>
  )
}

/** Kartu Kata Penguat Jiwa */
function Affirmation({ compact = false }) {
  const [index, setIndex] = useState(null)
  const [copied, setCopied] = useState(false)

  const next = () => {
    setIndex((current) => {
      let pick = Math.floor(Math.random() * AFFIRMATIONS.length)
      if (pick === current) pick = (pick + 1) % AFFIRMATIONS.length
      return pick
    })
    setCopied(false)
  }

  const handleCopy = () => {
    if (index === null) return
    navigator.clipboard.writeText(`“${AFFIRMATIONS[index]}” — SahabatGinjal`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xs',
        'bg-surface/90 border border-line backdrop-blur-md hover:shadow-md hover:border-line-strong dark:bg-white/5 dark:border-white/15 dark:hover:border-white/25',
        compact ? 'mt-0' : '',
      )}
    >
      {/* Pendaran Latar Sudut */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 size-32 rounded-full bg-linear-to-br from-amber-400/20 to-coral-400/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
      />

      <div className="relative flex items-center justify-between pb-3 border-b border-line dark:border-white/10">
        <div className="flex items-center gap-2">
          <Quote className="size-4 text-amber-500" />
          <span className="font-bold text-xs uppercase tracking-wider text-ink-soft dark:text-white/80">
            Kata Penguat Hari Ini
          </span>
        </div>

        {index !== null && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-ink-soft hover:bg-surface-muted hover:text-ink dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Salin</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="min-h-20 sm:min-h-22 flex items-center py-4" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index ?? 'kosong'}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="font-display text-base sm:text-lg lg:text-xl leading-relaxed text-ink dark:text-white font-medium italic"
          >
            {index === null
              ? 'Ada pesan hangat yang menunggumu saat hari terasa melelahkan...'
              : `“${AFFIRMATIONS[index]}”`}
          </motion.p>
        </AnimatePresence>
      </div>

      <Button
        variant="secondary"
        size="sm"
        iconLeft={Sparkles}
        onClick={next}
        className="w-full sm:w-auto text-xs shadow-xs hover:border-primary active:scale-95"
      >
        {index === null ? 'Buka Kalimat Penenang ✨' : 'Ganti Kalimat Lain 🔄'}
      </Button>
    </div>
  )
}

/** Kontrol Soundscape dengan Equalizer & Preset Suara */
function SoundscapeControl({ sound, compact = false }) {
  const {
    playing,
    soundType,
    volume,
    timerMinutes,
    timeLeft,
    handleToggle,
    handleSoundChange,
    handleVolumeChange,
    handleTimerChange,
  } = sound

  const activePreset = SOUND_PRESETS.find((p) => p.id === soundType) || SOUND_PRESETS[0]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xs',
        'bg-surface/90 border border-line backdrop-blur-md hover:shadow-md hover:border-line-strong dark:bg-white/5 dark:border-white/15 dark:hover:border-white/25',
        compact ? 'mt-0' : 'mt-5',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-line dark:border-white/10">
        <div className="flex items-center gap-2">
          <Waves className="size-4 text-tide-500" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-wide text-ink dark:text-white">
              Suara Ambien Penenang (Soundscape)
            </h3>
            <p className="text-[11px] text-ink-soft dark:text-white/60">
              100% offline & sintetis • Meredam kebisingan ruang dialisis
            </p>
          </div>
        </div>

        {/* Equalizer & Timer */}
        <div className="flex items-center gap-2">
          <SoundWaveEqualizer isPlaying={playing} colorClass="bg-tide-500 dark:bg-tide-400" />
          {playing && timeLeft !== null && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-tide-100 text-tide-800 ring-1 ring-tide-300 dark:bg-tide-400/20 dark:text-tide-200 dark:ring-tide-300/30 px-2.5 py-0.5 text-[11px] font-semibold">
              <Timer className="size-3" />
              {formatTime(timeLeft)}
            </span>
          )}
        </div>
      </div>

      {/* Preset Suara */}
      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Pilihan jenis suara ambien">
        {SOUND_PRESETS.map((preset) => {
          const active = preset.id === soundType
          const IconComp = ICON_MAP[preset.id] || CloudRain
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => handleSoundChange(preset.id)}
              className={cn(
                'inline-flex min-h-9 items-center gap-2 rounded-2xl px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all active:scale-95 cursor-pointer',
                active
                  ? 'bg-linear-to-r from-tide-600 to-leaf-600 text-white ring-tide-500 shadow-sm'
                  : 'bg-surface border border-line text-ink-soft hover:text-ink hover:bg-surface-muted hover:border-line-strong dark:bg-white/5 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10',
              )}
            >
              <IconComp className={cn('size-3.5', active ? 'text-white' : 'text-tide-600 dark:text-tide-300')} />
              <span>{preset.label}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-2.5 text-xs text-tide-700 dark:text-tide-300 font-medium italic">
        ✨ {activePreset.desc}
      </p>

      {/* Kontrol Putar & Slider Volume */}
      <div className="mt-4.5 flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-line dark:border-white/10">
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'inline-flex min-h-10 items-center gap-2 rounded-2xl px-4 text-xs font-bold ring-1 transition-all active:scale-95 shadow-sm cursor-pointer',
            playing
              ? 'bg-warm text-white ring-warm hover:bg-coral-700 shadow-warm/25'
              : 'bg-primary text-white ring-primary hover:bg-brand shadow-leaf-500/25',
          )}
        >
          {playing ? (
            <>
              <Pause className="size-4" />
              <span>Hentikan Suara</span>
            </>
          ) : (
            <>
              <Play className="size-4 fill-white" />
              <span>Putar {activePreset.label}</span>
            </>
          )}
        </button>

        {/* Volume & Timer */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Volume2 className="size-4 text-ink-soft dark:text-white/60 shrink-0" aria-hidden="true" />
            <input
              id="soundscape-volume"
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 sm:w-24 accent-primary dark:accent-tide-400 bg-surface-muted dark:bg-white/20 h-1.5 rounded-lg cursor-pointer"
              title={`Volume: ${Math.round((volume / 0.8) * 100)}%`}
            />
            <span className="text-[11px] tabular-nums font-semibold text-ink-soft dark:text-white/60 w-7">
              {Math.round((volume / 0.8) * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-surface-muted/90 p-1 border border-line dark:bg-white/10 dark:border-white/10">
            {[
              { label: 'Terus', val: 0 },
              { label: '5m', val: 5 },
              { label: '15m', val: 15 },
              { label: '30m', val: 30 },
            ].map((t) => (
              <button
                key={t.val}
                type="button"
                onClick={() => handleTimerChange(t.val)}
                className={cn(
                  'rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer',
                  timerMinutes === t.val
                    ? 'bg-surface text-primary shadow-xs dark:bg-white dark:text-night-950'
                    : 'text-ink-soft hover:text-ink dark:text-white/60 dark:hover:text-white',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function useSoundscape() {
  const [playing, setPlaying] = useState(false)
  const [soundType, setSoundType] = useState('rain')
  const [volume, setVolume] = useState(0.35)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)

  const hasTimer = timeLeft !== null

  useEffect(() => {
    if (!playing || !hasTimer) return undefined

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null
        if (prev <= 1) {
          stopAmbientSound()
          setPlaying(false)
          return null
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [playing, hasTimer])

  useEffect(() => {
    return () => {
      stopAmbientSound(true)
    }
  }, [])

  const handleToggle = async () => {
    if (playing) {
      stopAmbientSound()
      setPlaying(false)
      setTimeLeft(null)
    } else {
      const ok = await playAmbientSound(soundType, volume)
      if (ok) {
        setPlaying(true)
        if (timerMinutes > 0) setTimeLeft(timerMinutes * 60)
      }
    }
  }

  const handleSoundChange = async (newType) => {
    setSoundType(newType)
    if (playing) {
      await playAmbientSound(newType, volume)
    }
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    setAmbientVolume(val)
  }

  const handleTimerChange = (min) => {
    setTimerMinutes(min)
    if (min === 0) {
      setTimeLeft(null)
    } else if (playing) {
      setTimeLeft(min * 60)
    }
  }

  return {
    playing,
    soundType,
    volume,
    timerMinutes,
    timeLeft,
    handleToggle,
    handleSoundChange,
    handleVolumeChange,
    handleTimerChange,
  }
}

export default function CalmRoom() {
  const [mobileTab, setMobileTab] = useState('breathing')
  const sound = useSoundscape()
  const activePreset = SOUND_PRESETS.find((p) => p.id === sound.soundType) || SOUND_PRESETS[0]

  return (
    <section id="tenang" aria-labelledby="judul-tenang" className="py-8 sm:py-12 lg:py-16">
      <div className="shell">
        {/* KARTU UTAMA RUANG TENANG: BERSIH & SERASI DENGAN TEMA */}
        <div
          className={cn(
            'relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10 shadow-card transition-all duration-500',
            'bg-linear-to-b from-leaf-50/70 via-surface to-tide-50/60 border border-line-strong',
            'dark:night-sky dark:border-white/15 dark:shadow-2xl',
          )}
        >
          {/* Efek Bintang (Hanya tampil di Dark Mode) */}
          <div className="hidden dark:block">
            <Stars />
          </div>

          {/* Efek Pendar Cahaya Lembut di Latar Belakang */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-32 size-96 rounded-full bg-leaf-200/40 dark:bg-tide-500/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -right-32 size-96 rounded-full bg-tide-200/40 dark:bg-leaf-600/15 blur-3xl pointer-events-none"
          />

          <div className="relative">
            {/* Header Bagian Ruang Tenang */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <SectionHeading
                  id="judul-tenang"
                  number="18"
                  kicker="Ruang Tenang"
                  title={
                    <>
                      Kalau dadamu sedang <Accent tone="tide">sesak</Accent>
                    </>
                  }
                  description="Bisa dipakai di ruang tunggu, di perjalanan, atau di kamar saat cemas datang. Tarik napas perlahan dan dengarkan alunan lembut untuk menenangkan pikiran."
                />
              </div>

              {/* Lencana Jaminan Privat & Offline */}
              <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-surface/90 border border-line px-3.5 py-1.5 text-xs font-semibold text-ink-soft shadow-xs backdrop-blur-md dark:bg-white/10 dark:border-white/15 dark:text-white/80">
                <ShieldCheck className="size-3.5 text-primary dark:text-sprout-400" />
                <span>100% Privat &amp; Offline</span>
              </div>
            </div>

            {/* Segmented Tab Switcher Khusus Layar Mobile (< 1024px) */}
            <div className="mt-6 mb-5 lg:hidden">
              <div
                role="tablist"
                aria-label="Pilih fitur ruang tenang"
                className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-muted/90 border border-line p-1 shadow-xs dark:bg-white/10 dark:border-transparent"
              >
                {CALM_TABS.map((tab) => {
                  const Icon = tab.icon
                  const isActive = mobileTab === tab.id
                  const isSoundActive = tab.id === 'soundscape' && sound.playing

                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setMobileTab(tab.id)}
                      className={cn(
                        'relative flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center text-xs font-bold transition-all active:scale-95 cursor-pointer',
                        isActive
                          ? 'text-ink dark:text-white font-extrabold shadow-sm'
                          : 'text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="calm-tab-indicator"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-xl bg-surface shadow-xs dark:bg-white/20"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1 truncate">
                        <Icon className="size-3.5 shrink-0" />
                        <span className="truncate">{tab.label}</span>
                      </span>
                      {isSoundActive && (
                        <span className="relative z-10 flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-tide-400 opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-tide-500" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Mini Sound Player Banner jika suara aktif di tab lain */}
              {sound.playing && mobileTab !== 'soundscape' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center justify-between rounded-2xl bg-surface border border-line px-3.5 py-2 text-xs text-ink shadow-xs dark:bg-white/10 dark:border-white/15 dark:text-white"
                >
                  <div className="flex items-center gap-2 truncate">
                    <SoundWaveEqualizer isPlaying={sound.playing} colorClass="bg-tide-500" />
                    <span className="truncate text-ink-soft dark:text-white/90">
                      Suara aktif: <strong>{activePreset.label}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={sound.handleToggle}
                      className="rounded-full bg-surface-muted p-1 hover:bg-line text-ink dark:bg-white/20 dark:hover:bg-white/30 dark:text-white cursor-pointer"
                      title="Jeda suara"
                    >
                      <Pause className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab('soundscape')}
                      className="text-[11px] font-bold text-primary dark:text-tide-200 underline cursor-pointer"
                    >
                      Atur
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Konten Mobile: Tab aktif */}
            <div className="mt-4 lg:hidden">
              <AnimatePresence mode="wait">
                {mobileTab === 'breathing' && (
                  <motion.div
                    key="mobile-breathing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Breather />
                  </motion.div>
                )}
                {mobileTab === 'soundscape' && (
                  <motion.div
                    key="mobile-soundscape"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SoundscapeControl sound={sound} compact />
                  </motion.div>
                )}
                {mobileTab === 'affirmation' && (
                  <motion.div
                    key="mobile-affirmation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Affirmation compact />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Konten Desktop (>= 1024px): Layout 2 Kolom Harmonis */}
            <div className="mt-8 hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
              <div className="space-y-5">
                <Affirmation />
                <SoundscapeControl sound={sound} />
              </div>
              <div>
                <Breather />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
