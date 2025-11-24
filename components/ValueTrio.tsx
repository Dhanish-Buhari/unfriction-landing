'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Zap, Keyboard, CloudCheck } from 'lucide-react'

const values = [
  {
    title: 'Instant Launch',
    description: 'Opens in under 400ms, every time.',
    icon: Zap,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Global Shortcut',
    description: 'Access from any app with Ctrl + Option + N.',
    icon: Keyboard,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Auto Save',
    description: 'Notes persist instantly, always.',
    icon: CloudCheck,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
]

export default function ValueTrio() {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const IconComponent = value.icon
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
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`${value.bgColor} ${value.color} rounded-2xl p-4 w-20 h-20 flex items-center justify-center shadow-sm`}>
                    <IconComponent className="w-10 h-10" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </MotionDiv>
            )
          })}
        </div>
        
        {/* Subtle premium hook */}
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-50px' },
            transition: {
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.3,
            },
          })}
          className="text-center mt-16"
        >
          <p className="text-sm text-slate-400 font-light italic">
            Because your thoughts don&apos;t wait for slow apps to load.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
