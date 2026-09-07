import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { fetchHeroes, nextHeroId } from '../api/heroes'
import type { Hero } from '../types'

type HeroesState = {
  heroes: Hero[]
  loading: boolean
  error: string | null
}

type HeroesAction =
  | { type: 'load-start' }
  | { type: 'load-success'; heroes: Hero[] }
  | { type: 'load-error'; error: string }
  | { type: 'add'; name: string }
  | { type: 'delete'; id: number }
  | { type: 'rename'; id: number; name: string }

type HeroesContextValue = HeroesState & {
  addHero: (name: string) => void
  deleteHero: (id: number) => void
  renameHero: (id: number, name: string) => void
}

const initialState: HeroesState = {
  heroes: [],
  loading: true,
  error: null,
}

function heroesReducer(state: HeroesState, action: HeroesAction): HeroesState {
  switch (action.type) {
    case 'load-start':
      return { ...state, loading: true, error: null }
    case 'load-success':
      return { heroes: action.heroes, loading: false, error: null }
    case 'load-error':
      return { ...state, loading: false, error: action.error }
    case 'add': {
      const name = action.name.trim()
      if (!name) return state
      return {
        ...state,
        heroes: [...state.heroes, { id: nextHeroId(state.heroes), name }],
      }
    }
    case 'delete':
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.id),
      }
    case 'rename': {
      const name = action.name.trim()
      if (!name) return state
      return {
        ...state,
        heroes: state.heroes.map((hero) =>
          hero.id === action.id ? { ...hero, name } : hero,
        ),
      }
    }
    default:
      return state
  }
}

const HeroesContext = createContext<HeroesContextValue | null>(null)

export function HeroesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(heroesReducer, initialState)

  useEffect(() => {
    let cancelled = false

    dispatch({ type: 'load-start' })
    fetchHeroes()
      .then((heroes) => {
        if (!cancelled) dispatch({ type: 'load-success', heroes })
      })
      .catch(() => {
        if (!cancelled) {
          dispatch({ type: 'load-error', error: 'Could not load heroes.' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const addHero = useCallback((name: string) => {
    dispatch({ type: 'add', name })
  }, [])

  const deleteHero = useCallback((id: number) => {
    dispatch({ type: 'delete', id })
  }, [])

  const renameHero = useCallback((id: number, name: string) => {
    dispatch({ type: 'rename', id, name })
  }, [])

  const value = useMemo(
    () => ({ ...state, addHero, deleteHero, renameHero }),
    [state, addHero, deleteHero, renameHero],
  )

  return <HeroesContext.Provider value={value}>{children}</HeroesContext.Provider>
}

// Hook lives next to the provider so consumers import one module.
// oxlint-disable-next-line react/only-export-components
export function useHeroes(): HeroesContextValue {
  const context = useContext(HeroesContext)
  if (!context) {
    throw new Error('useHeroes must be used within HeroesProvider')
  }
  return context
}
