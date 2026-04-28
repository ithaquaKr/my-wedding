'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LightboxProps {
  images: string[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {currentIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-60 transition-opacity cursor-pointer"
            onClick={onClose}
            aria-label="Đóng"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:opacity-60 transition-opacity px-2 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onNext()
              else if (info.offset.x > 80) onPrev()
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex]}
              alt={`Ảnh ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh]"
              style={{}}
            />
            <p className="text-center text-white/60 text-sm mt-3 tracking-[0.3em] uppercase">
              {currentIndex + 1} / {images.length}
            </p>
          </motion.div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:opacity-60 transition-opacity px-2 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Ảnh tiếp"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
