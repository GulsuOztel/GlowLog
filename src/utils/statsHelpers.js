import { parseLocalDate } from './dateHelpers'

function dateToString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function dayHasActivity(logs, dateString) {
  const log = logs[dateString]
  return Boolean(log && log.done && log.done.length > 0)
}

export function getLastDays(todayString, count) {
  const today = parseLocalDate(todayString)

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (count - 1 - index))
    return dateToString(date)
  })
}

export function getStreak(logs, todayString) {
  const date = parseLocalDate(todayString)

  if (!dayHasActivity(logs, todayString)) {
    date.setDate(date.getDate() - 1)
  }

  let streak = 0
  while (dayHasActivity(logs, dateToString(date))) {
    streak += 1
    date.setDate(date.getDate() - 1)
  }
  return streak
}

export function getAverageRating(logs, dateStrings) {
  const ratings = dateStrings
    .map((dateString) => logs[dateString] && logs[dateString].rating)
    .filter((rating) => typeof rating === 'number')

  if (ratings.length === 0) return null

  const sum = ratings.reduce((total, rating) => total + rating, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

export function getWeekdayShort(dateString) {
  return parseLocalDate(dateString).toLocaleDateString('tr-TR', {
    weekday: 'short',
  })
}

export { dayHasActivity }