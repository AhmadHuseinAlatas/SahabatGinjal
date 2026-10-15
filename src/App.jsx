import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import AuraBackground from './components/layout/AuraBackground'
import FloatingActions from './components/layout/FloatingActions'
import Footer from './components/layout/Footer'
import MobileBottomBar from './components/layout/MobileBottomBar'
import MobileFocusSwitcher from './components/layout/MobileFocusSwitcher'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import CallToAction from './components/sections/CallToAction'
import CalmRoom from './components/sections/CalmRoom'
import Cost from './components/sections/Cost'
import CrisisHelp from './components/sections/CrisisHelp'
import DailyLife from './components/sections/DailyLife'
import DialysisOptions from './components/sections/DialysisOptions'
import Faq from './components/sections/Faq'
import FirstDay from './components/sections/FirstDay'
import FluidTracker from './components/sections/FluidTracker'
import FoodGuide from './components/sections/FoodGuide'
import Glossary from './components/sections/Glossary'
import Hero from './components/sections/Hero'
import HospitalsDirectory from './components/sections/HospitalsDirectory'
import KidneyProtection from './components/sections/KidneyProtection'
import KidneyScreening from './components/sections/KidneyScreening'
import KidneyStages from './components/sections/KidneyStages'
import MoodCheck from './components/sections/MoodCheck'
import Myths from './components/sections/Myths'
import Stories from './components/sections/Stories'
import TravelDialysis from './components/sections/TravelDialysis'
import Understand from './components/sections/Understand'

export default function App() {
  const [focusMode, setFocusMode] = useState('all') // 'all' | 'prevention' | 'dialysis'

  const showPrevention = focusMode === 'all' || focusMode === 'prevention'
  const showDialysis = focusMode === 'all' || focusMode === 'dialysis'

  const handleNavigate = (targetId) => {
    // Jika target modul tersembunyi karena mode fokus yang berlawanan, sesuaikan mode secara otomatis
    if (['skrining', 'stadium-ginjal', 'pencegahan'].includes(targetId) && focusMode === 'dialysis') {
      setFocusMode('prevention')
    } else if (
      ['pilihan', 'cairan', 'makanan', 'rumah-sakit', 'biaya', 'hari-pertama', 'harian', 'perasaan', 'paham'].includes(targetId) &&
      focusMode === 'prevention'
    ) {
      setFocusMode('dialysis')
    }

    setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 60)
  }

  return (
    // reducedMotion="user" menghormati setelan "kurangi gerak" di sistem pengguna.
    <MotionConfig reducedMotion="user">
      <a
        href="#konten"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-80 focus-visible:rounded-full focus-visible:bg-brand focus-visible:px-5 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-brand-ink"
      >
        Langsung ke isi
      </a>

      <ScrollProgress />
      <AuraBackground />
      <Navbar />

      <main id="konten" tabIndex={-1} className="w-full max-w-full overflow-x-clip pb-16 lg:pb-0">
        <Hero onSelectMode={setFocusMode} />

        {/* Switcher fokus di ponsel untuk mengontrol panjang scroll */}
        <MobileFocusSwitcher focusMode={focusMode} onSelectMode={setFocusMode} />

        {/* 1. Jalur Pencegahan & Skrining Ginjal */}
        {showPrevention && (
          <>
            <KidneyScreening />
            <KidneyStages />
            <KidneyProtection />
          </>
        )}

        {/* 2. Jalur Pendamping Dialisis & Keluarga */}
        {showDialysis && (
          <>
            <MoodCheck />
            <Understand />
            <Glossary />
            <DialysisOptions />
            <FirstDay />
          </>
        )}

        {/* 3. Mitos Ginjal (Bermanfaat untuk kedua kelompok) */}
        <Myths />

        {/* 4. Rutinitas & Keseharian Dialisis */}
        {showDialysis && (
          <>
            <DailyLife />
            <FluidTracker />
            <FoodGuide />
            <Cost />
            <HospitalsDirectory />
            <TravelDialysis />
            <Stories />
          </>
        )}

        {/* 5. Modul Ketenangan, Dukungan, & Penutup (Aksesibel untuk semua) */}
        <CalmRoom />
        {showDialysis && <CrisisHelp />}
        <Faq />
        <CallToAction />
      </main>

      <Footer />
      <FloatingActions />
      <MobileBottomBar onNavigate={handleNavigate} />
    </MotionConfig>
  )
}
