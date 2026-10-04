import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { HERO_STATS } from '../../data/site'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'
import { Stagger, StaggerItem } from '../ui/Stagger'
import FiltrationOrb from './FiltrationOrb'
import Marquee from './Marquee'

const LINE_ONE = ['Ginjalmu', 'berhenti', 'bekerja.']
const LINE_TWO = ['Hidupmu', 'tidak.']

const word = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

function Words({ words, className }) {
  return words.map((text) => (
    <motion.span key={text} variants={word} className={`inline-block pr-[0.22em] ${className ?? ''}`}>
      {text}
    </motion.span>
  ))
}

export default function Hero() {
  // Garis bawah digambar dengan animasi; kalau pengguna meminta gerak dikurangi,
  // ia langsung tampil utuh.
  const reduce = useReducedMotion()

  return (
    <section id="beranda" aria-labelledby="judul-beranda" className="relative pt-32 sm:pt-36 lg:pt-40">
      <div className="shell grid items-center gap-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full bg-surface/70 px-4 py-2 text-sm font-medium text-ink-soft ring-1 ring-line"
          >
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral-400 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-coral-500" />
            </span>
            Untuk kamu yang baru saja mendengar kata itu
          </motion.p>

          <h1 id="judul-beranda" className="mt-7 font-display text-display font-normal text-ink">
            <span className="sr-only">Ginjalmu berhenti bekerja. Hidupmu tidak.</span>
            <motion.span
              aria-hidden="true"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
              className="block"
            >
              <span className="block">
                <Words words={LINE_ONE} />
              </span>
              <span className="relative inline-block">
                <Words words={LINE_TWO} className="text-gradient italic" />
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.08em] left-0 h-[0.22em] w-[92%]"
                  fill="none"
                >
                  <motion.path
                    d="M 3 14 C 70 4, 150 4, 297 11"
                    stroke="var(--color-coral-400)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 0.9, ease: EASE }}
                  />
                </svg>
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            Mungkin dokter baru menyebut “cuci darah” dan dunia terasa menyempit. Mungkin kamu sudah
            menjalaninya berbulan-bulan dan lelah menjelaskan pada orang lain. Di sini kamu tidak perlu
            kuat dulu untuk boleh membaca.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="#perasaan" size="lg" icon={ArrowRight}>
              Mulai dari perasaanku
            </Button>
            <Button href="#paham" size="lg" variant="secondary">
              Aku cuma ingin tahu
            </Button>
          </motion.div>

          <Stagger as="ul" delay={0.85} className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <StaggerItem
                as="li"
                key={stat.value}
                className="card flex items-start gap-3 rounded-2xl p-4 sm:flex-col"
              >
                <stat.icon aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
                <p>
                  <span className="block font-display text-2xl leading-none text-ink">{stat.value}</span>
                  <span className="mt-1.5 block text-sm leading-snug text-ink-faint">{stat.label}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <FiltrationOrb />
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}
