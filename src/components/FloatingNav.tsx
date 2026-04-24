'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',     label: 'Trang chủ' },
  { id: 'letter',   label: 'Thư ngỏ' },
  { id: 'story',    label: 'Câu chuyện' },
  { id: 'wedding',  label: 'Lễ cưới' },
  { id: 'venue',    label: 'Địa điểm' },
  { id: 'travel',   label: 'Lưu trú' },
  { id: 'registry', label: 'Quà cưới' },
  { id: 'gallery',  label: 'Album' },
]

export function FloatingNav() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [visible, setVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
          aria-label="Điều hướng"
        >
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              title={label}
              aria-label={label}
              className="flex items-center justify-end gap-3 cursor-pointer min-h-[44px] min-w-[44px]"
            >
              <AnimatePresence>
                {hoveredId === id && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)] bg-[var(--color-cream-soft)] px-3 py-1 border border-[var(--color-hairline)] whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              <div
                className={`h-px transition-all duration-300 ${
                  activeId === id
                    ? 'w-8 bg-[var(--color-ink)]'
                    : 'w-4 bg-[var(--color-hairline)] hover:bg-[var(--color-ink-muted)]'
                }`}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
