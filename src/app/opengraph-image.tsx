import { ImageResponse } from 'next/og'
import { weddingConfig } from '@/config/wedding'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Load Playfair Display (woff2) with Vietnamese support
  let fontDisplay: ArrayBuffer | null = null
  let fontBody: ArrayBuffer | null = null
  try {
    const cssRes = await fetch(
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=Inter:wght@300;400&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }
    )
    const css = await cssRes.text()
    const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)].map(m => m[1])

    if (urls[0]) fontDisplay = await fetch(urls[0]).then(r => r.arrayBuffer()).catch(() => null)
    if (urls[2]) fontBody = await fetch(urls[2]).then(r => r.arrayBuffer()).catch(() => null)
  } catch { /* fallback to system fonts */ }

  const groom = weddingConfig.groom.toUpperCase()
  const bride = weddingConfig.bride.toUpperCase()
  const date = '10 . 05 . 2026'

  type FontEntry = { name: string; data: ArrayBuffer; weight: number; style: 'normal' | 'italic' }
  const fonts: FontEntry[] = []
  if (fontDisplay) fonts.push({ name: 'Playfair Display', data: fontDisplay, weight: 600, style: 'normal' })
  if (fontBody) fonts.push({ name: 'Inter', data: fontBody, weight: 300, style: 'normal' })

  const displayFont = fontDisplay ? 'Playfair Display' : 'Georgia, serif'
  const bodyFont = fontBody ? 'Inter' : 'system-ui, sans-serif'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fdeef3',
          position: 'relative',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            inset: 28,
            border: '1px solid #f0c0d0',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 36,
            border: '1px solid #f8dce6',
            display: 'flex',
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            letterSpacing: '0.35em',
            color: '#8a4a64',
            textTransform: 'uppercase',
            margin: '0 0 36px',
            fontWeight: 300,
          }}
        >
          Trân trọng kính mời
        </p>

        {/* Names */}
        <h1
          style={{
            fontFamily: displayFont,
            fontSize: 88,
            color: '#2d1520',
            margin: '0 0 36px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          {groom}
          <span style={{ fontStyle: 'italic', fontWeight: 400, margin: '0 24px', color: '#8a4a64' }}>
            &amp;
          </span>
          {bride}
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            backgroundColor: '#d4a0b5',
            margin: '0 0 36px',
          }}
        />

        {/* Date */}
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 26,
            letterSpacing: '0.4em',
            color: '#8a4a64',
            margin: '0 0 12px',
            fontWeight: 300,
          }}
        >
          {date}
        </p>

        {/* Venue hint */}
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            letterSpacing: '0.2em',
            color: '#c49aaa',
            margin: 0,
            fontWeight: 300,
          }}
        >
          TP. Hồ Chí Minh
        </p>
      </div>
    ),
    { ...size, fonts }
  )
}
