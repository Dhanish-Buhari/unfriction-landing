'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    trackEvent(ANALYTICS_EVENTS.EMAIL_SIGNUP, { location: 'footer', email })

    // TODO: Wire to your email service
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#demo' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    Company: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Support', href: 'mailto:support@unfriction.app' },
      { label: 'Contact', href: 'mailto:support@unfriction.app' },
    ],
  }

  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/dhanishbuhari',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
  ]

  const handleLinkClick = (href: string, label: string) => {
    // Track footer link click
    trackEvent(ANALYTICS_EVENTS.FOOTER_LINK_CLICKED, {
      link_name: label,
      link_href: href,
    })

    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const navHeight = 72
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }
  }

  const handleSupportClick = () => {
    trackEvent(ANALYTICS_EVENTS.SUPPORT_LINK_CLICKED, {
      location: 'footer',
    })
  }

  const handleSocialClick = (socialName: string, socialUrl: string) => {
    trackEvent(ANALYTICS_EVENTS.SOCIAL_LINK_CLICKED, {
      platform: socialName,
      url: socialUrl,
    })
  }

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Newsletter Section */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
              Stay updated on new features
            </h3>
            <p className="text-slate-600 text-sm md:text-base">
              Get notified when we launch new features and improvements
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image 
                src="/app-icon.png" 
                alt="Unfriction" 
                width={32} 
                height={32}
                className="w-8 h-8 transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-xl text-slate-900">Unfriction</span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">
              The fastest way to capture ideas before they vanish. 
              Instant overlay notes for macOS.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(social.name, social.href)}
                  className="p-2 text-slate-400 hover:text-teal-500 transition-colors rounded-lg hover:bg-slate-100"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault()
                        handleLinkClick(link.href, link.label)
                      } else {
                        handleLinkClick(link.href, link.label)
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-teal-500 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      if (link.href.startsWith('mailto:')) {
                        handleSupportClick()
                      } else {
                        handleLinkClick(link.href, link.label)
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-teal-500 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} Unfriction. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <span>Made with ❤️ for Mac users</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
