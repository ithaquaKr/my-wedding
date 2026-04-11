'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { calculateCountdown, CountdownTime } from '@/lib/countdown'
import { weddingConfig } from '@/config/wedding'

// Single digit with flip animation on change
function FlipDigit({ digit, dark }: { digit: string; dark: boolean }) {
  return (
    <span className="relative inline-block w-[0.62em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="block"
          style={{ color: dark ? 'var(--color-cream)' : 'var(--color-ink)' }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({
  value,
  label,
  delay = 0,
  dark = false,
}: {
  value: number
  label: string
  delay?: number
  dark?: boolean
}) {
  const digits = String(value).padStart(2, '0').split('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="font-display leading-none tabular-nums border px-4 py-3 text-center flex overflow-hidden"
        style={{
          fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
          borderColor: dark ? 'rgba(237,231,217,0.22)' : 'var(--color-hairline)',
          minWidth: '3.2ch',
        }}
      >
        {digits.map((d, i) => (
          <FlipDigit key={i} digit={d} dark={dark} />
        ))}
      </div>
      <div
        className="eyebrow"
        style={{ color: dark ? 'rgba(237,231,217,0.55)' : undefined }}
      >
        {label}
      </div>
    </motion.div>
  )
}

function Dot({ dark }: { dark: boolean }) {
  return (
    <span
      className="font-display text-xl pb-10 leading-none select-none"
      aria-hidden
      style={{ color: dark ? 'rgba(237,231,217,0.28)' : 'var(--color-hairline)' }}
    >
      ·
    </span>
  )
}

interface CountdownProps {
  /** true = cream text on dark hero background */
  dark?: boolean
  /** initial entrance delay (seconds) */
  delay?: number
}

export function Countdown({ dark = false, delay = 0 }: CountdownProps) {
  const [time, setTime] = useState<CountdownTime | null>(null)

  useEffect(() => {
    setTime(calculateCountdown(weddingConfig.weddingDate))
    const timer = setInterval(() => {
      setTime(calculateCountdown(weddingConfig.weddingDate))
    }, 1_000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return <div className="h-24" aria-hidden />

  if (time.isPast) {
    return (
      <p
        className="font-display text-3xl italic"
        style={{ color: dark ? 'var(--color-cream)' : 'var(--color-ink)' }}
      >
        Hôm nay là ngày trọng đại
      </p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay }}
        className="eyebrow"
        style={{ color: dark ? 'rgba(237,231,217,0.5)' : undefined }}
      >
        Còn lại
      </motion.p>

      <div className="flex items-end gap-3 sm:gap-4">
        <Unit value={time.days} label="Ngày" delay={delay + 0.1} dark={dark} />
        <Dot dark={dark} />
        <Unit value={time.hours} label="Giờ" delay={delay + 0.18} dark={dark} />
        <Dot dark={dark} />
        <Unit value={time.minutes} label="Phút" delay={delay + 0.26} dark={dark} />
        <Dot dark={dark} />
        <Unit value={time.seconds} label="Giây" delay={delay + 0.34} dark={dark} />
      </div>
    </div>
  )
}
