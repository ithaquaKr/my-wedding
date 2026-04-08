'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Map() {
  const venue = weddingConfig.venue

  return (
    <section
      id="venue"
      className="bg-[var(--color-cream)] py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow">{venue.label}</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] mt-3">
            ĐỊA ĐIỂM
          </h2>
        </motion.div>

        <hr className="hairline mt-8 mb-10" />

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-5">
            <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
              {venue.name}
            </h3>
            <p className="text-[var(--color-ink-muted)] leading-relaxed">
              {venue.address}
            </p>
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-2"
            >
              Chỉ đường
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="aspect-[4/3] w-full overflow-hidden border border-[var(--color-hairline)]">
              <iframe
                src={venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ địa điểm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
