import { Hero } from '@/components/Hero'
import { OurStory } from '@/components/OurStory'
import { TheWedding } from '@/components/TheWedding'
import { Schedule } from '@/components/Schedule'
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

export default function Home() {
  return (
    <>
      <main>
        <Hero />
<OurStory />
        <Divider className="py-6" />
        <TheWedding />
        <Schedule />
        <Map />
        <TravelStay />
        <GiftRegistry />
        <GuestLetter />
        <Divider className="py-6" />
        <Gallery />
      </main>
      <Footer />
      <FloatingNav />
      <MobileNav />
      <Suspense>
        <InvitationOverlay />
      </Suspense>
    </>
  )
}
