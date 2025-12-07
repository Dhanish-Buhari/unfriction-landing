'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Sparkles } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  
  useEffect(() => {
    // Get email from URL params if available
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-500/10 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-teal-500" strokeWidth={2} />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Welcome to Unfriction Lifetime! 🎉
        </h1>

        {/* Message */}
        <p className="text-lg text-slate-600 mb-2">
          Your purchase was successful. You now have <strong>lifetime access</strong> to Unfriction.
        </p>

        {email && (
          <p className="text-sm text-slate-500 mb-8">
            Confirmation sent to <strong>{email}</strong>
          </p>
        )}

        {/* Features Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full mb-8">
          <Sparkles className="w-4 h-4" />
          <span>EARLY ADOPTER - GRANDFATHERED FOREVER</span>
        </div>

        {/* What You Get */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-slate-900 mb-4">What you have access to:</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>Unlimited notes - never run out of space</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>Unlimited OCR - extract text from unlimited screenshots</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>Export & backup all your notes locally</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>All current & future local features - grandfathered forever</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>Early adopter badge</span>
            </li>
          </ul>
        </div>

        {/* Download Button */}
        <div className="space-y-3">
          <a
            href="/Unfriction.dmg"
            download="Unfriction.dmg"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download Unfriction for macOS
          </a>
          
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <p className="text-xs text-slate-500 mt-8">
          Need help? Contact us at{' '}
          <a href="mailto:support@unfriction.app" className="text-teal-500 hover:text-teal-600">
            support@unfriction.app
          </a>
        </p>
      </div>
    </div>
  )
}

