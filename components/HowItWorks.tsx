'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ArrowRight } from 'lucide-react'

const steps = [
  { number: '1', text: 'Hit the shortcut (⌃⌥N).' },
  { number: '2', text: 'Dump the thought / paste screenshot.' },
  { number: '3', text: 'Close overlay, keep working.' },
]

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {steps.map((step, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            const isLast = index === steps.length - 1
            
            return (
              <div key={step.number} className="flex items-center">
                <MotionDiv
                  {...(!prefersReducedMotion && {
                    initial: { opacity: 0, scale: 0.9 },
                    whileInView: { opacity: 1, scale: 1 },
                    whileHover: { scale: 1.05 },
                    viewport: { once: true },
                    transition: { 
                      duration: 0.4, 
                      delay: index * 0.15,
                      type: 'spring',
                      stiffness: 200,
                    },
                  })}
                  className="flex flex-col items-center text-center max-w-[200px]"
                >
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-slate-900 opacity-20"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    )}
                  </div>
                  <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
                    {step.text}
                  </p>
                </MotionDiv>
                
                {/* Arrow between steps */}
                {!isLast && (
                  <motion.div
                    {...(!prefersReducedMotion && {
                      initial: { opacity: 0, x: -10 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: index * 0.15 + 0.2 },
                    })}
                    className="hidden md:flex items-center justify-center text-slate-300 mx-4"
                  >
                    <ArrowRight className="w-6 h-6" strokeWidth={2} />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
