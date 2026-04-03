# Wedding Invitation Website — Design Spec

**Date:** 2026-04-03
**Couple:** Nguyễn Tuấn Hiệp & Trương Khánh Linh

---

## Overview

A beautiful online wedding invitation website built with Next.js and Supabase. Features a romantic aesthetic with a dramatic opening animation, single-page scroll layout, and interactive features including RSVP, photo gallery, map, and a realtime guestbook.

---

## Visual Style

- **Theme:** Romantic & Sweet
- **Primary colors:** Blush pink (`#f9e4ec`), Rose gold (`#c0607a`), Dusty rose (`#b08090`)
- **Accent colors:** Peach (`#fce4d6`), Ivory white (`#fffaf8`)
- **Typography:**
  - Headings / names: Cormorant Garamond or Playfair Display (serif, italic)
  - Body text: Lato or DM Sans (sans-serif, light)
  - Decorative labels: uppercase, wide letter-spacing
- **Motifs:** Floral/botanical illustrations, thin lines, soft watercolor textures
- **Animation style:** Gentle, slow — fade-ins, soft floats, no jarring transitions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime |
| Map | Google Maps Embed API |
| Fonts | Google Fonts (Cormorant Garamond + Lato) |
| Hosting | Vercel |

---

## Configuration Variables

All personalizable content is stored in a single config file (`src/config/wedding.ts`):

```ts
export const weddingConfig = {
  groom: "Nguyễn Tuấn Hiệp",
  bride: "Trương Khánh Linh",
  weddingDate: "YYYY-MM-DDTHH:mm:ss", // ISO datetime
  venueName: "[VENUE_NAME]",
  venueAddress: "[VENUE_ADDRESS]",
  venueMapUrl: "[GOOGLE_MAPS_EMBED_URL]",
  meetDate: "[MEET_DATE]",         // e.g. "Tháng 3, 2020"
  meetStory: "[MEET_STORY]",
  proposeDate: "[PROPOSE_DATE]",
  proposeStory: "[PROPOSE_STORY]",
  galleryImages: [
    // Array of image paths or URLs
  ],
}
```

---

## Page Architecture

Single-page application (`/`) with 8 full-viewport sections, smooth scroll navigation.

### Section 0 — Opening Screen

- Full-screen overlay shown on first load
- Animated envelope that opens on click/tap, revealing an inner card
- Falling flower petals animation in background (CSS keyframes)
- CTA button: "Mở thiệp ✨"
- Fades out to reveal the main page behind it
- One-time show: dismissed state stored in `sessionStorage`

### Section 1 — Hero

- Full-screen background: couple's photo or soft floral gradient
- Centered content:
  - "TRÂN TRỌNG KÍNH MỜI" — uppercase label
  - Groom name (large serif italic)
  - "&" separator
  - Bride name (large serif italic)
  - Thin decorative divider
  - Wedding date: `[WEDDING_DATE]`
  - Venue: `[VENUE_NAME]`
- Subtle scroll-down indicator at bottom

### Section 2 — Countdown

- White/light background with floral border accents
- "NGÀY TRỌNG ĐẠI CÒN" label
- Live countdown: Days / Hours / Minutes / Seconds
- Updates every second via `setInterval`
- After wedding date passes: shows "Hôm nay là ngày trọng đại! 🎊"

### Section 3 — Our Story

- Vertical timeline with alternating left/right layout (desktop) or left-aligned (mobile)
- 3 milestone entries, each with:
  - Date variable (`[MEET_DATE]`, `[PROPOSE_DATE]`, `[WEDDING_DATE]`)
  - Story text variable
  - Optional photo thumbnail
- Pink dot markers connected by a vertical rose-gold line
- Scroll-triggered fade-in animations

### Section 4 — Gallery

- CSS Grid layout (3 columns desktop, 2 mobile)
- Images sourced from `weddingConfig.galleryImages`
- Click opens a fullscreen lightbox with prev/next navigation
- Keyboard navigation (arrow keys, Escape to close)
- Images lazy-loaded

### Section 5 — RSVP

- Soft pink gradient background
- Form fields:
  - Full name (required)
  - Phone number (required)
  - Attendance: "Sẽ tham dự" / "Không thể đến" (radio toggle)
  - Number of guests (number input, shown only if attending)
  - Optional note
- Submit → POST to `/api/rsvp` → insert to Supabase `rsvp` table
- Success state: thank-you message with animation
- Error state: friendly error message

### Section 6 — Map

- "ĐỊA ĐIỂM TỔ CHỨC" heading
- Google Maps `<iframe>` embed using `weddingConfig.venueMapUrl`
- Venue name and full address displayed below map
- "Chỉ đường" button opens Google Maps in new tab

### Section 7 — Wishes / Guestbook

- Two-column layout (desktop): wish form on left, wish list on right
- Wish form: name + message → POST to `/api/wishes` → insert to Supabase `wishes` table
- Wish list: displays submitted wishes, newest first
- **Realtime:** subscribes to Supabase Realtime channel — new wishes appear instantly without refresh
- Each wish card: name, message, timestamp (relative: "2 giờ trước")

---

## Database Schema (Supabase)

### Table: `rsvp`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, auto |
| created_at | timestamptz | Auto |
| name | text | Required |
| phone | text | Required |
| attending | boolean | true = attending |
| guests | integer | Default 1 |
| note | text | Optional |

### Table: `wishes`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, auto |
| created_at | timestamptz | Auto |
| name | text | Required |
| message | text | Required |

---

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/rsvp` | POST | Submit RSVP, insert to Supabase |
| `/api/wishes` | POST | Submit wish, insert to Supabase |

Both routes validate input server-side before inserting.

---

## Navigation

- Sticky floating nav (appears after scrolling past hero): vertical dot indicators on the right edge, one per section
- Smooth scroll to section on click
- Active section highlighted in nav

---

## Responsive Design

- Mobile-first approach with Tailwind breakpoints
- All sections stack vertically on mobile
- Opening animation scaled for mobile screen
- Gallery: 2 columns on mobile, 3 on desktop
- Our Story: left-aligned timeline on mobile, alternating on desktop

---

## Project Structure

```
my-wedding/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts
│   │   ├── page.tsx            # Main page, assembles sections
│   │   └── api/
│   │       ├── rsvp/route.ts
│   │       └── wishes/route.ts
│   ├── components/
│   │   ├── Opening.tsx         # Opening animation screen
│   │   ├── Hero.tsx
│   │   ├── Countdown.tsx
│   │   ├── OurStory.tsx
│   │   ├── Gallery.tsx
│   │   ├── Rsvp.tsx
│   │   ├── Map.tsx
│   │   ├── Wishes.tsx
│   │   └── FloatingNav.tsx
│   ├── config/
│   │   └── wedding.ts          # All wedding variables
│   └── lib/
│       └── supabase.ts         # Supabase client
├── public/
│   └── images/                 # Gallery photos
├── .env.local                  # SUPABASE_URL, SUPABASE_ANON_KEY, etc.
└── docs/
    └── superpowers/specs/
        └── 2026-04-03-wedding-invitation-design.md
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=
```

---

## Out of Scope

- Admin dashboard for managing RSVPs (can be done directly in Supabase dashboard)
- Email notifications on RSVP submission
- Multi-language support
- Password protection / private invite links
