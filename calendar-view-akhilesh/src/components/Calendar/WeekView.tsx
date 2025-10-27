import React, { useMemo } from 'react'
import { WeekViewProps } from './CalendarView.types'
import { getWeekDays, getWeekHours } from '../../utils/date.utils'
import { getEventsForDate } from '../../utils/event.utils'
import { CalendarEvent } from '../../hooks/useEventManager'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate])
  const weekHours = useMemo(() => getWeekHours(), [])

  const getEventsForHour = (date: Date, hour: number): CalendarEvent[] => {
    const dayEvents = getEventsForDate(events, date)
    return dayEvents.filter(event => {
      const eventStartHour = event.startDate.getHours()
      const eventEndHour = event.endDate.getHours()
      return hour >= eventStartHour && hour < eventEndHour
    })
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Days of week header */}
      <div className="grid grid-cols-8 gap-px bg-neutral-200 mb-2">
        <div className="bg-neutral-100 p-2 text-center text-sm font-medium text-neutral-700">
          Time
        </div>
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className="bg-neutral-100 p-2 text-center text-sm font-medium text-neutral-700"
          >
            <div>{day}</div>
            <div className="text-xs text-neutral-500">
              {weekDays[index].getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Hourly grid */}
      <div className="grid grid-cols-8 gap-px bg-neutral-200">
        {weekHours.map((hour, hourIndex) => (
          <React.Fragment key={hour}>
            {/* Time column */}
            <div className="bg-neutral-50 p-2 text-xs text-neutral-600 text-center border-r border-neutral-200">
              {hour}
            </div>
            
            {/* Day columns */}
            {weekDays.map((date, dayIndex) => {
              const hourEvents = getEventsForHour(date, hourIndex)
              
              return (
                <div
                  key={`${dayIndex}-${hourIndex}`}
                  className="bg-white min-h-[60px] border-r border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => onDateClick(date)}
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 m-1 rounded text-white truncate"
                      style={{ backgroundColor: event.color || '#3b82f6' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(event)
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
