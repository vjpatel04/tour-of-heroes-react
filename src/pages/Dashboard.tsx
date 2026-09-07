import { useNavigate } from 'react-router-dom'
import { topHeroes } from '../api/heroes'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'

export function Dashboard() {
  const { heroes, loading, error } = useHeroes()
  const navigate = useNavigate()
  const featured = topHeroes(heroes)

  if (loading) return <Loader />
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Top Heroes</h2>
      {featured.length === 0 ? (
        <p className="empty">No featured heroes yet.</p>
      ) : (
        <ul className="hero-tiles">
          {featured.map((hero) => (
            <li key={hero.id}>
              <button
                type="button"
                className="hero-tile"
                onClick={() => navigate(`/heroes/${hero.id}`)}
              >
                {hero.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
