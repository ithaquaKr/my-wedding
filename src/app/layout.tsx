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

export const metadata: Metadata = {
  title: `${weddingConfig.groom} & ${weddingConfig.bride} | Đám cưới`,
  description: `Trân trọng kính mời bạn đến dự lễ cưới của ${weddingConfig.groom} và ${weddingConfig.bride}`,
  openGraph: {
    title: `${weddingConfig.groom} & ${weddingConfig.bride}`,
    description: 'Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại',
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

