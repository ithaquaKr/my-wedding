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
        className="object-cover"
        style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.85)' }}
      />

      {/* Stronger vignette so calligraphy + small text stand out */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-[var(--color-cream)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow text-[var(--color-cream)]"
          style={{
            color: 'var(--color-cream)',
            textShadow: '0 1px 12px rgba(0,0,0,0.6)',
          }}
        >
          {weddingConfig.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="font-script mt-4 text-[clamp(4rem,14vw,12rem)] leading-[0.95]"
          style={{
            color: 'var(--color-cream)',
            textShadow: '0 4px 28px rgba(0,0,0,0.55)',
          }}
        >
          {weddingConfig.groom}
          <span className="font-script italic font-normal text-[0.7em] mx-2 opacity-90">
            &amp;
          </span>
          {weddingConfig.bride}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-3"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          <span className="h-px w-20 bg-[var(--color-cream)]" />
          <p
            className="text-xs sm:text-sm uppercase font-medium"
            style={{
              color: 'var(--color-cream)',
              letterSpacing: '0.35em',
            }}
          >
            10 . 05 . 2026
          </p>
          <span className="h-px w-20 bg-[var(--color-cream)]" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <div className="mx-auto h-14 w-px bg-[var(--color-cream)]" />
      </motion.div>
    </section>
  )
}
