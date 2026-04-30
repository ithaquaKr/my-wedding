import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { OurStory } from '@/components/OurStory'
import { TheWedding } from '@/components/TheWedding'
import { Map } from '@/components/Map'
import { GiftRegistry } from '@/components/GiftRegistry'
import { GuestLetter } from '@/components/GuestLetter'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'
import { Suspense } from 'react'
import { FloatingNav } from '@/components/FloatingNav'
import { MobileNav } from '@/components/MobileNav'
import { Divider } from '@/components/Divider'
import { InvitationOverlay } from '@/components/InvitationOverlay'
import { VenueProvider } from '@/components/VenueProvider'
import { weddingConfig } from '@/config/wedding'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')

type SearchParams = Promise<{ to?: string; side?: string; slot?: string }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { to, side = 'groom', slot } = await searchParams

  const baseTitle = `Thiệp Mời Cưới · ${weddingConfig.groom} & ${weddingConfig.bride} · 10.05.2026`
  const baseDesc = `Trân trọng kính mời bạn đến dự lễ thành hôn của ${weddingConfig.groom} và ${weddingConfig.bride} vào ngày 10 tháng 05 năm 2026 tại Hà Nội.`

  const title = to ? `Thiệp mời ${to} · ${weddingConfig.groom} & ${weddingConfig.bride}` : baseTitle
  const description = to
    ? `${weddingConfig.groom} & ${weddingConfig.bride} trân trọng kính mời ${to} đến dự lễ thành hôn ngày 10.05.2026 tại Hà Nội.`
    : baseDesc

  const ogParams = new URLSearchParams({ ...(to && { to }), side, ...(slot && { slot }) })
  const ogImageUrl = `${baseUrl}/api/og?${ogParams.toString()}`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: baseUrl,
      siteName: `${weddingConfig.groom} & ${weddingConfig.bride}`,
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function Home() {
  return (
    <Suspense>
      <VenueProvider>
        <>
          <main className="relative">
            <Hero />
            <GuestLetter />
            <OurStory />
            <Divider className="py-6" />
            <TheWedding />
            <Map />
            <Divider className="py-6" />
            <Gallery />
            <GiftRegistry />
          </main>
          <Footer />
          <FloatingNav />
          <MobileNav />
          <InvitationOverlay />
        </>
      </VenueProvider>
    </Suspense>
  )
}
