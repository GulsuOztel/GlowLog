import {
  getExpiryDate,
  getDaysLeft,
  formatDate,
} from '../utils/dateHelpers'

function getExpiryStatus(expiryDate) {
  const daysLeft = getDaysLeft(expiryDate)

  if (daysLeft < 0) return { text: 'Süresi doldu', type: 'expired' }
  if (daysLeft === 0) return { text: 'Bugün doluyor', type: 'soon' }
  if (daysLeft <= 30) return { text: `${daysLeft} gün kaldı`, type: 'soon' }
  return { text: `${daysLeft} gün kaldı`, type: 'ok' }
}

function ProductCard({ product, onEdit, onDelete }) {
  const expiryDate = getExpiryDate(product.openedDate, product.paoMonths)
  const status = expiryDate ? getExpiryStatus(expiryDate) : null

  function handleDeleteClick() {
    if (window.confirm(`"${product.name}" silinsin mi?`)) {
      onDelete(product.id)
    }
  }

  return (
    <article className="product-card">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      {product.brand && <p className="product-brand">{product.brand}</p>}

      {expiryDate && (
        <div className="product-expiry">
          <span className={`expiry-badge ${status.type}`}>{status.text}</span>
          <p>Son kullanma: {formatDate(expiryDate)}</p>
        </div>
      )}

      {product.notes && <p className="product-notes">{product.notes}</p>}
            <div className="card-actions">
        <button className="edit-button" onClick={() => onEdit(product)}>
          Düzenle
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          Sil
        </button>
      </div>
    </article>
  )
}

export default ProductCard