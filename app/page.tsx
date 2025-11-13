'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import ValueTrio from '@/components/ValueTrio'
import FeaturesGrid from '@/components/FeaturesGrid'
import Demo from '@/components/Demo'
import Testimonial from '@/components/Testimonial'
import Pricing from '@/components/Pricing'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

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
      <Nav />
      <main className="min-h-screen">
        <Hero />
        <ValueTrio />
        <FeaturesGrid />
        <Demo />
        <Testimonial />
        <Pricing />
        <EmailCapture />
        <Footer />
      </main>
      <MobileStickyCTA />
    </>
  )
}
