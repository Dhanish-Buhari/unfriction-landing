// Analytics helper for privacy-friendly tracking
// Supports Plausible and Fathom Analytics

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  try {
    // Plausible Analytics (primary) - production ready
    if ((window as any).plausible) {
      const plausibleProps = properties ? { props: properties } : {}
      ;(window as any).plausible(eventName, plausibleProps)
    }
    
    // Fathom Analytics (fallback)
    if ((window as any).fathom) {
      (window as any).fathom.trackGoal(eventName, properties?.value || 0)
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, properties)
    }
  } catch (error) {
    // Fail silently in production, log in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics error:', error)
    }
  }
}

// Track page view with automatic page tracking
export const trackPageView = (url?: string) => {
  if (typeof window === 'undefined') return

  // Plausible automatically tracks page views
  // Fathom requires manual tracking
  if ((window as any).fathom && (window as any).fathom.trackPageview) {
    (window as any).fathom.trackPageview(url)
  }
}

// Predefined event names
export const ANALYTICS_EVENTS = {
  // Page events
  LANDING_LOADED: 'landing_loaded',
  PAGE_VIEW: 'page_view',
  
  // Engagement events
  SECTION_VIEW: 'section_view', // Hero, Features, Demo, Pricing, etc.
  SCROLL_DEPTH: 'scroll_depth', // 25%, 50%, 75%, 100%
  TIME_ON_PAGE: 'time_on_page', // 30s, 60s, 120s, etc.
  
  // Demo Video events
  DEMO_BUTTON_CLICKED: 'demo_button_clicked', // When user clicks to open demo modal
  DEMO_VIDEO_STARTED: 'demo_video_started', // When video starts playing
  DEMO_VIDEO_25_PERCENT: 'demo_video_25_percent', // 25% watched
  DEMO_VIDEO_50_PERCENT: 'demo_video_50_percent', // 50% watched
  DEMO_VIDEO_75_PERCENT: 'demo_video_75_percent', // 75% watched
  DEMO_VIDEO_COMPLETED: 'demo_video_completed', // 100% watched
  DEMO_VIDEO_PAUSED: 'demo_video_paused', // Video paused
  DEMO_MODAL_CLOSED: 'demo_modal_closed', // Modal closed without completing
  
  // Legacy demo event (keep for backward compatibility)
  CTA_DEMO_CLICK: 'demo_played',
  
  // CTA events
  CTA_DOWNLOAD_CLICK: 'download_clicked',
  DOWNLOAD_INITIATED: 'download_initiated',
  
  // Download button specific events (for Plausible)
  DOWNLOAD_HERO: 'Download Click - Hero',
  DOWNLOAD_PRICING: 'Download Click - Pricing',
  DOWNLOAD_MOBILE: 'Download Click - Mobile CTA',
  DOWNLOAD_FINAL_CTA: 'Download Click - Final CTA',
  DOWNLOAD_FLOATING: 'Download Click - Floating CTA',
  
  // Click tracking events
  NAV_LINK_CLICKED: 'nav_link_clicked', // Navigation links
  FOOTER_LINK_CLICKED: 'footer_link_clicked', // Footer links
  SUPPORT_LINK_CLICKED: 'support_link_clicked', // Support email clicks
  SOCIAL_LINK_CLICKED: 'social_link_clicked', // Social media links
  
  // Conversion events
  PRICING_ENGAGED: 'pricing_engaged',
  TESTIMONIAL_CLICKED: 'testimonial_clicked',
  JOIN_FOUNDERS_CLICKED: 'join_founders_clicked',
  
  // Conversion events
  EMAIL_SIGNUP: 'email_signup',
  
  // Exit events
  EXIT_INTENT: 'exit_intent', // User tried to leave without converting
} as const




