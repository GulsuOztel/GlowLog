import { getTodayString, parseLocalDate } from '../utils/dateHelpers'

const periods = [
  { id: 'morning', title: '🌅 Sabah Rutini' },
  { id: 'evening', title: '🌙 Akşam Rutini' },
]

const ratings = [
  { value: 1, emoji: '😣', label: 'Çok kötü' },
  { value: 2, emoji: '😕', label: 'Kötü' },
  { value: 3, emoji: '😐', label: 'Orta' },
  { value: 4, emoji: '🙂', label: 'İyi' },
  { value: 5, emoji: '🤩', label: 'Harika' },
]

function TodayPage({ products, routines, logs, onLogsChange }) {
  const today = getTodayString()
  const todayLog = logs[today] || { done: [] }
  const todayRating = todayLog.rating || null
  const todayNote = todayLog.note || ''

  function getProduct(productId) {
    return products.find((product) => product.id === productId)
  }

  function updateTodayLog(changes) {
    onLogsChange({
      ...logs,
      [today]: { ...todayLog, done: todayLog.done || [], ...changes },
    })
  }

  function toggleStep(stepKey) {
    const done = todayLog.done || []
    const newDone = done.includes(stepKey)
      ? done.filter((key) => key !== stepKey)
      : [...done, stepKey]
    updateTodayLog({ done: newDone })
  }

  function handleRatingClick(value) {
    updateTodayLog({ rating: todayRating === value ? null : value })
  }

  function handleNoteChange(event) {
    updateTodayLog({ note: event.target.value })
  }

  const formattedToday = parseLocalDate(today).toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hasAnyRoutine = routines.morning.length > 0 || routines.evening.length > 0

  const pastDates = Object.keys(logs)
    .filter((date) => date !== today)
    .filter((date) => {
      const log = logs[date]
      return log.rating || log.note || (log.done && log.done.length > 0)
    })
    .sort()
    .reverse()

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

            const done = todayLog.done || []
            const doneCount = steps.filter((product) =>
              done.includes(`${period.id}-${product.id}`)
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
                        const isDone = done.includes(stepKey)

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

      <div className="journal-card">
        <h3>📝 Cilt günlüğü</h3>
        <p className="journal-question">Bugün cildin nasıl?</p>

        <div className="rating-row">
          {ratings.map((rating) => (
            <button
              key={rating.value}
              type="button"
              className={
                todayRating === rating.value
                  ? 'rating-button selected'
                  : 'rating-button'
              }
              onClick={() => handleRatingClick(rating.value)}
              aria-label={`${rating.value} - ${rating.label}`}
              title={rating.label}
            >
              <span className="rating-emoji">{rating.emoji}</span>
              <span className="rating-number">{rating.value}</span>
            </button>
          ))}
        </div>

        <label htmlFor="daily-note" className="journal-label">
          Not
        </label>
        <textarea
          id="daily-note"
          className="journal-note"
          rows="3"
          value={todayNote}
          onChange={handleNoteChange}
          placeholder="Örn. Yeni serumu denedim, hafif kızarıklık oldu..."
        />
      </div>

      <div className="history">
        <h3>Geçmiş günler</h3>

        {pastDates.length === 0 ? (
          <p className="empty-state">
            Geçmiş kayıt yok. Her gün işaretlediğin adımlar ve notların burada
            birikecek.
          </p>
        ) : (
          <ul className="history-list">
            {pastDates.map((date) => {
              const log = logs[date]
              const ratingInfo = ratings.find((r) => r.value === log.rating)
              const doneCount = log.done ? log.done.length : 0

              return (
                <li key={date} className="history-item">
                  <div className="history-top">
                    <strong>
                      {parseLocalDate(date).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </strong>
                    {ratingInfo && (
                      <span className="history-rating">
                        {ratingInfo.emoji} {ratingInfo.value}/5
                      </span>
                    )}
                  </div>
                  <small>{doneCount} adım tamamlandı</small>
                  {log.note && <p className="history-note">{log.note}</p>}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default TodayPage