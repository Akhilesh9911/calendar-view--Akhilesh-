import { CalendarView } from './components/Calendar/CalendarView'
import { useEventManager } from './hooks/useEventManager'
import { useEffect } from 'react'

function App() {
  const { addEvent } = useEventManager()

  // Add some sample events on first load
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const sampleEvents = [
      {
        title: 'Team Standup',
        description: 'Daily team sync meeting',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
        color: '#3b82f6',
        category: 'Work',
      },
      {
        title: 'Project Review',
        description: 'Weekly project status review',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
        color: '#10b981',
        category: 'Work',
      },
      {
        title: 'Doctor Appointment',
        description: 'Annual health checkup',
        startDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
        endDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 0),
        color: '#ef4444',
        category: 'Health',
      },
    ]

    // Only add sample events if no events exist
    const existingEvents = useEventManager.getState().events
    if (existingEvents.length === 0) {
      sampleEvents.forEach(event => addEvent(event))
    }
  }, [addEvent])

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event)
  }

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Calendar View</h1>
          <p className="text-neutral-600">Interactive calendar with event management</p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <CalendarView 
            initialDate={new Date()}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
          />
        </div>
        
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>Click on any date to create an event, or click on existing events to edit them.</p>
        </div>
      </div>
    </div>
  )
}

export default App
