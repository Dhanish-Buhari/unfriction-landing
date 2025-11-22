'use client'

import { useEffect } from 'react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function AnalyticsTracker() {
  useEffect(() => {
    // Track scroll depth (conversion funnel drop-off)
    const scrollThresholds = [25, 50, 75, 100]
    const trackedDepths = new Set<number>()

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      )

      scrollThresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold)
          trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, {
            percentage: threshold,
          })
        }
      })
    }

    // Track section views (engagement)
    const sections = ['hero', 'features', 'demo', 'pricing']
    const observedSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId && sections.includes(sectionId) && !observedSections.has(sectionId)) {
              observedSections.add(sectionId)
              trackEvent(ANALYTICS_EVENTS.SECTION_VIEW, {
                section: sectionId,
              })
            }
          }
        })
      },
      { threshold: 0.3 } // Trigger when 30% visible
    )

    // Observe sections
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Track time on page (engagement)
    const timeThresholds = [30, 60, 120, 300] // 30s, 1m, 2m, 5m
    const trackedTimes = new Set<number>()
    const startTime = Date.now()

    const timeTracker = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
      timeThresholds.forEach((threshold) => {
        if (timeOnPage >= threshold && !trackedTimes.has(threshold)) {
          trackedTimes.add(threshold)
          trackEvent(ANALYTICS_EVENTS.TIME_ON_PAGE, {
            seconds: threshold,
          })
        }
      })
    }, 5000) // Check every 5 seconds

    // Track exit intent (churn indicator)
    let exitIntentTracked = false
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTracked) {
        exitIntentTracked = true
        trackEvent(ANALYTICS_EVENTS.EXIT_INTENT)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      clearInterval(timeTracker)
    }
  }, [])

  return null
}

