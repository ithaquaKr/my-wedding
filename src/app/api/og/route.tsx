import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import { weddingConfig } from '@/config/wedding'

export const runtime = 'edge'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const to = searchParams.get('to')
  const side = searchParams.get('side') || 'groom'

  const [fontDisplay, fontBody] = await Promise.all([
    fetch(`${siteUrl}/fonts/PlayfairDisplay-600-vi.woff2`).then(r => r.arrayBuffer()).catch(() => null),
    fetch(`${siteUrl}/fonts/Inter-300-vi.woff2`).then(r => r.arrayBuffer()).catch(() => null),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fontOptions: any[] = [
    ...(fontDisplay ? [{ name: 'Playfair Display', data: fontDisplay, weight: 600, style: 'normal' }] : []),
    ...(fontBody ? [{ name: 'Inter', data: fontBody, weight: 300, style: 'normal' }] : []),
  ]

  const displayFont = fontDisplay ? 'Playfair Display' : 'Georgia, serif'
  const bodyFont = fontBody ? 'Inter' : 'system-ui, sans-serif'

  const groom = weddingConfig.groom.toUpperCase()
  const bride = weddingConfig.bride.toUpperCase()
  const sideLabel = side === 'bride' ? 'Bên nhà gái' : 'Bên nhà trai'

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
        <div style={{ position: 'absolute', inset: 28, border: '1px solid #f0c0d0', display: 'flex' }} />
        <div style={{ position: 'absolute', inset: 36, border: '1px solid #f8dce6', display: 'flex' }} />

        {/* Headline */}
        <p style={{ fontFamily: bodyFont, fontSize: 16, letterSpacing: '0.45em', color: '#8a4a64', textTransform: 'uppercase', margin: '0 0 20px', fontWeight: 300 }}>
          Thiệp Cưới
        </p>

        {/* Guest greeting */}
        {to ? (
          <p style={{ fontFamily: bodyFont, fontSize: 16, letterSpacing: '0.2em', color: '#b07090', margin: '0 0 10px', fontWeight: 300 }}>
            Kính mời: <span style={{ fontWeight: 400, color: '#7a3854' }}>{to}</span>
          </p>
        ) : (
          <p style={{ fontFamily: bodyFont, fontSize: 16, letterSpacing: '0.35em', color: '#b07090', textTransform: 'uppercase', margin: '0 0 10px', fontWeight: 300 }}>
            Trân trọng kính mời
          </p>
        )}

        {/* Side label */}
        {to && (
          <p style={{ fontFamily: bodyFont, fontSize: 13, letterSpacing: '0.3em', color: '#c49aaa', textTransform: 'uppercase', margin: '0 0 24px', fontWeight: 300 }}>
            {sideLabel}
          </p>
        )}

        {!to && (
          <div style={{ margin: '0 0 24px' }} />
        )}

        {/* Names */}
        <h1 style={{ fontFamily: displayFont, fontSize: 84, color: '#2d1520', margin: '0 0 32px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, textAlign: 'center' }}>
          {groom}
          <span style={{ fontStyle: 'italic', fontWeight: 400, margin: '0 24px', color: '#8a4a64' }}>&amp;</span>
          {bride}
        </h1>

        {/* Divider */}
        <div style={{ width: 80, height: 1, backgroundColor: '#d4a0b5', margin: '0 0 32px' }} />

        {/* Date */}
        <p style={{ fontFamily: bodyFont, fontSize: 24, letterSpacing: '0.4em', color: '#8a4a64', margin: '0 0 10px', fontWeight: 300 }}>
          10 . 05 . 2026
        </p>

        {/* Location */}
        <p style={{ fontFamily: bodyFont, fontSize: 15, letterSpacing: '0.2em', color: '#c49aaa', margin: '0 0 40px', fontWeight: 300 }}>
          Hà Nội
        </p>

        {/* CTA */}
        <p style={{ fontFamily: bodyFont, fontSize: 13, letterSpacing: '0.25em', color: '#d4a0b5', margin: 0, fontWeight: 300, textTransform: 'uppercase' }}>
          Nhấn để xem thiệp mời →
        </p>
      </div>
    ),
    { width: 1200, height: 630, fonts: fontOptions }
  )
}
