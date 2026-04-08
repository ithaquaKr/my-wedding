'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function ImportantDates() {
  return (
    <section className="bg-[var(--color-cream-soft)] py-16 md:py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <hr className="hairline mb-12" />
        <div className="grid gap-12 md:grid-cols-3 text-center">
          {weddingConfig.importantDates.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="eyebrow">{d.label}</p>
              <p className="font-display text-5xl md:text-6xl text-[var(--color-ink)]">
                {d.solar.split('/').slice(0, 2).join(' . ')}
              </p>
              {d.lunar && (
                <p className="text-xs text-[var(--color-ink-muted)] tracking-wide">
                  {d.lunar}
                </p>
              )}
            </motion.div>
          ))}
        </div>
        <hr className="hairline mt-12" />
      </div>
    </section>
  )
}
