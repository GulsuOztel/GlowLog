import { useState } from 'react'
import Navbar from './components/Navbar'
import TodayPage from './pages/TodayPage'
import ProductsPage from './pages/ProductsPage'
import RoutinesPage from './pages/RoutinesPage'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState('today')
  const [products, setProducts] = useLocalStorage('glowlog_products', [])
  const [routines, setRoutines] = useLocalStorage('glowlog_routines', {
    morning: [],
    evening: [],
  })
  const [logs, setLogs] = useLocalStorage('glowlog_logs', {})

  function addProduct(newProduct) {
    setProducts([...products, newProduct])
  }

  function updateProduct(updatedProduct) {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
  }

  function deleteProduct(productId) {
    setProducts(products.filter((product) => product.id !== productId))
    setRoutines({
      morning: routines.morning.filter((id) => id !== productId),
      evening: routines.evening.filter((id) => id !== productId),
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>GlowLog ✨</h1>
        <p>Cilt bakım rutini ve ürün takipçisi</p>
      </header>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        {activeTab === 'today' && (
          <TodayPage
            products={products}
            routines={routines}
            logs={logs}
            onLogsChange={setLogs}
          />
        )}
        {activeTab === 'products' && (
          <ProductsPage
            products={products}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
          />
        )}
        {activeTab === 'routines' && (
          <RoutinesPage
            products={products}
            routines={routines}
            onRoutinesChange={setRoutines}
          />
        )}
      </main>
    </div>
  )
}

export default App