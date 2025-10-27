import React, { useMemo } from 'react'
import { CalendarCell } from './CalendarCell'
import { MonthViewProps } from './CalendarView.types'
import { getCalendarGrid, isCurrentMonth, isToday } from '../../utils/date.utils'
import { getEventsForDate } from '../../utils/event.utils'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const calendarGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate])

  return (
    <div className="w-full">
      {/* Enhanced Days of week header */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 mb-4 rounded-lg overflow-hidden">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="bg-gradient-to-r from-primary-100 to-primary-200 p-4 text-center text-sm font-bold text-primary-800"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Enhanced Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-lg overflow-hidden shadow-sm">
        {calendarGrid.map((date, index) => {
          const dayEvents = getEventsForDate(events, date)
          const isCurrentMonthDay = isCurrentMonth(date, currentDate)
          const isTodayDay = isToday(date)

          return (
            <CalendarCell
              key={index}
              date={date}
              isCurrentMonth={isCurrentMonthDay}
              isToday={isTodayDay}
              events={dayEvents}
              onClick={() => onDateClick(date)}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    </div>
  )
}
