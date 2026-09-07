import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { HeroDetail } from './pages/HeroDetail'
import { Heroes } from './pages/Heroes'

export default function App() {
  return (
    <div className="min-h-screen text-base-content">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/heroes/:heroId" element={<HeroDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
