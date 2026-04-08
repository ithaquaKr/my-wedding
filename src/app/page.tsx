import { Hero } from '@/components/Hero'
import { ImportantDates } from '@/components/ImportantDates'
import { OurStory } from '@/components/OurStory'
import { TheWedding } from '@/components/TheWedding'
import { Schedule } from '@/components/Schedule'
import { Map } from '@/components/Map'
import { TravelStay } from '@/components/TravelStay'
import { GiftRegistry } from '@/components/GiftRegistry'
import { Rsvp } from '@/components/Rsvp'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'
import { FloatingNav } from '@/components/FloatingNav'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ImportantDates />
        <OurStory />
        <TheWedding />
        <Schedule />
        <Map />
        <TravelStay />
        <GiftRegistry />
        <Rsvp />
        <Gallery />
      </main>
      <Footer />
      <FloatingNav />
    </>
  )
}
