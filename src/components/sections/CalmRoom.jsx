import { CloudRain, Pause, Play, Radio, Sparkles, Timer, Volume2, Waves, Wind } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { AFFIRMATIONS, BREATH_PATTERNS, STARS } from '../../data/calm'
import useBreathing from '../../hooks/useBreathing'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import { SOUND_PRESETS, playAmbientSound, setAmbientVolume, stopAmbientSound } from '../../lib/soundscape'
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

function Breather() {
  const [patternId, setPatternId] = useState(BREATH_PATTERNS[0].id)
  const pattern = BREATH_PATTERNS.find((item) => item.id === patternId)
  const { running, current, left, cycles, start, stop } = useBreathing(pattern.phases)

  const choose = (id) => {
    stop()
    setPatternId(id)
  }

  return (
    <div className="flex flex-col items-center">
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
                'min-h-8 sm:min-h-8.5 rounded-full px-3 sm:px-3.5 text-xs font-semibold ring-1 transition-all',
                active ? 'bg-white text-night-950 ring-white shadow-sm' : 'text-white/80 ring-white/25 hover:bg-white/10',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 max-w-xs text-center text-xs text-white/70">{pattern.hint}</p>

      <div className="relative mt-4 sm:mt-5 grid size-44 place-items-center sm:size-52 lg:size-56">
        <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <span aria-hidden="true" className="absolute inset-[10%] rounded-full ring-1 ring-white/10" />
        <motion.div
          aria-hidden="true"
          animate={{ scale: current ? current.scale : 0.6 }}
          transition={{ duration: current ? current.seconds : 0.8, ease: 'easeInOut' }}
          className="breath-orb absolute inset-0"
        />
        <div aria-hidden="true" className="relative text-center">
          <p className="font-display text-base sm:text-lg text-white">{current ? current.label : 'Siap?'}</p>
          <p className="mt-0.5 font-display text-3xl sm:text-4xl text-tide-200 tabular-nums">{current ? left : '–'}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? current.label : ''}
      </p>

      <div className="mt-4 sm:mt-5">
        {running ? (
          <Button variant="outlineLight" size="sm" iconLeft={Pause} onClick={stop}>
            Berhenti
          </Button>
        ) : (
          <Button variant="light" size="sm" iconLeft={Play} onClick={start}>
            Mulai bernapas
          </Button>
        )}
      </div>
      <p className="mt-2.5 sm:mt-3 text-xs text-white/70">
        Siklus selesai: <span className="font-semibold text-white tabular-nums">{cycles}</span>
      </p>
      <p className="mt-1 text-center text-[11px] text-white/60">
        Berhenti kapan saja kalau terasa pusing atau sesak.
      </p>
    </div>
  )
}

