# Wedding Invitation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a beautiful romantic wedding invitation website for Tuấn Hiệp & Khánh Linh with an opening animation, 7 content sections, RSVP form, and realtime guestbook.

**Architecture:** Next.js 14 App Router single-page app. All personalizable content lives in `src/config/wedding.ts`. Supabase handles data persistence for RSVP and wishes; Supabase Realtime pushes new wishes to all connected clients. API routes validate and insert server-side using the service role key.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Supabase (@supabase/supabase-js), Google Fonts (Cormorant Garamond + Lato), Vercel

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/config/wedding.ts` | All wedding variables (names, dates, story, images) |
| `src/lib/supabase.ts` | Browser-side Supabase client + DB types |
| `src/lib/supabase-server.ts` | Server-side admin client (service role) |
| `src/lib/countdown.ts` | Pure `calculateCountdown()` function |
| `src/lib/__tests__/countdown.test.ts` | Unit tests for countdown logic |
| `src/app/layout.tsx` | Root layout: fonts, metadata, global styles |
| `src/app/globals.css` | Global CSS: Tailwind base + petal animation keyframes |
| `src/app/page.tsx` | Main page: assembles all sections, manages opening state |
| `src/app/api/rsvp/route.ts` | POST /api/rsvp — validates + inserts to Supabase |
| `src/app/api/wishes/route.ts` | POST /api/wishes — validates + inserts to Supabase |
| `src/app/api/rsvp/__tests__/route.test.ts` | Unit tests for RSVP route |
| `src/app/api/wishes/__tests__/route.test.ts` | Unit tests for wishes route |
| `src/components/Opening.tsx` | Full-screen envelope opening animation overlay |
| `src/components/Hero.tsx` | Full-screen hero: names, date, venue |
| `src/components/Countdown.tsx` | Real-time countdown timer |
| `src/components/OurStory.tsx` | Vertical timeline of story milestones |
| `src/components/Gallery.tsx` | CSS Grid photo gallery |
| `src/components/Lightbox.tsx` | Fullscreen lightbox for gallery images |
| `src/components/Rsvp.tsx` | RSVP form with submit logic |
| `src/components/Map.tsx` | Google Maps embed + directions link |
| `src/components/Wishes.tsx` | Guestbook: wish form + realtime wish list |
| `src/components/FloatingNav.tsx` | Sticky dot navigation, highlights active section |
| `.env.local.example` | Template for required environment variables |
| `.claude/launch.json` | Dev server configuration for Claude Code |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `jest.config.ts`, `jest.setup.ts`

- [ ] **Step 1: Create Next.js app**

Run inside `/Users/ithaqua/work/project/my-wedding`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
When prompted, accept all defaults.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion @supabase/supabase-js
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest ts-jest
```

- [ ] **Step 3: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to `package.json`**

Open `package.json` and add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Run tests to verify Jest is configured**

```bash
npm test -- --passWithNoTests
```
Expected: `Test Suites: 0 passed`

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Jest"
```

---

## Task 2: Configure Tailwind Romantic Theme

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f9e4ec',
        'rose-gold': '#c0607a',
        'dusty-rose': '#b08090',
        peach: '#fce4d6',
        ivory: '#fffaf8',
        'rose-light': '#f0d0e0',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "chore: configure Tailwind romantic color palette"
```

---

## Task 3: Wedding Config

**Files:**
- Create: `src/config/wedding.ts`

- [ ] **Step 1: Create `src/config/wedding.ts`**

