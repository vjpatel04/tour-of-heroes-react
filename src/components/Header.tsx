import { NavLink } from 'react-router-dom'

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-7"
      aria-hidden="true"
    >
      <path d="M12 2 20 5.5v6.2c0 5.1-3.4 9.4-8 10.8-4.6-1.4-8-5.7-8-10.8V5.5L12 2Z" />
    </svg>
  )
}

function navClass(isActive: boolean) {
  return isActive ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'
}

export function Header() {
  return (
    <header className="navbar bg-base-100/90 shadow-sm backdrop-blur sticky top-0 z-20 border-b border-base-300">
      <div className="navbar-start gap-3">
        <span className="text-primary">
          <ShieldIcon />
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          Tour of Heroes
        </h1>
      </div>
      <nav className="navbar-end" aria-label="Primary">
        <div className="join">
          <NavLink to="/" end className={({ isActive }) => `${navClass(isActive)} join-item`}>
            Dashboard
          </NavLink>
          <NavLink
            to="/heroes"
            className={({ isActive }) => `${navClass(isActive)} join-item`}
          >
            Heroes
          </NavLink>
        </div>
        <label className="swap swap-rotate btn btn-ghost btn-circle ml-2" title="Toggle theme">
          <input
            type="checkbox"
            className="theme-controller"
            value="night"
            aria-label="Toggle color theme"
          />
          <svg
            className="swap-off size-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5.64 17l-.71.71a1 1 0 0 0 1.41 1.41l.71-.71A1 1 0 0 0 5.64 17M5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1m7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1m5.66 2.34a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.71.71a1 1 0 0 0 .71 1.7M12 6.5A5.5 5.5 0 1 0 17.5 12 5.51 5.51 0 0 0 12 6.5m0 9A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5M21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1m6.36-2 .71.71a1 1 0 0 0 1.41-1.41l-.71-.71a1 1 0 0 0-1.41 1.41" />
          </svg>
          <svg
            className="swap-on size-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05" />
          </svg>
        </label>
      </nav>
    </header>
  )
}
