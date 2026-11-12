import { useState } from 'react'
import { getTodayString } from '../utils/dateHelpers'

const categories = [
  'Temizleyici',
  'Tonik',
  'Serum',
  'Nemlendirici',
  'Güneş Kremi',
  'Maske',
  'Diğer',
]

const paoOptions = [3, 6, 9, 12, 18, 24, 36]

const emptyForm = {
  name: '',
  brand: '',
  category: 'Temizleyici',
  openedDate: '',
  paoMonths: '',
  notes: '',
}

function productToFormData(product) {
  return {
    name: product.name,
    brand: product.brand || '',
    category: product.category,
    openedDate: product.openedDate || '',
    paoMonths: product.paoMonths ? String(product.paoMonths) : '',
    notes: product.notes || '',
  }
}

function ProductForm({ editingProduct, onSave, onCancelEdit }) {
  const isEditing = editingProduct !== null

  const [formData, setFormData] = useState(
    isEditing ? productToFormData(editingProduct) : emptyForm
  )
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (formData.name.trim() === '') {
      setError('Ürün adı boş olamaz.')
      return
    }

    if (formData.paoMonths !== '' && formData.openedDate === '') {
      setError('Kullanım süresi seçtiysen açılış tarihini de girmelisin.')
      return
    }

    onSave({
      id: isEditing ? editingProduct.id : Date.now(),
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      openedDate: formData.openedDate,
      paoMonths: formData.paoMonths === '' ? null : Number(formData.paoMonths),
      notes: formData.notes.trim(),
    })

    setFormData(emptyForm)
    setError('')
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Ürünü düzenle' : 'Yeni ürün ekle'}</h3>

      <label htmlFor="name">Ürün adı *</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Örn. Nemlendirici Krem"
      />

      <label htmlFor="brand">Marka</label>
      <input
        id="brand"
        name="brand"
        type="text"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Örn. CeraVe"
      />

      <label htmlFor="category">Kategori</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="openedDate">Açılış tarihi</label>
      <input
        id="openedDate"
        name="openedDate"
        type="date"
        max={getTodayString()}
        value={formData.openedDate}
        onChange={handleChange}
      />

      <label htmlFor="paoMonths">Açıldıktan sonra kullanım süresi</label>
      <select
        id="paoMonths"
        name="paoMonths"
        value={formData.paoMonths}
        onChange={handleChange}
      >
        <option value="">Belirtilmedi</option>
        {paoOptions.map((months) => (
          <option key={months} value={months}>
            {months} ay
          </option>
        ))}
      </select>

      <label htmlFor="notes">Not</label>
      <textarea
        id="notes"
        name="notes"
        rows="3"
        value={formData.notes}
        onChange={handleChange}
        placeholder="İsteğe bağlı"
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        {isEditing ? 'Güncelle' : 'Ürünü ekle'}
      </button>

      {isEditing && (
        <button type="button" className="secondary-button" onClick={onCancelEdit}>
          Vazgeç
        </button>
      )}
    </form>
  )
}

export default ProductForm