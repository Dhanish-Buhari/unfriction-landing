'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const handleDownloadClick = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_HERO, {
      location: 'hero',
      button_type: 'primary',
      early_user: true,
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

  const handleDemoClick = () => {
    trackEvent(ANALYTICS_EVENTS.DEMO_BUTTON_CLICKED, {
      location: 'hero',
    })
    // Also track legacy event for backward compatibility
    trackEvent(ANALYTICS_EVENTS.CTA_DEMO_CLICK)
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, ease: 'easeOut' },
          })}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Instant notes.
            <br />
            Zero friction.
          </h1>
        </MotionDiv>

        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
          })}
        >
          <p className="text-xl md:text-2xl text-slate-600 mb-2 leading-relaxed">
            Launches in &lt;400ms. Now with smart tagging, export, and more.
          </p>
          <p className="text-sm text-slate-400 mb-10">
            Version 1.1 - New: Tags · Export · Shortcuts Cheatsheet
          </p>
        </MotionDiv>

        {/* CTAs */}
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
          })}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3"
        >
          <button 
            onClick={handleDownloadClick}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ minHeight: '56px' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for Mac
          </button>
          <button 
            onClick={handleDemoClick}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-5 text-slate-700 hover:text-slate-900 font-medium rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 shadow-md hover:shadow-lg"
            style={{ minHeight: '56px' }}
          >
            <svg 
              className="w-5 h-5 text-teal-500" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Watch 57-second demo</span>
          </button>
        </MotionDiv>

        {/* Micro-credibility line */}
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.25 },
          })}
          className="mb-6"
        >
          <p className="text-sm text-slate-500">
            82+ downloads this week - macOS Sonoma & Ventura supported.
          </p>
        </MotionDiv>

        {/* Trust line */}
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
          })}
        >
          <p className="text-sm text-slate-500">
            No signup · No credit card · Local-first notes
          </p>
        </MotionDiv>
      </div>

      {/* Product Visual - Static Image Only */}
      <MotionDiv
        {...(!prefersReducedMotion && {
          initial: { scale: 0.98, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
        })}
        className="mt-16 md:mt-20 max-w-5xl mx-auto px-6 relative z-10"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white/50 backdrop-blur-sm">
          {/* Premium glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/20 via-transparent to-blue-50/20 pointer-events-none"></div>
          <div className="aspect-[16/11] md:aspect-[16/10] relative w-full overflow-hidden">
            <Image
              src="/media/hero-screenshot.png"
              alt="Unfriction app interface"
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 80vw"
              style={{ objectPosition: 'top center' }}
            />
          </div>
        </div>
      </MotionDiv>
    </section>
  )
}
