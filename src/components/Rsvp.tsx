'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'
import { Countdown } from './Countdown'

type FormState = {
  name: string
  attending: 'yes' | 'no' | ''
  guests: string
  message: string
}

const initial: FormState = {
  name: '',
  attending: '',
  guests: '1',
  message: '',
}

function buildMailto(data: FormState) {
  const subject = `RSVP – ${weddingConfig.groom} & ${weddingConfig.bride}`
  const lines = [
    `Họ và tên: ${data.name}`,
    `Tham dự: ${data.attending === 'yes' ? 'Có' : data.attending === 'no' ? 'Không' : ''}`,
    `Số khách: ${data.guests}`,
    '',
    'Lời nhắn:',
    data.message,
  ]
  const body = lines.join('\n')
  return `mailto:${weddingConfig.rsvpEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
}

export function Rsvp() {
  const [data, setData] = useState<FormState>(initial)

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = buildMailto(data)
  }

  return (
    <section
      id="rsvp"
      className="relative bg-[var(--color-cream)] py-28 md:py-36 px-6"
    >
      <div className="mx-auto max-w-7xl grid gap-12 md:gap-20 md:grid-cols-2 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="editorial-photo aspect-[4/5] w-full"
        >
          <Image
            src={weddingConfig.rsvpImage}
            alt="Couple portrait"
            width={1000}
            height={1250}
          />
        </motion.div>

        {/* Form column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
            XÁC <span className="italic font-normal">NHẬN</span>
          </h2>
          <p className="eyebrow mt-4">Tham dự cùng chúng tôi</p>
          <p className="mt-6 text-[var(--color-ink-muted)] leading-relaxed max-w-md">
            Vui lòng phản hồi trước ngày <strong>30/04/2026</strong> để chúng tôi
            có thể chuẩn bị chu đáo nhất cho ngày trọng đại.
          </p>

          <div className="mt-10">
            <Countdown />
          </div>

          <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="eyebrow block mb-2">Họ và tên</label>
              <input
                required
                type="text"
                value={data.name}
                onChange={handleChange('name')}
                className="input-line"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div>
              <label className="eyebrow block mb-3">Bạn có thể tham dự không?</label>
              <div className="flex gap-8">
                {(['yes', 'no'] as const).map((val) => (
                  <label
                    key={val}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={val}
                      checked={data.attending === val}
                      onChange={() => setData((p) => ({ ...p, attending: val }))}
                      className="accent-[var(--color-ink)]"
                    />
                    <span className="text-sm text-[var(--color-ink)]">
                      {val === 'yes' ? 'Có, chắc chắn rồi' : 'Rất tiếc, không thể'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow block mb-2">Số lượng khách</label>
              <input
                type="number"
                min={1}
                max={10}
                value={data.guests}
                onChange={handleChange('guests')}
                className="input-line"
              />
            </div>

            <div>
              <label className="eyebrow block mb-2">Lời nhắn gửi cô dâu chú rể</label>
              <textarea
                value={data.message}
                onChange={handleChange('message')}
                className="input-line resize-none"
                rows={3}
                placeholder="Vài lời chúc phúc..."
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-ink">
                Gửi xác nhận
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
