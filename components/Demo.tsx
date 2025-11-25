'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import Image from 'next/image'

const screenshots = [
  { id: 'overlay', caption: 'Instant overlay', src: '/media/layout.png' },
  { id: 'autosave', caption: 'Auto-saves', src: '/media/save.png' },
  { id: 'lock-aware', caption: 'Lock-aware behaviour', src: '/media/lock.png' },
]

export default function Demo() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [videoError, setVideoError] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const backgroundVideoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const selectedScreenshot = screenshots.find((item) => item.id === selectedImage)

  const openLightbox = () => {
    // Ensure background video is paused
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause()
    }
    setLightboxOpen(true)
    trackEvent(ANALYTICS_EVENTS.CTA_DEMO_CLICK)
  }

  const closeLightbox = () => {
    // Pause modal video when closing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
    setLightboxOpen(false)
  }

  const openImageModal = (imageId: string) => {
    setSelectedImage(imageId)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Ensure background video never autoplays
  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause()
      // Prevent any autoplay attempts
      backgroundVideoRef.current.autoplay = false
    }
  }, [])

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox()
        }
        if (selectedImage) {
          closeImageModal()
        }
      }
    }

    // Also listen to the global closeLightbox event
    const handleCloseEvent = () => {
      if (lightboxOpen) {
        closeLightbox()
      }
      if (selectedImage) {
        closeImageModal()
      }
    }

    window.addEventListener('keydown', handleEsc)
    window.addEventListener('closeLightbox', handleCloseEvent)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('closeLightbox', handleCloseEvent)
    }
  }, [lightboxOpen, selectedImage])

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
              ref={backgroundVideoRef}
              loop
              playsInline
              muted
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
              onError={() => setVideoError(true)}
              onPlay={(e) => {
                // Prevent background video from playing - only allow in modal
                if (!lightboxOpen) {
                  e.currentTarget.pause()
                }
              }}
            >
              <source src="/media/Unfriction_Demo_V1_1.mov" type="video/quicktime" />
              <source src="/media/Unfriction_Demo_V1_1.mov" type="video/mp4" />
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
                <p className="text-slate-400 text-sm">Video loading...</p>
              </div>
            </>
          )}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition-opacity duration-200 group-hover:opacity-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-black/40 blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="9.5 7 17 12 9.5 17" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className="uppercase tracking-[0.4em] text-xs text-white/80">
              Play Demo
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
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
              <div className="relative aspect-video bg-slate-900 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-200/50 group-hover:scale-[1.02]">
                <Image
                  src={screenshot.src}
                  alt={screenshot.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-white text-sm font-medium">{screenshot.caption}</p>
                </div>
              </div>
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
            onClick={closeLightbox}
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
                  ref={modalVideoRef}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full"
                >
                  <source src="/media/Unfriction_Demo_V1_1.mov" type="video/quicktime" />
                  <source src="/media/Unfriction_Demo_V1_1.mov" type="video/mp4" />
                </video>
              </div>
              <button
                onClick={closeLightbox}
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
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl p-2">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={selectedScreenshot.src}
                    alt={selectedScreenshot.caption}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <button
                onClick={closeImageModal}
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






