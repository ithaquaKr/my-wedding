'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function ImportantDates() {
  const dates = weddingConfig.importantDates

  return (
    <section className="bg-[var(--color-cream-soft)] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mb-16"
          style={{ transformOrigin: 'left' }}
        />

        <div className="grid md:grid-cols-3 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--color-hairline)]">
          {dates.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 py-10 md:py-6 md:px-10"
            >
              {/* Ornamental dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.18,
                  type: 'spring',
                  stiffness: 260,
                }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink-muted)]"
              />

              <p className="eyebrow">{d.label}</p>

              <p className="font-display text-5xl md:text-[3.5rem] leading-none text-[var(--color-ink)]">
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

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mt-16"
          style={{ transformOrigin: 'right' }}
        />
      </div>
    </section>
  )
}
