import { format, isSameDay, isSameMonth, startOfWeek, endOfWeek, addDays } from 'date-fns'

export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const daysCount = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1))
}

export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const grid: Date[] = []
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }
  return grid
}

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  const days: Date[] = []
  
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i))
  }
  
  return days
}

export const getWeekHours = (): string[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })
}

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate)
}

export const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd'): string => {
  return format(date, formatStr)
}

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm')
}

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm')
}

export const parseDateTime = (dateTimeStr: string): Date => {
  return new Date(dateTimeStr)
}

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export const subMonths = (date: Date, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() - months)
  return result
}

export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM yyyy')
}

export const getWeekRange = (date: Date): string => {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  const end = endOfWeek(date, { weekStartsOn: 0 })
  
  if (isSameMonth(start, end)) {
    return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`
  } else {
    return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`
  }
}
