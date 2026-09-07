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
    <section className="card bg-base-100 shadow-sm max-w-lg mx-auto">
      <div className="card-body gap-4">
        <h2 className="card-title text-2xl">{hero.name} details</h2>
        <p className="text-base-content/60">
          id: <span className="badge badge-secondary">{hero.id}</span>
        </p>
        <label htmlFor="detail-name" className="label font-semibold">
          Hero name
        </label>
        <input
          id="detail-name"
          className="input input-bordered w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        />
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
            Go back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Save
          </button>
        </div>
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
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  if (!hero) {
    return (
      <section className="card bg-base-100 shadow-sm max-w-lg mx-auto">
        <div className="card-body items-center text-center gap-3">
          <h2 className="card-title text-2xl">Hero not found</h2>
          <p className="text-base-content/60">That hero is not in the roster.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/heroes')}>
            Back to heroes
          </button>
        </div>
      </section>
    )
  }

  return <HeroDetailForm key={hero.id} hero={hero} onRename={renameHero} />
}
