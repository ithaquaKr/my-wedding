'use client'

import { useState, useEffect } from 'react'
import { Opening } from '@/components/Opening'
import { Hero } from '@/components/Hero'
import { Countdown } from '@/components/Countdown'
import { OurStory } from '@/components/OurStory'
import { Gallery } from '@/components/Gallery'
import { Rsvp } from '@/components/Rsvp'
import { Map } from '@/components/Map'
import { Wishes } from '@/components/Wishes'
import { FloatingNav } from '@/components/FloatingNav'
import { weddingConfig } from '@/config/wedding'

export default function Home() {
  const [opened, setOpened] = useState(false)

  // Skip opening screen if already seen this session
  useEffect(() => {
    if (sessionStorage.getItem('wedding-opened') === 'true') {
      setOpened(true)
    }
  }, [])

  const handleOpen = () => {
    sessionStorage.setItem('wedding-opened', 'true')
    setOpened(true)
  }

  return (
    <>
      {!opened && <Opening onOpen={handleOpen} />}
      <main>
        <Hero />
        <Countdown />
        <OurStory />
        <Gallery />
        <Rsvp />
        <Map />
        <Wishes />
      </main>
      <FloatingNav />
      <footer className="py-10 text-center" style={{ background: 'rgba(249,228,236,0.4)' }}>
        <p className="font-serif text-dusty-rose italic text-lg">
          {weddingConfig.groom} & {weddingConfig.bride}
        </p>
        <p className="font-sans text-xs text-rose-light mt-2 tracking-widest">
          Made with 💕
        </p>
      </footer>
    </>
  )
}
