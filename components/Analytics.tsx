'use client'

import Script from 'next/script'

export default function Analytics() {
  // Support both Plausible and Fathom via environment variables
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const fathomSiteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID

  return (
    <>
      {/* Plausible Analytics */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* Fathom Analytics */}
      {fathomSiteId && (
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site={fathomSiteId}
          strategy="afterInteractive"
          defer
        />
      )}
    </>
  )
}





