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
