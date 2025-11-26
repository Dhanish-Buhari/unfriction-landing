'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Zap, Layers, Image as ImageIcon, Lock, HardDrive, Minus } from 'lucide-react'

const features = [
  {
    title: 'Instant launch',
    description: 'Opens in under 400ms with a global shortcut.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Overlay notes',
    description: 'Sits on top of whatever you\'re doing.',
    icon: Layers,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Screenshot OCR',
    description: 'Extract text from screenshots instantly.',
    icon: ImageIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Lock-aware',
    description: 'Pauses on lock, restores after unlock.',
    icon: Lock,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Local-first',
    description: 'No cloud, no account by default.',
    icon: HardDrive,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Zero clutter',
    description: 'No formatting toolbar, just a blank surface.',
    icon: Minus,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
  },
]

export default function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          })}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            A writing surface that stays out of your way
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Built for speed, designed for focus, engineered for simplicity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const MotionDiv = prefersReducedMotion ? 'div' : motion.div
            const IconComponent = feature.icon
            
            return (
              <MotionDiv
                key={feature.title}
                {...(!prefersReducedMotion && {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  whileHover: { y: -4, scale: 1.02 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { 
                    duration: 0.4, 
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  },
                })}
              >
                <div className="h-full p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
