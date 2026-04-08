'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { Sparkles } from './Sparkles'
import { HangingDecor } from './HangingDecor'

const BLOBS = [
  { top: '5%', left: '5%', size: 350, color: '#f9b8cc', depth: 25, opacity: 0.22 },
  { top: '70%', left: '75%', size: 300, color: '#fce4d6', depth: 40, opacity: 0.2 },
  { top: '45%', left: '45%', size: 250, color: '#e8c0d8', depth: 18, opacity: 0.18 },
  { top: '15%', left: '80%', size: 200, color: '#f5d0a9', depth: 32, opacity: 0.22 },
]

function ParallaxBlob({
  top,
  left,
  size,
  color,
  depth,
  opacity,
  mouseX,
}: {
  top: string
  left: string
  size: number
  color: string
  depth: number
  opacity: number
  mouseX: ReturnType<typeof useMotionValue<number>>
}) {
  const baseX = useTransform(mouseX, [0, 1], [-depth, depth])
  const x = useSpring(baseX, { stiffness: 25, damping: 18 })

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: color,
        filter: 'blur(70px)',
        opacity,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        x,
      }}
    />
  )
}

export function Hero() {
  const mouseX = useMotionValue(0.5)

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    mouseX.set(e.clientX / window.innerWidth)
  }

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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f9e4ec 0%, #fdf0f5 60%, #fffaf8 100%)' }}
      onPointerMove={handlePointerMove}
    >
      <HangingDecor mouseX={mouseX} />

      {/* Parallax background blobs */}
      {BLOBS.map((blob, i) => (
        <ParallaxBlob key={i} {...blob} mouseX={mouseX} />
      ))}

      {/* Floating background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />

      {/* Falling petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="petal" />
        ))}
      </div>

      {/* Sparkles */}
      <Sparkles count={18} />

      {/* Decorative corner flowers */}
      {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-rose-light text-4xl opacity-30 select-none`}
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
        >
          ❀
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 space-y-6 max-w-lg"
      >
        <motion.p
          className="section-label"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Trân trọng kính mời
        </motion.p>

        <div className="space-y-2">
          {[weddingConfig.groom, weddingConfig.bride].map((name, i) => (
            <motion.h1
              key={name}
              className="font-script text-6xl md:text-8xl text-rose-gold font-semibold"
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.9, ease: 'easeOut' }}
            >
              {name}
            </motion.h1>
          ))}
          <motion.p
            className="font-serif text-2xl text-dusty-rose"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            &
          </motion.p>
        </div>

        <motion.div
          className="divider-rose my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />

        <motion.div
          className="space-y-2 text-dusty-rose"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <p className="font-serif text-lg italic">{formattedDate}</p>
          <p className="font-sans text-sm tracking-wide">{weddingConfig.venueName}</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <div className="w-px h-14 bg-gradient-to-b from-rose-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}
