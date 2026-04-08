# My Wedding — Digital Invitation

A personalized wedding invitation website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Opening animation** — cinematic entrance before the main page
- **Hero section** — couple names, wedding date, and countdown timer
- **Our Story** — milestone timeline of the couple's journey
- **Gallery** — photo gallery with lightbox viewer
- **RSVP** — guest response form
- **Venue Map** — embedded Google Maps with directions link
- **Wishes** — real-time guest wishes board (via API)
- **Floating navigation** — smooth scroll between sections
- **Cherry blossom decor** — animated ambient decorations

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Jest (unit tests)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

All wedding details are centralized in `src/config/wedding.ts`:

```ts
export const weddingConfig: WeddingConfig = {
  groom: 'Tuấn Hiệp',
  bride: 'Khánh Linh',
  weddingDate: '2026-05-10T10:00:00',
  venueName: '...',
  venueAddress: '...',
  venueMapEmbedUrl: '...',
  venueDirectionsUrl: '...',
  story: [...],
  galleryImages: [...],
}
```

Edit this file to update names, date, venue, story milestones, and gallery images.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the required values before running.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Lint source files |
