import { useState } from 'react'
import Navbar from './components/Navbar'
import TodayPage from './pages/TodayPage'
import ProductsPage from './pages/ProductsPage'
import RoutinesPage from './pages/RoutinesPage'

function App() {
  const [activeTab, setActiveTab] = useState('today')

  return (
    <div className="app">
      <header className="app-header">
        <h1>GlowLog ✨</h1>
        <p>Cilt bakım rutini ve ürün takipçisi</p>
      </header>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        {activeTab === 'today' && <TodayPage />}
        {activeTab === 'products' && <ProductsPage />}
        {activeTab === 'routines' && <RoutinesPage />}
      </main>
    </div>
  )
}

export default App