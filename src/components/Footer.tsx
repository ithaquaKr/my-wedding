'use client'

import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { weddingConfig } from '@/config/wedding'

export function Footer() {
  const searchParams = useSearchParams()
  const isBride = searchParams.get('side') === 'bride'
  const first = isBride ? weddingConfig.bride : weddingConfig.groom
  const second = isBride ? weddingConfig.groom : weddingConfig.bride

  const lastInitial = (name: string) => name.trim().split(' ').at(-1)?.charAt(0) ?? name.charAt(0)
  const initials = `${lastInitial(first)} & ${lastInitial(second)}`

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)] py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-wide whitespace-nowrap"
          style={{ fontSize: 'clamp(1.4rem, 5.5vw, 4.5rem)' }}
        >
          {first.toUpperCase()}{' '}
          <span className="italic font-normal">&amp;</span>{' '}
          {second.toUpperCase()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-4 text-[var(--color-cream)]/70"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-10 bg-[var(--color-cream)]/50 block"
            style={{ transformOrigin: 'right' }}
          />
          <span className="eyebrow text-[var(--color-cream)]/80">{initials}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-10 bg-[var(--color-cream)]/50 block"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 max-w-xl mx-auto px-6 sm:px-0 text-sm leading-relaxed text-[var(--color-cream)]/70"
        >
          {weddingConfig.footerNote}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 text-[10px] tracking-[0.3em] uppercase text-[var(--color-cream)]/35"
        >
          &copy; {new Date().getFullYear()} — {first} &amp; {second}
        </motion.p>
      </div>
    </footer>
  )
}
