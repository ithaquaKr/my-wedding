'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const images = weddingConfig.galleryImages

  if (images.length === 0) return null

  return (
    <section id="gallery" className="bg-[var(--color-cream)] py-20 md:py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <p className="eyebrow">Bộ ảnh</p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] mt-3 leading-none"
            >
              ALBUM CƯỚI
            </motion.h2>
          </div>
          <div className="hidden md:block max-w-xs text-right">
            <p className="text-sm text-[var(--color-ink-muted)]">
              Một vài khoảnh khắc của chúng tôi qua ống kính.
            </p>
          </div>
        </div>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="hairline mb-10"
          style={{ transformOrigin: 'left' }}
        />

        {/* Desktop — CSS masonry columns, natural image ratio */}
        <div className="hidden md:block mx-auto" style={{ columns: 3, columnGap: '0.75rem', maxWidth: '960px' }}>
          {images.slice(0, 6).map((src, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.07 }}
              className="relative overflow-hidden group cursor-pointer w-full block mb-3"
              style={{ breakInside: 'avoid' }}
              aria-label={`Mở ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 1280px) 33vw, 420px"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--color-ink)] opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
            </motion.button>
          ))}
        </div>

        {/* Mobile — 2-column masonry */}
        <div className="md:hidden" style={{ columns: 2, columnGap: '0.75rem' }}>
          {images.map((src, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.06 }}
              className="relative overflow-hidden group cursor-pointer w-full block mb-3"
              style={{ breakInside: 'avoid' }}
              aria-label={`Mở ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                width={0}
                height={0}
                sizes="50vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={index}
        onClose={() => setIndex(null)}
        onPrev={() => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
        onNext={() => setIndex((i) => (i === null ? null : (i + 1) % images.length))}
      />
    </section>
  )
}
