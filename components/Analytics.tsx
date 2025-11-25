'use client'

import Script from 'next/script'

const CUSTOM_PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_SRC ||
  'https://plausible.io/js/pa-43myj-SNNx4hfvsNZWNWd.js'

export default function Analytics() {
  const fathomSiteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID

  return (
    <>
      {/* Plausible Analytics */}
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





