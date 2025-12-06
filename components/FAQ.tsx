'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is Unfriction?',
    answer: 'Unfriction is a lightning-fast note-taking app for macOS that launches in under 400ms. It\'s designed to capture your thoughts instantly with zero friction - no accounts, no cloud sync delays, just pure speed. It appears as a glassy overlay above any app and disappears when you\'re done.',
  },
  {
    question: 'What\'s new in v1.1?',
    answer: 'Version 1.1 brings smart tagging (#tag auto-extraction and filtering), export & backup functionality, a keyboard shortcuts cheatsheet (⌘/), beautiful dark mode by default, improved ESC key navigation, and bug fixes for light mode button visibility.',
  },
  {
    question: 'Is it really free?',
    answer: 'Unfriction is free for early users, but not free forever. We\'ll introduce a Pro plan later that adds features like iCloud sync, priority support, and team features. Early users will get a discount and keep unlimited OCR.',
  },
  {
    question: 'Which macOS versions are supported?',
    answer: 'Unfriction works on macOS Ventura (13.0) and macOS Sonoma (14.0) or later. We recommend keeping your macOS updated to the latest version for the best experience.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes. Unfriction is local-first by default. Your notes stay on your Mac. No cloud sync, no accounts, no tracking. You can export your notes anytime, and v1.1 now includes automatic backup to ~/Documents/Unfriction.',
  },
  {
    question: 'How do I install it?',
    answer: 'Download the DMG file from our website, open it, and drag Unfriction to your Applications folder. The app is notarized by Apple, so it\'s safe and secure. Launch it and start taking notes immediately.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <MotionDiv
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Frequently Asked Questions
          </h2>
        </MotionDiv>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            
            return (
              <MotionDiv
                key={index}
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { duration: 0.4, delay: index * 0.05 },
                })}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? false : { height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
