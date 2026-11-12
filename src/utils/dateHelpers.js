export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getTodayString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getExpiryDate(openedDate, paoMonths) {
  if (!openedDate || !paoMonths) return null
  const expiry = parseLocalDate(openedDate)
  expiry.setMonth(expiry.getMonth() + paoMonths)
  return expiry
}

export function getDaysLeft(expiryDate) {
  const today = parseLocalDate(getTodayString())
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((expiryDate - today) / msPerDay)
}

export function formatDate(date) {
  return date.toLocaleDateString('tr-TR')
}