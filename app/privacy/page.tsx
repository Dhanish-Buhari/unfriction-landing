import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Unfriction',
  description: 'Privacy policy for Unfriction macOS app',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center text-teal-500 hover:text-teal-600 mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-semibold mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
            <p className="text-slate-600 mb-4">
              Unfriction is designed with privacy as a core principle. We collect <strong>zero personal data</strong>.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>No accounts required</li>
              <li>No user tracking</li>
              <li>No analytics on your notes</li>
              <li>No cloud sync (all data stays local)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Local Storage</h2>
            <p className="text-slate-600">
              All notes are stored locally on your Mac. Unfriction does not transmit, upload, 
              or share your notes with any third party or our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Website Analytics</h2>
            <p className="text-slate-600">
              This website may use privacy-friendly analytics (Plausible or Fathom) to understand 
              basic traffic patterns. These tools do not use cookies and do not collect personal 
              information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Processing</h2>
            <p className="text-slate-600">
              Payments are processed securely through Polar.sh. We do not store 
              your credit card information. Please refer to Polar.sh&apos;s privacy policy:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>
                <a 
                  href="https://polar.sh/legal/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-600"
                >
                  Polar.sh Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-slate-600">
              We may update this privacy policy from time to time. Changes will be posted on 
              this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-slate-600">
              If you have any questions about this privacy policy, please contact us at{' '}
              <a 
                href="mailto:support@unfriction.app" 
                className="text-teal-500 hover:text-teal-600"
              >
                support@unfriction.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}












