'use client'

import { useState, useEffect } from 'react'
import { calculateCountdown, CountdownTime } from '@/lib/countdown'
import { weddingConfig } from '@/config/wedding'

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-[var(--color-ink)]">
        {String(value).padStart(3, '0')}
      </div>
      <div className="eyebrow mt-3">{label}</div>
    </div>
  )
}

export function Countdown() {
  const [time, setTime] = useState<CountdownTime | null>(null)

  useEffect(() => {
    setTime(calculateCountdown(weddingConfig.weddingDate))
    const timer = setInterval(() => {
      setTime(calculateCountdown(weddingConfig.weddingDate))
    }, 60_000)
    return () => clearInterval(timer)
  }, [])

  if (!time) {
    return <div className="h-40" aria-hidden />
  }

  if (time.isPast) {
    return (
      <p className="font-display text-3xl italic text-[var(--color-ink)] text-center">
        Hôm nay là ngày trọng đại
      </p>
    )
  }

  return (
    <div className="flex items-end justify-center gap-8 sm:gap-14 md:gap-20">
      <Unit value={time.days} label="Ngày" />
      <div className="hidden sm:block h-20 w-px bg-[var(--color-hairline)]" />
      <Unit value={time.hours} label="Giờ" />
      <div className="hidden sm:block h-20 w-px bg-[var(--color-hairline)]" />
      <Unit value={time.minutes} label="Phút" />
    </div>
  )
}
