'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ArrowRight, Keyboard, FileImage, X } from 'lucide-react'

const steps = [
  { 
    number: '1', 
    text: 'Hit the shortcut',
    subtext: '(⌃⌥N)',
    icon: Keyboard,
  },
  { 
    number: '2', 
    text: 'Dump the thought',
    subtext: '/ paste screenshot',
    icon: FileImage,
  },
  { 
    number: '3', 
    text: 'Close overlay',
    subtext: 'keep working',
    icon: X,
  },
]

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900 tracking-tight">
            How it works
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Three steps. Zero friction.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            const isLast = index === steps.length - 1
            const IconComponent = step.icon
            
            return (
              <div key={step.number} className="flex items-center w-full md:w-auto">
                <MotionDiv
                  {...(!prefersReducedMotion && {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    whileHover: { y: -8, scale: 1.02 },
                    viewport: { once: true },
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.15,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    },
                  })}
                  className="flex flex-col items-center text-center w-full md:w-[220px]"
                >
                  <div className="relative mb-5">
                    {/* Outer glow effect */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/20 to-blue-400/20 blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    
                    {/* Main circle */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center font-bold text-2xl md:text-3xl shadow-xl border-2 border-slate-900/10">
                      {step.number}
                      {/* Icon overlay */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-slate-700" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="space-y-1">
                    <p className="text-lg md:text-xl font-semibold text-slate-900 leading-tight">
                      {step.text}
                    </p>
                    <p className="text-sm md:text-base text-slate-500 font-medium">
                      {step.subtext}
                    </p>
                  </div>
                </MotionDiv>
                
                {/* Arrow between steps */}
                {!isLast && (
                  <motion.div
                    {...(!prefersReducedMotion && {
                      initial: { opacity: 0, x: -20 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { 
                        duration: 0.5, 
                        delay: index * 0.15 + 0.3,
                        type: 'spring',
                        stiffness: 150,
                      },
                    })}
                    className="hidden md:flex items-center justify-center text-slate-300 mx-4"
                  >
                    <ArrowRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
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
