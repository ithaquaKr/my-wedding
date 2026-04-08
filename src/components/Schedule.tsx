'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { iconMap } from './Icons'

export function Schedule() {
  return (
    <section
      id="schedule"
      className="bg-[var(--color-cream-soft)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow">Schedule of the day</p>
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
          HERE&rsquo;S WHAT TO EXPECT AS
          <br />
          <span className="italic font-normal">we celebrate together</span>
        </h2>

        <hr className="hairline mt-14 mb-14" />

        <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
          {weddingConfig.schedule.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-16 h-16 text-[var(--color-ink)]" />
                <p className="eyebrow mt-6">{item.time}</p>
                <h3 className="font-display text-2xl md:text-3xl mt-3 text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
