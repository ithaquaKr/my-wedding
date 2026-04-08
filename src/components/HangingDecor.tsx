'use client'

import { motion, useAnimation, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useEffect } from 'react'

/* ── Sakura petal: proper notched-tip shape ── */
function Petal({ angle, color }: { angle: number; color: string }) {
  return (
    <path
      d="M0,0 C-3.5,-1 -5.5,-7.5 -3.5,-11.5 C-2.5,-13.5 -1,-15 0,-14.5 C1,-15 2.5,-13.5 3.5,-11.5 C5.5,-7.5 3.5,-1 0,0Z"
      fill={color}
      opacity={0.9}
      transform={`rotate(${angle})`}
    />
  )
}

/* ── Full cherry blossom flower ── */
function SakuraFlower({ x, y, rot = 0, s = 1, dark = false }: {
  x: number; y: number; rot?: number; s?: number; dark?: boolean
}) {
  const p1 = dark ? '#f090b0' : '#fbc0d4'
  const p2 = dark ? '#e87aa0' : '#f8aec8'
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <Petal angle={0}   color={p1} />
      <Petal angle={72}  color={p2} />
      <Petal angle={144} color={p1} />
      <Petal angle={216} color={p2} />
      <Petal angle={288} color={p1} />
      {/* Center disk */}
      <circle r={3.2} fill="#fff5e0" />
      <circle r={2}   fill="#f8e060" />
      {/* Stamens */}
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const rad = (a * Math.PI) / 180
        return (
          <g key={i}>
            <line x1={Math.sin(rad)*2.2} y1={-Math.cos(rad)*2.2}
                  x2={Math.sin(rad)*6}   y2={-Math.cos(rad)*6}
                  stroke="#c8920a" strokeWidth={0.5} opacity={0.65}/>
            <circle cx={Math.sin(rad)*6.5} cy={-Math.cos(rad)*6.5} r={0.9} fill="#e8a020" opacity={0.75}/>
          </g>
        )
      })}
    </g>
  )
}

/* ── Unopened bud ── */
function Bud({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse cx={0} cy={-5} rx={3} ry={5.5} fill="#e06888" opacity={0.82}/>
      <ellipse cx={0} cy={-5} rx={1.5} ry={4}  fill="#f090a8" opacity={0.55}/>
      <line x1={0} y1={0} x2={0} y2={5} stroke="#1c0a05" strokeWidth={1.2}/>
    </g>
  )
}

