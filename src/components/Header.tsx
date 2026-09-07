import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <h1>Tour of Heroes</h1>
      <nav aria-label="Primary">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/heroes" end>
          Heroes
        </NavLink>
      </nav>
    </header>
  )
}
