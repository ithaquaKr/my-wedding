'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/config/wedding'

export function GuestLetter() {
  const initial = (char: string) => char.charAt(0)

  return (
    <section id="letter" className="bg-[var(--color-cream-soft)] py-28 md:py-36 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow text-center"
        >
          Thư ngỏ
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-center text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] mt-5"
        >
          Kính gửi{' '}
          <span className="italic font-normal">những người thân yêu</span>
        </motion.h2>

        {/* Monogram divider */}
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
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hairline flex-1"
            style={{ transformOrigin: 'right' }}
          />
          <span className="font-script text-2xl text-[var(--color-ink-muted)] shrink-0">
            {initial(weddingConfig.groom)} &amp; {initial(weddingConfig.bride)}
          </span>
          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hairline flex-1"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Paper card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-10 bg-[var(--color-paper)] border border-[var(--color-hairline)] px-8 py-10 md:px-14 md:py-14"
          style={{ boxShadow: '0 2px 24px 0 rgba(45,21,32,0.06)' }}
        >
          {/* Letter body */}
          <div
            className="space-y-5 text-[var(--color-ink)]"
            style={{
              fontFamily: 'var(--font-handwrite)',
              fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)',
              lineHeight: '2',
              fontWeight: 500,
            }}
          >
            <p>Bạn thân mến,</p>
            <p>
              Có những khoảnh khắc trong cuộc đời mà ta muốn được chia sẻ cùng tất cả những người mình
              yêu thương nhất. Và đám cưới của chúng tôi chính là một trong những khoảnh khắc như vậy.
            </p>
            <p>
              Chúng tôi đã đồng hành cùng nhau qua những ngày vui, những lúc khó khăn, và cả những
              khoảnh khắc bình dị nhất. Hôm nay, chúng tôi chọn nhau — không phải vì hoàn cảnh hay sự
              tình cờ, mà vì chúng tôi hiểu rằng không ai khác có thể làm cho nhau trọn vẹn hơn.
            </p>
            <p>
              Sự hiện diện của bạn trong ngày trọng đại này là món quà vô giá nhất mà bạn có thể trao
              cho chúng tôi. Chúng tôi mong được ôm bạn, cười cùng bạn, và ghi lại khoảnh khắc ấy mãi
              trong ký ức.
            </p>
            <p>Hẹn gặp bạn vào ngày 10 tháng 5 năm 2026.</p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex flex-col items-end gap-1 text-right">
            <p className="eyebrow whitespace-nowrap" style={{ letterSpacing: '0.14em' }}>Với tất cả tình yêu thương,</p>
            <p
              className="font-script text-[var(--color-ink)]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              {weddingConfig.groom} &amp; {weddingConfig.bride}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
