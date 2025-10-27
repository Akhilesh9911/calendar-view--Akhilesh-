import React, { useState } from 'react'
import { CalendarCellProps } from './CalendarView.types'
import { CalendarEvent } from '../../hooks/useEventManager'
import { format } from 'date-fns'

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isCurrentMonth,
  isToday,
  events,
  onClick,
  onEventClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation()
    onEventClick(event)
  }

  const handleMouseEnter = (event: CalendarEvent) => {
    setHoveredEvent(event)
  }

  const handleMouseLeave = () => {
    setHoveredEvent(null)
  }

  return (
    <div
      className={`
        min-h-[120px] p-3 cursor-pointer transition-all duration-200 relative group
        ${isCurrentMonth ? 'bg-white' : 'bg-neutral-50'}
        ${isToday ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-400 shadow-md' : ''}
        hover:bg-neutral-100 hover:shadow-sm hover:scale-[1.02]
        ${isHovered ? 'bg-primary-50' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${format(date, 'MMMM d, yyyy')}${isToday ? ' (today)' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Date number with better styling */}
      <div className={`
        text-sm font-semibold mb-2 flex items-center justify-between
        ${isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'}
        ${isToday ? 'text-primary-800' : ''}
      `}>
        <span>{format(date, 'd')}</span>
        {isToday && (
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Events with hover effects */}
      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="text-xs p-2 rounded-md text-white truncate cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{ backgroundColor: event.color || '#3b82f6' }}
            onClick={(e) => handleEventClick(e, event)}
            onMouseEnter={() => handleMouseEnter(event)}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={`Event: ${event.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onEventClick(event)
              }
            }}
          >
            <div className="font-medium">{event.title}</div>
            {event.description && (
              <div className="text-xs opacity-90 truncate">{event.description}</div>
            )}
          </div>
        ))}
        
        {/* Show more indicator with animation */}
        {events.length > 3 && (
          <div className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors duration-200 cursor-pointer">
            +{events.length - 3} more events
          </div>
        )}
      </div>

      {/* Hover tooltip */}
      {hoveredEvent && (
        <div className="absolute z-20 top-full left-0 mt-1 p-3 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[200px]">
          <div className="text-sm font-semibold text-neutral-900">{hoveredEvent.title}</div>
          {hoveredEvent.description && (
            <div className="text-xs text-neutral-600 mt-1">{hoveredEvent.description}</div>
          )}
          <div className="text-xs text-neutral-500 mt-2">
            {format(hoveredEvent.startDate, 'MMM d, h:mm a')} - {format(hoveredEvent.endDate, 'h:mm a')}
          </div>
          {hoveredEvent.category && (
            <div className="text-xs text-primary-600 mt-1 font-medium">{hoveredEvent.category}</div>
          )}
        </div>
      )}

      {/* Add event button on hover */}
      {isHovered && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            aria-label="Add event"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
