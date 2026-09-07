import { Link, useLocation, useNavigate } from 'react-router-dom'
import { topHeroes } from '../api/heroes'
import { ErrorNotice } from '../components/ErrorNotice'
import { HeroAvatar } from '../components/HeroAvatar'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'

function ArrowIcon() {
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Dashboard() {
  const { heroes, loading, error } = useHeroes()
  const location = useLocation()
  const navigate = useNavigate()
  const featured = topHeroes(heroes)
  const latest = heroes.at(-1)

  if (loading) return <Loader />
  if (error) return <ErrorNotice message={error} />

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-box bg-gradient-to-br from-primary via-primary to-secondary p-8 text-primary-content shadow-xl sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/15 blur-2xl"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              Mission status
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Welcome back, Commander.
            </h2>
            <p className="opacity-85">
              Your roster is ready. Review the featured squad or open the full list to recruit
              and manage heroes.
            </p>
            <Link to="/heroes" className="btn btn-sm border-0 bg-white/20 text-primary-content backdrop-blur hover:bg-white/30">
              Open roster
              <ArrowIcon />
            </Link>
          </div>

          <dl className="grid w-full grid-cols-3 gap-3 lg:w-auto">
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <dt className="text-xs opacity-80">Roster</dt>
              <dd className="font-display text-2xl font-bold">{heroes.length}</dd>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <dt className="text-xs opacity-80">Featured</dt>
              <dd className="font-display text-2xl font-bold">{featured.length}</dd>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <dt className="text-xs opacity-80">Latest</dt>
              <dd className="truncate font-display text-lg font-bold">{latest?.name ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Top Heroes</h2>
            <p className="text-sm text-base-content/60">Featured even-id heroes from the roster</p>
          </div>
          <Link to="/heroes" className="link link-primary text-sm font-semibold no-underline hover:underline">
            View all
          </Link>
        </div>

        {featured.length === 0 ? (
          <div role="status" className="alert alert-soft">
            <span>No featured heroes yet.</span>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featured.map((hero) => (
              <li key={hero.id}>
                <button
                  type="button"
                  aria-label={hero.name}
                  className="group card w-full border border-base-300/70 bg-base-100 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  onClick={() =>
                    navigate(`/heroes/${hero.id}`, {
                      state: { from: location.pathname },
                    })
                  }
                >
                  <div className="card-body gap-4 p-5">
                    <HeroAvatar hero={hero} />
                    <div className="space-y-1">
                      <p className="font-display font-bold leading-tight">{hero.name}</p>
                      <p className="text-xs text-base-content/50">Hero #{hero.id}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                      Open
                      <ArrowIcon />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
