'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

// Sample testimonials - replace with real ones
const testimonials = [
  {
    quote: 'Unfriction opens before I finish thinking. Life-changing.',
    name: 'Karthik R.',
    role: 'Product Manager',
  },
  {
    quote: 'The instant overlay saved my workflow a hundred times.',
    name: 'Anika S.',
    role: 'Designer',
  },
  {
    quote: 'OCR nailed it on first try. No fuss.',
    name: 'Sam P.',
    role: 'Developer',
  },
  {
    quote: 'Finally an app that disappears when I don\'t want it.',
    name: 'Maya T.',
    role: 'Writer',
  },
]

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Loved by makers
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Early users are already replacing slow notes tools with Unfriction
          </p>
        </motion.div>

        {/* Infinite scrolling testimonials */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: ['0%', '-33.333%'],
                  }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear',
              },
            }}
            className="flex gap-6"
            style={{ width: 'max-content' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] p-6 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-slate-700 mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
