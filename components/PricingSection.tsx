'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { startLifetimeCheckout } from '@/app/actions/checkout'
import { getTierBadge } from '@/lib/polar'
import { useEffect, useState } from 'react'
import type { LifetimePricingState } from '@/lib/polar'
import { Zap, Infinity, Sparkles, Cloud, Users, Check, Clock, History, Webhook, FileText } from 'lucide-react'
import WaitlistModal from './WaitlistModal'

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion()
  const [pricingState, setPricingState] = useState<LifetimePricingState | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  useEffect(() => {
    async function loadPricing() {
      try {
        const response = await fetch('/api/pricing', {
          cache: 'no-store', // Always fetch fresh data
        })
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

    // Load immediately
    loadPricing()

    // Refresh every 10 seconds for live updates
    const interval = setInterval(loadPricing, 10000)

    return () => clearInterval(interval)
  }, [])


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
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-5 text-slate-900 tracking-tight">
            Free to try. Upgrade when it becomes second nature.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Early adopters keep the lifetime perks. Waiting costs more.
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {/* Free Plan */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.1 },
            })}
            className="p-8 border-2 border-slate-200 rounded-2xl bg-white flex flex-col hover:border-slate-300 hover:shadow-lg transition-all duration-300 h-full"
          >
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-4">
                FREE
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Free - Early Access</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-extrabold text-slate-900">$0</span>
              </div>
              <p className="text-sm text-slate-500">Forever free</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Up to <strong className="font-semibold">50 notes</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">
                  <strong className="font-semibold text-slate-900">10 FREE OCR</strong> extractions included
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Tags, search, pinning & trash</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Global shortcut overlay, &lt;400ms launch</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Local storage on your Mac</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">No account, no tracking</span>
              </li>
            </ul>

            <div className="mb-4">
              <button
                disabled
                className="w-full px-6 py-4 bg-slate-300 text-slate-500 font-semibold rounded-xl cursor-not-allowed opacity-60"
              >
                Work in Progress
              </button>
            </div>
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Free version coming soon. Unlock lifetime access now to get early access.
            </p>
          </MotionDiv>

          {/* Lifetime Plan - Recommended */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: -10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.2 },
            })}
            className="p-8 border-2 border-teal-500 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-teal-50/30 relative shadow-2xl flex flex-col z-10 h-full"
          >
            {/* Recommended Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
              <span className="px-5 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg">
                ⭐ Recommended
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Lifetime - One-time</h3>

              {loading ? (
                <div className="h-20 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400">Loading...</div>
                </div>
              ) : pricingState && tierBadge ? (
                <>
                  {/* Early Member Badge */}
                  {pricingState.tier !== 'FULL' && (
                    <div className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full mb-4 shadow-md w-full">
                      <span className="text-sm">✨</span>
                      <span>EARLY MEMBER</span>
                    </div>
                  )}
                  
                  {/* Show tier badge only for full price */}
                  {pricingState.tier === 'FULL' && (
                    <div className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 ${tierBadge.color} text-white text-sm font-bold rounded-lg mb-3 shadow-lg w-full`}>
                      <span>{tierBadge.label}</span>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mb-2">
                    {pricingState.discount > 0 && (
                      <span className="text-2xl text-slate-400 line-through font-semibold">$39</span>
                    )}
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                      {pricingState.displayPrice}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">One-time payment, never pay again</p>

                  {/* Early Adopter Badge */}
                  {pricingState.remaining !== null && pricingState.remaining > 0 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold rounded-lg mt-3">
                      <Clock className="w-4 h-4" />
                      <span>Early adopter price (limited time) - {pricingState.discount}% OFF</span>
                    </div>
                  )}

                  {pricingState.tier === 'FULL' && (
                    <p className="text-sm text-slate-600 font-medium mt-3">Full price</p>
                  )}
                </>
              ) : null}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Infinity className="w-3.5 h-3.5 text-teal-600" strokeWidth={2.5} />
                </div>
                <span className="text-slate-700 leading-relaxed font-medium">Unlimited notes - never run out of space</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Infinity className="w-3.5 h-3.5 text-teal-600" strokeWidth={2.5} />
                </div>
                <span className="text-slate-700 leading-relaxed font-medium">Unlimited OCR - extract text from unlimited screenshots & images</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Export & backup all your notes locally - own your data</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Choose where notes are saved - full control</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" strokeWidth={2.5} />
                </div>
                <span className="text-slate-700 leading-relaxed">All current & future <strong className="font-semibold">local</strong> features (V1, V2, and beyond) - grandfathered forever</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">30-day money-back guarantee - try risk-free</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 leading-relaxed">Early adopter badge - show you were here first</span>
              </li>
            </ul>

            <button
              onClick={handleLifetimeClick}
              disabled={loading || !pricingState?.polarPriceId}
              className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? 'Loading...' : 'Unlock Lifetime'}
            </button>

            {/* Guarantee Text */}
            <div className="mt-6 pt-6 border-t border-teal-200">
              <p className="text-xs text-slate-600 leading-relaxed">
                Early adopters are grandfathered. Discounts disappear automatically as tiers fill.
              </p>
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
            className="p-8 border-2 border-slate-200 rounded-2xl bg-slate-50 flex flex-col opacity-80 hover:border-slate-300 hover:opacity-100 transition-all duration-300 h-full"
          >
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full mb-4">
                COMING SOON
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Unfriction Pro</h3>
              
              {/* Pricing - Both on same line */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$9</span>
                    <span className="text-base font-normal text-slate-500">/mo</span>
                  </div>
                  <span className="text-slate-400">or</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$79</span>
                    <span className="text-base font-normal text-slate-500">/yr</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                  <span>Save $29/year</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">(planned)</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For power users and teams who want sync, multiple devices, and automation.
              </p>
            </div>

            <ul className="space-y-3.5 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Cloud className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">iCloud / cloud sync across all devices <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Shared workspaces & team collaboration <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">AI-powered text cleanup & OCR batching <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-slate-500" strokeWidth={3} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Advanced automation & workflows <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Export to PDF, Markdown, & more formats <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <History className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Version history & note recovery <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Priority support & feature requests <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Webhook className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Custom integrations & API access <span className="text-xs text-slate-500">(planned)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
                </div>
                <span className="text-slate-600 leading-relaxed text-sm">Everything in Lifetime + all Pro features</span>
              </li>
            </ul>

            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              Join Waitlist
            </button>
            <p className="text-xs text-slate-600 text-center mt-4 leading-relaxed">
              Lifetime buyers keep unlimited local features and OCR forever. Pro will be optional and focused on cloud & team workflows.
            </p>
          </MotionDiv>
        </div>
      </div>
      
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </section>
  )
}

