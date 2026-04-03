'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, WishRow } from '@/lib/supabase'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`
  return `${Math.floor(hours / 24)} ngày trước`
}

function WishCard({ wish }: { wish: WishRow }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-rose-light shadow-sm"
    >
      <p className="font-sans text-sm text-gray-600 leading-relaxed italic mb-3">
        &ldquo;{wish.message}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <p className="font-serif text-rose-gold text-sm">— {wish.name}</p>
        <p className="font-sans text-xs text-gray-400">{timeAgo(wish.created_at)}</p>
      </div>
    </motion.div>
  )
}

export function Wishes() {
  const [wishes, setWishes] = useState<WishRow[]>([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  useEffect(() => {
    supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setWishes(data)
      })
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => [payload.new as WishRow, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setForm({ name: '', message: '' })
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="wishes" className="py-24 px-8" style={{ background: '#fffaf8' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <p className="section-label mb-3">Lời chúc yêu thương</p>
          <div className="divider-rose" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-xl text-rose-gold italic mb-6">Để lại lời chúc 💬</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên của bạn *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder:text-dusty-rose/60"
              />
              <textarea
                placeholder="Lời chúc của bạn... *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder:text-dusty-rose/60 resize-none"
              />
              {status === 'error' && (
                <p className="text-red-400 text-sm">Có lỗi xảy ra, vui lòng thử lại 🙏</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-rose-gold text-white rounded-xl font-sans text-sm tracking-widest hover:bg-dusty-rose transition-colors disabled:opacity-60 cursor-pointer"
              >
                {status === 'loading' ? 'Đang gửi...' : 'Gửi lời chúc 🌸'}
              </button>
            </form>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {wishes.length === 0 ? (
                <p className="text-dusty-rose/60 text-sm font-sans text-center py-8">
                  Hãy là người đầu tiên gửi lời chúc! 🌸
                </p>
              ) : (
                wishes.map((wish) => <WishCard key={wish.id} wish={wish} />)
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
