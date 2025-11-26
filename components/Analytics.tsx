'use client'

import Script from 'next/script'

// Production: Update this with your Plausible script URL
// Get it from: https://plausible.io/settings/integrations/script
// Option 1: Use custom script (recommended for privacy)
// const PLAUSIBLE_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_SRC
// Option 2: Use standard script with domain
// const PLAUSIBLE_SRC = `https://plausible.io/js/script.js`
// And add: data-domain="yourdomain.com" to Script tag

const CUSTOM_PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_SRC ||
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ||
  'https://plausible.io/js/pa-43myj-SNNx4hfvsNZWNWd.js'

export default function Analytics() {
  const fathomSiteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const useStandardScript = process.env.NEXT_PUBLIC_PLAUSIBLE_USE_STANDARD === 'true'

  return (
    <>
      {/* Plausible Analytics */}
      {useStandardScript && plausibleDomain ? (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
          defer
        />
      ) : (
        <>
          <Script src={CUSTOM_PLAUSIBLE_SRC} strategy="afterInteractive" async />
          <Script
            id="plausible-inline-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.plausible = window.plausible || function () {
                  (plausible.q = plausible.q || []).push(arguments)
                }
                plausible.init = plausible.init || function (config) {
                  plausible.o = config || {}
                }
                plausible.init()
              `,
            }}
          />
        </>
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





