'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatsNew from '@/components/WhatsNew'
import WhoItsFor from '@/components/WhoItsFor'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import Demo from '@/components/Demo'
import Testimonials from '@/components/Testimonials'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/FinalCTA'
import FloatingDownloadCTA from '@/components/FloatingDownloadCTA'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import AnalyticsTracker from '@/components/AnalyticsTracker'

export default function Home() {
  useEffect(() => {
    // Track page load
    trackEvent(ANALYTICS_EVENTS.LANDING_LOADED)

    // Add ESC key listener for closing modals
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const event = new CustomEvent('closeLightbox')
        window.dispatchEvent(event)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      <AnalyticsTracker />
      <Nav />
      <main className="min-h-screen">
        <Hero />
        <WhatsNew />
        <WhoItsFor />
        <div id="features">
          <FeaturesSection />
        </div>
        <HowItWorks />
        <div id="demo">
          <Demo />
        </div>
        <Testimonials />
        <div id="pricing">
          <PricingSection />
        </div>
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <FloatingDownloadCTA />
    </>
  )
}
