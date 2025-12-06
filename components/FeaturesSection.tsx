'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Zap, Brain, Image as ImageIcon } from 'lucide-react'

const featureBuckets = [
  {
    headline: 'Built for speed, not ceremony.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    bullets: [
      'Launch overlay in under 400ms with a global shortcut',
      'Stays on top of any app, desktop, fullscreen, or Space',
      'Autosaves every 0.5s so you never lose a thought',
    ],
  },
  {
    headline: 'Your brain, not your tool, is the main character.',
    icon: Brain,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    bullets: [
      'Minimal, glassy interface with optional transparency',
      'No accounts, no inbox, no notifications',
      'Notes, tags, search, and pinning - nothing bloated',
    ],
  },
  {
    headline: 'When a screenshot becomes text in one move.',
    icon: ImageIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    bullets: [
      'Drag & drop or paste images for instant OCR via Apple\'s Vision framework',
      'Copy extracted text directly into your workflow',
      'Export and back up notes locally (Lifetime only)',
    ],
  },
]

export default function FeaturesSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            A writing surface that stays out of your way
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Built for speed, designed for focus, engineered for simplicity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {featureBuckets.map((bucket, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            const IconComponent = bucket.icon

            return (
              <MotionDiv
                key={index}
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.1,
                  },
                  whileHover: { y: -4, scale: 1.02 },
                })}
              >
                <div className="h-full p-8 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm hover:border-slate-300 hover:shadow-xl transition-all duration-300 hover:bg-white">
                  <div className={`w-14 h-14 rounded-xl ${bucket.bgColor} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-7 h-7 ${bucket.color}`} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-5 text-slate-900 leading-snug">
                    {bucket.headline}
                  </h3>
                  <ul className="space-y-3.5">
                    {bucket.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 leading-relaxed text-[15px]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}

