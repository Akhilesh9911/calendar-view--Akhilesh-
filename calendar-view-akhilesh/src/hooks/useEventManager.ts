import { create } from 'zustand'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  color?: string
  category?: string
}

interface EventManagerState {
  events: CalendarEvent[]
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  getEvent: (id: string) => CalendarEvent | undefined
}

export const useEventManager = create<EventManagerState>((set, get) => ({
  events: [],
  
  addEvent: (event) => {
    const id = `event_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    const newEvent: CalendarEvent = {
      ...event,
      id,
    }
    set(state => ({ events: [...state.events, newEvent] }))
  },
  
  updateEvent: (id, updates) => {
    set(state => ({
      events: state.events.map(event => 
        event.id === id ? { ...event, ...updates } : event
      ),
    }))
  },
  
  deleteEvent: (id) => {
    set(state => ({
      events: state.events.filter(event => event.id !== id),
    }))
  },
  
  getEvent: (id) => {
    return get().events.find(event => event.id === id)
  },
}))
