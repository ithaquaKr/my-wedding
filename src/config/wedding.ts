/**
 * Wedding configuration
 *
 * All website content is defined here. Two venue variants are provided
 * (bride side & groom side); the active one is selected at runtime via
 * the env var `NEXT_PUBLIC_WEDDING_SIDE` (`bride` | `groom`, default `groom`).
 *
 * Deploy two Vercel projects from the same codebase, each with a different
 * env var, to ship two distinct invitations.
 */

// ──────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────

export type WeddingSide = 'bride' | 'groom'

export type Venue = {
  /** Section label (e.g. "Tiệc cưới nhà trai") */
  label: string
  name: string
  address: string
  /** Google Maps embed URL (the long src= URL inside an iframe) */
  mapEmbedUrl: string
  /** Google Maps directions URL (clickable) */
  directionsUrl: string
  /** ISO datetime for the main reception on this side */
  receptionAt: string
}

export type StoryMilestone = {
  date: string
  title: string
  description: string
  /** 1–4 image paths under /public. First is the featured (large) photo. */
  photos: string[]
}

export type ScheduleItem = {
  /** Inline SVG icon name */
  icon: 'rings' | 'glass' | 'plate' | 'music' | 'camera' | 'heart'
  time: string
  title: string
  description: string
}

export type Hotel = {
  name: string
  distance: string
  priceRange: string
  url?: string
}

export type RegistryItem = {
  label: string
  bankName: string
  accountName: string
  accountNumber: string
  /** Image under /public used as a QR placeholder */
  qrImage: string
}

export type ImportantDate = {
  label: string
  /** Display string in dd/mm format */
  solar: string
  /** Display string for lunar date */
  lunar: string
  /** ISO datetime, used by countdown when this is the main day */
  iso: string
}

export type WeddingConfig = {
  groom: string
  bride: string
  /** Tagline shown above the hero title */
  tagline: string
  /** ISO datetime of the main wedding day (used by countdown) */
  weddingDate: string
  /** Three key dates: dạm ngõ, ăn hỏi, lễ cưới */
  importantDates: ImportantDate[]
  /** Active venue (selected by NEXT_PUBLIC_WEDDING_SIDE) */
  venue: Venue
  /** Hero background image */
  heroImage: string
  /** Couple portrait shown next to RSVP */
  rsvpImage: string
  /** Email used by the RSVP form (mailto:) */
  rsvpEmail: string
  story: StoryMilestone[]
  ceremony: {
    title: string
    time: string
    description: string
  }
  reception: {
    title: string
    time: string
    description: string
  }
  dressCode: {
    title: string
    palette: string
    note: string
  }
  schedule: ScheduleItem[]
  travel: {
    airports: string[]
    hotels: Hotel[]
    transportation: string[]
  }
  registry: {
    intro: string
    items: RegistryItem[]
  }
  galleryImages: string[]
  /** Footer newsletter / final note */
  footerNote: string
}

// ──────────────────────────────────────────────────────────────────────
// Per-side venue config
// ──────────────────────────────────────────────────────────────────────

export const groomVenue: Venue = {
  label: 'Tiệc cưới nhà trai',
  name: 'Nhà Văn hoá thôn Thuỵ Hương',
  address: 'Xã Nội Bài, TP. Hà Nội',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Nh%C3%A0+V%C4%83n+H%C3%B3a+Th%C3%B4n+Th%E1%BB%A5y+H%C6%B0%C6%A1ng,+N%E1%BB%99i+B%C3%A0i,+H%C3%A0+N%E1%BB%99i&output=embed',
  directionsUrl: 'https://maps.app.goo.gl/kTHTAjnzHyGUS5SP6',
  receptionAt: '2026-05-10T16:00:00+07:00',
}

export const brideVenue: Venue = {
  label: 'Tiệc cưới nhà gái',
  name: 'Tại tư gia nhà gái',
  address: 'TP. Hà Nội',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=21.2053611,105.8487778&output=embed',
  directionsUrl: 'https://maps.app.goo.gl/PDD2UGCZg1MCztGV7',
  receptionAt: '2026-05-10T17:00:00+07:00',
}

const activeSide: WeddingSide =
  (process.env.NEXT_PUBLIC_WEDDING_SIDE as WeddingSide) === 'bride'
    ? 'bride'
    : 'groom'

const activeVenue: Venue = activeSide === 'bride' ? brideVenue : groomVenue

// ──────────────────────────────────────────────────────────────────────
// Main config
// ──────────────────────────────────────────────────────────────────────

