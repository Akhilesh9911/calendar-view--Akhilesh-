import type { Meta, StoryObj } from '@storybook/react'
import { CalendarView } from './CalendarView'
import { useEventManager } from '../../hooks/useEventManager'
import { generateEventId } from '../../utils/event.utils'

// Mock data for stories
const mockEvents = [
  {
    id: generateEventId(),
    title: 'Team Meeting',
    description: 'Weekly team standup',
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 10, 0),
    color: '#3b82f6',
    category: 'Work',
  },
  {
    id: generateEventId(),
    title: 'Doctor Appointment',
    description: 'Annual checkup',
    startDate: new Date(2024, 0, 18, 14, 0),
    endDate: new Date(2024, 0, 18, 15, 0),
    color: '#10b981',
    category: 'Health',
  },
  {
    id: generateEventId(),
    title: 'Project Deadline',
    description: 'Submit final report',
    startDate: new Date(2024, 0, 22, 17, 0),
    endDate: new Date(2024, 0, 22, 18, 0),
    color: '#ef4444',
    category: 'Work',
  },
  {
    id: generateEventId(),
    title: 'Birthday Party',
    description: 'Sarah\'s birthday celebration',
    startDate: new Date(2024, 0, 25, 19, 0),
    endDate: new Date(2024, 0, 25, 22, 0),
    color: '#f59e0b',
    category: 'Social',
  },
]

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      // Initialize store with mock events
      const { addEvent } = useEventManager.getState()
      
      // Clear existing events and add mock events
      useEventManager.setState({ events: [] })
      mockEvents.forEach(event => addEvent(event))
      
      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof CalendarView>

export const Default: Story = {
  args: {
    initialDate: new Date(2024, 0, 15),
  },
}

export const EmptyCalendar: Story = {
  args: {
    initialDate: new Date(2024, 0, 15),
  },
  decorators: [
    (Story) => {
      // Clear all events
      useEventManager.setState({ events: [] })
      return <Story />
    },
  ],
}

export const WeekView: Story = {
  args: {
    initialDate: new Date(2024, 0, 15),
  },
  decorators: [
    (Story) => {
      // Set initial view to week
      const { addEvent } = useEventManager.getState()
      useEventManager.setState({ events: [] })
      mockEvents.forEach(event => addEvent(event))
      
      return (
        <div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Click the "Week" button in the header to switch to week view
            </p>
          </div>
          <Story />
        </div>
      )
    },
  ],
}

export const LargeDataset: Story = {
  args: {
    initialDate: new Date(2024, 0, 15),
  },
  decorators: [
    (Story) => {
      // Generate many events
      const { addEvent } = useEventManager.getState()
      const events = []
      
      for (let i = 0; i < 25; i++) {
        const day = Math.floor(i / 5) + 1
        const hour = (i % 5) * 2 + 9
        events.push({
          id: generateEventId(),
          title: `Event ${i + 1}`,
          description: `This is event number ${i + 1}`,
          startDate: new Date(2024, 0, day, hour, 0),
          endDate: new Date(2024, 0, day, hour + 1, 0),
          color: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][i % 5],
          category: ['Work', 'Personal', 'Health', 'Social', 'Education'][i % 5],
        })
      }
      
      useEventManager.setState({ events: [] })
      events.forEach(event => addEvent(event))
      
      return <Story />
    },
  ],
}

export const InteractivePlayground: Story = {
  args: {
    initialDate: new Date(2024, 0, 15),
  },
  decorators: [
    (Story) => {
      const { addEvent } = useEventManager.getState()
      useEventManager.setState({ events: [] })
      mockEvents.forEach(event => addEvent(event))
      
      return (
        <div>
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Interactive Features:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Click on any date to create a new event</li>
              <li>• Click on existing events to edit them</li>
              <li>• Switch between Month and Week views</li>
              <li>• Navigate using Previous/Next buttons</li>
              <li>• Use "Today" button to jump to current date</li>
              <li>• Try keyboard navigation (Tab, Enter, Escape)</li>
            </ul>
          </div>
          <Story />
        </div>
      )
    },
  ],
}
