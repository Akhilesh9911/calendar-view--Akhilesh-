import { CalendarEvent } from '../hooks/useEventManager'
import { isSameDay, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns'

export const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = []
  
  if (!event.title || event.title.trim().length === 0) {
    errors.push('Title is required')
  }
  
  if (event.title && event.title.length > 100) {
    errors.push('Title must be 100 characters or less')
  }
  
  if (!event.startDate) {
    errors.push('Start date is required')
  }
  
  if (!event.endDate) {
    errors.push('End date is required')
  }
  
  if (event.startDate && event.endDate && isAfter(event.startDate, event.endDate)) {
    errors.push('End date must be after start date')
  }
  
  return errors
}

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate)
    const eventEnd = endOfDay(event.endDate)
    const targetDate = startOfDay(date)
    
    return (
      isSameDay(event.startDate, date) ||
      isSameDay(event.endDate, date) ||
      (isAfter(targetDate, eventStart) && isBefore(targetDate, eventEnd))
    )
  })
}

export const getEventsForDateRange = (events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate)
    const eventEnd = endOfDay(event.endDate)
    const rangeStart = startOfDay(startDate)
    const rangeEnd = endOfDay(endDate)
    
    return (
      (isAfter(eventStart, rangeStart) && isBefore(eventStart, rangeEnd)) ||
      (isAfter(eventEnd, rangeStart) && isBefore(eventEnd, rangeEnd)) ||
      (isBefore(eventStart, rangeStart) && isAfter(eventEnd, rangeEnd))
    )
  })
}

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    const timeA = a.startDate.getTime()
    const timeB = b.startDate.getTime()
    
    if (timeA !== timeB) {
      return timeA - timeB
    }
    
    // If same start time, sort by end time
    return a.endDate.getTime() - b.endDate.getTime()
  })
}

export const getEventColors = (): string[] => {
  return [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
  ]
}

export const getEventCategories = (): string[] => {
  return [
    'Meeting',
    'Personal',
    'Work',
    'Health',
    'Travel',
    'Education',
    'Social',
    'Other',
  ]
}

export const createEventFromDate = (date: Date, title: string = 'New Event'): Partial<CalendarEvent> => {
  const startDate = new Date(date)
  startDate.setHours(9, 0, 0, 0) // Default to 9:00 AM
  
  const endDate = new Date(startDate)
  endDate.setHours(10, 0, 0, 0) // Default to 10:00 AM
  
  return {
    title,
    startDate,
    endDate,
    color: getEventColors()[0],
    category: getEventCategories()[0],
  }
}

export const isEventOverlapping = (events: CalendarEvent[], newEvent: CalendarEvent): boolean => {
  return events.some(event => {
    if (event.id === newEvent.id) return false
    
    return (
      (isAfter(newEvent.startDate, event.startDate) && isBefore(newEvent.startDate, event.endDate)) ||
      (isAfter(newEvent.endDate, event.startDate) && isBefore(newEvent.endDate, event.endDate)) ||
      (isBefore(newEvent.startDate, event.startDate) && isAfter(newEvent.endDate, event.endDate))
    )
  })
}