```typescript
export type StoryMilestone = {
  date: string
  title: string
  description: string
  photo: string | null
}

export type WeddingConfig = {
  groom: string
  bride: string
  weddingDate: string // ISO datetime string, e.g. "2026-12-12T10:00:00"
  venueName: string
  venueAddress: string
  venueMapEmbedUrl: string
  venueDirectionsUrl: string
  story: StoryMilestone[]
  galleryImages: string[]
}

export const weddingConfig: WeddingConfig = {
  groom: 'Nguyễn Tuấn Hiệp',
  bride: 'Trương Khánh Linh',
  weddingDate: '2026-12-12T10:00:00', // ← THAY NGÀY THỰC TẾ
  venueName: '[TÊN NHÀ HÀNG / TRUNG TÂM TIỆC CƯỚI]',
  venueAddress: '[ĐỊA CHỈ ĐẦY ĐỦ]',
  venueMapEmbedUrl: '[GOOGLE_MAPS_EMBED_URL]', // https://maps.google.com/maps?...&output=embed
  venueDirectionsUrl: '[GOOGLE_MAPS_DIRECTIONS_URL]', // https://maps.google.com/maps?daddr=...
  story: [
    {
      date: '[THÁNG NĂM GẶP NHAU]',
      title: 'Lần đầu gặp nhau',
      description: '[MÔ TẢ CÂU CHUYỆN LẦN ĐẦU GẶP NHAU]',
      photo: null, // hoặc '/images/story-1.jpg'
    },
    {
      date: '[THÁNG NĂM CẦU HÔN]',
      title: 'Anh cầu hôn em',
      description: '[MÔ TẢ CÂU CHUYỆN CẦU HÔN]',
      photo: null,
    },
    {
      date: '[NGÀY CƯỚI]',
      title: 'Ngày chúng tôi về một nhà 💍',
      description: '[LỜI NHẮN NGẮN]',
      photo: null,
    },
  ],
  galleryImages: [
    // Thêm đường dẫn ảnh vào đây, ví dụ:
    // '/images/gallery-1.jpg',
    // '/images/gallery-2.jpg',
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/config/wedding.ts
git commit -m "feat: add wedding config with placeholder variables"
```

---

## Task 4: Supabase Client + Database Schema

**Files:**
- Create: `src/lib/supabase.ts`, `src/lib/supabase-server.ts`, `.env.local.example`

- [ ] **Step 1: Create `.env.local.example`**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Copy to `.env.local` and fill in real values from Supabase dashboard.

- [ ] **Step 2: Create the Supabase tables**

In Supabase dashboard → SQL editor, run:

```sql
-- RSVP table
create table public.rsvp (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  phone text not null,
  attending boolean not null,
  guests integer not null default 1,
  note text
);

alter table public.rsvp enable row level security;
create policy "Allow insert for all" on public.rsvp for insert with check (true);
create policy "Allow select for service role" on public.rsvp for select using (auth.role() = 'service_role');

-- Wishes table
create table public.wishes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  message text not null
);

alter table public.wishes enable row level security;
create policy "Allow insert for all" on public.wishes for insert with check (true);
create policy "Allow select for all" on public.wishes for select using (true);
```

- [ ] **Step 3: Enable Realtime for wishes table**

In Supabase dashboard → Database → Replication → enable `wishes` table for INSERT events.

- [ ] **Step 4: Create `src/lib/supabase.ts`**

```typescript
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
```

- [ ] **Step 5: Create `src/lib/supabase-server.ts`**

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/ .env.local.example
git commit -m "feat: add Supabase clients and DB schema"
```

---

## Task 5: Countdown Utility (TDD)

**Files:**
- Create: `src/lib/countdown.ts`, `src/lib/__tests__/countdown.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/countdown.test.ts`:

```typescript
import { calculateCountdown } from '../countdown'

