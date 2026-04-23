'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MOBILE_SECTIONS = [
  { id: 'story',   label: 'Chuyện' },
  { id: 'wedding', label: 'Lễ cưới' },
  { id: 'schedule', label: 'Lịch trình' },
  { id: 'letter',  label: 'Thư ngỏ' },
  { id: 'gallery', label: 'Album' },
]

export function MobileNav() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
      for (const section of [...MOBILE_SECTIONS].reverse()) {
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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--color-paper)]/95 backdrop-blur-md border-t border-[var(--color-hairline)]"
          aria-label="Điều hướng di động"
        >
          <div
            className="flex items-end justify-around px-2 pt-3"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            {MOBILE_SECTIONS.map(({ id, label }) => {
              const isActive = activeId === id
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex flex-col items-center gap-1 min-w-0 flex-1 cursor-pointer"
                  aria-label={label}
                >
                  <div
                    className="w-4 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? 'var(--color-ink)'
                        : 'transparent',
                    }}
                  />
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase font-body transition-colors duration-300 truncate"
                    style={{
                      color: isActive ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    }}
                  >
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
