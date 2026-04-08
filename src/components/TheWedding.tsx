'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

type Panel = {
  key: string
  label: string
  body: React.ReactNode
}

export function TheWedding() {
  const { ceremony, reception, dressCode } = weddingConfig
  const panels: Panel[] = [
    {
      key: 'ceremony',
      label: ceremony.title,
      body: (
        <>
          <p className="font-display text-xl md:text-2xl italic mb-2">
            {ceremony.time}
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed">
            {ceremony.description}
          </p>
        </>
      ),
    },
    {
      key: 'reception',
      label: reception.title,
      body: (
        <>
          <p className="font-display text-xl md:text-2xl italic mb-2">
            {reception.time}
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed">
            {reception.description}
          </p>
        </>
      ),
    },
    {
      key: 'dress',
      label: dressCode.title,
      body: (
        <>
          <p className="font-display text-xl md:text-2xl italic mb-2">
            {dressCode.palette}
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed">
            {dressCode.note}
          </p>
        </>
      ),
    },
  ]

  const [open, setOpen] = useState<string>('ceremony')

  return (
    <section
      id="wedding"
      className="bg-[var(--color-cream)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow">Lễ cưới</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mt-4 leading-[0.95]">
            CÙNG CHÚNG TÔI BƯỚC VÀO
            <br />
            <span className="italic font-normal">chương mới của cuộc đời</span>
          </h2>
          <p className="mt-6 text-[var(--color-ink-muted)] max-w-xl mx-auto">
            Chúng tôi sẽ không thể nói &ldquo;đồng ý&rdquo; nếu thiếu bạn ở bên cạnh.
          </p>
        </motion.div>

        <div className="mt-14 max-w-2xl mx-auto text-left">
          {panels.map((p) => {
            const isOpen = open === p.key
            return (
              <div
                key={p.key}
                className="border-t border-[var(--color-hairline)] last:border-b"
              >
                <button
                  onClick={() => setOpen(isOpen ? '' : p.key)}
                  className="w-full flex items-center justify-between py-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
                    {p.label}
                  </span>
                  <span className="text-2xl text-[var(--color-ink)] transition-transform"
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">{p.body}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
