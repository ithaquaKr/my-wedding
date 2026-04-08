'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculateCountdown, CountdownTime } from '@/lib/countdown'
import { weddingConfig } from '@/config/wedding'

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl text-rose-gold font-light w-12 sm:w-16 md:w-20 text-center"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="section-label text-xs">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [time, setTime] = useState<CountdownTime | null>(null)

  useEffect(() => {
    // Only calculate on client to avoid SSR/client hydration mismatch
    setTime(calculateCountdown(weddingConfig.weddingDate))
    const timer = setInterval(() => {
      setTime(calculateCountdown(weddingConfig.weddingDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="countdown" className="py-24 px-4 md:px-8 bg-ivory text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-10"
      >
        <p className="section-label">Ngày trọng đại còn</p>

        {!time ? null : time.isPast ? (
          <p className="font-serif text-3xl text-rose-gold italic">
            Hôm nay là ngày trọng đại! 🎊
          </p>
        ) : (
          <div className="flex items-start justify-center gap-1 sm:gap-4 md:gap-8">
            <CountdownUnit value={time.days} label="Ngày" />
            <span className="font-serif text-2xl sm:text-4xl text-rose-light mt-1 sm:mt-2">:</span>
            <CountdownUnit value={time.hours} label="Giờ" />
            <span className="font-serif text-2xl sm:text-4xl text-rose-light mt-1 sm:mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Phút" />
            <span className="font-serif text-2xl sm:text-4xl text-rose-light mt-1 sm:mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Giây" />
          </div>
        )}

        <div className="divider-rose" />
      </motion.div>
    </section>
  )
}
