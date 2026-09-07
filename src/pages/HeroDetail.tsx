import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ErrorNotice } from '../components/ErrorNotice'
import { HeroAvatar } from '../components/HeroAvatar'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'
import type { Hero } from '../types'

type HeroDetailFormProps = {
  hero: Hero
  returnTo: string
  onRename: (id: number, name: string) => void
}

function HeroDetailForm({ hero, returnTo, onRename }: HeroDetailFormProps) {
  const [name, setName] = useState(hero.name)
  const navigate = useNavigate()
  const dirty = name.trim() !== hero.name

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onRename(hero.id, name)
    navigate(returnTo)
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/heroes">Heroes</Link>
          </li>
          <li className="font-semibold text-base-content">{hero.name}</li>
        </ul>
      </div>

      <div className="card overflow-hidden border border-base-300/70 bg-base-100 shadow-sm">
        <div className="h-24 bg-gradient-to-r from-primary/25 via-secondary/20 to-accent/25" />
        <form className="card-body -mt-12 gap-6" onSubmit={handleSave}>
          <div className="flex flex-wrap items-end gap-4">
            <span className="rounded-3xl bg-base-100 p-1.5 shadow-md">
              <HeroAvatar hero={hero} size="lg" />
            </span>
            <div className="space-y-1 pb-1">
              <h2 className="font-display text-2xl font-bold">{hero.name} details</h2>
              <p className="text-sm text-base-content/60">
                id: <span className="badge badge-soft badge-primary badge-sm">{hero.id}</span>
              </p>
            </div>
          </div>

          <fieldset className="fieldset">
            <label htmlFor="detail-name" className="label text-sm font-semibold">
              Hero name
            </label>
            <input
              id="detail-name"
              className="input w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="off"
            />
            <p className="label text-xs">Press Enter or Save to apply the new name.</p>
          </fieldset>

          <div className="card-actions justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(returnTo)}>
              Go back
            </button>
            <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
              {dirty ? 'Save changes' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export function HeroDetail() {
  const { heroId } = useParams()
  const { heroes, loading, error, renameHero } = useHeroes()
  const location = useLocation()
  const navigate = useNavigate()
  const hero = heroes.find((item) => String(item.id) === heroId)
  const returnTo = location.state?.from === '/' ? '/' : '/heroes'

  if (loading) return <Loader />
  if (error) return <ErrorNotice message={error} />

  if (!hero) {
    return (
      <section className="mx-auto max-w-lg">
        <div className="card border border-base-300/70 bg-base-100 shadow-sm">
          <div className="card-body items-center gap-3 py-12 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-base-200 font-display text-3xl font-bold text-base-content/40">
              ?
            </span>
            <h2 className="font-display text-2xl font-bold">Hero not found</h2>
            <p className="text-base-content/60">That hero is not in the roster.</p>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/heroes')}>
              Back to heroes
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <HeroDetailForm key={hero.id} hero={hero} returnTo={returnTo} onRename={renameHero} />
  )
}
