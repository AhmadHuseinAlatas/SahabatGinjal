import { Calendar, Clock, Info } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import {
  CAPD_SLOTS_DATA,
  DIALYSIS_OPTIONS,
  HD_DAYS_DATA,
  HD_PRESET_SCHEDULES,
} from '../../data/dialysis'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import { TONES } from '../../lib/tones'
import Accent from '../ui/Accent'
import IconBadge from '../ui/IconBadge'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

/**
 * Simulasi Jadwal Mingguan Hemodialisis (HD) yang Interaktif.
 * Pengguna bisa memilih pola jadwal (Sen-Kam, Sel-Jum, 3x seminggu)
 * dan mengklik setiap hari (Senin s/d Minggu) untuk melihat rundown harinya.
 */
function HdScheduleSimulator() {
  const [selectedPreset, setSelectedPreset] = useState('sen-kam')
  const [activeDays, setActiveDays] = useState(['Sen', 'Kam'])
  const [inspectedDay, setInspectedDay] = useState('Sen')

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id)
    setActiveDays(preset.days)
    setInspectedDay(preset.days[0])
  }

  const handleToggleDay = (dayKey) => {
    setInspectedDay(dayKey)
  }

  const isDialysisDay = activeDays.includes(inspectedDay)
  const inspectedDayObj = HD_DAYS_DATA.find((d) => d.key === inspectedDay) || HD_DAYS_DATA[0]

  return (
    <div className="rounded-2xl bg-surface-muted/50 p-5 ring-1 ring-line/80 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Calendar className="size-3.5" />
            Simulasi Jadwal Mingguan
          </div>
          <h4 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
            Contoh Minggumu Menjalani Cuci Darah
          </h4>
        </div>
        <span className="self-start rounded-full bg-tide-100 px-3 py-1 text-xs font-bold text-tide-800 dark:bg-tide-400/20 dark:text-tide-300">
          💡 Klik hari untuk melihat jadwal
        </span>
      </div>

      {/* Preset Pill Buttons */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-ink-faint">Pilihan Pola Jadwal Terpopuler:</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {HD_PRESET_SCHEDULES.map((preset) => {
            const isSelected = selectedPreset === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={cn(
                  'rounded-xl px-3 py-1.5 text-xs font-semibold ring-1 transition-all active:scale-95',
                  isSelected
                    ? 'bg-brand text-brand-ink ring-brand shadow-xs font-bold'
                    : 'bg-surface text-ink-soft ring-line hover:bg-surface-muted hover:text-ink',
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 7 Day Buttons: Sen, Sel, Rab, Kam, Jum, Sab, Min */}
      <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {HD_DAYS_DATA.map((day) => {
          const isDialysis = activeDays.includes(day.key)
          const isInspected = inspectedDay === day.key
          return (
            <button
              key={day.key}
              type="button"
              onClick={() => handleToggleDay(day.key)}
              aria-pressed={isInspected}
              className={cn(
                'group relative flex flex-col items-center justify-center rounded-2xl py-3 px-1 text-center ring-1 transition-all active:scale-95',
                isInspected
                  ? 'ring-2 ring-accent shadow-md bg-surface font-bold scale-[1.03]'
                  : 'bg-surface/80 ring-line hover:bg-surface hover:ring-line-strong',
                isDialysis && !isInspected && 'bg-tide-50/70 dark:bg-tide-900/20',
              )}
            >
              <span className={cn('text-sm font-bold sm:text-base', isInspected ? 'text-ink' : 'text-ink-soft')}>
                {day.key}
              </span>
              <span
                className={cn(
                  'mt-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
                  isDialysis
                    ? 'bg-tide-100 text-tide-800 dark:bg-tide-400/25 dark:text-tide-300'
                    : 'bg-surface-muted text-ink-faint',
                )}
              >
                {isDialysis ? (
                  <>
                    <span className="size-1.5 rounded-full bg-tide-500 animate-pulse" />
                    <span className="hidden sm:inline">Dialisis</span>
                    <span className="sm:hidden">HD</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Bebas</span>
                    <span className="sm:hidden">-</span>
                  </>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detail Panel untuk Hari yang Diklik */}
      <div className="mt-5 rounded-2xl bg-surface p-5 ring-1 ring-line shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'grid size-10 place-items-center rounded-xl font-display text-lg font-bold shadow-xs',
                isDialysisDay
                  ? 'bg-brand text-brand-ink'
                  : 'bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300',
              )}
            >
              {inspectedDayObj.key}
            </span>
            <div>
              <h5 className="font-display text-lg font-bold text-ink">
                Hari {inspectedDayObj.full}
              </h5>
              <p className="text-xs text-ink-faint">
                {isDialysisDay
                  ? 'Jadwal Cuci Darah di RS/Klinik (Sesi 4–5 Jam)'
                  : 'Hari Bebas Tanpa Mesin (Fokus Istirahat & Aktivitas)'}
              </p>
            </div>
          </div>

          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-bold ring-1',
              isDialysisDay
                ? 'bg-tide-100 text-tide-800 ring-tide-300 dark:bg-tide-400/20 dark:text-tide-300'
                : 'bg-leaf-100 text-leaf-800 ring-leaf-300 dark:bg-leaf-400/20 dark:text-leaf-300',
            )}
          >
            {isDialysisDay ? '🏥 Hari Cuci Darah' : '🌿 Hari Bebas & Istirahat'}
          </span>
        </div>

        {/* Timeline 3 Tahap */}
        {isDialysisDay ? (
          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tide-200 text-tide-900 font-bold text-xs dark:bg-tide-400/30 dark:text-tide-200">
                1
              </span>
              <div>
                <p className="font-bold text-ink">Sebelum Berangkat (Pagi Hari):</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Timbang berat badan kering di rumah, sarapan bergizi, bawa air minum dalam botol terukur, dan kenakan pakaian berkancing depan / berlengan longgar agar akses tusukan jarum cimino atau kateter leher mudah dijangkau perawat.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tide-200 text-tide-900 font-bold text-xs dark:bg-tide-400/30 dark:text-tide-200">
                2
              </span>
              <div>
                <p className="font-bold text-ink">Selama Sesi di Ruang Hemodialisis (4–5 Jam):</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Berbaring di ranjang khusus mesin dialisis. Tekanan darah dipantau perawat secara berkala. Racun urea dan kelebihan cairan disaring perlahan. Waktu ini bisa digunakan untuk tidur siang nyenyak, menonton video, mendengarkan podcast, atau mengobrol dengan sesama sahabat dialisis.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tide-200 text-tide-900 font-bold text-xs dark:bg-tide-400/30 dark:text-tide-200">
                3
              </span>
              <div>
                <p className="font-bold text-ink">Pasca Selesai Sesi (Pulang ke Rumah):</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Tekan titik bekas tusukan jarum dengan kassa steril selama 15–20 menit hingga pendarahan berhenti sempurna, timbang berat badan akhir untuk mengecek cairan yang berhasil ditarik, lalu pulang dan beristirahat karena tubuh biasanya merasa lemas dan butuh relaksasi.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-tide-50/70 p-3 text-xs text-ink-soft ring-1 ring-tide-200/60 dark:bg-tide-400/10 dark:ring-tide-400/20">
              💡 <strong>Tips Pasien:</strong> Suhu ruangan dialisis umumnya dingin. Selalu siapkan selimut tipis, kaos kaki hangat, dan earphone di dalam tas dialisismu.
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-200 text-leaf-900 font-bold text-xs dark:bg-leaf-400/30 dark:text-leaf-200">
                1
              </span>
              <div>
                <p className="font-bold text-ink">Waktu Bebas untuk Hidupmu:</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Tidak perlu datang ke rumah sakit! Kamu bisa beraktivitas seperti biasa: bekerja, mengurus rumah, berkebun ringan, mengantar anak, atau jalan pagi santai menikmati udara segar.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-200 text-leaf-900 font-bold text-xs dark:bg-leaf-400/30 dark:text-leaf-200">
                2
              </span>
              <div>
                <p className="font-bold text-ink">Disiplin Kuota Cairan (Kunci Utama):</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Karena ginjal tidak membuang urine secara alami, catat setiap tegukan minummu (misal batas 600 ml/hari) agar kenaikan berat badan antar-sesi tidak melebihi 1,5–2 kg dan mencegah sesak napas saat jadwal HD berikutnya.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-200 text-leaf-900 font-bold text-xs dark:bg-leaf-400/30 dark:text-leaf-200">
                3
              </span>
              <div>
                <p className="font-bold text-ink">Merawat Lengan Cimino (AV Fistula):</p>
                <p className="mt-0.5 text-ink-soft leading-relaxed">
                  Jaga kebersihan area lengan, raba getaran aliran darah cimino (*thrill*) secara berkala, jangan tertindih saat tidur, dan hindari menggunakan lengan tersebut untuk mengukur tensi atau menjinjing belanjaan berat.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-leaf-50/70 p-3 text-xs text-ink-soft ring-1 ring-leaf-200/60 dark:bg-leaf-400/10 dark:ring-leaf-400/20">
              🌿 <strong>Pengingat Semangat:</strong> Cuci darah hadir sebagai jembatan penolong agar kamu tetap bisa menikmati hari-hari bebas ini bersama orang-orang tercinta.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Simulasi Jadwal Harian CAPD yang Interaktif.
 * Pengguna bisa mengklik 4 waktu pergantian cairan (06.00, 12.00, 17.00, 22.00).
 */
function CapdScheduleSimulator() {
  const [selectedTime, setSelectedTime] = useState('06.00')
  const slot = CAPD_SLOTS_DATA.find((s) => s.time === selectedTime) || CAPD_SLOTS_DATA[0]

  return (
    <div className="rounded-2xl bg-surface-muted/50 p-5 ring-1 ring-line/80 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Clock className="size-3.5" />
            Simulasi Pergantian Cairan Harian
          </div>
          <h4 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
            Contoh Harimu dengan Cuci Darah Mandiri (CAPD)
          </h4>
        </div>
        <span className="self-start rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300">
          💡 Klik jam untuk melihat prosesnya
        </span>
      </div>

      {/* 4 Time Slots Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CAPD_SLOTS_DATA.map((s) => {
          const isSelected = selectedTime === s.time
          return (
            <button
              key={s.time}
              type="button"
              onClick={() => setSelectedTime(s.time)}
              aria-pressed={isSelected}
              className={cn(
                'group flex flex-col items-center justify-center rounded-2xl p-3.5 text-center ring-1 transition-all active:scale-95',
                isSelected
                  ? 'bg-brand text-brand-ink ring-brand shadow-card font-bold scale-[1.02]'
                  : 'bg-surface text-ink-soft ring-line hover:bg-surface-muted hover:text-ink',
              )}
            >
              <span className="font-display text-lg font-bold sm:text-xl">{s.time}</span>
              <span className="mt-1 text-xs font-semibold opacity-85">{s.title.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Breakdown Card untuk Waktu yang Dipilih */}
      <div className="mt-5 rounded-2xl bg-surface p-5 ring-1 ring-line shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <h5 className="font-display text-lg font-bold text-ink">
              Pukul {slot.time} WIB: {slot.title}
            </h5>
            <p className="text-xs text-ink-soft">{slot.subtitle}</p>
          </div>
          <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-800 ring-1 ring-leaf-300 dark:bg-leaf-400/20 dark:text-leaf-300">
            ⏱️ Durasi: ±30–40 Menit
          </span>
        </div>

        <div className="mt-4 text-xs sm:text-sm text-ink-soft leading-relaxed space-y-3">
          <p>{slot.desc}</p>
          <div className="rounded-xl bg-leaf-50/70 p-3 ring-1 ring-leaf-200/60 dark:bg-leaf-400/10 dark:ring-leaf-400/20">
            ✨ <strong>Kenyamanan Pasien:</strong> {slot.highlight}
          </div>
        </div>

        {/* 3 Tahap Baku Pergantian CAPD */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3 text-xs">
          <div className="rounded-xl bg-surface-muted/70 p-3 ring-1 ring-line">
            <span className="font-bold text-primary">1. Drain (Buang):</span>
            <p className="mt-1 text-ink-soft leading-relaxed">
              Keluarkan cairan lama yang telah menyerap racun dari rongga perut ke kantong buang (±15-20 menit).
            </p>
          </div>
          <div className="rounded-xl bg-surface-muted/70 p-3 ring-1 ring-line">
            <span className="font-bold text-primary">2. Flush (Bilas):</span>
            <p className="mt-1 text-ink-soft leading-relaxed">
              Alirkan sedikit cairan segar langsung ke kantong pembuangan untuk membilas selang transfer set (5 detik).
            </p>
          </div>
          <div className="rounded-xl bg-surface-muted/70 p-3 ring-1 ring-line">
            <span className="font-bold text-primary">3. Fill (Isi):</span>
            <p className="mt-1 text-ink-soft leading-relaxed">
              Masukkan 1 kantong cairan segar hangat ke rongga perut, lalu kunci selang dan tutup rapat (±10 menit).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DialysisOptions() {
  const [activeId, setActiveId] = useState(DIALYSIS_OPTIONS[0].id)
  const tabRefs = useRef({})
  const option = DIALYSIS_OPTIONS.find((item) => item.id === activeId)

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const index = DIALYSIS_OPTIONS.findIndex((item) => item.id === activeId)
    const step = event.key === 'ArrowRight' ? 1 : -1
    const next = DIALYSIS_OPTIONS[(index + step + DIALYSIS_OPTIONS.length) % DIALYSIS_OPTIONS.length]
    setActiveId(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section id="pilihan" aria-labelledby="judul-pilihan" className="py-12 sm:py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          id="judul-pilihan"
          number="08"
          kicker="Kamu punya pilihan"
          title={
            <>
              Dua jalan, <Accent tone="leaf">satu tujuan</Accent>
            </>
          }
          description="Banyak orang tidak tahu bahwa cuci darah tidak hanya satu bentuk. Keduanya dijamin BPJS. Mana yang cocok tergantung kondisi tubuh, rumah, dan ritme hidupmu."
        />

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Jenis cuci darah"
            className="inline-flex rounded-full bg-surface/70 p-1.5 ring-1 ring-line"
          >
            {DIALYSIS_OPTIONS.map((item) => {
              const active = item.id === activeId
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[item.id] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors sm:px-6',
                    active ? 'text-brand-ink' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="dialysis-tab"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-brand"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.tab}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <div className="card overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={option.id}
                role="tabpanel"
                id={`panel-${option.id}`}
                aria-labelledby={`tab-${option.id}`}
                tabIndex={0}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="p-7 sm:p-10"
              >
                {/* Bagian Atas: Ringkasan & Fakta Perbandingan */}
                <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                  <div>
                    <div className="flex items-center gap-4">
                      <IconBadge icon={option.icon} tone={option.tone} size="lg" />
                      <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', TONES[option.tone].chip)}>
                        {option.where}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-4xl leading-tight text-ink">{option.name}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-ink-soft">{option.tagline}</p>
                    <p
                      className={cn(
                        'mt-6 border-l-2 pl-5 font-display text-lg leading-relaxed text-ink italic',
                        TONES[option.tone].border,
                      )}
                    >
                      {option.note}
                    </p>
                  </div>

                  <dl className="grid content-start divide-y divide-line">
                    {option.facts.map((fact) => (
                      <div key={fact.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
                        <dt className={cn('kicker pt-1', TONES[option.tone].text)}>{fact.label}</dt>
                        <dd className="leading-relaxed text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Bagian Bawah: Simulator Jadwal Interaktif */}
                <div className="mt-8 border-t border-line/60 pt-6">
                  {option.id === 'hd' ? <HdScheduleSimulator /> : <CapdScheduleSimulator />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 flex max-w-3xl gap-3 text-sm leading-relaxed text-ink-faint">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Tidak semua orang bebas memilih: kondisi jantung, riwayat operasi perut, sampai kondisi
            rumah ikut menentukan. Tanyakan keduanya ke dokter, jangan tunggu ditawari.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
