import { CloudRain, Pause, Play, Radio, Sparkles, Timer, Volume2, Waves } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { AFFIRMATIONS, BREATH_PATTERNS, STARS } from '../../data/calm'
import useBreathing from '../../hooks/useBreathing'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import { SOUND_PRESETS, playAmbientSound, setAmbientVolume, stopAmbientSound } from '../../lib/soundscape'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

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
      <div role="radiogroup" aria-label="Pola napas" className="flex flex-wrap justify-center gap-2">
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
                'min-h-10 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
                active ? 'bg-white text-night-950 ring-white' : 'text-white/80 ring-white/25 hover:bg-white/10',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="mt-3 max-w-xs text-center text-sm text-white/70">{pattern.hint}</p>

      <div className="relative mt-8 grid size-64 place-items-center sm:size-80">
        <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <span aria-hidden="true" className="absolute inset-[10%] rounded-full ring-1 ring-white/10" />
        <motion.div
          aria-hidden="true"
          animate={{ scale: current ? current.scale : 0.6 }}
          transition={{ duration: current ? current.seconds : 0.8, ease: 'easeInOut' }}
          className="breath-orb absolute inset-0"
        />
        <div aria-hidden="true" className="relative text-center">
          <p className="font-display text-2xl text-white">{current ? current.label : 'Siap?'}</p>
          <p className="mt-1 font-display text-5xl text-tide-200 tabular-nums">{current ? left : '–'}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? current.label : ''}
      </p>

      <div className="mt-8">
        {running ? (
          <Button variant="outlineLight" iconLeft={Pause} onClick={stop}>
            Berhenti
          </Button>
        ) : (
          <Button variant="light" iconLeft={Play} onClick={start}>
            Mulai bernapas
          </Button>
        )}
      </div>
      <p className="mt-4 text-sm text-white/70">
        Siklus selesai: <span className="font-semibold text-white tabular-nums">{cycles}</span>
      </p>
      <p className="mt-2 text-center text-xs text-white/60">
        Berhenti kapan saja kalau terasa pusing atau sesak.
      </p>
    </div>
  )
}

function Affirmation() {
  const [index, setIndex] = useState(null)

  const next = () =>
    setIndex((current) => {
      let pick = Math.floor(Math.random() * AFFIRMATIONS.length)
      if (pick === current) pick = (pick + 1) % AFFIRMATIONS.length
      return pick
    })

  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-7">
      <div className="min-h-24" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index ?? 'kosong'}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display text-2xl leading-snug text-white"
          >
            {index === null ? 'Ada satu kalimat yang menunggumu di sini.' : `“${AFFIRMATIONS[index]}”`}
          </motion.p>
        </AnimatePresence>
      </div>
      <Button variant="outlineLight" size="sm" iconLeft={Sparkles} onClick={next} className="mt-5">
        Ambil satu kalimat untuk hari ini
      </Button>
    </div>
  )
}

function SoundscapeControl() {
  const [playing, setPlaying] = useState(false)
  const [soundType, setSoundType] = useState('rain')
  const [volume, setVolume] = useState(0.35)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)

  const hasTimer = timeLeft !== null

  // Timer countdown interval
  useEffect(() => {
    if (!playing || !hasTimer) return

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

  // Cleanup on unmount
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

  const formatTime = (seconds) => {
    if (seconds === null) return ''
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const iconMap = {
    rain: CloudRain,
    waves: Waves,
    brown: Radio,
    meditation: Sparkles,
  }

  const activePreset = SOUND_PRESETS.find((p) => p.id === soundType) || SOUND_PRESETS[0]

  return (
    <div className="mt-8 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white/90">
            Suara Ambien Penenang (Soundscape)
          </h3>
          <p className="mt-0.5 text-xs text-white/60">
            Sintetis murni tanpa aset audio eksternal • Ringan &amp; hemat kuota • Bisa diputar berulang kali
          </p>
        </div>

        {/* Status Sisa Waktu Timer jika aktif */}
        {playing && timeLeft !== null && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tide-400/20 px-3 py-1 text-xs font-semibold text-tide-200 ring-1 ring-tide-300/30">
            <Timer className="size-3.5" />
            Mati dalam {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {/* Pilihan Jenis Suara */}
      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Pilihan jenis suara ambien">
        {SOUND_PRESETS.map((preset) => {
          const active = preset.id === soundType
          const IconComp = iconMap[preset.id] || CloudRain
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => handleSoundChange(preset.id)}
              className={cn(
                'inline-flex min-h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold ring-1 transition-all',
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

      <p className="mt-2.5 text-xs text-tide-200/90 italic">
        {activePreset.desc}
      </p>

      {/* Kontrol Utama: Putar/Hentikan, Volume, dan Timer */}
      <div className="mt-5 flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'inline-flex min-h-11 items-center gap-2.5 rounded-full px-5 text-sm font-semibold ring-1 transition-all',
            playing
              ? 'bg-tide-400 text-night-950 ring-tide-300 shadow-md hover:bg-tide-300'
              : 'bg-white text-night-950 ring-white hover:bg-white/90',
          )}
        >
          {playing ? (
            <>
              {/* Animasi equalizer mini */}
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
        <div className="flex items-center gap-2 min-w-36">
          <Volume2 className="size-4 text-white/60 shrink-0" aria-hidden="true" />
          <label htmlFor="soundscape-volume" className="sr-only">Volume Suara</label>
          <input
            id="soundscape-volume"
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 sm:w-28 accent-tide-400 bg-white/20 h-1.5 rounded-lg cursor-pointer"
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

export default function CalmRoom() {
  return (
    <section id="tenang" aria-labelledby="judul-tenang" className="py-12 sm:py-20">
      <div className="shell">
        <div className="dark night-sky relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-ink sm:px-12 sm:py-20 lg:px-16">
          <Stars />
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                id="judul-tenang"
                number="18"
                kicker="Ruang Tenang"
                title={
                  <>
                    Kalau dadamu sedang <Accent tone="tide">sesak</Accent>
                  </>
                }
                description="Ini bukan pengganti bantuan profesional. Ini hanya satu menit untuk menurunkan detak jantungmu: bisa dipakai di ruang tunggu, di angkot, atau di kamar pukul dua pagi."
              />
              <Reveal delay={0.15} className="mt-10">
                <Affirmation />
                <SoundscapeControl />
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Breather />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
