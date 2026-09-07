import { nextHeroId, topHeroes } from '../api/heroes'
import type { Hero } from '../types'

const heroes: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
]

describe('hero helpers', () => {
  it('picks even-id heroes as top heroes', () => {
    expect(topHeroes(heroes).map((hero) => hero.name)).toEqual(['Narco'])
  })

  it('assigns the next id after the current maximum', () => {
    expect(nextHeroId(heroes)).toBe(14)
    expect(nextHeroId([])).toBe(1)
  })
})
