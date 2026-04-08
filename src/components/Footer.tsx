'use client'

import { weddingConfig } from '@/config/wedding'

export function Footer() {
  const initials = `${weddingConfig.groom.charAt(0)} & ${weddingConfig.bride.charAt(0)}`

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)] py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-5xl md:text-6xl tracking-wide">
          {weddingConfig.groom.toUpperCase()} <span className="italic font-normal">&amp;</span>{' '}
          {weddingConfig.bride.toUpperCase()}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4 text-[var(--color-cream)]/70">
          <span className="h-px w-8 bg-[var(--color-cream)]/50" />
          <span className="eyebrow text-[var(--color-cream)]/80">
            {initials}
          </span>
          <span className="h-px w-8 bg-[var(--color-cream)]/50" />
        </div>

        <p className="mt-10 max-w-xl mx-auto text-sm leading-relaxed text-[var(--color-cream)]/70">
          {weddingConfig.footerNote}
        </p>

        <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-[var(--color-cream)]/40">
          &copy; {new Date().getFullYear()} — {weddingConfig.groom} &amp; {weddingConfig.bride}
        </p>
      </div>
    </footer>
  )
}
