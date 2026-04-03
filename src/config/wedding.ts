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
  venueMapEmbedUrl: '[GOOGLE_MAPS_EMBED_URL]',
  venueDirectionsUrl: '[GOOGLE_MAPS_DIRECTIONS_URL]',
  story: [
    {
      date: '[THÁNG NĂM GẶP NHAU]',
      title: 'Lần đầu gặp nhau',
      description: '[MÔ TẢ CÂU CHUYỆN LẦN ĐẦU GẶP NHAU]',
      photo: null,
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
  galleryImages: [],
}
