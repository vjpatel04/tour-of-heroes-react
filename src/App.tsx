import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { HeroDetail } from './pages/HeroDetail'
import { Heroes } from './pages/Heroes'

export default function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
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
