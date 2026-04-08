import type { Metadata } from 'next'
import { Playfair_Display, Josefin_Sans, Dancing_Script } from 'next/font/google'
import './globals.css'
import { weddingConfig } from '@/config/wedding'

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const josefin = Josefin_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '600'],
  variable: '--font-lato',
})

const dancing = Dancing_Script({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: `Thiệp Cưới | ${weddingConfig.groom} & ${weddingConfig.bride}`,
  description: `Trân trọng kính mời bạn đến dự lễ cưới của ${weddingConfig.groom} và ${weddingConfig.bride}`,
  openGraph: {
    title: `${weddingConfig.groom} & ${weddingConfig.bride}`,
    description: 'Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày trọng đại',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${josefin.variable} ${dancing.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
