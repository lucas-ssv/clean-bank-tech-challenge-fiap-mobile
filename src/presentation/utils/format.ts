export const formattedDateTime = new Intl.DateTimeFormat('pt-br', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export const formattedDate = new Intl.DateTimeFormat('pt-br', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export const formattedMoney = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})

export const formatMonth = (date: Date) => {
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date)

  return month.charAt(0).toUpperCase() + month.slice(1)
}

export function getFormattedDate() {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return date.toLocaleDateString('pt-BR', options)
}
