'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

const values = [
  {
    title: 'Instant Launch',
    description: 'Opens in under 400ms.',
  },
  {
    title: 'Global Shortcut',
    description: 'Access from any app with Ctrl + Option + N.',
  },
  {
    title: 'Auto Save',
    description: 'Notes persist instantly, always.',
  },
]

export default function ValueTrio() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            
            return (
              <MotionDiv
                key={value.title}
                {...(!prefersReducedMotion && {
                  initial: { y: 20, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true, margin: '-50px' },
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: index * 0.1,
                  },
                })}
                className="text-center"
              >
                {/* Glass dot icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500/30 to-teal-500/10 flex items-center justify-center backdrop-blur-sm border border-teal-500/20">
                    <div className="w-6 h-6 rounded-full bg-teal-500 shadow-lg" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
