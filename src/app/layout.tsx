import type { Metadata } from 'next'
import { Playfair_Display, Inter, Italianno } from 'next/font/google'
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

const italianno = Italianno({
  subsets: ['latin', 'vietnamese'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${weddingConfig.groom} & ${weddingConfig.bride} | Wedding`,
  description: `Trân trọng kính mời bạn đến dự lễ cưới của ${weddingConfig.groom} và ${weddingConfig.bride}`,
  openGraph: {
    title: `${weddingConfig.groom} & ${weddingConfig.bride}`,
    description: 'Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${inter.variable} ${italianno.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
