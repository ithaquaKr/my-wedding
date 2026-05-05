# My Wedding — Thiệp Mời Kỹ Thuật Số

> Website thiệp mời đám cưới của **Tuấn Hiệp & Khánh Linh** — 10/05/2026, Hà Nội.
>
> Dự án đã hoàn thành. Hai đứa đã cưới nhau rồi. 🎉

---

## Tổng quan

Website thiệp mời cưới được xây dựng bằng **Next.js**, **TypeScript** và **Tailwind CSS**. Hỗ trợ hai phiên bản thiệp riêng biệt (nhà trai / nhà gái) triển khai từ cùng một codebase bằng cách thay đổi biến môi trường.

## Tính năng

- **Màn hình chào** — animation mở thiệp trước khi vào trang chính
- **Hero** — tên cặp đôi, ngày cưới, đồng hồ đếm ngược
- **Câu chuyện của chúng tôi** — timeline hành trình từ ngày gặp nhau đến ngày cưới
- **Lịch trình** — các sự kiện trong ngày (lễ thành hôn, tiệc cưới)
- **Ngày trọng đại** — ba mốc: Lễ Dạm Ngõ, Lễ Ăn Hỏi, Lễ Thành Hôn
- **Bản đồ địa điểm** — Google Maps nhúng kèm link chỉ đường
- **Thư gửi khách** — lời mời cá nhân hoá theo tên khách (`?to=Tên`)
- **Dress code & Travel** — gợi ý trang phục, di chuyển, khách sạn
- **Mừng cưới** — thông tin tài khoản ngân hàng kèm QR code
- **Bộ sưu tập ảnh** — gallery với lightbox viewer
- **Trang tạo link mời** (`/invite`) — sinh URL thiệp cá nhân hoá theo tên & bên
- **OG Image động** — ảnh preview khi chia sẻ link lên mạng xã hội
- **Hai bên nhà** — nhà trai / nhà gái với địa điểm và lịch trình riêng

## Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## Cấu trúc

```
src/
├── app/
│   ├── page.tsx              # Trang chính (thiệp mời)
│   ├── invite/page.tsx       # Trang tạo link mời cá nhân hoá
│   └── api/og/route.tsx      # Dynamic OG image API
├── components/               # Các section của trang
│   ├── Hero.tsx
│   ├── OurStory.tsx
│   ├── Schedule.tsx
│   ├── ImportantDates.tsx
│   ├── Map.tsx
│   ├── GiftRegistry.tsx
│   ├── Gallery.tsx
│   ├── Rsvp.tsx
│   └── ...
├── config/
│   └── wedding.ts            # Toàn bộ nội dung website
└── lib/
    ├── countdown.ts
    └── animations.ts
```

## Cách hoạt động — Hai phiên bản thiệp

Cùng một codebase, triển khai hai Vercel project với biến môi trường khác nhau:

```
NEXT_PUBLIC_WEDDING_SIDE=groom   →  Thiệp nhà trai (mặc định)
NEXT_PUBLIC_WEDDING_SIDE=bride   →  Thiệp nhà gái
```

Mỗi bên có địa điểm, lịch trình và lời mời riêng, được cấu hình trong `src/config/wedding.ts`.

## Link mời cá nhân hoá

Trang `/invite` cho phép sinh URL kèm tên khách và bên được mời:

```
/?to=Nguyễn Văn A&side=groom
/?to=Trần Thị B&side=bride&slot=evening
```

Tên khách sẽ hiển thị trong phần "Thư gửi khách" trên trang thiệp.

## Cài đặt (để tham khảo)

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Biến môi trường

| Biến | Mô tả |
|---|---|
| `NEXT_PUBLIC_WEDDING_SIDE` | `groom` hoặc `bride` |
| `NEXT_PUBLIC_SITE_URL` | URL gốc của site (dùng cho OG image) |

---

*Tuấn Hiệp & Khánh Linh · 10/05/2026 · Hà Nội*
