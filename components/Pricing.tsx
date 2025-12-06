'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Pricing() {
  const prefersReducedMotion = useReducedMotion()

  const handleDownloadClick = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_PRICING, {
      location: 'pricing',
      plan: 'free',
      early_user: true,
    })
    
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_INITIATED, {
      source: 'pricing',
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

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Free for early users —  Pro coming soon
          </h2>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.2 },
            })}
            className="p-8 border-2 border-slate-200 rounded-xl bg-white"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900">
              Free — Early access
            </h3>
            <ul className="space-y-3 mb-8 mt-6">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">Unlimited notes</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">
                  <span className="font-semibold text-slate-900">NEW:</span> Smart tagging & export
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">Unlimited OCR &ldquo;for now&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">No credit card</span>
              </li>
            </ul>
            <div>
              <button
                onClick={handleDownloadClick}
                className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Download Free
              </button>
              <p className="text-xs text-slate-500 text-center mt-3">
                Early adopters are grandfathered.
              </p>
            </div>
          </MotionDiv>

          {/* Pro Plan */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.3 },
            })}
            className="p-8 border-2 border-slate-200 rounded-xl bg-slate-50"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900">
              Unfriction Pro — Coming soon
            </h3>
            <p className="text-slate-600 mb-6 text-sm">
              Pro will add iCloud sync, priority support, and team features. Early users will get a discount and keep unlimited OCR.
            </p>
            <button
              disabled
              className="w-full px-6 py-3 bg-slate-200 text-slate-400 font-semibold rounded-xl cursor-not-allowed"
            >
              Pro plan coming soon
            </button>
          </MotionDiv>
        </div>

        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.4 },
          })}
          className="text-center mt-8"
        >
          <p className="text-sm text-slate-500">
            Early adopters will be grandfathered when pricing launches.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
