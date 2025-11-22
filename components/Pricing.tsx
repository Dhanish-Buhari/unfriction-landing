'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import Image from 'next/image'

export default function Pricing() {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  const handleDownloadClick = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_DOWNLOAD_CLICK)
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_INITIATED, { early_user: true })
    
    // Create a temporary download link and trigger it
    const link = document.createElement('a')
    link.href = '/Unfriction.dmg'
    link.download = 'Unfriction.dmg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4">
            Free for early users.
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            No credit card. No payment. Just download and enjoy. Works on macOS Ventura & Sonoma.
          </p>

          <button
            onClick={handleDownloadClick}
            className="btn-primary text-lg px-8 py-4 mb-4"
          >
            Download Unfriction
          </button>

          <p className="text-sm text-slate-500 mb-8">
            Business / Team licensing →{' '}
            <a href="mailto:sales@unfriction.app" className="text-teal-500 hover:text-teal-600">
              sales@unfriction.app
            </a>
          </p>
        </MotionDiv>

        {/* Notarization Badge & Trust Row */}
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.2 },
          })}
          className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-slate-200"
        >
          {/* Left: Notarization Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">Notarized & stapled DMG</span>
          </div>

          {/* Right: Trust Microcopy */}
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>No accounts</span>
            <span>•</span>
            <span>No tracking</span>
            <span>•</span>
            <span>Local-first</span>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

