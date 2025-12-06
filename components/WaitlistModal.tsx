'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { X, Sparkles } from 'lucide-react'
import Toast from './Toast'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Validate email on blur
  const handleEmailBlur = () => {
    if (email && !isValidEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  // Validate email on change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    // Clear error when user starts typing again
    if (emailError && isValidEmail(value)) {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setEmailError('')

    // Validate email format
    if (!email) {
      setEmailError('Email is required')
      return
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setStatus('loading')
    trackEvent('waitlist_signup', { 
      email,
      plan: 'pro',
      source: 'pricing_section'
    })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
        setToast({ message: "You're on the waitlist 🚀", type: 'success' })
        
        // Close modal after showing toast
        setTimeout(() => {
          setStatus('idle')
          onClose()
        }, 2000)
      } else {
        setStatus('error')
        setToast({ 
          message: data.error || 'Something went wrong. Please try again.', 
          type: 'error' 
        })
      }
    } catch (error) {
      console.error('Waitlist submission error:', error)
      setStatus('error')
      setToast({ 
        message: 'Failed to join waitlist. Please try again.', 
        type: 'error' 
      })
    }
  }

  return (
    <>
      {/* Toast */}
      <Toast
        message={toast?.message || ''}
        type={toast?.type || 'success'}
        isVisible={!!toast}
        onClose={() => setToast(null)}
      />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            {prefersReducedMotion ? (
              <div
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            )}

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              {prefersReducedMotion ? (
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative"
                  onClick={(e) => e.stopPropagation()}
                >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re on the list! 🎉</h3>
                  <p className="text-slate-600">
                    We&apos;ll notify you as soon as Unfriction Pro launches.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Be the first to know
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Unfriction Pro is coming soon with powerful cloud sync, team features, and automation. 
                      Join the waitlist to be notified first when it launches!
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="waitlist-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder="your@email.com"
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white ${
                          emailError
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200'
                        }`}
                        disabled={status === 'loading'}
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? 'email-error' : undefined}
                      />
                      {emailError && (
                        <p id="email-error" className="mt-2 text-sm text-red-600">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading' || !email || !!emailError}
                      className="w-full px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Joining...
                        </span>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {status === 'success' ? (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re on the list! 🎉</h3>
                      <p className="text-slate-600">
                        We&apos;ll notify you as soon as Unfriction Pro launches.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          Be the first to know
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          Unfriction Pro is coming soon with powerful cloud sync, team features, and automation. 
                          Join the waitlist to be notified first when it launches!
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="waitlist-email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="waitlist-email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder="your@email.com"
                            required
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white ${
                              emailError
                                ? 'border-red-300 bg-red-50'
                                : 'border-slate-200'
                            }`}
                            disabled={status === 'loading'}
                            aria-invalid={!!emailError}
                            aria-describedby={emailError ? 'email-error' : undefined}
                          />
                          {emailError && (
                            <p id="email-error" className="mt-2 text-sm text-red-600">
                              {emailError}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={status === 'loading' || !email || !!emailError}
                          className="w-full px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          {status === 'loading' ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Joining...
                            </span>
                          ) : (
                            'Join Waitlist'
                          )}
                        </button>
                      </form>

                      <p className="text-xs text-slate-500 text-center mt-4">
                        No spam. Unsubscribe anytime.
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

