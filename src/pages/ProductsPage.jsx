import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'

function ProductsPage({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [editingProduct, setEditingProduct] = useState(null)

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
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsPage