import {
  Activity,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  HeartHandshake,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import {
  calculateDistanceKm,
  HD_CAPACITY_EXPLANATION,
  HOSPITALS,
  POPULAR_CITIES,
} from '../../data/hospitals'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function HospitalsDirectory() {
  const [selectedCity, setSelectedCity] = useState('Semua Kota')
  const [paymentFilter, setPaymentFilter] = useState('all') // 'all' | 'bpjs' | 'swasta'
  const [searchQuery, setSearchQuery] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [seniorMode, setSeniorMode] = useState(true) // Default true for maximum elderly comfort!
  const [showExplanation, setShowExplanation] = useState(false)

  // Fungsi deteksi GPS pengguna
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Perangkat Anda tidak mendukung fitur lokasi otomatis.')
      setUserLocation(null)
      return
    }

    setLocating(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocating(false)
        setLocationError(null)
        setSelectedCity('Semua Kota') // Reset filter kota agar menampilkan urutan terdekat
      },
      (err) => {
        setLocating(false)
        setUserLocation(null) // Pastikan lokasi null saat error agar tidak menampilkan state ganda
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError(
            'Izin lokasi belum diberikan. Jangan khawatir, Bapak/Ibu tetap bisa memilih kota secara manual di bawah.',
          )
        } else {
          setLocationError(
            'Lokasi tidak dapat dideteksi saat ini. Silakan gunakan tombol pilihan kota di bawah.',
          )
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleResetLocation = () => {
    setUserLocation(null)
    setLocationError(null)
  }

  // Filter & Urutkan Rumah Sakit
  const filteredHospitals = useMemo(() => {
    return HOSPITALS.map((h) => {
      const distance = userLocation
        ? calculateDistanceKm(userLocation.lat, userLocation.lng, h.lat, h.lng)
        : null
      return { ...h, distance }
    })
      .filter((h) => {
        // Filter Pembayaran
        if (paymentFilter === 'bpjs' && !h.bpjs) return false
        if (paymentFilter === 'swasta' && !h.swasta) return false

        // Filter Kota
        if (selectedCity !== 'Semua Kota') {
          const matchCity =
            h.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
            h.province.toLowerCase().includes(selectedCity.toLowerCase())
          if (!matchCity) return false
        }

        // Filter Pencarian Teks
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchName = h.name.toLowerCase().includes(q)
          const matchCity = h.city.toLowerCase().includes(q)
          const matchAddr = h.address.toLowerCase().includes(q)
          const matchCategory = h.category.toLowerCase().includes(q)
          if (!matchName && !matchCity && !matchAddr && !matchCategory) return false
        }

        return true
      })
      .sort((a, b) => {
        // Jika lokasi pengguna aktif, urutkan dari yang paling dekat (jarak terkecil)
        if (userLocation && a.distance != null && b.distance != null) {
          return a.distance - b.distance
        }
        return 0
      })
  }, [userLocation, paymentFilter, selectedCity, searchQuery])

  return (
    <section id="rumah-sakit" aria-labelledby="judul-rumah-sakit" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        {/* Header Bagian */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="judul-rumah-sakit"
            number="15"
            kicker="Penyedia Layanan Cuci Darah"
            title={
              <>
                Rumah sakit &amp; klinik cuci darah <Accent tone="leaf">terdekat</Accent>
              </>
            }
            description="Informasi lengkap rumah sakit yang melayani BPJS Kesehatan maupun pasien umum/swasta di berbagai kota Indonesia. Dilengkapi kapasitas mesin, perkiraan pasien harian, dan fasilitas ramah lansia."
          />

          {/* Toggle Ukuran Huruf Ramah Lansia */}
          <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl bg-sand-100 p-1.5 ring-1 ring-sand-300 dark:bg-night-900 dark:ring-white/10 lg:self-end">
            <span className="px-2.5 text-xs font-semibold text-ink-muted">
              Ukuran Huruf:
            </span>
            <button
              type="button"
              onClick={() => setSeniorMode(false)}
              className={cn(
                'rounded-xl px-3 py-1.5 text-xs font-semibold transition-all',
                !seniorMode
                  ? 'bg-white text-ink shadow-sm dark:bg-white/10 dark:text-white'
                  : 'text-ink-soft hover:text-ink',
              )}
            >
              Standar
            </button>
            <button
              type="button"
              onClick={() => setSeniorMode(true)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
                seniorMode
                  ? 'bg-leaf-600 text-white shadow-sm dark:bg-leaf-500'
                  : 'text-ink-soft hover:text-ink',
              )}
            >
              <span>Besar &amp; Jelas (Lansia)</span>
              <Sparkles className="size-3" />
            </button>
          </div>
        </div>

        {/* Kotak Deteksi Lokasi Terdekat (GPS) */}
        <Reveal delay={0.08} className="mt-10">
          <div
            className={cn(
              'overflow-hidden rounded-3xl p-6 ring-1 transition-all sm:p-7',
              userLocation
                ? 'bg-leaf-500/10 ring-leaf-500/30 dark:bg-leaf-950/20 dark:ring-leaf-500/30'
                : locationError
                  ? 'bg-amber-500/10 ring-amber-500/30 dark:bg-amber-950/20 dark:ring-amber-500/30'
                  : 'bg-sand-100/80 ring-sand-300 dark:bg-white/5 dark:ring-white/10',
            )}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-xs font-bold uppercase tracking-wider',
                    userLocation
                      ? 'text-leaf-700 dark:text-leaf-300'
                      : locationError
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-ink-muted',
                  )}
                >
                  <LocateFixed className="size-4" />
                  <span>
                    {userLocation
                      ? 'Lokasi Aktif'
                      : locationError
                        ? 'Deteksi Lokasi Terkendala'
                        : 'Deteksi Posisi Terdekat'}
                  </span>
                </div>

                <h3 className="mt-1.5 font-display text-xl text-ink">
                  {userLocation
                    ? 'Rumah sakit berhasil diurutkan dari yang terdekat!'
                    : locationError
                      ? 'Lokasi perangkat belum dapat diakses'
                      : 'Ingin tahu rumah sakit cuci darah mana yang paling dekat dari rumah Anda?'}
                </h3>

                <p className="mt-1 text-sm text-ink-soft">
                  {userLocation
                    ? 'Jarak perkiraan dihitung langsung dari koordinat perangkat Anda. Rumah sakit di bawah kini berurutan dari jarak paling dekat.'
                    : locationError
                      ? locationError
                      : 'Tekan tombol di samping untuk mengurutkan otomatis rumah sakit dari jarak paling dekat ke terjauh.'}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {userLocation ? (
                  <Button
                    variant="outline"
                    iconLeft={X}
                    onClick={handleResetLocation}
                    className="min-h-12 text-sm font-semibold"
                  >
                    Hapus Lokasi &amp; Reset
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    iconLeft={LocateFixed}
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="min-h-12 text-base font-bold shadow-md"
                  >
                    {locating ? 'Mendeteksi Lokasi...' : locationError ? 'Coba Deteksi Lagi' : 'Cari yang Paling Dekat'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Panel Kontrol Filter & Pencarian */}
        <div className="mt-8 space-y-5">
          {/* 1. Filter Pembayaran (BPJS vs Swasta) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
              Pilihan Biaya:
            </span>
            {[
              { id: 'all', label: 'Semua Rumah Sakit' },
              { id: 'bpjs', label: 'Menerima BPJS Kesehatan (100% Ditanggung)' },
              { id: 'swasta', label: 'Layanan Swasta / Eksekutif' },
            ].map((p) => {
              const active = paymentFilter === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentFilter(p.id)}
                  className={cn(
                    'min-h-11 rounded-full px-5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
                    active
                      ? 'bg-leaf-700 text-white shadow-md ring-2 ring-leaf-600 dark:bg-leaf-500 dark:text-night-950 dark:ring-leaf-400'
                      : 'bg-sand-100 text-ink-soft ring-1 ring-sand-300 hover:bg-leaf-50 hover:text-leaf-800 hover:ring-leaf-300 hover:shadow-sm dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-leaf-950/40 dark:hover:text-leaf-300 dark:hover:ring-leaf-500/40',
                  )}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          {/* 2. Filter Kota Cepat (Tombol Jari Besar Ramah Sentuhan dengan Efek Hover Halus) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
              Pilih Kota:
            </span>
            {POPULAR_CITIES.map((city) => {
              const active = selectedCity === city
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    'min-h-10 rounded-full px-4 text-xs font-semibold ring-1 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:text-sm',
                    active
                      ? 'bg-leaf-600 text-white ring-2 ring-leaf-500 shadow-md scale-[1.02] dark:bg-leaf-500'
                      : 'bg-sand-100 text-ink-soft ring-sand-300 hover:bg-leaf-50 hover:text-leaf-800 hover:ring-leaf-400 hover:shadow-sm dark:bg-white/5 dark:text-white/80 dark:ring-white/10 dark:hover:bg-leaf-950/40 dark:hover:text-leaf-300 dark:hover:ring-leaf-500/40',
                  )}
                >
                  {city}
                </button>
              )
            })}
          </div>

          {/* 3. Input Pencarian Teks */}
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama rumah sakit, kecamatan, atau kota..."
              className={cn(
                'w-full rounded-2xl bg-sand-50 py-3.5 pl-12 pr-10 text-ink placeholder:text-ink-muted ring-1 ring-sand-300 focus:outline-none focus:ring-2 focus:ring-leaf-500 dark:bg-night-900 dark:ring-white/15',
                seniorMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
              )}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-muted hover:text-ink"
                title="Hapus pencarian"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Edukasi: "Berapa Pasien yang Ditangani Rumah Sakit Per Hari?" */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="inline-flex items-center gap-2 text-sm font-bold text-leaf-700 hover:underline dark:text-leaf-300"
          >
            <Activity className="size-4" />
            <span>
              {showExplanation
                ? 'Sembunyikan penjelasan alur & kapasitas harian cuci darah'
                : 'Paham alur: Mengapa rumah sakit membagi pasien dalam shift pagi & siang?'}
            </span>
          </button>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid gap-4 rounded-3xl bg-sand-100 p-6 ring-1 ring-sand-300 dark:bg-white/5 dark:ring-white/10 sm:grid-cols-2 lg:grid-cols-4"
            >
              {HD_CAPACITY_EXPLANATION.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display text-xs font-bold text-leaf-600 dark:text-leaf-400">
                    Poin 0{idx + 1}
                  </span>
                  <h4 className="mt-1 font-display text-base font-bold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Status Hasil Pencarian */}
        <div className="mt-8 flex items-center justify-between text-xs text-ink-muted">
          <p>
            Ditemukan <strong className="text-ink">{filteredHospitals.length}</strong> fasilitas
            cuci darah yang sesuai kriteria.
          </p>
          {userLocation && (
            <span className="font-semibold text-leaf-700 dark:text-leaf-300">
              ✓ Diurutkan dari yang paling dekat
            </span>
          )}
        </div>

        {/* Daftar Kartu Rumah Sakit dengan Warna Khusus & Kontras Tinggi */}
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {filteredHospitals.map((hospital) => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${hospital.name} ${hospital.address}`,
            )}`

            const isBpjsMajor = hospital.bpjs && hospital.category.toLowerCase().includes('rujukan')
            const isSwastaExclusive = !hospital.bpjs || hospital.category.toLowerCase().includes('swasta')

            return (
              <div
                key={hospital.id}
                className={cn(
                  'relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white shadow-md ring-1 transition-all duration-300 hover:shadow-xl dark:bg-night-900',
                  hospital.distance != null && hospital.distance < 15
                    ? 'ring-leaf-500/60 shadow-leaf-500/5'
                    : 'ring-black/8 dark:ring-white/10',
                )}
              >
                {/* Pita Warna Aksen di Atas Kartu */}
                <div
                  className={cn(
                    'h-2.5 w-full',
                    isBpjsMajor
                      ? 'bg-gradient-to-r from-leaf-600 via-emerald-500 to-teal-500'
                      : isSwastaExclusive
                        ? 'bg-gradient-to-r from-tide-600 via-sky-500 to-indigo-500'
                        : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-leaf-500',
                  )}
                  aria-hidden="true"
                />

                <div className="p-6 sm:p-7">
                  {/* Badge Pembayaran & Jarak Berwarna Kontras */}
                  <div className="flex flex-wrap items-center gap-2">
                    {hospital.distance != null && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-night-950 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-leaf-500 dark:text-night-950">
                        <MapPin className="size-3.5 text-leaf-400 dark:text-night-950" />
                        <span>{hospital.distance} km dari Anda</span>
                      </span>
                    )}

                    {hospital.bpjs ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-900 ring-1 ring-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:ring-emerald-700">
                        <ShieldCheck className="size-3.5 text-emerald-700 dark:text-emerald-400" />
                        <span>BPJS 100% Ditanggung</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900 ring-1 ring-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:ring-amber-700">
                        <span>Khusus Pasien Umum / Swasta</span>
                      </span>
                    )}

                    {hospital.swasta && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-900 ring-1 ring-sky-300 dark:bg-sky-950/80 dark:text-sky-200 dark:ring-sky-700">
                        <span>Layanan Eksekutif/Swasta</span>
                      </span>
                    )}
                  </div>

                  {/* Nama RS & Kategori dengan Kontras Jelas */}
                  <div className="mt-4">
                    <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-leaf-800 dark:text-leaf-300">
                      {hospital.category} • {hospital.city}
                    </span>
                    <h3
                      className={cn(
                        'mt-1 font-display font-extrabold leading-snug text-ink',
                        seniorMode ? 'text-2xl sm:text-[1.75rem]' : 'text-xl sm:text-2xl',
                      )}
                    >
                      {hospital.name}
                    </h3>
                    <p
                      className={cn(
                        'mt-2 text-ink-soft',
                        seniorMode ? 'text-base leading-relaxed' : 'text-xs sm:text-sm',
                      )}
                    >
                      {hospital.address}
                    </p>
                  </div>

                  {/* 3 Kotak Kapasitas Berwarna Yang Sangat Mudah Dibaca */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {/* Kotak 1: Jumlah Mesin (Hijau Daun) */}
                    <div className="flex flex-col justify-between rounded-2xl bg-leaf-50/90 p-3.5 ring-1 ring-leaf-200 dark:bg-leaf-950/60 dark:ring-leaf-800/80">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-leaf-800 dark:text-leaf-300">
                        Jumlah Mesin HD
                      </span>
                      <p className="mt-1 font-display text-xl font-extrabold text-leaf-950 dark:text-white sm:text-2xl">
                        {hospital.machines} <span className="text-sm font-bold text-leaf-700 dark:text-leaf-300">Mesin</span>
                      </p>
                    </div>

                    {/* Kotak 2: Pasien Per Hari (Biru Samudera) */}
                    <div className="flex flex-col justify-between rounded-2xl bg-sky-50/90 p-3.5 ring-1 ring-sky-200 dark:bg-sky-950/60 dark:ring-sky-800/80">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                        Pasien Per Hari
                      </span>
                      <p className="mt-1 font-display text-base font-extrabold leading-snug text-sky-950 dark:text-white sm:text-lg">
                        {hospital.patientsPerDay}
                      </p>
                    </div>

                    {/* Kotak 3: Jadwal Shift (Kuning Hangat) */}
                    <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-amber-50/90 p-3.5 ring-1 ring-amber-200 dark:bg-amber-950/60 dark:ring-amber-800/80 sm:col-span-1">
                      <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        <Clock className="size-3 text-amber-700 dark:text-amber-400" />
                        <span>Jadwal Shift</span>
                      </span>
                      <p className="mt-1 text-xs font-bold leading-tight text-amber-950 dark:text-amber-100">
                        {hospital.shifts}
                      </p>
                    </div>
                  </div>

                  {/* Blok Fasilitas Ramah Lansia Berlatar Lembut */}
                  <div className="mt-5 rounded-2xl bg-sand-100/70 p-4 ring-1 ring-sand-200 dark:bg-white/5 dark:ring-white/10">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                      Fasilitas Ramah Lansia &amp; Pasien:
                    </h4>
                    <ul className="mt-2.5 space-y-2">
                      {hospital.seniorFriendly.map((item, idx) => (
                        <li
                          key={idx}
                          className={cn(
                            'flex items-start gap-2.5 font-medium text-ink',
                            seniorMode ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                          )}
                        >
                          <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-leaf-600 dark:text-leaf-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Catatan Khusus dengan Warna Kuning Ramah */}
                  {hospital.notes && (
                    <div className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-500/10 p-3.5 text-xs font-medium text-amber-950 ring-1 ring-amber-500/25 dark:text-amber-200">
                      <span className="text-sm">💡</span>
                      <span className="leading-relaxed">{hospital.notes}</span>
                    </div>
                  )}
                </div>

                {/* Tombol Aksi 2-Baris Rapi (Tidak Ada Teks Terpotong) */}
                <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row sm:p-7 sm:pt-0">
                  {/* Tombol Telepon Langsung */}
                  <a
                    href={`tel:${hospital.hdPhone.replace(/[^0-9]/g, '')}`}
                    className={cn(
                      'group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-leaf-600 px-5 py-3.5 font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-leaf-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98] dark:bg-leaf-500 dark:hover:bg-leaf-600',
                    )}
                  >
                    <Phone className="size-5 shrink-0 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                        Telepon Unit HD
                      </span>
                      <span className="font-display text-base font-extrabold tracking-wide sm:text-lg">
                        {hospital.hdPhone}
                      </span>
                    </div>
                  </a>

                  {/* Tombol Rute Peta Google Maps */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Buka petunjuk arah Google Maps menuju ${hospital.name}`}
                    className={cn(
                      'group flex items-center justify-center gap-3 rounded-2xl bg-tide-50 px-5 py-3.5 font-bold text-tide-900 ring-1 ring-tide-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-tide-600 hover:text-white hover:ring-tide-500 hover:shadow-lg active:translate-y-0 active:scale-[0.98] dark:bg-white/10 dark:text-white dark:ring-white/15 dark:hover:bg-tide-500 dark:hover:text-night-950 sm:min-w-40',
                    )}
                  >
                    <Navigation className="size-5 shrink-0 text-tide-700 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white dark:text-tide-300 dark:group-hover:text-night-950" />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-tide-800/80 group-hover:text-white/80 dark:text-white/70">
                        Petunjuk Rute
                      </span>
                      <span className="font-display text-base font-extrabold">
                        Buka Peta
                      </span>
                    </div>
                    <ExternalLink className="size-3.5 opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Jika Hasil Pencarian Kosong */}
        {filteredHospitals.length === 0 && (
          <div className="mt-12 rounded-3xl bg-sand-100 p-12 text-center ring-1 ring-sand-300 dark:bg-white/5 dark:ring-white/10">
            <Building2 className="mx-auto size-12 text-ink-muted" />
            <h3 className="mt-4 font-display text-xl text-ink">
              Tidak ditemukan rumah sakit dengan kriteria tersebut
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Coba ganti pilihan kota ke &quot;Semua Kota&quot; atau hapus kata kunci pencarian Anda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCity('Semua Kota')
                setPaymentFilter('all')
                setSearchQuery('')
              }}
              className="mt-6"
            >
              Tampilkan Semua Rumah Sakit
            </Button>
          </div>
        )}

        {/* Catatan Penting untuk Pasien & Keluarga */}
        <div className="mt-12 rounded-3xl bg-sky-500/10 p-6 ring-1 ring-sky-500/20 dark:bg-sky-950/30 dark:ring-sky-500/30 sm:p-7">
          <div className="flex items-start gap-3">
            <HeartHandshake className="mt-1 size-5 shrink-0 text-sky-700 dark:text-sky-300" />
            <div>
              <h4 className="font-display text-base font-bold text-sky-900 dark:text-sky-200">
                Panduan untuk Pendamping &amp; Keluarga Pasien Lansia
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-sky-800/90 dark:text-sky-200/80">
                Sebelum datang pertama kali ke unit hemodialisis, pastikan membawa <strong>Surat Rujukan Faskes 1</strong> (atau surat rekomendasi Sp.PD dari RS sebelumnya), <strong>Kartu BPJS/Asuransi</strong>, serta hasil lab terakhir (terutama Ureum, Kreatinin, Hb, dan skrining Hepatitis B/C). Bapak/Ibu atau keluarga dapat menelepon nomor unit HD di atas terlebih dahulu untuk menanyakan ketersediaan slot mesin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
