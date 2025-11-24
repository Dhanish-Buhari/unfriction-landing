import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Unfriction — Instant notes. Zero friction.',
  description: 'A macOS overlay for instant, distraction-free notes. Launch with one shortcut, type, and it\'s saved. No accounts. No friction.',
  metadataBase: new URL('https://unfriction.app'),
  openGraph: {
    title: 'Unfriction — Instant notes. Zero friction.',
    description: 'A macOS overlay for instant, distraction-free notes. Launch with one shortcut, type, and it\'s saved. No accounts. No friction.',
    images: ['/assets/og-placeholder.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unfriction — Instant notes. Zero friction.',
    description: 'A macOS overlay for instant, distraction-free notes. Launch with one shortcut, type, and it\'s saved. No accounts. No friction.',
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
                priceRange: 'PWYW',
              },
              description: 'Launches in <400ms. Capture thoughts with one shortcut.',
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


