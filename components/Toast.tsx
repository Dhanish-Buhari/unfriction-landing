'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000 
}: ToastProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20, scale: 0.95 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-[100] max-w-sm"
        >
          <div
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
              ${
                type === 'success'
                  ? 'bg-teal-50 border-2 border-teal-200 text-teal-900'
                  : 'bg-red-50 border-2 border-red-200 text-red-900'
              }
            `}
          >
            {type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
              onClick={onClose}
              className={`
                p-1 rounded-lg hover:bg-black/5 transition-colors
                ${type === 'success' ? 'text-teal-600' : 'text-red-600'}
              `}
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

