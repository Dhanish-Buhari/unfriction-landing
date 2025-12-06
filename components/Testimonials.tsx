'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Star } from 'lucide-react'

type Testimonial = {
  name: string
  role: string
  source: string
  quote: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Riya',
    role: 'Student & writer',
    source: 'Reddit · Early user',
    quote:
      'Just used it. It\'s SO good. Super quick, feels smooth, and already part of my daily workflow.',
  },
  {
    name: 'dev_all_the_ops',
    role: 'Developer · ex-NVAlt user',
    source: 'Reddit · Early user',
    quote:
      'I\'ve been hanging onto NVAlt for years because nothing else felt as fast. Unfriction might finally be good enough to replace it. Notes are just plain text markdown on disk, so I\'m never locked in.',
  },
  {
    name: 'Ghost_of_Panda',
    role: 'Power user',
    source: 'Reddit · Early user',
    quote:
      'I\'m still figuring out the best way to use it, but it\'s quick as hell to open. Little Snitch didn\'t even see a single network request. Fully local, zero noise. Love that.',
  },
  {
    name: 'itsdanielsultan',
    role: 'Developer',
    source: 'Reddit · Early user',
    quote:
      'Tried it, and it\'s really handy for quick notes and tasks with way more space than a Raycast extension. Minimal design, stays out of the way, but still feels powerful.',
  },
  {
    name: 'Affectionate_One_700',
    role: 'Indie maker',
    source: 'Reddit · early demo watcher',
    quote:
      'Watched the 57-second demo and this is exactly the kind of app I\'ve always wanted. Been looking for a dead-simple quick note overlay for years.',
  },
  {
    name: 'corychu',
    role: 'Designer & developer',
    source: 'Reddit · Early user',
    quote:
      'Great prototype. The overlay is fast and reliable, and the macOS details—shortcuts, gestures, multi-display behavior—are clearly being thought through. With sync and iOS this could become a daily essential.',
  },
]

// Star component
const Stars = () => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-6xl mx-auto px-6">
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
          <p className="text-sm text-slate-500">
            Based on feedback from early Reddit testers and indie makers.
          </p>
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
                className="flex-shrink-0 w-[300px] md:w-[340px] p-6 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Stars */}
                <div className="mb-4">
                  <Stars />
                </div>

                {/* Quote */}
                <p className="text-slate-700 mb-5 leading-relaxed text-[15px] flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-0.5">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50/60 flex-shrink-0">
                    {testimonial.source}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
