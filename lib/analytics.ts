// Analytics helper for privacy-friendly tracking
// Replace with Plausible or Fathom integration

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Check if window.plausible exists (Plausible Analytics)
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: properties })
  }
  
  // Check if window.fathom exists (Fathom Analytics)
  if (typeof window !== 'undefined' && (window as any).fathom) {
    (window as any).fathom.trackGoal(eventName, properties?.value || 0)
  }

  // Fallback to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties)
  }
}

// Predefined event names
export const ANALYTICS_EVENTS = {
  LANDING_LOADED: 'landing_loaded',
  CTA_DEMO_CLICK: 'cta_demo_click',
  CTA_DOWNLOAD_CLICK: 'cta_download_click',
  DOWNLOAD_INITIATED: 'download_initiated',
  EMAIL_SIGNUP: 'email_signup',
} as const



