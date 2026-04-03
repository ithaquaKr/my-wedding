import { createClient } from '@supabase/supabase-js'

export type RsvpRow = {
  id: string
  created_at: string
  name: string
  phone: string
  attending: boolean
  guests: number
  note: string | null
}

export type WishRow = {
  id: string
  created_at: string
  name: string
  message: string
}

export type Database = {
  public: {
    Tables: {
      rsvp: {
        Row: RsvpRow
        Insert: Omit<RsvpRow, 'id' | 'created_at'>
      }
      wishes: {
        Row: WishRow
        Insert: Omit<WishRow, 'id' | 'created_at'>
      }
    }
  }
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
