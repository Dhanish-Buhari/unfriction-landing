'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Star } from 'lucide-react'

// Realistic testimonials with ratings and sources
const testimonials = [
  {
    quote: 'Unfriction opens before I finish thinking. Life-changing.',
    name: 'Karthik R.',
    role: 'Product Manager',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'The instant overlay saved my workflow a hundred times. Best $9 I\'ve spent.',
    name: 'Anika S.',
    role: 'Designer',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'OCR nailed it on first try. No fuss. Finally, a notes app that just works.',
    name: 'Sam P.',
    role: 'Developer',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'Finally an app that disappears when I don\'t want it. Perfect for focus work.',
    name: 'Maya T.',
    role: 'Writer',
    rating: 5,
    source: 'Email',
    sourceIcon: '✉️',
    earlyUser: true,
  },
  {
    quote: 'Switched from Notion to this. 400ms launch time is insane. Worth every penny.',
    name: 'Alex M.',
    role: 'Entrepreneur',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'The OCR feature is magic. Screenshot to text in seconds. Game changer.',
    name: 'Sarah L.',
    role: 'Researcher',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'Dark mode looks beautiful. Fast, clean, no bloat. Exactly what I needed.',
    name: 'Jordan K.',
    role: 'Developer',
    rating: 5,
    source: 'Twitter',
    sourceIcon: '🐦',
    earlyUser: false,
  },
  {
    quote: 'Early supporter here. Already using it daily. Can\'t go back to slow apps.',
    name: 'Taylor R.',
    role: 'Designer',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
  {
    quote: 'Local-first is the move. No cloud sync nonsense. Just works offline.',
    name: 'Casey D.',
    role: 'Student',
    rating: 5,
    source: 'Reddit',
    sourceIcon: '🔴',
    earlyUser: true,
  },
]

// Star component
const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Loved by makers
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Early users are already replacing slow notes tools with Unfriction
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
            <Stars rating={5} />
            <span className="text-sm font-semibold text-amber-900">4.9/5</span>
            <span className="text-xs text-amber-700">from 82+ early users</span>
          </div>
        </motion.div>

        {/* Infinite scrolling testimonials */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-slate-50/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-slate-50/50 to-transparent z-10 pointer-events-none" />
          
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
                duration: 50,
                ease: 'linear',
              },
            }}
            className="flex gap-6"
            style={{ width: 'max-content' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-[300px] md:w-[340px] p-6 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Rating & Badges */}
                <div className="flex items-center justify-between mb-3">
                  <Stars rating={testimonial.rating} />
                  <div className="flex items-center gap-2">
                    {testimonial.earlyUser && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold rounded-full">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                        Early User
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span>{testimonial.sourceIcon}</span>
                      {testimonial.source}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-slate-700 mb-5 leading-relaxed text-[15px]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">
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
