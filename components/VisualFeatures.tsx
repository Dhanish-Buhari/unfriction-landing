'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Zap, Image as ImageIcon, Tag, Download, Moon, Keyboard, Save, Lock, X, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface FeatureItemProps {
  feature: {
    title: string
    description: string
    icon: LucideIcon
    color: string
    bgColor: string
    gifPath: string
  }
  index: number
  prefersReducedMotion: boolean
}

function FeatureItem({ feature, index, prefersReducedMotion }: FeatureItemProps) {
  const [gifError, setGifError] = useState(false)
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div
  const IconComponent = feature.icon

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { 
          duration: 0.5, 
          delay: index * 0.1,
        },
      })}
      className="flex flex-col group"
    >
      {/* GIF Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 mb-4 shadow-sm hover:shadow-lg transition-all duration-300 group">
        {!gifError ? (
          <>
            <Image
              src={feature.gifPath}
              alt={`${feature.title} demo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
              onError={() => setGifError(true)}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 transition-all duration-300 pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center p-6">
              <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <IconComponent className={`w-8 h-8 ${feature.color}`} strokeWidth={2} />
              </div>
              <p className="text-sm text-slate-500 font-medium">GIF placeholder</p>
              <p className="text-xs text-slate-400 mt-1 break-all px-2">
                Add: {feature.gifPath.split('/').pop()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Feature Content */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <IconComponent className={`w-5 h-5 ${feature.color}`} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-slate-700 transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </MotionDiv>
  )
}

const visualFeatures = [
  {
    title: 'Instant Launch',
    description: 'Opens in under a second with your shortcut. No window switching. No mental friction.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    gifPath: '/media/features/instant-launch.gif',
  },
  {
    title: 'OCR from Screenshots',
    description: 'Paste or drag any image or screenshot — the text just appears. Feels like magic.',
    icon: ImageIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    gifPath: '/media/features/ocr-extraction.gif',
  },
  {
    title: 'Smart Tagging',
    description: 'Hashtags turn into tags automatically. Your notes organize themselves.',
    icon: Tag,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    gifPath: '/media/features/smart-tagging.gif',
  },
  {
    title: 'Export & Backup',
    description: 'Your notes are just markdown files you own. Export or sync anywhere, anytime.',
    icon: Download,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    gifPath: '/media/features/export-backup.gif', // ✅ Mapped: output.gif
  },
  {
    title: 'Dark Mode + Transparency',
    description: 'Feels native to macOS. Adjust opacity so it blends into your workflow instead of interrupting it.',
    icon: Moon,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    gifPath: '/media/features/dark-mode.gif',
  },
  {
    title: 'Full Keyboard Shortcuts',
    description: 'No mouse needed. Navigate, tag, pin, delete… all with muscle memory.',
    icon: Keyboard,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    gifPath: '/media/features/keyboard-shortcuts.gif',
  },
  {
    title: 'Auto-Save',
    description: 'Every keystroke is safe. Close instantly — nothing is ever lost.',
    icon: Save,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    gifPath: '/media/features/autosave.gif',
  },
  {
    title: 'Lock Notes',
    description: 'Pin important items so they stay visible and don\'t get edited or deleted by accident.',
    icon: Lock,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    gifPath: '/media/features/lock-notes.gif', // ✅ Mapped: Lock Feature.gif
  },
  {
    title: 'Click Outside to Close',
    description: 'Capture → exit → back to flow. No buttons, no thinking, just fast.',
    icon: X,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
    gifPath: '/media/features/click-outside-close.gif',
  },
]

export default function VisualFeatures() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900 tracking-tight">
            Features
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need for instant, frictionless note-taking
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {visualFeatures.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

