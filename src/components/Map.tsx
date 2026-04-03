'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Map() {
  return (
    <section id="map" className="py-24 px-8 bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <p className="section-label mb-3">Địa điểm tổ chức</p>
          <div className="divider-rose" />
        </div>

        <div className="rounded-2xl overflow-hidden shadow-md border border-rose-light mb-6">
          <iframe
            src={weddingConfig.venueMapEmbedUrl}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Địa điểm tổ chức tiệc cưới"
          />
        </div>

        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl text-rose-gold italic">
            {weddingConfig.venueName}
          </h3>
          <p className="font-sans text-sm text-dusty-rose">{weddingConfig.venueAddress}</p>
          <a
            href={weddingConfig.venueDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-8 py-3 border border-rose-gold text-rose-gold rounded-full font-sans text-sm tracking-widest hover:bg-rose-gold hover:text-white transition-colors"
          >
            Chỉ đường 📍
          </a>
        </div>
      </motion.div>
    </section>
  )
}
