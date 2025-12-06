'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion()

  const handleDownloadClick = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_FINAL_CTA, {
      location: 'final_cta',
    })
    
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      const navHeight = 72
      const elementPosition = pricingSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, ease: 'easeOut' },
          })}
          className="text-center"
        >
          {/* Compact heading and subtitle */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">
              Try Unfriction
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Fastest way to capture ideas before they vanish.
            </p>
          </div>

          {/* Compact CTA button with inline benefits */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDownloadClick}
              className="group relative px-10 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download for Mac
              </span>
            </button>
            
            {/* Quick benefits inline */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No signup
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free - early access
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                &lt;400ms launch
              </span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

