'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function OurStory() {
  return (
    <section
      id="story"
      className="relative bg-[var(--color-cream)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-tight text-[var(--color-ink)]"
        >
          CÂU CHUYỆN <span className="italic font-normal">CỦA CHÚNG TÔI</span>
        </motion.h2>

        <div className="mt-4 max-w-md">
          <p className="font-display italic text-2xl md:text-3xl text-[var(--color-ink)]">
            Từ một lần gặp gỡ tình cờ đến mãi mãi bên nhau.
          </p>
        </div>

        <hr className="hairline mt-12" />

        {/* Editorial collage of milestones */}
        <div className="mt-16 grid gap-16 md:gap-24">
          {weddingConfig.story.map((m, i) => {
            const reversed = i % 2 === 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className={`grid items-center gap-8 md:gap-16 md:grid-cols-12 ${
                  reversed ? 'md:[&>*:first-child]:col-start-6' : ''
                }`}
              >
                {m.photo && (
                  <div
                    className={`editorial-photo aspect-[4/5] md:col-span-5 ${
                      reversed ? 'md:col-start-7' : ''
                    }`}
                  >
                    <Image
                      src={m.photo}
                      alt={m.title}
                      width={800}
                      height={1000}
                    />
                  </div>
                )}
                <div
                  className={`md:col-span-6 ${
                    reversed ? 'md:col-start-1 md:row-start-1' : ''
                  }`}
                >
                  <p className="eyebrow">{m.date}</p>
                  <h3 className="font-display text-3xl md:text-4xl mt-4 text-[var(--color-ink)]">
                    {m.title}
                  </h3>
                  <p className="mt-5 text-[var(--color-ink-muted)] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
