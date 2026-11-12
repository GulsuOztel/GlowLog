const periods = [
  { id: 'morning', title: '🌅 Sabah Rutini' },
  { id: 'evening', title: '🌙 Akşam Rutini' },
]

function RoutinesPage({ products, routines, onRoutinesChange }) {
  function getProduct(productId) {
    return products.find((product) => product.id === productId)
  }

  function addToRoutine(period, productId) {
    onRoutinesChange({
      ...routines,
      [period]: [...routines[period], productId],
    })
  }

  function removeFromRoutine(period, productId) {
    onRoutinesChange({
      ...routines,
      [period]: routines[period].filter((id) => id !== productId),
    })
  }

  function moveInRoutine(period, index, direction) {
    const newIndex = index + direction
    const list = [...routines[period]]

    if (newIndex < 0 || newIndex >= list.length) return

    const temp = list[index]
    list[index] = list[newIndex]
    list[newIndex] = temp

    onRoutinesChange({ ...routines, [period]: list })
  }

  if (products.length === 0) {
    return (
      <section>
        <h2>Rutinlerim</h2>
        <p className="empty-state">
          Rutin oluşturmak için önce Ürünlerim sekmesinden ürün ekle ✨
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2>Rutinlerim</h2>

      <div className="routine-grid">
        {periods.map((period) => {
          const routineIds = routines[period.id]
          const availableProducts = products.filter(
            (product) => !routineIds.includes(product.id)
          )

          return (
            <div key={period.id} className="routine-card">
              <h3>{period.title}</h3>

              {routineIds.length === 0 ? (
                <p className="routine-empty">Henüz ürün eklenmedi.</p>
              ) : (
                <ol className="routine-list">
                  {routineIds.map((productId, index) => {
                    const product = getProduct(productId)
                    if (!product) return null

                    return (
                      <li key={productId} className="routine-item">
                        <div className="routine-item-info">
                          <strong>{product.name}</strong>
                          <span>{product.category}</span>
                        </div>
                        <div className="routine-item-actions">
                          <button
                            onClick={() => moveInRoutine(period.id, index, -1)}
                            disabled={index === 0}
                            aria-label="Yukarı taşı"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveInRoutine(period.id, index, 1)}
                            disabled={index === routineIds.length - 1}
                            aria-label="Aşağı taşı"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeFromRoutine(period.id, productId)}
                            aria-label="Rutinden çıkar"
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              )}

              {availableProducts.length > 0 && (
                <select
                  className="routine-select"
                  value=""
                  onChange={(event) =>
                    addToRoutine(period.id, Number(event.target.value))
                  }
                >
                  <option value="">+ Ürün ekle...</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RoutinesPage