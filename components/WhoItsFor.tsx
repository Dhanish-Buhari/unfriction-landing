'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

const roles = ['Engineers', 'Designers', 'Founders', 'Writers', 'Students']

export default function WhoItsFor() {
  const prefersReducedMotion = useReducedMotion()

  // Duplicate roles multiple times for seamless infinite scroll
  const duplicatedRoles = [...roles, ...roles, ...roles, ...roles]

  return (
    <section className="py-4 md:py-6 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title above scroll */}
        <div className="text-center mb-4">
          <p className="text-lg md:text-xl text-slate-700 font-medium">
            Built for people who think faster than their tools.
          </p>
        </div>

        {/* Infinite scrolling row - Constrained to container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            className="flex gap-4 md:gap-6"
            style={{ width: 'max-content' }}
          >
            {duplicatedRoles.map((role, index) => (
              <div
                key={`${role}-${index}`}
                className="flex-shrink-0 inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-sm md:text-base font-medium text-slate-700 transition-colors whitespace-nowrap"
              >
                {role}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
