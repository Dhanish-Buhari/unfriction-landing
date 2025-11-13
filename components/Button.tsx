'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  href?: string
  children: ReactNode
  onClick?: () => void
}

export default function Button({
  variant = 'primary',
  href,
  children,
  onClick,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] shadow-sm'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-300 shadow-teal-500/20 hover:shadow-teal-500/30 hover:shadow-lg',
    secondary: 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-300 bg-white',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  // Render as anchor link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  // Render as animated button
  return (
    <motion.button
      type="button"
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={props.disabled}
      aria-label={props['aria-label']}
    >
      {children}
    </motion.button>
  )
}

