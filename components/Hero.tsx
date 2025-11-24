'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

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

  const handleDemoClick = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_DEMO_CLICK)
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div className="max-w-[540px]">
            <MotionDiv
              {...(!prefersReducedMotion && {
                initial: { y: 12, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.45, ease: 'easeOut' },
              })}
            >
              <h1 className="hero-h1 mb-6">
                Instant notes.
                <br />
                Zero friction.
              </h1>
            </MotionDiv>

            <MotionDiv
              {...(!prefersReducedMotion && {
                initial: { y: 12, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.45, ease: 'easeOut', delay: 0.1 },
              })}
            >
              <p className="text-lg text-slate-500 mb-8">
                Launches in &lt;400ms. Capture thoughts with one shortcut.
              </p>
            </MotionDiv>

            <MotionDiv
              {...(!prefersReducedMotion && {
                initial: { y: 12, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.45, ease: 'easeOut', delay: 0.2 },
              })}
              className="flex flex-col sm:flex-row gap-4 mb-4"
            >
              <button 
                onClick={handleDownloadClick}
                className="btn-primary"
              >
                Download Free — Early User
              </button>
              <button 
                onClick={handleDemoClick}
                className="btn-ghost"
              >
                Watch demo
              </button>
            </MotionDiv>

            <MotionDiv
              {...(!prefersReducedMotion && {
                initial: { y: 12, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.45, ease: 'easeOut', delay: 0.3 },
              })}
            >
              <p className="text-sm text-slate-500">
                No credit card · No payment · Free for early users · Notarized DMG
              </p>
            </MotionDiv>
          </div>

          {/* RIGHT COLUMN - IMAGE */}
          <MotionDiv
            {...(!prefersReducedMotion && {
              initial: { scale: 0.99, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
            })}
            className="relative"
          >
            <div className="rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50 bg-gradient-to-br from-slate-50 to-slate-100">
              <Image
                src="/media/hero-screenshot.png"
                alt="Unfriction app screenshot"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}

