import { Hero } from '@/components/Hero'
import { OurStory } from '@/components/OurStory'
import { TheWedding } from '@/components/TheWedding'
import { Map } from '@/components/Map'
import { TravelStay } from '@/components/TravelStay'
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
            <TravelStay />
            <GiftRegistry />
            <Divider className="py-6" />
            <Gallery />
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
