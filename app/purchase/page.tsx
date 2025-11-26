'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function PurchasePage() {
  useEffect(() => {
    // Track purchase page visit
    // TODO: Add analytics tracking
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-500/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-slate-900">
          Payment Integration Pending
        </h1>
        <p className="text-slate-600 mb-8">
          The payment flow is currently being set up. This page will be connected to your payment processor (Stripe, Gumroad, etc.) soon.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-slate-500 mb-4">
            <strong>To implement:</strong>
          </p>
          <ul className="text-sm text-left text-slate-600 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-teal-500">•</span>
              <span>Connect Stripe/Paddle/Gumroad checkout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500">•</span>
              <span>Handle subscription creation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500">•</span>
              <span>Implement Founders Club grandfathering logic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500">•</span>
              <span>Send confirmation emails</span>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors"
          style={{ height: '48px', lineHeight: '48px' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

