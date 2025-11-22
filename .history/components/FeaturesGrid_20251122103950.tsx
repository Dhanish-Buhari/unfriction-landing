'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import Image from 'next/image'

const features = [
  {
    title: 'Minimal glassy UI',
    description: 'Mac-native, no extra chrome.',
  },
  {
    title: 'Stupid fast',
    description: 'Under 400ms launch, every time.',
  },
  {
    title: 'Persistent notes',
    description: 'Type and forget. Saves automatically.',
  },
  {
    title: 'Secure & private',
    description: 'Local-first; no cloud by default.',
  },
  {
    title: 'System aware',
    description: 'Pauses on lock, restores after restart.',
  },
  {
    title: 'Zero distractions',
    description: 'No formatting, no bloat.',
  },
]

export default function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          A writing surface that stays out of your way
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            
            return (
              <MotionDiv
                key={feature.title}
                {...(!prefersReducedMotion && {
                  initial: { y: 20, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  whileHover: { y: -6, scale: 1.02 },
                  viewport: { once: true, margin: '-50px' },
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 250,
                    damping: 20,
                  },
                })}
                className="glass-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image 
                      src="/app-icon.png" 
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}



