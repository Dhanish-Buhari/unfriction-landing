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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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
                    delay: index * 0.15,
                  },
                })}
              >
                <div className="h-full">
                  <div className={`w-12 h-12 rounded-xl ${bucket.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${bucket.color}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 leading-snug">
                    {bucket.headline}
                  </h3>
                  <ul className="space-y-3">
                    {bucket.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-slate-600 leading-relaxed text-sm">
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

