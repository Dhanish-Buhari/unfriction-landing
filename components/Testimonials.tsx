'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Star } from 'lucide-react'

type Testimonial = {
  name: string
  role: string
  quote: string
  earlyUser?: boolean
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Daniel S.',
    role: 'Developer',
    quote:
      'Tried it and it\'s already become muscle memory. Minimal UI, shortcut opens instantly, and it never gets in the way. It\'s faster and smoother than any quick note workflow I\'ve used.',
    earlyUser: true,
  },
  {
    name: 'Aaron M.',
    role: 'Indie Maker',
    quote:
      'Started using it while building a side project and didn\'t expect it to stick. The speed is the real magic. I write something and I\'m back to work before my brain drifts.',
    earlyUser: true,
  },
  {
    name: 'Sam P.',
    role: 'Software Engineer',
    quote:
      'OCR worked perfectly on the first try. Dropped a screenshot in and boom—text. No accounts, no cloud, no nonsense. Finally a notes app that respects my time.',
    earlyUser: true,
  },
  {
    name: 'Maya T.',
    role: 'Writer',
    quote:
      'This is the first notes app that doesn\'t break my writing flow. I hit the shortcut, type, close it, done. The semi-transparent overlay is such a small thing but it genuinely keeps me focused.',
    earlyUser: true,
  },
  {
    name: 'Anika S.',
    role: 'Product Designer',
    quote:
      'The overlay approach is genius. I use it constantly during calls and brainstorming sessions. Pinning and tagging makes it easy to bring ideas back later without clutter.',
    earlyUser: true,
  },
  {
    name: 'Tom H.',
    role: 'Mac Power User',
    quote:
      'Thought it would be another productivity toy… nope. It\'s surprisingly sticky. The speed, simplicity, and local-first approach make it feel like part of macOS.',
    earlyUser: true,
  },
  {
    name: 'Chris J.',
    role: 'Mac Veteran',
    quote:
      'I\'ve been using NVAlt forever and this has the same spirit: fast, invisible, and efficient. Exporting to markdown sealed it for me. If sync lands well, this becomes a daily staple.',
    earlyUser: true,
  },
  {
    name: 'Riya K.',
    role: 'Student & Writer',
    quote:
      'Already using it for assignments and random ideas. Search is fast, tagging helps, and the shortcut feels natural. Way better than jumping between Notes or Notion tabs.',
    earlyUser: true,
  },
  {
    name: 'Alex Chen',
    role: 'Developer',
    quote:
      'Really impressed with the attention to macOS details—shortcuts, gestures, multi-display behavior. It just feels native. Using it for snippets and quick docs constantly now.',
    earlyUser: true,
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
            Based on feedback from early users and indie makers.
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
                  {testimonial.earlyUser && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-semibold rounded-full flex-shrink-0">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                      Early User
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
