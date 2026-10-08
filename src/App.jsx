import { MotionConfig } from 'motion/react'
import AuraBackground from './components/layout/AuraBackground'
import FloatingActions from './components/layout/FloatingActions'
import Footer from './components/layout/Footer'
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

      <main id="konten" tabIndex={-1}>
        <Hero />
        <KidneyScreening />
        <KidneyStages />
        <KidneyProtection />
        <MoodCheck />
        <Understand />
        <Glossary />
        <DialysisOptions />
        <FirstDay />
        <Myths />
        <DailyLife />
        <FluidTracker />
        <FoodGuide />
        <Cost />
        <HospitalsDirectory />
        <TravelDialysis />
        <Stories />
        <CalmRoom />
        <CrisisHelp />
        <Faq />
        <CallToAction />
      </main>

      <Footer />
      <FloatingActions />
    </MotionConfig>
  )
}