/* ── Branch SVG ── */
function BranchSVG() {
  const bc = '#1c0a05'
  return (
    <svg viewBox="0 0 190 440" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-28 sm:w-36 md:w-44" style={{ height: 'auto' }}>
      {/* Main trunk — thick, dark, organic */}
      <path d="M10,0 C16,52 34,106 54,164 C70,212 90,264 104,420"
        stroke={bc} strokeWidth="6.5" strokeLinecap="round"/>
      {/* Bark texture highlight */}
      <path d="M12,10 C17,56 35,108 55,166"
        stroke="#2e1008" strokeWidth="2" strokeLinecap="round" opacity={0.35}/>

      {/* Branch 1: upper-right sweep */}
      <path d="M38,88 C70,64 106,50 146,36"
        stroke={bc} strokeWidth="3.8" strokeLinecap="round"/>
      {/* Branch 1 fork → going upward */}
      <path d="M124,42 C132,26 136,12 138,2"
        stroke={bc} strokeWidth="2.2" strokeLinecap="round"/>
      {/* Twig at branch 1 tip */}
      <path d="M146,36 C152,26 156,16 158,6"
        stroke={bc} strokeWidth="1.5" strokeLinecap="round"/>

      {/* Upper-left twig */}
      <path d="M26,52 C16,34 10,18 6,6"
        stroke={bc} strokeWidth="2.4" strokeLinecap="round"/>
      {/* Mini fork from upper-left */}
      <path d="M18,36 C12,28 6,22 2,16"
        stroke={bc} strokeWidth="1.4" strokeLinecap="round"/>

      {/* Branch 2: mid-height going right */}
      <path d="M60,162 C92,138 126,124 158,110"
        stroke={bc} strokeWidth="3" strokeLinecap="round"/>
      {/* Twig from branch 2 going up-right */}
      <path d="M134,118 C142,100 148,86 152,74"
        stroke={bc} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Twig tip fork */}
      <path d="M152,74 C156,64 158,54 160,44"
        stroke={bc} strokeWidth="1.2" strokeLinecap="round"/>

      {/* Lower branch */}
      <path d="M82,248 C108,232 134,218 158,210"
        stroke={bc} strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M140,215 C148,204 154,194 158,184"
        stroke={bc} strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── FLOWERS ── cluster at branch 1 tip */}
      <SakuraFlower x={146} y={36}  rot={-12} s={1.05} dark/>
      <SakuraFlower x={158} y={6}   rot={8}   s={0.88}/>
      <SakuraFlower x={128} y={40}  rot={15}  s={0.92} dark/>
      <SakuraFlower x={138} y={2}   rot={-6}  s={0.84}/>
      <Bud x={162} y={4}   rot={-18}/>
      <Bud x={120} y={44}  rot={22}/>

      {/* Upper-left twig cluster */}
      <SakuraFlower x={6}  y={6}   rot={35}  s={0.95} dark/>
      <SakuraFlower x={2}  y={16}  rot={-20} s={0.82}/>
      <Bud x={14} y={12} rot={10}/>

      {/* Branch 1 mid-node */}
      <SakuraFlower x={100} y={50} rot={-8} s={0.78}/>
      <Bud x={110} y={44} rot={-25}/>

      {/* Branch 2 tip cluster */}
      <SakuraFlower x={158} y={110} rot={5}   s={1.02} dark/>
      <SakuraFlower x={160} y={44}  rot={-10} s={0.86}/>
      <SakuraFlower x={152} y={74}  rot={18}  s={0.9}  dark/>
      <Bud x={164} y={58} rot={-15}/>
      <Bud x={162} y={102} rot={20}/>

      {/* Main trunk nodes */}
      <SakuraFlower x={40}  y={92}  rot={-22} s={0.82}/>
      <SakuraFlower x={56}  y={165} rot={14}  s={0.78}/>

      {/* Lower branch */}
      <SakuraFlower x={158} y={210} rot={10}  s={0.96} dark/>
      <SakuraFlower x={140} y={217} rot={-18} s={0.82}/>
      <SakuraFlower x={158} y={184} rot={6}   s={0.88}/>
      <Bud x={148} y={206} rot={25}/>

      {/* Loose single petals drifting */}
      {([
        [168,195,22,'#fbc0d4'],
        [88, 335,-18,'#f8aec8'],
        [118,385,48,'#fbc0d4'],
        [70, 310,30,'#f0b4cc'],
      ] as [number,number,number,string][]).map(([px,py,pr,pc],i)=>(
        <path key={i}
          d="M0,0 C-3,-1 -4.5,-6.5 -3,-10 C-2,-12 0,-13 0,-12.5 C0,-13 2,-12 3,-10 C4.5,-6.5 3,-1 0,0Z"
          fill={pc} opacity={0.42}
          transform={`translate(${px},${py}) rotate(${pr})`}/>
      ))}
    </svg>
  )
}

