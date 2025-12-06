'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { startLifetimeCheckout } from '@/app/actions/checkout'
import { getTierBadge } from '@/lib/polar'
import { useEffect, useState } from 'react'
import type { LifetimePricingState } from '@/lib/polar'
import { Zap, Infinity, Sparkles, Cloud, Users, Check, Clock } from 'lucide-react'

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion()
  const [pricingState, setPricingState] = useState<LifetimePricingState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPricing() {
      try {
        const response = await fetch('/api/pricing')
        if (response.ok) {
          const state = await response.json()
          setPricingState(state)
        } else {
          console.error('Failed to load pricing:', response.statusText)
        }
      } catch (error) {
        console.error('Failed to load pricing:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPricing()
  }, [])

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

  const handleLifetimeClick = async () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_PRICING, {
      location: 'pricing',
      plan: 'lifetime',
      price: pricingState?.price,
      tier: pricingState?.tier,
    })

    await startLifetimeCheckout()
  }

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  const tierBadge = pricingState ? getTierBadge(pricingState.tier) : null

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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
            Choose your plan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start free, or unlock lifetime access with all features forever
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.1 },
            })}
            className="p-8 border-2 border-slate-200 rounded-xl bg-white flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Free</h3>
              <p className="text-sm text-slate-500 mb-4">Early Access</p>
              <div className="text-4xl font-bold text-slate-900 mb-1">$0</div>
              <p className="text-sm text-slate-500">Forever free</p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Up to 20 notes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">5 OCR extractions/day</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Tags + search + pin</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">All v1.1 features</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">No credit card</span>
              </li>
            </ul>

            <button
              onClick={handleDownloadClick}
              className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Download Free
            </button>
          </MotionDiv>

          {/* Lifetime Plan - Recommended */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: -10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.2 },
            })}
            className="p-8 border-2 border-teal-500 rounded-xl bg-gradient-to-br from-teal-50 to-white relative shadow-xl flex flex-col"
          >
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-teal-500 text-white text-sm font-semibold rounded-full">
                Recommended
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Lifetime</h3>
              <p className="text-sm text-slate-500 mb-4">One-time purchase</p>

              {loading ? (
                <div className="h-16 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400">Loading...</div>
                </div>
              ) : pricingState && tierBadge ? (
                <>
                  {/* Tier Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${tierBadge.color} text-white text-xs font-semibold rounded-lg mb-3`}>
                    <span>{tierBadge.emoji}</span>
                    <span>{tierBadge.label}</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-1">
                    {pricingState.discount > 0 && (
                      <span className="text-xl text-slate-400 line-through">$39</span>
                    )}
                    <span className="text-4xl font-bold text-slate-900">
                      {pricingState.displayPrice}
                    </span>
                  </div>

                  {/* Remaining Slots */}
                  {pricingState.remaining !== null && pricingState.remaining > 0 && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-medium mt-2">
                      <Clock className="w-4 h-4" />
                      <span>Only {pricingState.remaining} slots left</span>
                    </div>
                  )}

                  {pricingState.tier === 'FULL' && (
                    <p className="text-sm text-slate-500 mt-2">Full price</p>
                  )}
                </>
              ) : null}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Infinity className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Unlimited notes</span>
              </li>
              <li className="flex items-start gap-3">
                <Infinity className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Unlimited OCR</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">All current & future features</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Offline storage</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">30-day refund guarantee</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Early adopter badge</span>
              </li>
            </ul>

            <button
              onClick={handleLifetimeClick}
              disabled={loading || !pricingState?.polarPriceId}
              className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Unlock Lifetime'}
            </button>

            {/* Guarantee Text */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-500" />
                <span>Early adopters are grandfathered</span>
              </div>
              {pricingState && pricingState.remaining !== null && pricingState.remaining > 0 && (
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="w-4 h-4" />
                  <span>Discounts expire automatically as slots fill</span>
                </div>
              )}
            </div>
          </MotionDiv>

          {/* Pro Plan - Coming Soon */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.3 },
            })}
            className="p-8 border-2 border-slate-200 rounded-xl bg-slate-50 flex flex-col opacity-75"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Pro</h3>
              <p className="text-sm text-slate-500 mb-4">Coming soon</p>
              <div className="text-4xl font-bold text-slate-900 mb-1">$9<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <p className="text-sm text-slate-500">or $79/year</p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Cloud className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500">iCloud sync</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500">Team features</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500">Everything in Lifetime</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full px-6 py-3 bg-slate-200 text-slate-400 font-semibold rounded-xl cursor-not-allowed"
            >
              Coming Soon
            </button>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}

