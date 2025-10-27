import { CalendarEvent } from '../../hooks/useEventManager'

export interface CalendarViewProps {
  initialDate?: Date
  onEventClick?: (event: CalendarEvent) => void
  onDateClick?: (date: Date) => void
}

export interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export interface CalendarCellProps {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
  onClick: () => void
  onEventClick: (event: CalendarEvent) => void
}

export interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event?: CalendarEvent | null
  selectedDate?: Date
  onSave: (event: CalendarEvent) => void
  onDelete?: (eventId: string) => void
  isLoading?: boolean
}
