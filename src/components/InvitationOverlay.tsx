'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { type BrideSlot, BRIDE_SLOTS, weddingConfig } from '@/config/wedding'
import { useVenue } from '@/components/VenueProvider'

const SESSION_KEY = 'invitation-dismissed'
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const EASE_IN = [0.55, 0, 1, 0.45] as [number, number, number, number]
const DISMISS_AFTER = 3800
const isDev = process.env.NODE_ENV === 'development'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
}

// Parent: stagger in sequentially, stagger out in reverse
const CONTENT = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
}

// Standard text element
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.45, ease: EASE_IN } },
}

// Guest name: materialises from a soft blur — the hero moment
const NAME = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, ease: EASE },
  },
  exit: {
    opacity: 0, y: -18, filter: 'blur(8px)',
    transition: { duration: 0.6, ease: EASE_IN },
  },
}

export function InvitationOverlay() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('to') ?? ''
  const side = searchParams.get('side')
  const slotParam = searchParams.get('slot') as BrideSlot | null
  const brideSlot = side === 'bride' && slotParam && slotParam in BRIDE_SLOTS ? slotParam : null
  const venue = useVenue()
  const [visible, setVisible] = useState(false)

  const displayDate = brideSlot ? BRIDE_SLOTS[brideSlot].sub : formatDate(weddingConfig.weddingDate)
  const displayTime = brideSlot ? BRIDE_SLOTS[brideSlot].displayTime : null

  useEffect(() => {
    if (!guestName) return
    if (!isDev && sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
    }, DISMISS_AFTER)
    return () => clearTimeout(t)
  }, [guestName])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center px-8 bg-[var(--color-cream)]"
          initial={{ opacity: 0, clipPath: 'circle(140% at 50% 44%)' }}
          animate={{ opacity: 1, clipPath: 'circle(140% at 50% 44%)', transition: { duration: 0.4 } }}
          // Iris close: clip-path collapses to a point like a camera aperture
          exit={{ clipPath: 'circle(0% at 50% 44%)', transition: { duration: 0.65, delay: 0.25, ease: [0.4, 0, 0.55, 1] } }}
        >
          {/* Film grain — matches site texture */}
          <div className="absolute inset-0 grain-overlay pointer-events-none" />

          {/* Soft radial vignette for cinematic depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.055) 100%)',
            }}
          />

          {/* Text content — staggered entrance, reverse staggered exit */}
          <motion.div
            className="relative text-center w-full max-w-[280px]"
            variants={CONTENT}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Eyebrow */}
            <motion.p variants={ITEM} className="eyebrow mb-8 tracking-[0.35em]">
              Trân trọng kính mời
            </motion.p>

            {/* Guest name — Corinthia calligraphy, blur materialise */}
            <motion.h1
              variants={NAME}
              className="font-script text-[clamp(2.8rem,11vw,4.2rem)] text-[var(--color-ink)] leading-none mb-10"
            >
              {guestName}
            </motion.h1>

            {/* Hairline ornament */}
            <motion.div variants={ITEM} className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-px bg-[var(--color-hairline)]" />
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)"
                  fill="none" stroke="var(--color-hairline)" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-ink-muted)" />
              </svg>
              <div className="flex-1 h-px bg-[var(--color-hairline)]" />
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              variants={ITEM}
              className="text-[11px] text-[var(--color-ink-muted)] leading-loose tracking-[0.06em] mb-3"
            >
              cùng hiện diện trong ngày trọng đại của
            </motion.p>

            {/* Couple — Playfair italic */}
            <motion.p
              variants={ITEM}
              className="font-display italic text-[1.45rem] text-[var(--color-ink)] tracking-tight mb-9"
            >
              {weddingConfig.groom} &amp; {weddingConfig.bride}
            </motion.p>

            {/* Date + venue */}
            <motion.div variants={ITEM} className="space-y-1">
              {displayTime && (
                <p className="eyebrow tracking-[0.32em] mb-1">{displayTime}</p>
              )}
              <p className="eyebrow capitalize tracking-[0.22em]">{displayDate}</p>
              <p className="text-[10px] text-[var(--color-ink-muted)] tracking-[0.12em]">
                {venue.name}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
