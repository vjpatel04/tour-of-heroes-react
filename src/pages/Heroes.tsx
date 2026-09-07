import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { useHeroes } from '../context/HeroesContext'

export function Heroes() {
  const { heroes, loading, error, addHero, deleteHero } = useHeroes()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  if (loading) return <Loader />
  if (error) return <p className="error">{error}</p>

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addHero(name)
    setName('')
  }

  return (
    <section>
      <h2>My Heroes</h2>

      <form className="add-hero" onSubmit={handleAdd}>
        <label htmlFor="hero-name">Hero name</label>
        <div className="add-hero-row">
          <input
            id="hero-name"
            name="heroName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Windstorm"
            autoComplete="off"
          />
          <button type="submit" className="btn primary" disabled={!name.trim()}>
            Add hero
          </button>
        </div>
      </form>

      {heroes.length === 0 ? (
        <p className="empty">No heroes yet. Add one to get started.</p>
      ) : (
        <ul className="hero-list">
          {heroes.map((hero) => (
            <li key={hero.id}>
              <button
                type="button"
                className="hero-row"
                onClick={() => navigate(`/heroes/${hero.id}`)}
              >
                <span className="hero-id">{hero.id}</span>
                <span className="hero-name">{hero.name}</span>
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Delete ${hero.name}`}
                onClick={() => deleteHero(hero.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
