'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { staggerContainer, fadeUpChild } from '@/lib/animations'
import { Lightbox } from '@/components/Lightbox'

// ─── Photo Collage ────────────────────────────────────────────────────────────

interface CollageProps {
  photos: string[]
  startIndex: number          // global index offset in allPhotos flat array
  onOpen: (globalIndex: number) => void
}

function PhotoCollage({ photos, startIndex, onOpen }: CollageProps) {
  const count = Math.min(photos.length, 4)

  const photoButton = (src: string, localIdx: number, style: React.CSSProperties) => (
    <motion.button
      key={localIdx}
      type="button"
      aria-label={`Xem ảnh ${localIdx + 1}`}
      onClick={() => onOpen(startIndex + localIdx)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: localIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="editorial-photo group cursor-pointer relative overflow-hidden"
      style={style}
    >
      <Image
        src={src}
        alt={`Ảnh câu chuyện ${startIndex + localIdx + 1}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[var(--color-ink)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </motion.button>
  )

  if (count <= 3) {
    // Col 1: featured stretches full height | Col 2: 2 stacked photos
    return (
      <div className="grid grid-cols-2 gap-1.5">
        {photos.slice(0, 3).map((src, i) =>
          photoButton(src, i, i === 0
            ? { gridRow: '1 / 3', minHeight: '100%' }
            : { aspectRatio: '4/3' }
          )
        )}
      </div>
    )
  }

  // 4 photos: featured large left (spans 3 rows), 3 smaller right
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: '3fr 2fr', gridTemplateRows: 'auto auto auto' }}
    >
      {photoButton(photos[0], 0, { gridRow: '1 / 4', minHeight: '100%' })}
      {photos.slice(1, 4).map((src, i) =>
        photoButton(src, i + 1, { aspectRatio: i === 1 ? '3/2' : '4/3' })
      )}
    </div>
  )
}

// ─── Our Story section ────────────────────────────────────────────────────────

export function OurStory() {
  const milestonesRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: milestonesRef,
    offset: ['start 75%', 'end 25%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Flat array of all story photos for lightbox navigation
  const allPhotos = weddingConfig.story.flatMap((m) => m.photos)

  // Cumulative start index for each milestone in the flat allPhotos array
  const startIndices = weddingConfig.story.map((_, i) =>
    weddingConfig.story.slice(0, i).reduce((sum, m) => sum + m.photos.length, 0)
  )

  return (
    <section
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
          className="font-display text-[clamp(2.2rem,9vw,7rem)] leading-[0.95] tracking-tight text-[var(--color-ink)]"
        >
          CÂU CHUYỆN
          <br />
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

        {/* Milestones */}
        <div ref={milestonesRef} className="relative mt-16">
          {/* Scroll-linked timeline line — desktop only */}
          <div className="absolute left-0 top-2 bottom-2 hidden md:block" style={{ width: '1px' }}>
            <div className="h-full w-full bg-[var(--color-hairline)]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-ink-muted)]"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          <motion.div
            className="space-y-24 md:space-y-32 md:pl-14"
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            {weddingConfig.story.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUpChild}
                className={`grid gap-8 md:gap-12 items-start ${m.photos.length === 0 ? '' : 'md:grid-cols-12'}`}
              >
                {m.photos.length === 0 ? (
                  /* Text-only milestone — full width, editorial style */
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink-muted)] shrink-0" />
                      <p className="eyebrow">{m.date}</p>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                      {m.title}
                    </h3>
                    <p className="mt-5 text-[var(--color-ink-muted)] leading-relaxed text-base md:text-lg max-w-lg">
                      {m.description}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Text — narrow column */}
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink-muted)] shrink-0" />
                        <p className="eyebrow">{m.date}</p>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)]">
                        {m.title}
                      </h3>
                      <p className="mt-4 text-[var(--color-ink-muted)] leading-relaxed text-sm md:text-base">
                        {m.description}
                      </p>
                    </div>

                    {/* Photo collage — wide column */}
                    <div className="md:col-span-9">
                      <PhotoCollage
                        photos={m.photos}
                        startIndex={startIndices[i]}
                        onOpen={setLightboxIndex}
                      />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Lightbox
        images={allPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((idx) =>
          idx === null ? null : (idx - 1 + allPhotos.length) % allPhotos.length
        )}
        onNext={() => setLightboxIndex((idx) =>
          idx === null ? null : (idx + 1) % allPhotos.length
        )}
      />
    </section>
  )
}
