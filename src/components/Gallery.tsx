'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingConfig } from '@/config/wedding'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = weddingConfig.galleryImages

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))

  if (images.length === 0) return null

  return (
    <section id="gallery" className="py-24 px-8" style={{ background: 'rgba(249,228,236,0.3)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Bộ ảnh của chúng tôi</p>
          <div className="divider-rose" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-xl"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Ảnh ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-rose-gold/0 group-hover:bg-rose-gold/20 transition-colors duration-300 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  )
}
