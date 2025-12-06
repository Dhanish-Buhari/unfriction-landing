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
      'Tried it and it\'s really handy for quick notes and tasks. Way more space than a Raycast extension. Minimal design, stays out of the way but still feels powerful. The keyboard shortcuts are exactly what I need, and the fact that it stays on top without being annoying is perfect. Would be amazing if we have sync soon so I can use it on my Mac and iPad.',
    earlyUser: true,
  },
  {
    name: 'Aaron M.',
    role: 'Indie Maker',
    quote:
      'Watched the demo and this is exactly what I\'ve been looking for. Dead simple quick overlay, been searching for something like this for years. It opens instantly and doesn\'t get in my way. The tagging system is clean and the export feature means I can actually trust it with my notes.',
    earlyUser: true,
  },
  {
    name: 'Sam P.',
    role: 'Software Engineer',
    quote:
      'Super fast. OCR worked perfectly on first try. No issues. Finally a notes app that actually works. I drop in a screenshot and it just extracts the text. No cloud nonsense, everything stays local. This is how notes apps should be.',
    earlyUser: true,
  },
  {
    name: 'Maya T.',
    role: 'Writer',
    quote:
      'Finally an app that disappears when I don\'t need it. Perfect for staying focused. I can jot down ideas without breaking my flow, and the transparency settings mean it doesn\'t distract me. Been using it for drafts and random thoughts, and it just works.',
    earlyUser: true,
  },
  {
    name: 'Anika S.',
    role: 'Product Designer',
    quote:
      'The instant overlay saved my workflow so many times already. Totally worth it. I use it for capturing inspiration, quick notes during calls, and organizing my thoughts. The pinning feature is great for keeping important notes accessible. Really hoping sync comes soon so I can access these on all my devices.',
    earlyUser: true,
  },
  {
    name: 'Tom H.',
    role: 'Mac Power User',
    quote:
      'Notion is like a gym membership everyone has but nobody uses. This actually solves that problem. It\'s there when I need it, gone when I don\'t. The local storage means I control my data, and the speed is exactly what I needed. Using it alongside my other tools now.',
    earlyUser: true,
  },
  {
    name: 'Chris J.',
    role: 'Mac Veteran',
    quote:
      'Been using NVAlt for years. This might actually replace it. The overlay is faster, the interface is cleaner, and it does everything I need. The markdown export is a nice touch. Only thing missing is sync, but once that\'s here this becomes essential.',
    earlyUser: true,
  },
  {
    name: 'Riya K.',
    role: 'Student & Writer',
    quote:
      'Super quick, feels smooth, already part of my daily routine. I use it for lecture notes, random ideas, and keeping track of assignments. The search is fast and the tags help me organize everything. Really solid app.',
    earlyUser: true,
  },
  {
    name: 'Alex Chen',
    role: 'Developer',
    quote:
      'The overlay is fast and reliable. All the macOS details like shortcuts, gestures, multi display stuff is really well done. Using it for code snippets and quick documentation notes. Could become essential once sync comes so I can access notes on my phone too.',
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
