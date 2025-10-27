import React, { useState, useMemo, useCallback } from 'react'
import { useCalendar } from '../../hooks/useCalendar'
import { useEventManager } from '../../hooks/useEventManager'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { EventModal } from './EventModal'
import { Button } from '../primitives/Button'
import { CalendarViewProps } from './CalendarView.types'
import { CalendarEvent } from '../../hooks/useEventManager'
import { getMonthName, getWeekRange } from '../../utils/date.utils'

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialDate = new Date(),
  onEventClick,
  onDateClick,
}) => {
  const calendar = useCalendar(initialDate)
  const eventManager = useEventManager()
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Handle date clicks with some animation
  const handleDateClick = useCallback((date: Date) => {
    calendar.setSelectedDate(date)
    onDateClick?.(date)
    setIsEventModalOpen(true)
    setSelectedEvent(null)
  }, [calendar, onDateClick])

  // Handle event clicks with loading state
  const handleEventClick = useCallback((event: CalendarEvent) => {
    onEventClick?.(event)
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }, [onEventClick])

  // Save event with loading animation
  const handleEventSave = useCallback(async (event: CalendarEvent) => {
    setIsLoading(true)
    
    // Simulate some processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (selectedEvent) {
      eventManager.updateEvent(event.id, event)
    } else {
      eventManager.addEvent(event)
    }
    
    setIsEventModalOpen(false)
    setSelectedEvent(null)
    setIsLoading(false)
  }, [selectedEvent, eventManager])

  // Delete event with confirmation
  const handleEventDelete = useCallback((eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      eventManager.deleteEvent(eventId)
      setIsEventModalOpen(false)
      setSelectedEvent(null)
    }
  }, [eventManager])

  const handleCloseModal = useCallback(() => {
    setIsEventModalOpen(false)
    setSelectedEvent(null)
  }, [])

  // Navigation with smooth transitions
  const handlePrevious = useCallback(() => {
    if (calendar.view === 'month') {
      calendar.goToPreviousMonth()
    } else {
      calendar.goToPreviousWeek()
    }
  }, [calendar])

  const handleNext = useCallback(() => {
    if (calendar.view === 'month') {
      calendar.goToNextMonth()
    } else {
      calendar.goToNextWeek()
    }
  }, [calendar])

  const navigationTitle = useMemo(() => {
    return calendar.view === 'month' 
      ? getMonthName(calendar.currentDate) 
      : getWeekRange(calendar.currentDate)
  }, [calendar.view, calendar.currentDate])

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* Enhanced Header with better styling */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-b border-primary-200">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <h2 className="text-2xl font-bold text-primary-900">
              {navigationTitle}
            </h2>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="hover:bg-primary-100 hover:border-primary-300 transition-all duration-200"
                aria-label={`Go to previous ${calendar.view}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="hover:bg-primary-100 hover:border-primary-300 transition-all duration-200"
                aria-label={`Go to next ${calendar.view}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={calendar.goToToday}
                className="hover:bg-primary-200 transition-all duration-200"
                aria-label="Go to today"
              >
                Today
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={calendar.view === 'month' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => calendar.setView('month')}
              className="transition-all duration-200"
            >
              Month
            </Button>
            <Button
              variant={calendar.view === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => calendar.setView('week')}
              className="transition-all duration-200"
            >
              Week
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content with loading state */}
      <div className="p-6">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
        
        {calendar.view === 'month' ? (
          <MonthView
            currentDate={calendar.currentDate}
            events={eventManager.events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            currentDate={calendar.currentDate}
            events={eventManager.events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {/* Enhanced Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        selectedDate={calendar.selectedDate || undefined}
        onSave={handleEventSave}
        onDelete={selectedEvent ? handleEventDelete : undefined}
      />
    </div>
  )
}
