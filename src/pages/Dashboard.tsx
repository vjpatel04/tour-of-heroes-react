import { useLocation, useNavigate } from 'react-router-dom'
import { topHeroes } from '../api/heroes'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'

export function Dashboard() {
  const { heroes, loading, error } = useHeroes()
  const location = useLocation()
  const navigate = useNavigate()
  const featured = topHeroes(heroes)

  if (loading) return <Loader />
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold">Top Heroes</h2>
        <p className="text-base-content/60">Featured even-id heroes from the roster</p>
      </div>
      {featured.length === 0 ? (
        <div role="status" className="alert">
          <span>No featured heroes yet.</span>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((hero) => (
            <li key={hero.id}>
              <button
                type="button"
                aria-label={hero.name}
                className="card bg-secondary text-secondary-content w-full shadow-md transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-content"
                onClick={() =>
                  navigate(`/heroes/${hero.id}`, {
                    state: { from: location.pathname },
                  })
                }
              >
                <div className="card-body items-center text-center py-6">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-base-100/20 w-12 rounded-full">
                      <span aria-hidden="true" className="text-lg font-bold">
                        {hero.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <span className="card-title text-base justify-center">{hero.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
