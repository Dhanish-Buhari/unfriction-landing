'use client'

import { useEffect, useState } from 'react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (600px)
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_DOWNLOAD_CLICK)
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_INITIATED, { price_suggestion: 3 })
    window.open('https://gumroad.com/l/unfriction', '_blank')
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-slate-200 shadow-lg transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!isVisible}
    >
      <button
        onClick={handleClick}
        className="w-full btn-primary justify-center text-center min-h-[44px]"
      >
        Download — Pay What You Want
      </button>
    </div>
  )
}

