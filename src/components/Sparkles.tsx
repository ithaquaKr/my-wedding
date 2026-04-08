'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface SparkleItem {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
  repeatDelay: number
}

const COLORS = ['#c0607a', '#e8a0b0', '#f5c842', '#ffffff', '#f9e4ec', '#d4a0c0']

function StarSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z"
        fill={color}
      />
    </svg>
  )
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const sparkles = useMemo<SparkleItem[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: (Math.random() * 5 * 100) / 100,
        duration: (Math.random() * 1.5 + 1.2 * 100) / 100,
        repeatDelay: (Math.random() * 4 + 2 * 100) / 100,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 0.8, 1, 0],
            opacity: [0, 1, 0.7, 1, 0],
            rotate: [0, 72, 144, 216, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: 'easeInOut',
          }}
        >
          <StarSVG color={s.color} />
        </motion.div>
      ))}
    </div>
  )
}
