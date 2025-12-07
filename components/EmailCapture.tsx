'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { supabase } from '@/lib/supabase'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleLogin(email: string) {
    setLoginStatus('loading')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      console.error(error)
      setLoginStatus('error')
      setTimeout(() => setLoginStatus('idle'), 3000)
    } else {
      alert('Login link sent!')
      setLoginStatus('success')
      setTimeout(() => setLoginStatus('idle'), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    trackEvent('email_signup', { email })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
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
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

        {/* Login Test Button */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-3">Test Supabase Auth:</p>
          <button
            onClick={() => email && handleLogin(email)}
            disabled={loginStatus === 'loading' || !email}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginStatus === 'loading' ? 'Sending...' : 'Send Magic Link'}
          </button>
          {loginStatus === 'success' && (
            <p className="mt-2 text-xs text-teal-600">✓ Check your email!</p>
          )}
          {loginStatus === 'error' && (
            <p className="mt-2 text-xs text-red-600">✗ Failed. Check console.</p>
          )}
        </div>
      </div>
    </section>
  )
}

