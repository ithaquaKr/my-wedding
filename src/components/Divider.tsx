'use client'

import { motion } from 'framer-motion'

export function Divider({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 px-8 md:px-16 ${className}`}
      aria-hidden
    >
      <div className="flex-1 h-px bg-[var(--color-hairline)]" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect
          x="6" y="6" width="8" height="8"
          transform="rotate(45 10 10)"
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth="1"
        />
        <circle cx="10" cy="10" r="1.5" fill="var(--color-ink-muted)" />
      </svg>
      <div className="flex-1 h-px bg-[var(--color-hairline)]" />
    </motion.div>
  )
}
