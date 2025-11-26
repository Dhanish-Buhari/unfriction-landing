'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

const metrics = [
  {
    label: 'Opens in <400ms',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: 'Instant OCR',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Notarized DMG',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function KeyMetricsRow() {
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <section className="py-6 md:py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, ease: 'easeOut' },
          })}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="flex items-center gap-2 text-sm md:text-base text-slate-700"
            >
              <div className="text-teal-500 flex-shrink-0">
                {metric.icon}
              </div>
              <span className="font-medium">{metric.label}</span>
              {/* Tiny check badge */}
              <svg
                className="w-3 h-3 text-teal-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
