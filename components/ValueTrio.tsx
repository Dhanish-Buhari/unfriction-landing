'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import Image from 'next/image'

const values = [
  {
    title: 'Instant Launch',
    description: 'Opens in under 400ms, every time.',
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
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            
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
                {/* Icon with app icon */}
                <div className="flex justify-center mb-6">
                  <Image 
                    src="/app-icon.png" 
                    alt={value.title}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
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
            Because your thoughts don't wait for slow apps to load.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
