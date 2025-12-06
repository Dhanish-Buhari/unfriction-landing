'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Tag, Download, Keyboard, Moon, Navigation, Bug } from 'lucide-react'

const updates = [
  {
    category: 'New Features',
    items: [
      {
        icon: Tag,
        title: 'Smart Tagging System',
        description: 'Auto-extract #tags from your notes and filter by tags instantly',
        color: 'text-pink-500',
        bgColor: 'bg-pink-50',
      },
      {
        icon: Download,
        title: 'Export & Backup',
        description: 'Export all notes with automatic backup to ~/Documents/Unfriction',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      },
      {
        icon: Keyboard,
        title: 'Shortcuts Cheatsheet',
        description: 'Press ⌘/ anywhere to see all available keyboard shortcuts',
        color: 'text-teal-500',
        bgColor: 'bg-teal-50',
      },
    ],
  },
  {
    category: 'Enhanced',
    items: [
      {
        icon: Moon,
        title: 'Beautiful Dark Mode',
        description: 'New default dark mode with 0% glass opacity for maximum visibility',
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50',
      },
      {
        icon: Navigation,
        title: 'Smarter Navigation',
        description: 'ESC key now intelligently returns you to the main notes view',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
      },
      {
        icon: Bug,
        title: 'Bug Fixes',
        description: 'Fixed light mode button visibility and appearance mode switching',
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
      },
    ],
  },
]

export default function WhatsNew() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            Version 1.1
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            What&apos;s New in v1.1
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful new features and improvements to make your note-taking even faster
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {updates.map((section, sectionIndex) => (
            <div key={section.category}>
              <motion.h3
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: sectionIndex * 0.1 },
                })}
                className="text-xl font-bold text-slate-900 mb-6"
              >
                {section.category}
              </motion.h3>
              <div className="space-y-4">
                {section.items.map((item, index) => {
                  const MotionDiv = prefersReducedMotion ? 'div' : motion.div
                  const IconComponent = item.icon
                  
                  return (
                    <MotionDiv
                      key={item.title}
                      {...(!prefersReducedMotion && {
                        initial: { opacity: 0, x: -20 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true, margin: '-50px' },
                        transition: { 
                          duration: 0.4, 
                          delay: sectionIndex * 0.1 + index * 0.08,
                        },
                      })}
                    >
                      <div className="flex gap-4 p-5 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 transition-all duration-300">
                        <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <IconComponent className={`w-6 h-6 ${item.color}`} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </MotionDiv>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

