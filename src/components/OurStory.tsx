'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: milestonesRef,
    offset: ['start 75%', 'end 25%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-[var(--color-cream)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-tight text-[var(--color-ink)]"
        >
          CÂU CHUYỆN{' '}
          <span className="italic font-normal">CỦA CHÚNG TÔI</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 max-w-md"
        >
          <p className="font-display italic text-2xl md:text-3xl text-[var(--color-ink)]">
            Từ một lần gặp gỡ tình cờ đến mãi mãi bên nhau.
          </p>
        </motion.div>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mt-12"
          style={{ transformOrigin: 'left' }}
        />

        {/* Milestones with scroll-linked timeline line */}
        <div ref={milestonesRef} className="relative mt-16">
          {/* Drawing timeline line — desktop only */}
          <div className="absolute left-0 top-2 bottom-2 hidden md:block" style={{ width: '1px' }}>
            <div className="h-full w-full bg-[var(--color-hairline)]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-ink-muted)]"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          <div className="space-y-20 md:space-y-28 md:pl-14">
            {weddingConfig.story.map((m, i) => {
              const reversed = i % 2 === 1
              return (
                <div
                  key={i}
                  className="grid items-center gap-8 md:gap-16 md:grid-cols-12"
                >
                  {/* Photo — clip-path wipe reveal */}
                  {m.photo && (
                    <motion.div
                      initial={{ clipPath: 'inset(0 0 100% 0)' }}
                      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`md:col-span-5 ${reversed ? 'md:col-start-7' : ''}`}
                    >
                      <div className="editorial-photo aspect-[4/5]">
                        <Image src={m.photo} alt={m.title} width={800} height={1000} />
                      </div>
                    </motion.div>
                  )}

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`md:col-span-6 ${reversed ? 'md:col-start-1 md:row-start-1' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink-muted)] shrink-0" />
                      <p className="eyebrow">{m.date}</p>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                      {m.title}
                    </h3>
                    <p className="mt-5 text-[var(--color-ink-muted)] leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
