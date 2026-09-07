import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import App from './App'
import { HeroesProvider } from './context/HeroesContext'

vi.mock('./api/heroes', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./api/heroes')>()
  return {
    ...actual,
    fetchHeroes: vi.fn(async () => [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 14, name: 'Celeritas' },
    ]),
  }
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <HeroesProvider>
        <App />
      </HeroesProvider>
    </MemoryRouter>,
  )
}

describe('Tour of Heroes', () => {
  it('shows even-id heroes on the dashboard after loading', async () => {
    renderAt('/')
    expect(screen.getByText(/loading heroes/i)).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Top Heroes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Narco' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Celeritas' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Mr. Nice' })).not.toBeInTheDocument()
  })

  it('adds, opens, renames, and deletes heroes', async () => {
    const user = userEvent.setup()
    renderAt('/heroes')

    expect(await screen.findByRole('heading', { name: 'My Heroes' })).toBeInTheDocument()

    await user.type(screen.getByLabelText('Hero name'), 'Windstorm')
    await user.click(screen.getByRole('button', { name: 'Add hero' }))
    expect(screen.getByText('Windstorm')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()

    await user.click(screen.getByText('Narco'))
    expect(await screen.findByRole('heading', { name: 'Narco details' })).toBeInTheDocument()
    const nameInput = screen.getByLabelText('Hero name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Magneta')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(await screen.findByRole('heading', { name: 'My Heroes' })).toBeInTheDocument()
    expect(screen.getByText('Magneta')).toBeInTheDocument()
    expect(screen.queryByText('Narco')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete Mr. Nice' }))
    expect(screen.queryByText('Mr. Nice')).not.toBeInTheDocument()
  })

  it('keeps detail navigation in-app when opened directly', async () => {
    const user = userEvent.setup()
    renderAt('/heroes/12')

    expect(await screen.findByRole('heading', { name: 'Narco details' })).toBeInTheDocument()
    const primaryNav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(primaryNav).getByRole('link', { name: 'Heroes' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('checkbox', { name: 'Toggle color theme' })).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Hero name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Narco Prime{Enter}')

    expect(await screen.findByRole('heading', { name: 'My Heroes' })).toBeInTheDocument()
    expect(screen.getByText('Narco Prime')).toBeInTheDocument()
  })
})
