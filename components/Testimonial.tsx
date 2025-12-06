'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

export default function Testimonial() {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="border-l-4 border-teal-400 pl-6 py-2"
        >
          <blockquote className="text-xl italic text-slate-700 mb-3">
            &ldquo;Unfriction is absurdly fast - my notes open before I finish thinking.&rdquo;
          </blockquote>
          <cite className="text-sm text-slate-500 not-italic">
            - Karthik R., PM
          </cite>
        </MotionDiv>
      </div>
    </section>
  )
}

