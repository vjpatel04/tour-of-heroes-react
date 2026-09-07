import { NavLink } from 'react-router-dom'

function BoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  )
}

function tabClass(isActive: boolean) {
  return `tab font-semibold ${isActive ? 'tab-active' : ''}`
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-base-300/70 bg-base-100/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-content shadow-md">
            <BoltIcon />
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-bold tracking-tight">Tour of Heroes</h1>
            <p className="hidden text-xs text-base-content/60 sm:block">Command center</p>
          </div>
        </div>

        <nav aria-label="Primary" className="flex items-center gap-2">
          <div role="tablist" className="tabs tabs-box tabs-sm sm:tabs-md">
            <NavLink to="/" end className={({ isActive }) => tabClass(isActive)}>
              Dashboard
            </NavLink>
            <NavLink to="/heroes" className={({ isActive }) => tabClass(isActive)}>
              Heroes
            </NavLink>
          </div>
          <label className="swap swap-rotate btn btn-ghost btn-circle" title="Toggle theme">
            <input
              type="checkbox"
              className="theme-controller"
              value="command-dark"
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
      </div>
    </header>
  )
}
