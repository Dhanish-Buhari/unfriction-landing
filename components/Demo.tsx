'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import Image from 'next/image'

const screenshots = [
  { id: 'ss-1', caption: 'Instant overlay' },
  { id: 'ss-2', caption: 'Auto-saves' },
  { id: 'ss-3', caption: 'Lock-aware behaviour' },
]

export default function Demo() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [videoError, setVideoError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const openLightbox = () => {
    setLightboxOpen(true)
    trackEvent(ANALYTICS_EVENTS.CTA_DEMO_CLICK)
  }

  const openImageModal = (imageId: string) => {
    setSelectedImage(imageId)
  }

  return (
    <section id="demo" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See it in action</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A glassy, distraction-free writing surface that appears on demand.
          </p>
        </div>

        {/* Main Demo Video */}
        <div
          className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.01] mb-12 border border-slate-200/50 overflow-hidden relative group max-w-4xl mx-auto"
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
        >
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src="/media/demo-quick.mp4" type="video/mp4" />
            </video>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent"></div>
              <div className="text-center relative z-10 p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                  <svg
                    className="w-10 h-10 text-teal-500 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-slate-500 font-medium mb-1">Click to play demo</p>
                <p className="text-slate-400 text-sm">Add demo-quick.mp4 to /public/media/</p>
              </div>
            </>
          )}
        </div>

        {/* Screenshot Thumbnails */}
        <div className="grid md:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              {...(!prefersReducedMotion && {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1, duration: 0.4 },
              })}
              onClick={() => openImageModal(screenshot.id)}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openImageModal(screenshot.id)}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-slate-200/50 group-hover:scale-[1.02]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-xs font-medium">{screenshot.caption}</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-3 text-sm text-slate-600 font-medium">{screenshot.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox for Demo Video */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full"
                >
                  <source src="/media/demo-quick.mp4" type="video/mp4" />
                </video>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="mt-4 mx-auto block text-white/80 hover:text-white text-sm"
              >
                Close (ESC)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl p-2">
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Screenshot: {selectedImage}.png</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 mx-auto block text-white/80 hover:text-white text-sm"
              >
                Close (ESC)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

