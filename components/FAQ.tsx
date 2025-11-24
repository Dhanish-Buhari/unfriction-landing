'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is Unfriction?',
    answer: 'Unfriction is a lightning-fast note-taking app for macOS that launches in under 400ms. It\'s designed to capture your thoughts instantly with zero friction—no accounts, no cloud sync delays, just pure speed.',
  },
  {
    question: 'Is it really free?',
    answer: 'Yes! Unfriction is completely free for early users. No credit card required, no payment, no hidden fees. Just download and start using it. We may introduce optional paid features in the future, but the core functionality will always remain free.',
  },
  {
    question: 'How do I install it?',
    answer: 'Simply download the DMG file from our website, open it, and drag Unfriction to your Applications folder. The app is notarized by Apple, so it\'s safe and secure. You can then launch it and start taking notes immediately.',
  },
  {
    question: 'What macOS versions are supported?',
    answer: 'Unfriction works on macOS Ventura (13.0) and macOS Sonoma (14.0) or later. We recommend keeping your macOS updated to the latest version for the best experience.',
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
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/30">
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
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Unfriction
          </p>
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
                  transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                    delay: index * 0.1,
                  },
                })}
                className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-xl"
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
                      exit={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
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

