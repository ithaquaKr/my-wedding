'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-ink)]"
    >
      {/* Background image — B&W landscape */}
      <Image
        src={weddingConfig.heroImage}
        alt="Wedding hero"
        fill
        priority
        className="object-cover opacity-80"
        style={{ filter: 'grayscale(1) contrast(1.05)' }}
      />

      {/* Soft top + bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-[var(--color-cream)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow text-[var(--color-cream)]/80"
        >
          {weddingConfig.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display mt-6 text-[clamp(3rem,11vw,9.5rem)] leading-[0.95] tracking-tight"
        >
          {weddingConfig.groom.toUpperCase()}
          <span className="font-display italic font-normal text-[0.7em] mx-3">
            &amp;
          </span>
          {weddingConfig.bride.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <span className="h-px w-16 bg-[var(--color-cream)]/60" />
          <p className="eyebrow text-[var(--color-cream)]/80">
            10 . 05 . 2026
          </p>
          <span className="h-px w-16 bg-[var(--color-cream)]/60" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <div className="mx-auto h-14 w-px bg-[var(--color-cream)]/70" />
      </motion.div>
    </section>
  )
}
