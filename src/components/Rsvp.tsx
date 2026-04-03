'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type FormState = {
  name: string
  phone: string
  attending: boolean
  guests: number
  note: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function Rsvp() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    attending: true,
    guests: 1,
    note: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="rsvp"
      className="py-24 px-8"
      style={{ background: 'linear-gradient(135deg, #f9e4ec 0%, #fce4d6 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-10">
          <p className="section-label mb-3">Xác nhận tham dự</p>
          <div className="divider-rose" />
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-4"
          >
            <div className="text-5xl">💌</div>
            <h3 className="font-serif text-2xl text-rose-gold italic">Cảm ơn bạn!</h3>
            <p className="font-sans text-dusty-rose text-sm">
              Chúng tôi đã nhận được xác nhận của bạn và rất mong được gặp bạn trong ngày vui!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Họ tên của bạn *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder:text-dusty-rose/60"
            />
            <input
              type="tel"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder:text-dusty-rose/60"
            />

            <div className="flex gap-3">
              {[
                { value: true, label: '✅ Sẽ tham dự' },
                { value: false, label: '❌ Không thể đến' },
              ].map(({ value, label }) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => setForm({ ...form, attending: value })}
                  className={`flex-1 py-3 rounded-xl border font-sans text-sm transition-colors cursor-pointer ${
                    form.attending === value
                      ? 'bg-rose-gold text-white border-rose-gold'
                      : 'bg-white/80 text-dusty-rose border-rose-light hover:border-rose-gold'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {form.attending && (
              <div className="flex items-center gap-3">
                <label className="font-sans text-sm text-dusty-rose whitespace-nowrap">Số người:</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                  className="w-20 px-3 py-2 rounded-xl border border-rose-light bg-white/80 font-sans text-sm text-center focus:outline-none focus:ring-2 focus:ring-rose-gold/40"
                />
              </div>
            )}

            <textarea
              placeholder="Lời nhắn (không bắt buộc)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder:text-dusty-rose/60 resize-none"
            />

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Có lỗi xảy ra, vui lòng thử lại 🙏</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-rose-gold text-white rounded-xl font-sans font-light tracking-widest text-sm hover:bg-dusty-rose transition-colors disabled:opacity-60 cursor-pointer"
            >
              {status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận 💌'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
