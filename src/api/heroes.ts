import type { Hero } from '../types'

const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
]

const LOAD_DELAY_MS = 600

export function fetchHeroes(): Promise<Hero[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(HEROES.map((hero) => ({ ...hero })))
    }, LOAD_DELAY_MS)
  })
}

export function nextHeroId(heroes: Hero[]): number {
  return heroes.reduce((max, hero) => Math.max(max, hero.id), 0) + 1
}

export function topHeroes(heroes: Hero[]): Hero[] {
  return heroes.filter((hero) => hero.id % 2 === 0)
}
