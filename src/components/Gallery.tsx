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
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] mt-3 leading-none">
              ALBUM CƯỚI
            </h2>
          </div>
          <div className="hidden md:block max-w-xs text-right">
            <p className="text-sm text-[var(--color-ink-muted)]">
              Một vài khoảnh khắc của chúng tôi qua ống kính.
            </p>
          </div>
        </div>

        <hr className="hairline mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {images.map((src, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              className="editorial-photo aspect-[3/4] hover-lift"
              aria-label={`Mở ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Ảnh cưới ${i + 1}`}
                width={600}
                height={800}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={index}
        onClose={() => setIndex(null)}
        onPrev={() =>
          setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
        }
        onNext={() =>
          setIndex((i) => (i === null ? null : (i + 1) % images.length))
        }
      />
    </section>
  )
}
