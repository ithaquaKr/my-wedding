'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function GiftRegistry() {
  return (
    <section
      id="registry"
      className="bg-[var(--color-cream-soft)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow">Quà cưới</p>
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
          SỰ HIỆN DIỆN
          <br />
          <span className="italic font-normal">của bạn là món quà ý nghĩa nhất</span>
        </h2>
        <p className="mt-6 text-[var(--color-ink-muted)] max-w-2xl mx-auto leading-relaxed">
          {weddingConfig.registry.intro}
        </p>

        <hr className="hairline mt-14 mb-14" />

        <div className="grid gap-12 md:grid-cols-2 max-w-3xl mx-auto">
          {weddingConfig.registry.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <p className="eyebrow">{item.label}</p>
              <div className="mt-6 p-4 bg-white border border-[var(--color-hairline)]">
                <Image
                  src={item.qrImage}
                  alt={`QR ${item.label}`}
                  width={200}
                  height={200}
                  className="w-44 h-44"
                />
              </div>
              <div className="mt-6 space-y-1 text-sm text-[var(--color-ink)]">
                <p className="font-display text-lg">{item.bankName}</p>
                <p className="text-[var(--color-ink-muted)]">
                  {item.accountName}
                </p>
                <p className="font-mono tracking-wider">{item.accountNumber}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