function HeartSVG() {
  return (
    <svg viewBox="0 0 40 36" width={38} height={34} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 32 C20 32 4 22 4 12 C4 6 8 2 14 2 C17 2 19.5 3.5 20 5 C20.5 3.5 23 2 26 2 C32 2 36 6 36 12 C36 22 20 32 20 32Z"
        fill="url(#rg)"
        stroke="#c09070"
        strokeWidth={1}
      />
      <path
        d="M13 8 C11 8 9 10 9 12.5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8a0a0" />
          <stop offset="50%" stopColor="#c07060" />
          <stop offset="100%" stopColor="#a05050" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function FlowerClusterSVG() {
  return (
    <svg viewBox="0 0 50 50" width={44} height={44} xmlns="http://www.w3.org/2000/svg">
      <SakuraFlower x={25} y={20} rot={0}   s={1.0} dark/>
      <SakuraFlower x={14} y={32} rot={30}  s={0.8}/>
      <SakuraFlower x={36} y={32} rot={-30} s={0.8} dark/>
    </svg>
  )
}

function RingSVG() {
  return (
    <svg viewBox="0 0 44 44" width={38} height={38} xmlns="http://www.w3.org/2000/svg">
      <circle cx={22} cy={22} r={18} fill="none" stroke="url(#gold)" strokeWidth={5} />
      <circle cx={22} cy={22} r={12} fill="none" stroke="url(#gold2)" strokeWidth={2} opacity={0.5} />
      <path
        d="M14 12 C16 10 18 9 20 10"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d580" />
          <stop offset="40%" stopColor="#c8960c" />
          <stop offset="100%" stopColor="#e8b830" />
        </linearGradient>
        <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d580" />
          <stop offset="100%" stopColor="#c8960c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ORNAMENTS = [
  { x: '28%', stringLen: 65, delay: 0, SVG: HeartSVG },
  { x: '50%', stringLen: 50, delay: 0.4, SVG: FlowerClusterSVG },
  { x: '72%', stringLen: 60, delay: 0.8, SVG: RingSVG },
]

function Ornament({
  stringLen,
  delay,
  SVG,
  mouseX,
}: {
  stringLen: number
  delay: number
  SVG: React.FC
  mouseX: MotionValue<number>
}) {
  const controls = useAnimation()

  const baseRotate = useTransform(mouseX, [0, 1], [-8, 8])
  const mouseRotate = useSpring(baseRotate, { stiffness: 50, damping: 14 })

  useEffect(() => {
    controls.start({
      rotate: [-4, 4, -4],
      transition: {
        duration: 3 + delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    })
  }, [controls, delay])

  async function handleTap() {
    await controls.start({
      rotate: [null, 28, -20, 14, -8, 4, -2, 0],
      transition: { duration: 1.6, ease: 'easeOut' },
    })
    controls.start({
      rotate: [-4, 4, -4],
      transition: {
        duration: 3 + delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    })
  }

  return (
    <motion.div style={{ rotate: mouseRotate }} className="flex flex-col items-center">
      <div
        style={{
          width: '1.5px',
          height: stringLen,
          background: 'linear-gradient(to bottom, rgba(160,110,80,0.4), rgba(160,110,80,0.1))',
        }}
      />
      <motion.div
        animate={controls}
        onTap={handleTap}
        style={{ originY: 0, cursor: 'pointer' }}
        className="select-none"
      >
        <SVG />
      </motion.div>
    </motion.div>
  )
}

function BranchDecor({ side, mouseX }: { side: 'left' | 'right'; mouseX: MotionValue<number> }) {
  const isRight = side === 'right'
  const baseRotate = useTransform(
    mouseX,
    [0, 1],
    isRight ? [5, -5] : [-5, 5]
  )
  const springRotate = useSpring(baseRotate, { stiffness: 40, damping: 16 })

  return (
    <div
      className={`absolute top-0 ${isRight ? 'right-[-20px]' : 'left-[-20px]'}`}
      style={isRight ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.div
        style={{
          rotate: springRotate,
          originX: 0,
          originY: 0,
        }}
      >
        <BranchSVG />
      </motion.div>
    </div>
  )
}

export function HangingDecor({ mouseX }: { mouseX: MotionValue<number> }) {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: 220 }}>
      <div className="relative w-full h-full">
        {/* Left branch */}
        <BranchDecor side="left" mouseX={mouseX} />
        {/* Right branch */}
        <BranchDecor side="right" mouseX={mouseX} />

        {/* Hanging ornaments */}
        {ORNAMENTS.map(({ x, stringLen, delay, SVG }) => (
          <div
            key={x}
            className="absolute top-0 flex flex-col items-center pointer-events-auto"
            style={{ left: x, transform: 'translateX(-50%)' }}
          >
            <Ornament stringLen={stringLen} delay={delay} SVG={SVG} mouseX={mouseX} />
          </div>
        ))}
      </div>
    </div>
  )
}
