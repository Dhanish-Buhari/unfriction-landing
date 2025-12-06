'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when clicking outside
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    // Track navigation link click
    trackEvent(ANALYTICS_EVENTS.NAV_LINK_CLICKED, {
      link_name: label,
      link_href: href,
    })

    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const navHeight = 72 // Approximate nav height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleSupportClick = () => {
    trackEvent(ANALYTICS_EVENTS.SUPPORT_LINK_CLICKED, {
      location: 'nav',
    })
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-slate-200/80' : 'bg-white/90 backdrop-blur-lg border-b border-slate-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image 
                src="/app-icon.png" 
                alt="Unfriction" 
                width={32} 
                height={32}
                className="w-8 h-8 transition-transform group-hover:scale-105"
              />
              <span className="font-semibold text-xl text-slate-900">Unfriction</span>
              <span className="text-xs text-slate-400 font-medium">v1.1</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className="text-sm font-medium text-slate-700 hover:text-teal-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="mailto:support@unfriction.app"
                onClick={handleSupportClick}
                className="text-sm font-medium text-slate-700 hover:text-teal-500 transition-colors"
              >
                Support
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-teal-500 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-[72px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className="block py-3 text-base font-medium text-slate-700 hover:text-teal-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="mailto:support@unfriction.app"
                className="block py-3 text-base font-medium text-slate-700 hover:text-teal-500 transition-colors"
                onClick={handleSupportClick}
              >
                Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


