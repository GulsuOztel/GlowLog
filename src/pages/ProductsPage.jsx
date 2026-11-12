import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'

const filterCategories = [
  'Temizleyici',
  'Tonik',
  'Serum',
  'Nemlendirici',
  'Güneş Kremi',
  'Maske',
  'Diğer',
]

function ProductsPage({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  function handleSave(product) {
    if (editingProduct) {
      onUpdateProduct(product)
      setEditingProduct(null)
    } else {
      onAddProduct(product)
    }
  }

  function handleDelete(productId) {
    onDeleteProduct(productId)
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct(null)
    }
  }

  function handleEdit(product) {
    setEditingProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function clearFilters() {
    setSearchText('')
    setCategoryFilter('all')
  }

  const query = searchText.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter

    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      (product.brand || '').toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  const isFiltering = query !== '' || categoryFilter !== 'all'

  return (
    <section>
      <h2>Ürünlerim</h2>

      <ProductForm
        key={editingProduct ? editingProduct.id : 'new'}
        editingProduct={editingProduct}
        onSave={handleSave}
        onCancelEdit={() => setEditingProduct(null)}
      />

      {products.length === 0 ? (
        <p className="empty-state">
          Henüz ürün eklemedin. Yukarıdaki formdan ilk ürününü ekle ✨
        </p>
      ) : (
        <>
          <div className="filter-bar">
            <input
              type="search"
              className="filter-search"
              placeholder="Ürün veya marka ara..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Ürün ara"
            />
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Kategoriye göre filtrele"
            >
              <option value="all">Tüm kategoriler</option>
              {filterCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <p className="result-count">
            {isFiltering
              ? `${filteredProducts.length} / ${products.length} ürün gösteriliyor`
              : `${products.length} ürün`}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Aramanla eşleşen ürün bulunamadı.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={clearFilters}
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ProductsPage