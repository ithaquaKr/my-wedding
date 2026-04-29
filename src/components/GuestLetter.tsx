'use client'

import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { type BrideSlot, BRIDE_SLOTS, weddingConfig } from '@/config/wedding'

const EASE = [0.22, 1, 0.36, 1] as const

const ELDER_PREFIXES = ['anh', 'chị', 'cô', 'chú']
const KNOWN_HONORIFICS = ['anh', 'chị', 'cô', 'chú', 'bạn', 'em']

function getFirstWord(name: string) {
  return name.trim().toLowerCase().split(/\s+/)[0]
}

function getPronoun(name: string | null) {
  if (!name) return 'chúng tớ'
  return ELDER_PREFIXES.includes(getFirstWord(name)) ? 'chúng em' : 'chúng tớ'
}

// Second-person pronoun derived from the honorific in the name ("Chị Minh" → "chị")
function getYouPronoun(name: string | null): string {
  if (!name) return 'bạn'
  const first = getFirstWord(name)
  return KNOWN_HONORIFICS.includes(first) ? first : 'bạn'
}

export function GuestLetter() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('to')
  const pronoun = getPronoun(guestName)
  const Pronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1)
  const you = getYouPronoun(guestName)

  const side = searchParams.get('side')
  const slotParam = searchParams.get('slot') as BrideSlot | null
  const brideSlot = side === 'bride' && slotParam && slotParam in BRIDE_SLOTS ? slotParam : null
  const closingDate = brideSlot
    ? `lúc ${BRIDE_SLOTS[brideSlot].displayTime}, ${BRIDE_SLOTS[brideSlot].sub}`
    : 'ngày 10 tháng 5 năm 2026'

  const groomInitial = weddingConfig.groom.charAt(0)
  const brideInitial = weddingConfig.bride.charAt(0)

  return (
    <section
      id="letter"
      className="relative bg-[var(--color-ink)] py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Subtle grain — matches hero texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />

      <div className="relative mx-auto max-w-2xl text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow"
          style={{ color: 'rgba(253,238,243,0.45)' }}
        >
          Thư ngỏ
        </motion.p>

        {/* Script heading */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="font-script mt-5 leading-[1.1] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(3rem,10vw,6rem)' }}
        >
          {guestName ? `Gửi ${guestName}` : 'Gửi bạn'}
        </motion.h2>

        {/* Hairline + monogram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 flex items-center gap-5"
        >
          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            className="flex-1 border-0 h-px"
            style={{ background: 'rgba(253,238,243,0.18)', transformOrigin: 'right' }}
          />
          <span
            className="font-script shrink-0"
            style={{ fontSize: '1.5rem', color: 'rgba(253,238,243,0.35)' }}
          >
            {groomInitial} &amp; {brideInitial}
          </span>
          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="flex-1 border-0 h-px"
            style={{ background: 'rgba(253,238,243,0.18)', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Letter body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
          className="mt-12 space-y-6 text-left"
          style={{
            fontFamily: 'var(--font-handwrite)',
            fontSize: 'clamp(1.1rem, 3.2vw, 1.35rem)',
            lineHeight: '2',
            color: 'rgba(253,238,243,0.82)',
          }}
        >
          <p>{guestName ? `${guestName} thân mến,` : 'Bạn thân mến,'}</p>
          <p>
            Có những khoảnh khắc trong cuộc đời mà ta muốn được chia sẻ cùng tất cả những người
            mình yêu thương nhất. Và đám cưới của {pronoun} chính là một trong những khoảnh khắc
            như vậy.
          </p>
          <p>
            {Pronoun} đã đồng hành cùng nhau qua những ngày vui, những lúc khó khăn, và cả những
            khoảnh khắc bình dị nhất. Hôm nay, {pronoun} chọn nhau — không phải vì hoàn cảnh hay
            sự tình cờ, mà vì {pronoun} hiểu rằng không ai khác có thể làm cho nhau trọn vẹn hơn.
          </p>
          <p>
            Sự hiện diện của {you} trong ngày trọng đại này là món quà vô giá nhất mà {you} có thể
            trao cho {pronoun}. {Pronoun} mong được ôm {you}, cười cùng {you}, và ghi lại khoảnh khắc
            ấy mãi trong ký ức.
          </p>
          <p>Hẹn gặp {you} vào {closingDate}.</p>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
          className="mt-12 flex flex-col items-end gap-1 text-right"
        >
          <p
            className="eyebrow whitespace-nowrap"
            style={{ color: 'rgba(253,238,243,0.4)', letterSpacing: '0.14em' }}
          >
            Với tất cả tình yêu thương,
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/signature.png"
            alt={`Chữ ký ${weddingConfig.groom} & ${weddingConfig.bride}`}
            style={{
              display: 'block',
              width: 'clamp(200px, 55vw, 340px)',
              filter: 'invert(1) brightness(1.5)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 92%)',
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 92%)',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}
