import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { topHeroes } from '../api/heroes'
import { ErrorNotice } from '../components/ErrorNotice'
import { HeroAvatar } from '../components/HeroAvatar'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function Heroes() {
  const { heroes, loading, error, addHero, deleteHero } = useHeroes()
  const [name, setName] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  if (loading) return <Loader />
  if (error) return <ErrorNotice message={error} />

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addHero(name)
    setName('')
  }

  const featuredCount = topHeroes(heroes).length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold">My Heroes</h2>
        <p className="text-base-content/60">{heroes.length} in the roster</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:items-start">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <form className="card border border-base-300/70 bg-base-100 shadow-sm" onSubmit={handleAdd}>
            <div className="card-body gap-3">
              <div>
                <h3 className="font-display text-lg font-bold">Recruit a hero</h3>
                <p className="text-sm text-base-content/60">New recruits join the end of the roster.</p>
              </div>
              <label htmlFor="hero-name" className="label text-sm font-semibold">
                Hero name
              </label>
              <input
                id="hero-name"
                name="heroName"
                className="input w-full"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Windstorm"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary w-full" disabled={!name.trim()}>
                Add hero
              </button>
            </div>
          </form>

          <div className="stats stats-vertical w-full border border-base-300/70 bg-base-100 shadow-sm sm:stats-horizontal lg:stats-vertical">
            <div className="stat py-4">
              <div className="stat-title text-xs">Total</div>
              <div className="stat-value font-display text-2xl">{heroes.length}</div>
            </div>
            <div className="stat py-4">
              <div className="stat-title text-xs">Featured</div>
              <div className="stat-value font-display text-2xl text-primary">{featuredCount}</div>
            </div>
          </div>
        </aside>

        <section aria-label="Roster">
          {heroes.length === 0 ? (
            <div className="card border border-dashed border-base-300 bg-base-100/60">
              <div role="status" className="card-body items-center py-16 text-center text-base-content/60">
                <p className="font-display text-lg font-semibold text-base-content">The roster is empty</p>
                <p>No heroes yet. Add one to get started.</p>
              </div>
            </div>
          ) : (
            <ul className="overflow-hidden rounded-box border border-base-300/70 bg-base-100 shadow-sm divide-y divide-base-300/70">
              {heroes.map((hero) => (
                <li key={hero.id} className="flex items-center gap-2 pr-2 transition hover:bg-base-200/70">
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-4 px-4 py-3 text-left"
                    onClick={() =>
                      navigate(`/heroes/${hero.id}`, {
                        state: { from: location.pathname },
                      })
                    }
                  >
                    <HeroAvatar hero={hero} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{hero.name}</span>
                      <span className="block text-xs text-base-content/50">
                        Hero #<span>{hero.id}</span>
                      </span>
                    </span>
                    <span className="text-base-content/40">
                      <ChevronIcon />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-sm text-base-content/50 hover:text-error"
                    aria-label={`Delete ${hero.name}`}
                    onClick={() => deleteHero(hero.id)}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
