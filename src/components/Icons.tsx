/**
 * Inline line-art icons used by the Schedule section.
 * Each icon renders at 1em so size is controlled via font-size / className.
 */
type IconProps = {
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function RingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="24" cy="38" r="14" {...stroke} />
      <circle cx="40" cy="38" r="14" {...stroke} />
      <path d="M20 18 L24 12 L28 18 Z" {...stroke} />
      <path d="M36 18 L40 12 L44 18 Z" {...stroke} />
    </svg>
  )
}

export function GlassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M18 10 H46 L40 30 Q32 36 24 30 Z" {...stroke} />
      <line x1="32" y1="36" x2="32" y2="52" {...stroke} />
      <line x1="22" y1="54" x2="42" y2="54" {...stroke} />
    </svg>
  )
}

export function PlateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="22" {...stroke} />
      <circle cx="32" cy="32" r="14" {...stroke} />
      <line x1="14" y1="48" x2="22" y2="42" {...stroke} />
      <line x1="50" y1="48" x2="42" y2="42" {...stroke} />
    </svg>
  )
}

export function MusicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M22 44 V18 L46 12 V38" {...stroke} />
      <circle cx="18" cy="46" r="5" {...stroke} />
      <circle cx="42" cy="40" r="5" {...stroke} />
    </svg>
  )
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="10" y="20" width="44" height="30" rx="3" {...stroke} />
      <circle cx="32" cy="35" r="9" {...stroke} />
      <path d="M22 20 L26 14 H38 L42 20" {...stroke} />
    </svg>
  )
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M32 52 C12 38 14 18 24 16 C29 16 32 20 32 24 C32 20 35 16 40 16 C50 18 52 38 32 52 Z"
        {...stroke}
      />
    </svg>
  )
}

export const iconMap = {
  rings: RingsIcon,
  glass: GlassIcon,
  plate: PlateIcon,
  music: MusicIcon,
  camera: CameraIcon,
  heart: HeartIcon,
}

export type IconName = keyof typeof iconMap
