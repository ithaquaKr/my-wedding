'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',      label: 'Trang chủ' },
  { id: 'countdown', label: 'Đếm ngược' },
  { id: 'story',     label: 'Câu chuyện' },
  { id: 'gallery',   label: 'Ảnh cưới' },
  { id: 'rsvp',      label: 'Xác nhận' },
  { id: 'map',       label: 'Địa điểm' },
  { id: 'wishes',    label: 'Lời chúc' },
]

export function FloatingNav() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveId(section.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
          aria-label="Điều hướng"
        >
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={label}
              aria-label={label}
              className="group flex items-center justify-end gap-2 cursor-pointer"
            >
              <span className="hidden group-hover:block text-xs font-sans text-rose-gold bg-white/90 px-2 py-1 rounded-full shadow-sm border border-rose-light whitespace-nowrap">
                {label}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeId === id
                    ? 'w-3 h-3 bg-rose-gold'
                    : 'w-2 h-2 bg-rose-light hover:bg-dusty-rose'
                }`}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
