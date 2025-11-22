// Analytics helper for privacy-friendly tracking
// Supports Plausible and Fathom Analytics

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  // Check if window.plausible exists (Plausible Analytics)
  if ((window as any).plausible) {
    (window as any).plausible(eventName, { props: properties })
  }
  
  // Check if window.fathom exists (Fathom Analytics)
  if ((window as any).fathom) {
    (window as any).fathom.trackGoal(eventName, properties?.value || 0)
  }

  // Fallback to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties)
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
  
  // CTA events
  CTA_DEMO_CLICK: 'cta_demo_click',
  CTA_DOWNLOAD_CLICK: 'cta_download_click',
  DOWNLOAD_INITIATED: 'download_initiated',
  
  // Conversion events
  EMAIL_SIGNUP: 'email_signup',
  
  // Exit events
  EXIT_INTENT: 'exit_intent', // User tried to leave without converting
} as const




