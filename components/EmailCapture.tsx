'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    trackEvent('email_signup', { email })

    // TODO: Wire to Netlify function or Gumroad
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-semibold mb-3">Stay updated</h3>
        <p className="text-slate-600 mb-6">
          Get notified about updates and new features. No spam.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-sm text-teal-600">
            ✓ Thanks! We&apos;ll keep you posted.
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  )
}