function Affirmation({ compact = false }) {
  const [index, setIndex] = useState(null)

  const next = () =>
    setIndex((current) => {
      let pick = Math.floor(Math.random() * AFFIRMATIONS.length)
      if (pick === current) pick = (pick + 1) % AFFIRMATIONS.length
      return pick
    })

  return (
    <div className={cn('rounded-2xl bg-white/5 p-4 sm:p-5 ring-1 ring-white/10', compact ? 'mt-0' : '')}>
      <div className="min-h-16 sm:min-h-18" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index ?? 'kosong'}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-display text-base sm:text-lg leading-snug text-white"
          >
            {index === null ? 'Ada satu kalimat yang menunggumu di sini.' : `“${AFFIRMATIONS[index]}”`}
          </motion.p>
        </AnimatePresence>
      </div>
      <Button variant="outlineLight" size="sm" iconLeft={Sparkles} onClick={next} className="mt-3 sm:mt-3.5 text-xs">
        Ambil satu kalimat untuk hari ini
      </Button>
    </div>
  )
}

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
    <div className={cn('rounded-2xl bg-white/5 p-4 sm:p-5 ring-1 ring-white/10', compact ? 'mt-0' : 'mt-4 sm:mt-5')}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-white/90">
            Suara Ambien Penenang (Soundscape)
          </h3>
          <p className="mt-0.5 text-xs text-white/60">
            100% offline &amp; sintetis • Hemat kuota • Meredam kebisingan
          </p>
        </div>

        {playing && timeLeft !== null && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tide-400/20 px-3 py-1 text-xs font-semibold text-tide-200 ring-1 ring-tide-300/30">
            <Timer className="size-3.5" />
            Mati dalam {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {/* Pilihan Jenis Suara */}
      <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2" role="radiogroup" aria-label="Pilihan jenis suara ambien">
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
                'inline-flex min-h-8 sm:min-h-9 items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 text-xs font-semibold ring-1 transition-all',
                active
                  ? 'bg-white text-night-950 ring-white shadow-sm'
                  : 'bg-white/5 text-white/80 ring-white/15 hover:bg-white/10 hover:text-white',
              )}
            >
              <IconComp className="size-3.5" />
              <span>{preset.label}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-2 text-xs text-tide-200/90 italic">
        {activePreset.desc}
      </p>

      {/* Kontrol Utama */}
      <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 pt-3.5 border-t border-white/10">
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'inline-flex min-h-9 sm:min-h-9.5 items-center gap-2 rounded-full px-3.5 sm:px-4 text-xs font-semibold ring-1 transition-all',
            playing
              ? 'bg-tide-400 text-night-950 ring-tide-300 shadow-md hover:bg-tide-300'
              : 'bg-white text-night-950 ring-white hover:bg-white/90',
          )}
        >
          {playing ? (
            <>
              <span className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
                <span className="w-1 bg-night-950 rounded-full animate-bounce [animation-delay:-0.3s] h-full" />
                <span className="w-1 bg-night-950 rounded-full animate-bounce [animation-delay:-0.15s] h-2/3" />
                <span className="w-1 bg-night-950 rounded-full animate-bounce h-4/5" />
              </span>
              <Pause className="size-4" />
              <span>Hentikan Suara</span>
            </>
          ) : (
            <>
              <Play className="size-4 fill-night-950" />
              <span>Putar {activePreset.label}</span>
            </>
          )}
        </button>

        {/* Pengatur Volume */}
        <div className="flex items-center gap-2 min-w-32">
          <Volume2 className="size-3.5 sm:size-4 text-white/60 shrink-0" aria-hidden="true" />
          <label htmlFor="soundscape-volume" className="sr-only">Volume Suara</label>
          <input
            id="soundscape-volume"
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-28 accent-tide-400 bg-white/20 h-1.5 rounded-lg cursor-pointer"
            title={`Volume: ${Math.round((volume / 0.8) * 100)}%`}
          />
          <span className="text-xs tabular-nums text-white/60 w-8">
            {Math.round((volume / 0.8) * 100)}%
          </span>
        </div>

        {/* Pilihan Timer Mati Otomatis */}
        <div className="flex items-center gap-1.5 text-xs text-white/70">
          <Timer className="size-3.5 text-white/50" aria-hidden="true" />
          <span className="hidden sm:inline text-white/60">Timer:</span>
          <div className="flex items-center gap-1">
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
                  'rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
                  timerMinutes === t.val
                    ? 'bg-white/20 text-white font-semibold ring-1 ring-white/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10',
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
        <div className="dark night-sky relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9 text-ink shadow-2xl">
          <Stars />

          <div className="relative">
            {/* Header Bagian Ruang Tenang */}
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
                description="Bisa dipakai di ruang tunggu, di perjalanan, atau di kamar saat cemas datang. Pilih fitur yang paling kamu butuhkan sekarang."
              />
            </div>

            {/* Segmented Tab Switcher Khusus Layar Mobile (< 1024px) */}
            <div className="mt-6 mb-5 lg:hidden">
              <div
                role="tablist"
                aria-label="Pilih fitur ruang tenang"
                className="grid grid-cols-3 gap-1 rounded-2xl bg-white/10 p-1 ring-1 ring-white/15"
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
                        'relative flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center text-xs font-bold transition-all active:scale-95',
                        isActive
                          ? 'text-night-950 font-extrabold shadow-sm'
                          : 'text-white/80 hover:text-white',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="calm-tab-indicator"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-xl bg-white"
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
                  className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2 ring-1 ring-white/20 text-xs text-white"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex items-end gap-0.5 h-3 w-3" aria-hidden="true">
                      <span className="w-0.5 bg-tide-300 rounded-full animate-bounce [animation-delay:-0.3s] h-full" />
                      <span className="w-0.5 bg-tide-300 rounded-full animate-bounce [animation-delay:-0.15s] h-2/3" />
                      <span className="w-0.5 bg-tide-300 rounded-full animate-bounce h-4/5" />
                    </span>
                    <span className="truncate text-white/90">
                      Suara aktif: <strong>{activePreset.label}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={sound.handleToggle}
                      className="rounded-full bg-white/20 p-1 hover:bg-white/30 text-white"
                      title="Jeda suara"
                    >
                      <Pause className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab('soundscape')}
                      className="text-[11px] font-semibold text-tide-200 underline"
                    >
                      Atur
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Konten Mobile: Hanya render tab aktif */}
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

            {/* Konten Desktop (>= 1024px): Layout 2 Kolom Kompak & Harmonis */}
            <div className="mt-7 hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
              <div className="space-y-4">
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
