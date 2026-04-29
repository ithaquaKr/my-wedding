import type { Metadata } from 'next'
import { Playfair_Display, Inter, Corinthia, Dancing_Script, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { weddingConfig } from '@/config/wedding'

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const corinthia = Corinthia({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-script',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-handwrite',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-signature',
  display: 'swap',
})

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')

const title = `Thiệp Mời Cưới · ${weddingConfig.groom} & ${weddingConfig.bride} · 10.05.2026`
const description = `Trân trọng kính mời bạn đến dự lễ thành hôn của ${weddingConfig.groom} và ${weddingConfig.bride} vào ngày 10 tháng 05 năm 2026 tại Hà Nội. Nhấn để xem thiệp mời.`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,

  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: baseUrl,
    siteName: `${weddingConfig.groom} & ${weddingConfig.bride}`,
    title,
    description,
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },

  themeColor: '#fdeef3',

  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${inter.variable} ${corinthia.variable} ${dancingScript.variable} ${greatVibes.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

