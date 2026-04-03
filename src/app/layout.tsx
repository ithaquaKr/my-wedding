import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'
import { weddingConfig } from '@/config/wedding'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
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
      <body className={`${cormorant.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
