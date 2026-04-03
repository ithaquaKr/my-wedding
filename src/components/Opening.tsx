'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

interface OpeningProps {
  onOpen: () => void
}

export function Opening({ onOpen }: OpeningProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      setIsDone(true)
      onOpen()
    }, 1200)
  }

  if (isDone) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f9e4ec 0%, #fce4d6 100%)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: isOpening ? 0.6 : 0 }}
      >
        {/* Falling petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="petal" />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
          <motion.div
            animate={isOpening ? { scale: 1.3, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-7xl md:text-8xl select-none"
          >
            ✉️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <p className="font-serif text-rose-gold text-xl md:text-2xl italic">
              Bạn có một thiệp mời...
            </p>
            <p className="section-label">
              {weddingConfig.groom} & {weddingConfig.bride}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {!isOpening && (
              <button
                onClick={handleOpen}
                className="px-10 py-3 bg-rose-gold text-white rounded-full font-sans font-light tracking-widest text-sm hover:bg-dusty-rose transition-colors duration-300 shadow-md cursor-pointer"
              >
                Mở thiệp ✨
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