export const weddingConfig: WeddingConfig = {
  groom: 'Tuấn Hiệp',
  bride: 'Khánh Linh',
  tagline: 'Lưu lại ngày này',
  weddingDate: '2026-05-10T10:00:00+07:00',

  importantDates: [
    {
      label: 'Lễ Dạm Ngõ',
      solar: '22/04/2026',
      lunar: '',
      iso: '2026-04-22T09:00:00+07:00',
    },
    {
      label: 'Lễ Ăn Hỏi',
      solar: '26/04/2026',
      lunar: '10/03 Âm lịch',
      iso: '2026-04-26T09:00:00+07:00',
    },
    {
      label: 'Lễ Thành Hôn',
      solar: '10/05/2026',
      lunar: '24/03 Âm lịch',
      iso: '2026-05-10T10:00:00+07:00',
    },
  ],

  venue: activeVenue,

  heroImage: '/images/hero.jpg',
  rsvpImage: '/images/rsvp.jpg',
  rsvpEmail: 'wedding@example.com',

  story: [
    {
      date: 'Tháng 06, 2025',
      title: 'Lần đầu gặp gỡ',
      description:
        'Một buổi gặp mặt từ hai con người vốn không chung một thế giới, chúng tôi gặp nhau và bắt đầu một câu chuyện chưa có hồi kết.',
      photos: [
        '/images/story-1.jpg',
        '/images/story-1b.jpg',
        '/images/story-1c.jpg',
      ],
    },
    {
      date: '2025 – 2026',
      title: 'Hành trình cùng nhau',
      description:
        'Có những chuyến đi xa, những lần dỗi nhau vì chuyện chẳng đâu, những buổi cãi vã rồi lại làm lành. Có cả nước mắt lẫn tiếng cười — và giữa tất cả những điều đó, chúng tôi vẫn chọn nhau mỗi ngày.',
      photos: [
        '/images/story-2.jpg',
        '/images/story-2b.jpg',
        '/images/story-2c.jpg',
        '/images/story-2d.jpg',
      ],
    },
    {
      date: '18 / 04 / 2026',
      title: 'Lời cầu hôn',
      description:
        'Chẳng có gì hoành tráng, chỉ là anh hỏi một câu mà cả hai đã biết câu trả lời từ lâu. Em gật đầu. Vậy là đủ.',
      photos: [
        '/images/story-3.jpg',
        '/images/story-3b.jpg',
        '/images/story-3c.jpg',
      ],
    },
    {
      date: '10 / 05 / 2026',
      title: 'Ngày chúng tôi về một nhà',
      description:
        'Chúng tôi chính thức bước vào một chương mới của cuộc đời, cùng nhau xây dựng tổ ấm.',
      photos: [
        '/images/story-1.jpg',
        '/images/story-2.jpg',
        '/images/story-3.jpg',
      ],
    },
  ],

  ceremony: {
    title: 'Lễ Thành Hôn',
    time: '15:00 - 10/05/2026',
    description:
      'Trân trọng kính mời quý khách tới dự lễ thành hôn và chứng kiến khoảnh khắc trọng đại nhất trong cuộc đời chúng tôi.',
  },
  reception: {
    title: 'Tiệc Cưới',
    time: '16:00 - 10/05/2026',
    description:
      'Tiệc cưới sẽ được tổ chức ngay sau lễ thành hôn. Rất mong nhận được sự hiện diện của quý khách để chung vui cùng gia đình.',
  },
  dressCode: {
    title: 'Dress Code',
    palette: 'Tone trắng – be – pastel',
    note: 'Quý khách vui lòng chọn trang phục lịch sự, hài hoà với không gian buổi lễ.',
  },

  schedule: [
    {
      icon: 'rings',
      time: '15:00',
      title: 'Lễ thành hôn',
      description: 'Nghi lễ trao nhẫn và lời thề ước trước sự chứng kiến của hai gia đình.',
    },
    {
      icon: 'plate',
      time: '16:00',
      title: 'Tiệc cưới',
      description: 'Bữa tiệc ấm cúng cùng gia đình, bạn bè và những người thân thương nhất.',
    },
  ],

  travel: {
    airports: [
      'Sân bay Quốc tế Nội Bài (HAN) – cách trung tâm khoảng 30km',
    ],
    hotels: [
      {
        name: '[KHÁCH SẠN GỢI Ý 1]',
        distance: 'Cách địa điểm khoảng 1km',
        priceRange: '1.500.000đ – 2.500.000đ / đêm',
      },
      {
        name: '[KHÁCH SẠN GỢI Ý 2]',
        distance: 'Cách địa điểm khoảng 3km',
        priceRange: '900.000đ – 1.500.000đ / đêm',
      },
    ],
    transportation: [
      'Có chỗ đỗ xe miễn phí ngay tại địa điểm tổ chức.',
      'Grab/Taxi sẵn có quanh khu vực, thuận tiện di chuyển.',
    ],
  },

  registry: {
    intro:
      'Sự hiện diện của bạn đã là món quà quý giá nhất với chúng tôi. Nếu bạn muốn gửi lời chúc bằng một món quà nhỏ, dưới đây là thông tin chuyển khoản của hai gia đình.',
    items: [
      {
        label: 'Mừng cưới chú rể',
        bankName: 'Techcombank',
        accountName: 'NGUYEN TUAN HIEP',
        accountNumber: '19033991835012',
        qrImage: '/images/qr-groom-v2.jpg',
      },
      {
        label: 'Mừng cưới cô dâu',
        bankName: 'BIDV - CN Ba Đình',
        accountName: 'TRUONG KHANH LINH',
        accountNumber: '1261169070',
        qrImage: '/images/qr-bride.jpg',
      },
    ],
  },

  galleryImages: [
    '/images/gallery-01.jpg',
    '/images/gallery-02.jpg',
    '/images/gallery-03.jpg',
    '/images/gallery-04.jpg',
    '/images/gallery-05.jpg',
    '/images/gallery-06.jpg',
  ],

  footerNote:
    'Cảm ơn bạn đã dành thời gian ghé thăm. Chúng tôi mong sớm được gặp lại bạn trong ngày trọng đại.',
}

export const weddingSide: WeddingSide = activeSide
