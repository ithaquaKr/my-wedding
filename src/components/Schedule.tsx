'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { iconMap } from './Icons'
import { staggerContainer, fadeUpChild } from '@/lib/animations'

export function Schedule() {
  return (
    <section
      id="schedule"
      className="bg-[var(--color-cream-soft)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Lịch trình trong ngày</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
            NHỮNG KHOẢNH KHẮC ĐÁNG NHỚ
            <br />
            <span className="italic font-normal">khi chúng ta cùng chung vui</span>
          </h2>
        </motion.div>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mt-14 mb-14"
          style={{ transformOrigin: 'left' }}
        />

        {/* Grid with connector line behind icons */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connector line at icon center — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute hidden md:block h-px bg-[var(--color-hairline)] top-8"
            style={{ left: '17%', right: '17%', transformOrigin: 'left' }}
          />

          <motion.div
            className="grid gap-12 md:grid-cols-3"
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            {weddingConfig.schedule.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={i}
                  variants={fadeUpChild}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon with scale entrance */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.14,
                      type: 'spring',
                      stiffness: 180,
                    }}
                    className="relative z-10 bg-[var(--color-cream-soft)] px-3"
                  >
                    <Icon className="w-16 h-16 text-[var(--color-ink)]" />
                  </motion.div>

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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
