import type { Hero } from '../types'

type HeroAvatarProps = {
  hero: Hero
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'size-10 text-base',
  md: 'size-14 text-xl',
  lg: 'size-24 text-4xl',
} as const

// Spread hues around the wheel so neighbouring ids get clearly different colours.
function hueFor(id: number) {
  return (id * 137) % 360
}

export function HeroAvatar({ hero, size = 'md' }: HeroAvatarProps) {
  const hue = hueFor(hero.id)
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-2xl font-display font-bold text-white shadow-inner ${SIZES[size]}`}
      style={{
        backgroundImage: `linear-gradient(135deg, oklch(62% 0.2 ${hue}), oklch(48% 0.22 ${(hue + 50) % 360}))`,
      }}
    >
      {hero.name.charAt(0).toUpperCase()}
    </span>
  )
}
