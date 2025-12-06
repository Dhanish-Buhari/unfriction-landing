'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

interface DownloadDMGModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DownloadDMGModal({ isOpen, onClose }: DownloadDMGModalProps) {
  const prefersReducedMotion = useReducedMotion()

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

  const handleDownload = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_INITIATED, {
      source: 'download_modal',
      early_user: true,
    })
    
    try {
      const link = document.createElement('a')
      link.href = '/Unfriction.dmg'
      link.download = 'Unfriction.dmg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      onClose()
    } catch (error) {
      console.error('Download failed:', error)
      window.open('/Unfriction.dmg', '_blank')
    }
  }

  const handleReportIssues = () => {
    window.location.href = 'mailto:support@unfriction.app?subject=Report an Issue'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { scale: 0.95, opacity: 0 }}
            className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Badge icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-3 text-slate-900">
              Notarized DMG — No accounts
            </h2>
            <p className="text-center text-slate-600 mb-6">
              Secure download verified by Apple
            </p>

            {/* Installation steps */}
            <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
              <h3 className="font-semibold text-slate-900 mb-3">How to install:</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-teal-500 flex-shrink-0">1.</span>
                  <span>Download the DMG file</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-teal-500 flex-shrink-0">2.</span>
                  <span>Open it and drag Unfriction to Applications</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-teal-500 flex-shrink-0">3.</span>
                  <span>Launch from Applications folder</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                style={{ height: '48px' }}
              >
                Download Unfriction.dmg
              </button>
              <button
                onClick={handleReportIssues}
                className="w-full px-6 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Report issues
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


