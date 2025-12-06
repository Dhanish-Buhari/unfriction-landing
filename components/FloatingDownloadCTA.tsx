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
    // Also track legacy event for backward compatibility
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_MOBILE, {
      location: 'floating_cta',
      button_type: 'floating_pill',
      early_user: true,
    })
    
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_INITIATED, {
      source: 'floating_cta',
      early_user: true,
    })
    
    try {
      const link = document.createElement('a')
      link.href = '/Unfriction.dmg'
      link.download = 'Unfriction.dmg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      window.open('/Unfriction.dmg', '_blank')
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
            aria-label="Download Free - Early User"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.365 1.43c0 1.14-.417 2.1-1.25 2.9-.9.87-1.99 1.35-3.15 1.27-.04-1.1.47-2.14 1.31-2.94.94-.92 2.05-1.42 3.09-1.23.03.02.03.03 0 .04zM20.65 16.54c-.45 1.07-.67 1.55-1.26 2.49-.82 1.3-1.98 2.92-3.41 2.94-1.27.02-1.6-.84-3.33-.83-1.72.01-2.1.85-3.37.83-1.43-.02-2.53-1.47-3.35-2.77-2.3-3.53-2.54-7.69-1.12-9.89 1-1.53 2.57-2.41 4.04-2.41 1.5 0 2.44.82 3.68.82 1.2 0 1.93-.82 3.65-.82 1.33 0 2.73.72 3.72 1.96-3.25 1.78-2.72 6.42.15 7.68z"/>
            </svg>
            <span className="text-sm md:text-base">Download for Mac</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
