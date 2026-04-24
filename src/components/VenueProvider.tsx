'use client'

import { createContext, useContext } from 'react'
import { useSearchParams } from 'next/navigation'
import { type Venue, brideVenue, groomVenue, weddingConfig } from '@/config/wedding'

const VenueContext = createContext<Venue>(weddingConfig.venue)

export function useVenue() {
  return useContext(VenueContext)
}

export function VenueProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const side = searchParams.get('side')
  const venue = side === 'bride' ? brideVenue : side === 'groom' ? groomVenue : weddingConfig.venue
  return <VenueContext.Provider value={venue}>{children}</VenueContext.Provider>
}
