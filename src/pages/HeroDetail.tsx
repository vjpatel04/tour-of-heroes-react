import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'
import type { Hero } from '../types'

type HeroDetailFormProps = {
  hero: Hero
  onRename: (id: number, name: string) => void
}

function HeroDetailForm({ hero, onRename }: HeroDetailFormProps) {
  const [name, setName] = useState(hero.name)
  const navigate = useNavigate()

  function handleSave() {
    onRename(hero.id, name)
    navigate(-1)
  }

  return (
    <section>
      <h2>{hero.name} details</h2>
      <p className="hero-id-line">
        id: <strong>{hero.id}</strong>
      </p>
      <label htmlFor="detail-name">Hero name</label>
      <input
        id="detail-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="off"
      />
      <div className="button-row">
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          Go back
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={handleSave}
          disabled={!name.trim()}
        >
          Save
        </button>
      </div>
    </section>
  )
}

export function HeroDetail() {
  const { heroId } = useParams()
  const { heroes, loading, error, renameHero } = useHeroes()
  const navigate = useNavigate()
  const hero = heroes.find((item) => String(item.id) === heroId)

  if (loading) return <Loader />
  if (error) return <p className="error">{error}</p>

  if (!hero) {
    return (
      <section>
        <h2>Hero not found</h2>
        <p className="empty">That hero is not in the roster.</p>
        <button type="button" className="btn" onClick={() => navigate('/heroes')}>
          Back to heroes
        </button>
      </section>
    )
  }

  return <HeroDetailForm key={hero.id} hero={hero} onRename={renameHero} />
}
