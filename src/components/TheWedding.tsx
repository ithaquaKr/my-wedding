'use client'

import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { weddingConfig, brideSchedule } from '@/config/wedding'
import { iconMap } from './Icons'
import { staggerContainer, fadeUpChild } from '@/lib/animations'

export function TheWedding() {
  const searchParams = useSearchParams()
  const isBride = searchParams.get('side') === 'bride'
  const schedule = isBride ? brideSchedule : weddingConfig.schedule
  const count = schedule.length
  const isTriplet = count === 3
  const isQuad = count === 4

  return (
    <section
      id="wedding"
      className="bg-[var(--color-cream-soft)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow tracking-[0.4em]">
            {isBride ? '09 – 10 . 05 . 2026' : '10 . 05 . 2026'}
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
            NGÀY TRỌNG ĐẠI
            <br />
            <span className="italic font-normal">khoảnh khắc chúng ta cùng chung vui</span>
          </h2>
        </motion.div>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mt-14 mb-16"
          style={{ transformOrigin: 'left' }}
        />

        {/* Timeline grid */}
        <div className={`relative mx-auto ${isTriplet ? 'max-w-3xl' : 'max-w-2xl'}`}>
          {/* Horizontal connector — desktop only, single-row layouts only */}
          {!isQuad && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute hidden md:block h-px bg-[var(--color-hairline)] top-8"
              style={{
                left: isTriplet ? '17%' : '25%',
                right: isTriplet ? '17%' : '25%',
                transformOrigin: 'left',
              }}
            />
          )}

          <motion.div
            className={`grid gap-14 ${isTriplet ? 'md:grid-cols-3' : isQuad ? 'md:grid-cols-2' : 'md:grid-cols-2'}`}
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            {schedule.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={i}
                  variants={fadeUpChild}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
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
                    <Icon className="w-14 h-14 text-[var(--color-ink)]" />
                  </motion.div>

                  {/* Time */}
                  <p className="eyebrow mt-7 tracking-[0.32em]">{item.time}</p>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-[1.75rem] mt-3 text-[var(--color-ink)] leading-tight">
                    {item.title}
                  </h3>

                  {/* Hairline ornament */}
                  <div className="w-8 h-px bg-[var(--color-hairline)] my-4" />

                  {/* Description */}
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-[22ch]">
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
