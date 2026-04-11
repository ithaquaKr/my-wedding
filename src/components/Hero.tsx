'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { Countdown } from '@/components/Countdown'

function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-ink)]"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 scale-[1.18]" style={{ y: bgY }}>
        <Image
          src={weddingConfig.heroImage}
          alt="Wedding hero"
          fill
          priority
          className="object-cover"
          style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.78)' }}
        />
      </motion.div>

      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-[1]" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* Content — fades out on scroll */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-3 text-center text-[var(--color-cream)]"
      >
        {/* Tagline with letter-spacing animation */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.06em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 2, delay: 0.2 }}
          className="text-[var(--color-cream)] border border-[var(--color-cream)]/60 px-5 py-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          {weddingConfig.tagline}
        </motion.p>

        {/* Couple name — character-by-character reveal */}
        <h1
          className="font-script mt-2 leading-[1.05] text-[var(--color-cream)]"
          style={{
            fontSize: 'min(11vw, 9rem)',
            textShadow: '0 4px 32px rgba(0,0,0,0.7)',
          }}
        >
          <CharReveal text={weddingConfig.groom} delay={0.5} />
          <motion.span
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.25, ease: 'backOut' }}
            className="font-script mx-[0.15em] align-middle"
            style={{ fontSize: '0.75em', display: 'inline-block' }}
          >
            &amp;
          </motion.span>
          <CharReveal text={weddingConfig.bride} delay={1.35} />
        </h1>

        {/* Date with extending lines */}
        <div
          className="mt-10 flex flex-col items-center gap-3"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-24 bg-[var(--color-cream)]/75 block"
            style={{ transformOrigin: 'right' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.35 }}
            className="text-xs sm:text-sm uppercase font-medium text-[var(--color-cream)]"
            style={{ letterSpacing: '0.44em' }}
          >
            10 . 05 . 2026
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-24 bg-[var(--color-cream)]/75 block"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Countdown */}
        <div className="mt-12" style={{ textShadow: 'none' }}>
          <Countdown dark delay={2.8} />
        </div>
      </motion.div>

      {/* Scroll cue — scanning line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-cream)]/55">
          Cuộn xuống
        </span>
        <div className="relative h-14 w-px overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[var(--color-cream)]/65"
            animate={{ y: ['-100%', '200%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
              repeatDelay: 0.5,
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
