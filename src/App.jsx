import { useState } from 'react'
import Navbar from './components/Navbar'
import TodayPage from './pages/TodayPage'
import ProductsPage from './pages/ProductsPage'
import RoutinesPage from './pages/RoutinesPage'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState('today')
  const [products, setProducts] = useLocalStorage('glowlog_products', [])

  // GEÇİCİ TEST: sonraki görevde silinecek
  function addTestProduct() {
    const newProduct = {
      id: Date.now(),
      name: 'Test Ürünü',
      brand: 'Test Marka',
      category: 'Nemlendirici',
      notes: '',
    }
    setProducts([...products, newProduct])
  }

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

        <p>Kayıtlı ürün sayısı: {products.length}</p>
        <button onClick={addTestProduct}>Test ürünü ekle</button>
      </main>
    </div>
  )
}

export default App