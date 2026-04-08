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
  /** Path under /public, or null for none */
  photo: string | null
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
  name: '[TÊN TRUNG TÂM TIỆC CƯỚI - NHÀ TRAI]',
  address: '[ĐỊA CHỈ ĐẦY ĐỦ - NHÀ TRAI]',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0!2d105.8542!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFub2k!5e0!3m2!1svi!2s!4v0',
  directionsUrl: 'https://maps.google.com/?q=Hanoi',
  receptionAt: '2026-05-10T11:00:00+07:00',
}

export const brideVenue: Venue = {
  label: 'Tiệc cưới nhà gái',
  name: '[TÊN TRUNG TÂM TIỆC CƯỚI - NHÀ GÁI]',
  address: '[ĐỊA CHỈ ĐẦY ĐỦ - NHÀ GÁI]',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0!2d105.8542!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFub2k!5e0!3m2!1svi!2s!4v0',
  directionsUrl: 'https://maps.google.com/?q=Hanoi',
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
  tagline: 'Save the date',
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
      date: 'Tháng 09, 2020',
      title: 'Lần đầu gặp nhau',
      description:
        'Một buổi chiều mùa thu Hà Nội, chúng tôi tình cờ gặp nhau tại một quán cà phê nhỏ trên phố cổ. Không ai ngờ rằng đó là khởi đầu của một câu chuyện dài.',
      photo: '/images/story-1.jpg',
    },
    {
      date: 'Tháng 02, 2023',
      title: 'Anh cầu hôn em',
      description:
        'Dưới ánh đèn của thành phố về đêm, anh quỳ xuống và hỏi câu hỏi quan trọng nhất. Em đã khóc, và rồi gật đầu.',
      photo: '/images/story-2.jpg',
    },
    {
      date: 'Tháng 05, 2026',
      title: 'Ngày chúng tôi về một nhà',
      description:
        'Sau nhiều năm yêu nhau, chúng tôi sẽ chính thức bước vào một chương mới của cuộc đời, cùng nhau xây dựng tổ ấm.',
      photo: '/images/story-3.jpg',
    },
  ],

  ceremony: {
    title: 'Lễ Thành Hôn',
    time: '10:00 - 10/05/2026',
    description:
      'Trân trọng kính mời quý khách tới dự lễ thành hôn và chứng kiến khoảnh khắc trọng đại nhất trong cuộc đời chúng tôi.',
  },
  reception: {
    title: 'Tiệc Chiêu Đãi',
    time: '11:30 - 10/05/2026',
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
      time: '10:00',
      title: 'Lễ thành hôn',
      description: 'Nghi lễ trao nhẫn và lời thề ước trước sự chứng kiến của hai gia đình.',
    },
    {
      icon: 'plate',
      time: '11:30',
      title: 'Tiệc chiêu đãi',
      description: 'Bữa tiệc ấm cúng cùng gia đình, bạn bè và những người thân thương nhất.',
    },
    {
      icon: 'music',
      time: '13:30',
      title: 'Tiệc trà & lưu niệm',
      description: 'Cùng nhau lưu giữ những khoảnh khắc đáng nhớ tại khu vực chụp hình kỉ niệm.',
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
        bankName: '[TÊN NGÂN HÀNG]',
        accountName: '[CHỦ TÀI KHOẢN]',
        accountNumber: '[SỐ TÀI KHOẢN]',
        qrImage: '/images/qr-groom.png',
      },
      {
        label: 'Mừng cưới cô dâu',
        bankName: '[TÊN NGÂN HÀNG]',
        accountName: '[CHỦ TÀI KHOẢN]',
        accountNumber: '[SỐ TÀI KHOẢN]',
        qrImage: '/images/qr-bride.png',
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
