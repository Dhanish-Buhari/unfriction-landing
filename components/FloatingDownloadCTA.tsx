'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function FloatingDownloadCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (300px)
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_FLOATING, {
      location: 'floating_cta',
      button_type: 'floating_pill',
      early_user: true,
    })
    
    // Scroll to pricing section (download disabled, show pricing)
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      const navHeight = 72
      const elementPosition = pricingSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-40 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            aria-label="View Pricing - Unlock Lifetime Access"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v20M2 12h20"/>
            </svg>
            <span className="text-sm md:text-base">Unlock Lifetime</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