describe('calculateCountdown', () => {
  it('returns correct breakdown for a future date exactly 1 day away', () => {
    const target = '2030-01-02T00:00:00'
    const now = new Date('2030-01-01T00:00:00')
    const result = calculateCountdown(target, now)
    expect(result).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0, isPast: false })
  })

  it('returns isPast=true and zeros for a past date', () => {
    const target = '2020-01-01T00:00:00'
    const now = new Date('2026-01-01T00:00:00')
    const result = calculateCountdown(target, now)
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
  })

  it('calculates hours and minutes correctly', () => {
    const target = '2030-01-01T10:30:45'
    const now = new Date('2030-01-01T08:00:00')
    const result = calculateCountdown(target, now)
    expect(result.days).toBe(0)
    expect(result.hours).toBe(2)
    expect(result.minutes).toBe(30)
    expect(result.seconds).toBe(45)
    expect(result.isPast).toBe(false)
  })

  it('uses current time when now is not provided', () => {
    const farFuture = '2099-01-01T00:00:00'
    const result = calculateCountdown(farFuture)
    expect(result.isPast).toBe(false)
    expect(result.days).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- src/lib/__tests__/countdown.test.ts
```
Expected: FAIL with `Cannot find module '../countdown'`

- [ ] **Step 3: Create `src/lib/countdown.ts`**

```typescript
export type CountdownTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

export function calculateCountdown(
  targetDate: string,
  now: Date = new Date()
): CountdownTime {
  const target = new Date(targetDate)
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isPast: false }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- src/lib/__tests__/countdown.test.ts
```
Expected: `Tests: 4 passed`

- [ ] **Step 5: Commit**

```bash
git add src/lib/countdown.ts src/lib/__tests__/countdown.test.ts
git commit -m "feat: add calculateCountdown utility with tests"
```

---

## Task 6: Root Layout + Global Styles

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #fffaf8;
  color: #4a3040;
}

/* Falling petals animation */
@keyframes petalFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.petal {
  position: absolute;
  width: 12px;
  height: 16px;
  background: #f9e4ec;
  border-radius: 50% 0 50% 0;
  animation: petalFall linear infinite;
  opacity: 0.8;
}

.petal:nth-child(1)  { left: 5%;  animation-duration: 4.5s; animation-delay: 0s;    width: 10px; height: 14px; }
.petal:nth-child(2)  { left: 15%; animation-duration: 5.2s; animation-delay: 0.5s;  background: #fce4d6; }
.petal:nth-child(3)  { left: 25%; animation-duration: 4.8s; animation-delay: 1.2s;  width: 8px; height: 12px; }
.petal:nth-child(4)  { left: 35%; animation-duration: 5.5s; animation-delay: 0.3s;  background: #f0d0e0; }
.petal:nth-child(5)  { left: 45%; animation-duration: 4.2s; animation-delay: 1.8s;  }
.petal:nth-child(6)  { left: 55%; animation-duration: 5.8s; animation-delay: 0.7s;  background: #fce4d6; width: 14px; height: 18px; }
.petal:nth-child(7)  { left: 65%; animation-duration: 4.6s; animation-delay: 2.1s;  }
.petal:nth-child(8)  { left: 75%; animation-duration: 5.1s; animation-delay: 0.9s;  background: #f0d0e0; }
.petal:nth-child(9)  { left: 85%; animation-duration: 4.9s; animation-delay: 1.5s;  width: 9px; height: 13px; }
.petal:nth-child(10) { left: 92%; animation-duration: 5.4s; animation-delay: 0.2s;  background: #fce4d6; }
.petal:nth-child(11) { left: 10%; animation-duration: 6.0s; animation-delay: 2.8s;  }
.petal:nth-child(12) { left: 70%; animation-duration: 4.3s; animation-delay: 3.2s;  background: #f9e4ec; width: 11px; height: 15px; }

/* Thin divider line */
.divider-rose {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #c0607a, transparent);
  margin: 0 auto;
}

/* Section label */
.section-label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #b08090;
}
```

- [ ] **Step 2: Replace `src/app/layout.tsx`**

```typescript
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
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: Compiled successfully with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add root layout with Cormorant Garamond + Lato fonts and petal animation CSS"
```

---

## Task 7: Opening Animation Component

**Files:**
- Create: `src/components/Opening.tsx`

- [ ] **Step 1: Create `src/components/Opening.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

interface OpeningProps {
  onOpen: () => void
}

export function Opening({ onOpen }: OpeningProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      setIsDone(true)
      onOpen()
    }, 1200)
  }

  if (isDone) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f9e4ec 0%, #fce4d6 100%)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: isOpening ? 0.6 : 0 }}
      >
        {/* Falling petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="petal" />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
          <motion.div
            animate={isOpening ? { scale: 1.3, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-7xl md:text-8xl select-none"
          >
            ✉️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <p className="font-serif text-rose-gold text-xl md:text-2xl italic">
              Bạn có một thiệp mời...
            </p>
            <p className="section-label text-dusty-rose">
              {weddingConfig.groom} & {weddingConfig.bride}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {!isOpening && (
              <button
                onClick={handleOpen}
                className="px-10 py-3 bg-rose-gold text-white rounded-full font-sans font-light tracking-widest text-sm hover:bg-dusty-rose transition-colors duration-300 shadow-md"
              >
                Mở thiệp ✨
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Opening.tsx
git commit -m "feat: add Opening animation component with envelope and falling petals"
```

---

## Task 8: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Hero() {
  const date = new Date(weddingConfig.weddingDate)
  const formattedDate = date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #f9e4ec 0%, #fffaf8 100%)' }}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute top-8 right-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute bottom-8 left-8 text-rose-light text-4xl opacity-40 select-none">❀</div>
      <div className="absolute bottom-8 right-8 text-rose-light text-4xl opacity-40 select-none">❀</div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="space-y-6 max-w-lg"
      >
        <p className="section-label">Trân trọng kính mời</p>

        <div className="space-y-2">
          <h1 className="font-serif text-5xl md:text-7xl text-rose-gold italic font-light">
            {weddingConfig.groom}
          </h1>
          <p className="font-serif text-2xl text-dusty-rose">&</p>
          <h1 className="font-serif text-5xl md:text-7xl text-rose-gold italic font-light">
            {weddingConfig.bride}
          </h1>
        </div>

        <div className="divider-rose my-6" />

        <div className="space-y-2 text-dusty-rose">
          <p className="font-serif text-lg italic">{formattedDate}</p>
          <p className="font-sans text-sm tracking-wide">{weddingConfig.venueName}</p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-rose-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section"
```

---

## Task 9: Countdown Component

**Files:**
- Create: `src/components/Countdown.tsx`

- [ ] **Step 1: Create `src/components/Countdown.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculateCountdown, CountdownTime } from '@/lib/countdown'
import { weddingConfig } from '@/config/wedding'

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-6xl text-rose-gold font-light w-20 text-center"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="section-label text-xs">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [time, setTime] = useState<CountdownTime>(() =>
    calculateCountdown(weddingConfig.weddingDate)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateCountdown(weddingConfig.weddingDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="countdown" className="py-24 px-8 bg-ivory text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-10"
      >
        <p className="section-label">Ngày trọng đại còn</p>

        {time.isPast ? (
          <p className="font-serif text-3xl text-rose-gold italic">
            Hôm nay là ngày trọng đại! 🎊
          </p>
        ) : (
          <div className="flex items-start justify-center gap-4 md:gap-8">
            <CountdownUnit value={time.days} label="Ngày" />
            <span className="font-serif text-4xl text-rose-light mt-2">:</span>
            <CountdownUnit value={time.hours} label="Giờ" />
            <span className="font-serif text-4xl text-rose-light mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Phút" />
            <span className="font-serif text-4xl text-rose-light mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Giây" />
          </div>
        )}

        <div className="divider-rose" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Countdown.tsx
git commit -m "feat: add real-time Countdown section"
```

---

## Task 10: OurStory Component

**Files:**
- Create: `src/components/OurStory.tsx`

- [ ] **Step 1: Create `src/components/OurStory.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingConfig, StoryMilestone } from '@/config/wedding'

function MilestoneItem({
  milestone,
  index,
}: {
  milestone: StoryMilestone
  index: number
}) {
  const isLast = index === weddingConfig.story.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`relative flex items-start gap-6 md:gap-10 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 border-rose-gold ${
            isLast ? 'bg-rose-gold' : 'bg-white'
          }`}
        />
      </div>

      {/* Content */}
      <div
        className={`ml-8 md:ml-0 md:w-5/12 ${
          index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
        }`}
      >
        <p className="section-label text-rose-gold mb-1">{milestone.date}</p>
        <h3 className="font-serif text-xl text-dusty-rose italic mb-2">{milestone.title}</h3>
        <p className="font-sans text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
        {milestone.photo && (
          <div className="mt-3 rounded-xl overflow-hidden inline-block">
            <Image
              src={milestone.photo}
              alt={milestone.title}
              width={200}
              height={140}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function OurStory() {
  return (
    <section id="story" className="py-24 px-8" style={{ background: '#fffaf8' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Câu chuyện của chúng tôi</p>
          <div className="divider-rose" />
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-rose-light md:-translate-x-1/2" />

          <div className="space-y-12">
            {weddingConfig.story.map((milestone, index) => (
              <MilestoneItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/OurStory.tsx
git commit -m "feat: add OurStory timeline section"
```

---

## Task 11: Gallery + Lightbox

**Files:**
- Create: `src/components/Gallery.tsx`, `src/components/Lightbox.tsx`

- [ ] **Step 1: Create `src/components/Lightbox.tsx`**

```typescript
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LightboxProps {
  images: string[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {currentIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-rose-light transition-colors"
            onClick={onClose}
            aria-label="Đóng"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-rose-light transition-colors px-2"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Ảnh ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh] rounded-lg"
            />
            <p className="text-center text-white/60 text-sm mt-3">
              {currentIndex + 1} / {images.length}
            </p>
          </motion.div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-rose-light transition-colors px-2"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Ảnh tiếp"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Create `src/components/Gallery.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingConfig } from '@/config/wedding'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = weddingConfig.galleryImages

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))

  if (images.length === 0) return null

  return (
    <section id="gallery" className="py-24 px-8 bg-blush/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Bộ ảnh của chúng tôi</p>
          <div className="divider-rose" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-xl"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Ảnh ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-rose-gold/0 group-hover:bg-rose-gold/20 transition-colors duration-300 rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.tsx src/components/Lightbox.tsx
git commit -m "feat: add Gallery section with lightbox"
```

---

## Task 12: RSVP API Route (TDD) + Component

**Files:**
- Create: `src/app/api/rsvp/route.ts`, `src/app/api/rsvp/__tests__/route.test.ts`, `src/components/Rsvp.tsx`

- [ ] **Step 1: Write failing tests for RSVP route**

Create `src/app/api/rsvp/__tests__/route.test.ts`:

```typescript
import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock supabase-server
jest.mock('@/lib/supabase-server', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/rsvp', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/rsvp', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ phone: '0901234567', attending: true }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  it('returns 400 when phone is missing', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A', attending: true }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeTruthy()
  })

  it('returns 201 on valid submission', async () => {
    const res = await POST(makeRequest({
      name: 'Nguyen Van A',
      phone: '0901234567',
      attending: true,
      guests: 2,
      note: '',
    }))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- src/app/api/rsvp/__tests__/route.test.ts
```
Expected: FAIL with `Cannot find module '../route'`

- [ ] **Step 3: Create `src/app/api/rsvp/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, phone, attending, guests, note } = body

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: 'Tên và số điện thoại là bắt buộc' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.from('rsvp').insert({
    name: name.trim(),
    phone: phone.trim(),
    attending: Boolean(attending),
    guests: attending ? (Number(guests) || 1) : 0,
    note: note?.trim() || null,
  })

  if (error) {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- src/app/api/rsvp/__tests__/route.test.ts
```
Expected: `Tests: 3 passed`

- [ ] **Step 5: Create `src/components/Rsvp.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type FormState = {
  name: string
  phone: string
  attending: boolean
  guests: number
  note: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function Rsvp() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    attending: true,
    guests: 1,
    note: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="py-24 px-8" style={{ background: 'linear-gradient(135deg, #f9e4ec 0%, #fce4d6 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-10">
          <p className="section-label mb-3">Xác nhận tham dự</p>
          <div className="divider-rose" />
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-4"
          >
            <div className="text-5xl">💌</div>
            <h3 className="font-serif text-2xl text-rose-gold italic">Cảm ơn bạn!</h3>
            <p className="font-sans text-dusty-rose text-sm">
              Chúng tôi đã nhận được xác nhận của bạn và rất mong được gặp bạn trong ngày vui!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Họ tên của bạn *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder-dusty-rose/60"
            />
            <input
              type="tel"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder-dusty-rose/60"
            />

            {/* Attendance toggle */}
            <div className="flex gap-3">
              {[
                { value: true, label: '✅ Sẽ tham dự' },
                { value: false, label: '❌ Không thể đến' },
              ].map(({ value, label }) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => setForm({ ...form, attending: value })}
                  className={`flex-1 py-3 rounded-xl border font-sans text-sm transition-colors ${
                    form.attending === value
                      ? 'bg-rose-gold text-white border-rose-gold'
                      : 'bg-white/80 text-dusty-rose border-rose-light hover:border-rose-gold'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {form.attending && (
              <div className="flex items-center gap-3">
                <label className="font-sans text-sm text-dusty-rose whitespace-nowrap">Số người:</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                  className="w-20 px-3 py-2 rounded-xl border border-rose-light bg-white/80 font-sans text-sm text-center focus:outline-none focus:ring-2 focus:ring-rose-gold/40"
                />
              </div>
            )}

            <textarea
              placeholder="Lời nhắn (không bắt buộc)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white/80 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder-dusty-rose/60 resize-none"
            />

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Có lỗi xảy ra, vui lòng thử lại 🙏
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-rose-gold text-white rounded-xl font-sans font-light tracking-widest text-sm hover:bg-dusty-rose transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận 💌'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/api/rsvp/ src/components/Rsvp.tsx
git commit -m "feat: add RSVP API route with tests and RSVP form component"
```

---

## Task 13: Map Component

**Files:**
- Create: `src/components/Map.tsx`

- [ ] **Step 1: Create `src/components/Map.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function Map() {
  return (
    <section id="map" className="py-24 px-8 bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <p className="section-label mb-3">Địa điểm tổ chức</p>
          <div className="divider-rose" />
        </div>

        {/* Map embed */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-rose-light mb-6">
          <iframe
            src={weddingConfig.venueMapEmbedUrl}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Địa điểm tổ chức tiệc cưới"
          />
        </div>

        {/* Venue info */}
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl text-rose-gold italic">
            {weddingConfig.venueName}
          </h3>
          <p className="font-sans text-sm text-dusty-rose">{weddingConfig.venueAddress}</p>
          <a
            href={weddingConfig.venueDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-8 py-3 border border-rose-gold text-rose-gold rounded-full font-sans text-sm tracking-widest hover:bg-rose-gold hover:text-white transition-colors"
          >
            Chỉ đường 📍
          </a>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Map.tsx
git commit -m "feat: add Map section with Google Maps embed"
```

---

## Task 14: Wishes API Route (TDD) + Realtime Component

**Files:**
- Create: `src/app/api/wishes/route.ts`, `src/app/api/wishes/__tests__/route.test.ts`, `src/components/Wishes.tsx`

- [ ] **Step 1: Write failing tests for wishes route**

Create `src/app/api/wishes/__tests__/route.test.ts`:

```typescript
import { POST } from '../route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/supabase-server', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/wishes', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/wishes', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ message: 'Chúc mừng!' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A' }))
    expect(res.status).toBe(400)
  })

  it('returns 201 on valid submission', async () => {
    const res = await POST(makeRequest({ name: 'Nguyen Van A', message: 'Chúc mừng!' }))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- src/app/api/wishes/__tests__/route.test.ts
```
Expected: FAIL with `Cannot find module '../route'`

- [ ] **Step 3: Create `src/app/api/wishes/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, message } = body

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Tên và lời chúc là bắt buộc' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.from('wishes').insert({
    name: name.trim(),
    message: message.trim(),
  })

  if (error) {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- src/app/api/wishes/__tests__/route.test.ts
```
Expected: `Tests: 3 passed`

- [ ] **Step 5: Create `src/components/Wishes.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, WishRow } from '@/lib/supabase'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`
  return `${Math.floor(hours / 24)} ngày trước`
}

function WishCard({ wish }: { wish: WishRow }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-rose-light shadow-sm"
    >
      <p className="font-sans text-sm text-gray-600 leading-relaxed italic mb-3">
        "{wish.message}"
      </p>
      <div className="flex items-center justify-between">
        <p className="font-serif text-rose-gold text-sm">— {wish.name}</p>
        <p className="font-sans text-xs text-gray-400">{timeAgo(wish.created_at)}</p>
      </div>
    </motion.div>
  )
}

export function Wishes() {
  const [wishes, setWishes] = useState<WishRow[]>([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Load initial wishes
  useEffect(() => {
    supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setWishes(data)
      })
  }, [])

  // Subscribe to realtime inserts
  useEffect(() => {
    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => [payload.new as WishRow, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setForm({ name: '', message: '' })
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="wishes" className="py-24 px-8" style={{ background: '#fffaf8' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <p className="section-label mb-3">Lời chúc yêu thương</p>
          <div className="divider-rose" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wish form */}
          <div>
            <h3 className="font-serif text-xl text-rose-gold italic mb-6">
              Để lại lời chúc 💬
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên của bạn *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder-dusty-rose/60"
              />
              <textarea
                placeholder="Lời chúc của bạn... *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-rose-light bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/40 placeholder-dusty-rose/60 resize-none"
              />
              {status === 'error' && (
                <p className="text-red-400 text-sm">Có lỗi xảy ra, vui lòng thử lại 🙏</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-rose-gold text-white rounded-xl font-sans text-sm tracking-widest hover:bg-dusty-rose transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? 'Đang gửi...' : 'Gửi lời chúc 🌸'}
              </button>
            </form>
          </div>

          {/* Wish list */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {wishes.length === 0 ? (
                <p className="text-dusty-rose/60 text-sm font-sans text-center py-8">
                  Hãy là người đầu tiên gửi lời chúc! 🌸
                </p>
              ) : (
                wishes.map((wish) => <WishCard key={wish.id} wish={wish} />)
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/api/wishes/ src/components/Wishes.tsx
git commit -m "feat: add Wishes API route with tests, realtime guestbook component"
```

---

## Task 15: Floating Navigation

**Files:**
- Create: `src/components/FloatingNav.tsx`

- [ ] **Step 1: Create `src/components/FloatingNav.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',      label: 'Trang chủ' },
  { id: 'countdown', label: 'Đếm ngược' },
  { id: 'story',     label: 'Câu chuyện' },
  { id: 'gallery',   label: 'Ảnh cưới' },
  { id: 'rsvp',      label: 'Xác nhận' },
  { id: 'map',       label: 'Địa điểm' },
  { id: 'wishes',    label: 'Lời chúc' },
]

export function FloatingNav() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)

      // Find active section
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveId(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
          aria-label="Điều hướng"
        >
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={label}
              aria-label={label}
              className="group flex items-center justify-end gap-2"
            >
              <span className="hidden group-hover:block text-xs font-sans text-rose-gold bg-white/90 px-2 py-1 rounded-full shadow-sm border border-rose-light whitespace-nowrap">
                {label}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeId === id
                    ? 'w-3 h-3 bg-rose-gold'
                    : 'w-2 h-2 bg-rose-light hover:bg-dusty-rose'
                }`}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FloatingNav.tsx
git commit -m "feat: add FloatingNav with active section tracking"
```

---

## Task 16: Assemble Main Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```typescript
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

export default function Home() {
  const [opened, setOpened] = useState(false)

  // Skip opening screen if already seen this session
  useEffect(() => {
    if (sessionStorage.getItem('opened') === 'true') {
      setOpened(true)
    }
  }, [])

  const handleOpen = () => {
    sessionStorage.setItem('opened', 'true')
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
      <footer className="py-10 text-center bg-blush/40">
        <p className="font-serif text-dusty-rose italic text-lg">
          Tuấn Hiệp & Khánh Linh
        </p>
        <p className="font-sans text-xs text-rose-light mt-2 tracking-widest">
          Made with 💕
        </p>
      </footer>
    </>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```
Expected: All tests pass.

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```
Open http://localhost:3000. Verify:
- Opening screen shows with falling petals
- Clicking "Mở thiệp ✨" fades in to hero
- All 7 sections render correctly
- Countdown updates every second
- FloatingNav appears after scrolling
- Gallery grid shows placeholder message if no images configured

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble main page — all sections integrated"
```

---

## Task 17: Create Launch Config

**Files:**
- Create: `.claude/launch.json`

- [ ] **Step 1: Create `.claude/launch.json`**

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "Next.js Dev Server",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/launch.json
git commit -m "chore: add Claude Code launch config for Next.js dev server"
```

---

## Done ✅

The wedding invitation website is complete. To customize:

1. Edit `src/config/wedding.ts` — fill in dates, venue, story, gallery images
2. Add photos to `public/images/`
3. Copy `.env.local.example` → `.env.local` — fill in Supabase credentials
4. Run `npm run dev` to preview locally
5. Deploy to Vercel: `npx vercel deploy`
