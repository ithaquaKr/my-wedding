'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { Sparkles } from './Sparkles'

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
        style={{ background: 'linear-gradient(135deg, #f9e4ec 0%, #fce4d6 50%, #f0d0e0 100%)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.9, delay: isOpening ? 0.5 : 0 }}
      >
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
        <Sparkles count={28} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
          <motion.div
            animate={
              isOpening
                ? { scale: 1.4, rotate: 15, y: -20 }
                : { scale: [1, 1.04, 1], rotate: 0, y: [0, -6, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: 'easeOut' }
                : { duration: 3, ease: 'easeInOut', repeat: Infinity }
            }
            className="text-7xl md:text-8xl select-none drop-shadow-md"
          >
            ✉️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="space-y-2"
          >
            <p className="font-serif text-dusty-rose text-lg md:text-xl italic">
              Bạn có một thiệp mời từ
            </p>
            <motion.p
              className="font-script text-rose-gold text-4xl md:text-5xl"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {weddingConfig.groom} & {weddingConfig.bride}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
          >
            {!isOpening && (
              <motion.button
                onClick={handleOpen}
                className="px-10 py-3 bg-rose-gold text-white rounded-full font-sans font-light tracking-widest text-sm shadow-lg cursor-pointer"
                whileHover={{ scale: 1.06, backgroundColor: '#b08090' }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 4px 15px #c0607a40', '0 4px 28px #c0607a80', '0 4px 15px #c0607a40'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Mở thiệp ✨
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
