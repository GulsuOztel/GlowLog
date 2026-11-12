import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'

function ProductsPage({ products, onAddProduct, onDeleteProduct }) {
  return (
    <section>
      <h2>Ürünlerim</h2>

      <ProductForm onAddProduct={onAddProduct} />

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
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsPage