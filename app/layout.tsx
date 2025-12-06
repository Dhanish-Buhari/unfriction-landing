import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Unfriction - Instant overlay notes for macOS | Opens in <400ms',
  description: 'Capture thoughts instantly with Unfriction - launches in <400ms, does OCR from screenshots, notarized DMG. Free for early users.',
  metadataBase: new URL('https://unfriction.app'),
  openGraph: {
    title: 'Unfriction - Instant overlay notes for macOS | Opens in <400ms',
    description: 'Capture thoughts instantly with Unfriction - launches in <400ms, does OCR from screenshots, notarized DMG. Free for early users.',
    images: ['/assets/og-placeholder.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unfriction - Instant overlay notes for macOS | Opens in <400ms',
    description: 'Capture thoughts instantly with Unfriction - launches in <400ms, does OCR from screenshots, notarized DMG. Free for early users.',
    images: ['/assets/og-placeholder.png'],
  },
  icons: {
    icon: '/favicon-32.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Unfriction',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'macOS',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              description: 'Instant overlay notes for macOS. Launches in <400ms. Capture thoughts with one shortcut. Instant OCR from screenshots.',
              image: 'https://unfriction.app/assets/og-placeholder.png',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '1',
              },
            }),
          }}
        />
      </head>
      <body>
        <Analytics />
        <VercelAnalytics />
        {children}
      </body>
    </html>
  )
}


