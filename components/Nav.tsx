'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo-unfriction.svg" 
            alt="Unfriction" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg">Unfriction</span>
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <a 
            href="mailto:support@unfriction.app"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Support
          </a>
          <a
            href="https://www.producthunt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 hover:text-teal-500 transition-colors"
          >
            Product Hunt →
          </a>
        </div>
      </div>
    </nav>
  )
}


