'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { staggerContainer, fadeUpChild } from '@/lib/animations'

export function TravelStay() {
  const { airports, transportation } = weddingConfig.travel

  return (
    <section
      id="travel"
      className="bg-[var(--color-cream)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow">Di chuyển & lưu trú</p>
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
          LÊN KẾ HOẠCH CHO CHUYẾN ĐI
          <br />
          <span className="italic font-normal">thật nhẹ nhàng</span>
        </h2>
        <p className="mt-6 text-[var(--color-ink-muted)] max-w-xl mx-auto">
          Để bạn có thể đến với chúng tôi nhẹ nhàng và thoải mái nhất.
        </p>

        <hr className="hairline mt-14 mb-14" />

        <motion.div
          className="grid gap-14 md:grid-cols-2 text-left max-w-2xl mx-auto"
          variants={staggerContainer}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          {/* Airports */}
          <motion.div variants={fadeUpChild}>
            <p className="eyebrow mb-5">Sân bay gần nhất</p>
            <ul className="space-y-3">
              {airports.map((a, i) => (
                <li key={i} className="text-[var(--color-ink-muted)] leading-relaxed">
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Transportation */}
          <motion.div variants={fadeUpChild}>
            <p className="eyebrow mb-5">Di chuyển</p>
            <ul className="space-y-3">
              {transportation.map((t, i) => (
                <li key={i} className="text-[var(--color-ink-muted)] leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
