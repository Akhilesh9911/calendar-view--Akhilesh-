import { useState, useCallback } from 'react'

export interface CalendarState {
  currentDate: Date
  view: 'month' | 'week'
  selectedDate: Date | null
}

export const useCalendar = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: 'month',
    selectedDate: null,
  })

  const goToNextMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1, 1),
    }))
  }, [])

  const goToPreviousMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1, 1),
    }))
  }, [])

  const goToNextWeek = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    }))
  }, [])

  const goToPreviousWeek = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(prev.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    }))
  }, [])

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
    }))
  }, [])

  const setView = useCallback((view: 'month' | 'week') => {
    setState(prev => ({ ...prev, view }))
  }, [])

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, selectedDate: date }))
  }, [])

  const setCurrentDate = useCallback((date: Date) => {
    setState(prev => ({ ...prev, currentDate: date }))
  }, [])

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    setView,
    setSelectedDate,
    setCurrentDate,
  }
}
