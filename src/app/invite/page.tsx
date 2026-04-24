'use client'

import { useState } from 'react'
import { weddingConfig } from '@/config/wedding'

type Side = 'groom' | 'bride'

const SIDE_OPTIONS: { value: Side; label: string; sub: string }[] = [
  { value: 'groom', label: 'Bên nhà trai', sub: 'Khách của chú rể' },
  { value: 'bride', label: 'Bên nhà gái', sub: 'Khách của cô dâu' },
]

export default function InvitePage() {
  const [name, setName] = useState('')
  const [side, setSide] = useState<Side>('groom')
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const generatedUrl = name.trim()
    ? `${baseUrl}/?to=${encodeURIComponent(name.trim())}&side=${side}`
    : ''

  const handleCopy = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">Công cụ tạo thiệp mời</p>
          <h1 className="font-display text-[clamp(2rem,6vw,3rem)] text-[var(--color-ink)] leading-tight">
            {weddingConfig.groom}{' '}
            <span className="italic font-normal">&amp; {weddingConfig.bride}</span>
          </h1>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
            Nhập tên khách mời để tạo link thiệp cá nhân hoá
          </p>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[var(--color-hairline)]" />
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="6" y="6" width="8" height="8" transform="rotate(45 10 10)"
              fill="none" stroke="var(--color-hairline)" strokeWidth="1" />
            <circle cx="10" cy="10" r="1.5" fill="var(--color-ink-muted)" />
          </svg>
          <div className="flex-1 h-px bg-[var(--color-hairline)]" />
        </div>

        {/* Side selector */}
        <div className="mb-8">
          <p className="eyebrow block mb-3">Phía khách mời</p>
          <div className="grid grid-cols-2 gap-3">
            {SIDE_OPTIONS.map((opt) => {
              const active = side === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setSide(opt.value)}
                  className="flex flex-col items-center gap-1 py-4 px-3 border transition-colors duration-200 cursor-pointer"
                  style={{
                    borderColor: active ? 'var(--color-ink)' : 'var(--color-hairline)',
                    background: active ? 'var(--color-ink)' : 'transparent',
                    color: active ? 'var(--color-cream)' : 'var(--color-ink)',
                  }}
                >
                  <span className="text-[11px] tracking-[0.22em] uppercase font-body font-medium">
                    {opt.label}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.06em]"
                    style={{ color: active ? 'rgba(253,238,243,0.7)' : 'var(--color-ink-muted)' }}
                  >
                    {opt.sub}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-6">
          <label htmlFor="guest-name" className="eyebrow block mb-3">
            Tên người nhận
          </label>
          <input
            id="guest-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn An"
            className="w-full border border-[var(--color-hairline)] bg-transparent px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors duration-200 font-body text-sm"
          />
        </div>

        {/* Generated URL */}
        {generatedUrl && (
          <div className="mb-6">
            <p className="eyebrow mb-3">Link thiệp mời</p>
            <div className="border border-[var(--color-hairline)] px-4 py-3 text-xs text-[var(--color-ink-muted)] break-all font-mono leading-relaxed">
              {generatedUrl}
            </div>
          </div>
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          disabled={!generatedUrl}
          className="w-full border border-[var(--color-ink)] px-6 py-3 text-[10px] tracking-[0.3em] uppercase text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {copied ? 'Đã sao chép ✓' : 'Sao chép link'}
        </button>

        {/* Preview link */}
        {generatedUrl && (
          <p className="mt-4 text-center text-xs text-[var(--color-ink-muted)]">
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              Xem trước thiệp →
            </a>
          </p>
        )}
      </div>
    </main>
  )
}
