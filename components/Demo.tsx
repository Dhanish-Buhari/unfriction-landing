'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoPoster, setVideoPoster] = useState<string | null>(null)
  const [hasTrackedStart, setHasTrackedStart] = useState(false)
  const [progressTracked, setProgressTracked] = useState({
    25: false,
    50: false,
    75: false,
    100: false,
  })
  const prefersReducedMotion = useReducedMotion()
  const posterVideoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  // Capture first frame of video as thumbnail
  useEffect(() => {
    const video = posterVideoRef.current
    if (!video) return

    const captureFrame = () => {
      try {
        if (video.videoWidth === 0 || video.videoHeight === 0) return
        
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
          setVideoPoster(dataUrl)
        }
      } catch (error) {
        console.warn('Could not capture video frame:', error)
      }
    }

    const handleLoadedData = () => {
      if (video.readyState >= 2 && video.videoWidth > 0) {
        video.currentTime = 0.1
      }
    }

    const handleSeeked = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        captureFrame()
      }
    }

    const handleLoadedMetadata = () => {
      video.currentTime = 0.1
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('seeked', handleSeeked)

    if (video.readyState >= 1) {
      video.currentTime = 0.1
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
    trackEvent(ANALYTICS_EVENTS.DEMO_BUTTON_CLICKED, {
      location: 'demo_section',
    })
    // Also track legacy event for backward compatibility
    trackEvent(ANALYTICS_EVENTS.CTA_DEMO_CLICK)
  }

  const closeModal = () => {
    const video = modalVideoRef.current
    if (video) {
      const currentTime = video.currentTime
      const duration = video.duration
      const percentWatched = duration > 0 ? (currentTime / duration) * 100 : 0
      
      // Track modal close with watch percentage
      trackEvent(ANALYTICS_EVENTS.DEMO_MODAL_CLOSED, {
        percent_watched: Math.round(percentWatched),
        watch_time: Math.round(currentTime),
      })
      
      video.pause()
    }
    setIsModalOpen(false)
    // Reset tracking states when modal closes
    setHasTrackedStart(false)
    setProgressTracked({ 25: false, 50: false, 75: false, 100: false })
  }

  // Track video progress and events
  useEffect(() => {
    const video = modalVideoRef.current
    if (!video || !isModalOpen) return

    const handlePlay = () => {
      if (!hasTrackedStart) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_STARTED, {
          video_duration: Math.round(video.duration),
        })
        setHasTrackedStart(true)
      }
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return
      
      const currentTime = video.currentTime
      const duration = video.duration
      const percent = (currentTime / duration) * 100

      // Track 25% milestone
      if (percent >= 25 && !progressTracked[25]) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_25_PERCENT, {
          watch_time: Math.round(currentTime),
        })
        setProgressTracked((prev) => ({ ...prev, 25: true }))
      }

      // Track 50% milestone
      if (percent >= 50 && !progressTracked[50]) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_50_PERCENT, {
          watch_time: Math.round(currentTime),
        })
        setProgressTracked((prev) => ({ ...prev, 50: true }))
      }

      // Track 75% milestone
      if (percent >= 75 && !progressTracked[75]) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_75_PERCENT, {
          watch_time: Math.round(currentTime),
        })
        setProgressTracked((prev) => ({ ...prev, 75: true }))
      }

      // Track 100% completion
      if (percent >= 100 && !progressTracked[100]) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_COMPLETED, {
          total_duration: Math.round(duration),
        })
        setProgressTracked((prev) => ({ ...prev, 100: true }))
      }
    }

    const handlePause = () => {
      if (hasTrackedStart) {
        trackEvent(ANALYTICS_EVENTS.DEMO_VIDEO_PAUSED, {
          pause_time: Math.round(video.currentTime),
          percent_watched: video.duration > 0 
            ? Math.round((video.currentTime / video.duration) * 100)
            : 0,
        })
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('pause', handlePause)
    }
  }, [isModalOpen, hasTrackedStart, progressTracked])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isModalOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <section id="demo" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
            })}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
              See Unfriction in action
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              A 57-second walkthrough of instant launch and OCR
            </p>
          </motion.div>

          {/* Hidden video to capture first frame */}
          <video
            ref={posterVideoRef}
            className="hidden"
            preload="metadata"
            muted
            playsInline
          >
            <source src="/media/demo_1280.vp9.webm" type="video/webm" />
            <source src="/media/demo_1280_crf23.mp4" type="video/mp4" />
          </video>

          {/* Thumbnail with play button */}
          <motion.div
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.1 },
            })}
            className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 cursor-pointer group"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
            aria-label="Play demo video"
          >
            <div className="aspect-video relative w-full bg-slate-900">
              {/* First frame thumbnail */}
              {videoPoster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={videoPoster}
                  alt="Demo video thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <p className="text-slate-400 text-sm">Loading video...</p>
                </div>
              )}

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-slate-900 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-6xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-slate-900 shadow-2xl">
                <div className="aspect-video relative">
                  <video
                    ref={modalVideoRef}
                    autoPlay
                    controls
                    className="w-full h-full"
                    preload="auto"
                    poster="/media/poster.jpg"
                  >
                    <source src="/media/demo_1280.vp9.webm" type="video/webm" />
                    <source src="/media/demo_1280_crf23.mp4" type="video/mp4" />
                    <source src="/media/preview_low.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 mx-auto block text-white/80 hover:text-white text-sm transition-colors"
                aria-label="Close modal"
              >
                Close (ESC)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
