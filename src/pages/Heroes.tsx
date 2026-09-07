import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
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

export function Heroes() {
  const { heroes, loading, error, addHero, deleteHero } = useHeroes()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  if (loading) return <Loader />
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addHero(name)
    setName('')
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold">My Heroes</h2>
        <p className="text-base-content/60">{heroes.length} in the roster</p>
      </div>

      <form
        className="card bg-base-100 shadow-sm max-w-lg mx-auto"
        onSubmit={handleAdd}
      >
        <div className="card-body gap-3">
          <label htmlFor="hero-name" className="label font-semibold">
            Hero name
          </label>
          <div className="join w-full">
            <input
              id="hero-name"
              name="heroName"
              className="input input-bordered join-item w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Windstorm"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary join-item" disabled={!name.trim()}>
              Add hero
            </button>
          </div>
        </div>
      </form>

      {heroes.length === 0 ? (
        <div role="status" className="alert">
          <span>No heroes yet. Add one to get started.</span>
        </div>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-sm max-w-2xl mx-auto">
          {heroes.map((hero) => (
            <li key={hero.id} className="list-row items-center">
              <button
                type="button"
                className="flex flex-1 items-center gap-3 text-left min-w-0"
                onClick={() => navigate(`/heroes/${hero.id}`)}
              >
                <span className="badge badge-primary badge-lg font-bold">{hero.id}</span>
                <span className="font-medium truncate">{hero.name}</span>
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-square btn-sm text-error"
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
  )
}
