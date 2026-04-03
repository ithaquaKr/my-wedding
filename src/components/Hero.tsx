'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Hero() {
  const date = new Date(weddingConfig.weddingDate)
  const formattedDate = date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #f9e4ec 0%, #fffaf8 100%)' }}
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute top-8 right-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute bottom-8 left-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute bottom-8 right-8 text-rose-light text-4xl opacity-40 select-none">❀</div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="space-y-6 max-w-lg"
      >
        <p className="section-label">Trân trọng kính mời</p>

        <div className="space-y-2">
          <h1 className="font-serif text-5xl md:text-7xl text-rose-gold italic font-light">
            {weddingConfig.groom}
          </h1>
          <p className="font-serif text-2xl text-dusty-rose">&</p>
          <h1 className="font-serif text-5xl md:text-7xl text-rose-gold italic font-light">
            {weddingConfig.bride}
          </h1>
        </div>

        <div className="divider-rose my-6" />

        <div className="space-y-2 text-dusty-rose">
          <p className="font-serif text-lg italic">{formattedDate}</p>
          <p className="font-sans text-sm tracking-wide">{weddingConfig.venueName}</p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-rose-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}
