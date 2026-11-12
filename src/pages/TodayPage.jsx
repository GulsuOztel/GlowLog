import { getTodayString, parseLocalDate } from '../utils/dateHelpers'

const periods = [
  { id: 'morning', title: '🌅 Sabah Rutini' },
  { id: 'evening', title: '🌙 Akşam Rutini' },
]

function TodayPage({ products, routines, logs, onLogsChange }) {
  const today = getTodayString()
  const todayLog = logs[today] || { done: [] }

  function getProduct(productId) {
    return products.find((product) => product.id === productId)
  }

  function toggleStep(stepKey) {
    const isDone = todayLog.done.includes(stepKey)
    const newDone = isDone
      ? todayLog.done.filter((key) => key !== stepKey)
      : [...todayLog.done, stepKey]

    onLogsChange({
      ...logs,
      [today]: { ...todayLog, done: newDone },
    })
  }

  const formattedToday = parseLocalDate(today).toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hasAnyRoutine = routines.morning.length > 0 || routines.evening.length > 0

  return (
    <section>
      <h2>Bugün</h2>
      <p className="today-date">{formattedToday}</p>

      {!hasAnyRoutine ? (
        <p className="empty-state">
          Henüz bir rutin oluşturmadın. Rutinlerim sekmesinden sabah ve akşam
          rutinini hazırla ✨
        </p>
      ) : (
        <div className="routine-grid">
          {periods.map((period) => {
            const steps = routines[period.id]
              .map((productId) => getProduct(productId))
              .filter((product) => product !== undefined)

            const doneCount = steps.filter((product) =>
              todayLog.done.includes(`${period.id}-${product.id}`)
            ).length
            const percent =
              steps.length === 0 ? 0 : Math.round((doneCount / steps.length) * 100)

            return (
              <div key={period.id} className="routine-card">
                <h3>{period.title}</h3>

                {steps.length === 0 ? (
                  <p className="routine-empty">Bu rutinde ürün yok.</p>
                ) : (
                  <>
                    <p className="progress-text">
                      {doneCount} / {steps.length} tamamlandı
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <ul className="checklist">
                      {steps.map((product) => {
                        const stepKey = `${period.id}-${product.id}`
                        const isDone = todayLog.done.includes(stepKey)

                        return (
                          <li key={stepKey}>
                            <label
                              className={
                                isDone ? 'check-item done' : 'check-item'
                              }
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleStep(stepKey)}
                              />
                              <span>
                                {product.name}
                                <small>{product.category}</small>
                              </span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default TodayPage