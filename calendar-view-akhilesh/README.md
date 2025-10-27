# Calendar View Component

A production-quality React + TypeScript calendar component with month and week views, event management, accessibility features, and responsive design. Built with modern UI/UX patterns and interactive animations.

## Live Storybook
[Deploy your Storybook to get a live link here]

## Installation

```bash
npm install
npm run dev          # Start development server
npm run storybook    # Start Storybook
```

## Features

- **Month and Week Views**: Switch between monthly grid view and weekly hourly view
- **Event Management**: Create, edit, and delete events with full CRUD operations
- **Interactive UI**: Hover effects, animations, loading states, and smooth transitions
- **Event Tooltips**: Rich hover tooltips showing event details
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Modern Styling**: Gradient backgrounds, shadows, and polished visual design
- **Sample Data**: Pre-loaded sample events for immediate testing

## Interactive Features

- **Hover Effects**: Calendar cells scale and show add buttons on hover
- **Event Tooltips**: Detailed event information on hover
- **Loading States**: Smooth loading animations during operations
- **Confirmation Dialogs**: Delete confirmations for better UX
- **Character Counter**: Real-time character count for event titles
- **Smooth Transitions**: All interactions have smooth animations
- **Visual Feedback**: Active states, focus indicators, and hover effects

## Technologies

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Strict type safety with comprehensive interfaces
- **Tailwind CSS** - Utility-first styling with custom design system
- **Zustand** - Lightweight state management with TypeScript support
- **date-fns** - Modern date manipulation utilities
- **Storybook** - Component documentation and interactive testing
- **Vite** - Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx          # Main calendar component with enhanced UI
│   │   ├── CalendarView.stories.tsx # Comprehensive Storybook stories
│   │   ├── CalendarView.types.ts     # TypeScript interfaces
│   │   ├── MonthView.tsx            # Enhanced month grid view
│   │   ├── WeekView.tsx             # Week hourly view
│   │   ├── CalendarCell.tsx         # Interactive day cell with tooltips
│   │   └── EventModal.tsx           # Rich event creation/editing modal
│   └── primitives/
│       ├── Button.tsx               # Enhanced button with animations
│       ├── Modal.tsx                # Accessible modal wrapper
│       └── Select.tsx               # Styled select dropdown
├── hooks/
│   ├── useCalendar.ts               # Calendar navigation logic
│   └── useEventManager.ts           # Event CRUD operations with Zustand
├── utils/
│   ├── date.utils.ts                # Date manipulation helpers
│   └── event.utils.ts               # Event validation and utilities
└── styles/
    └── globals.css                  # Global styles and Tailwind imports
```

## Usage

```tsx
import { CalendarView } from './components/Calendar/CalendarView'

function App() {
  const handleEventClick = (event) => {
    console.log('Event clicked:', event)
  }

  const handleDateClick = (date) => {
    console.log('Date clicked:', date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <CalendarView 
        initialDate={new Date()}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
      />
    </div>
  )
}
```

## Enhanced UI Features

- **Gradient Backgrounds**: Beautiful gradient headers and backgrounds
- **Hover Animations**: Smooth scale and shadow effects on interaction
- **Loading Spinners**: Visual feedback during async operations
- **Event Tooltips**: Rich hover information with event details
- **Add Buttons**: Quick add event buttons appear on cell hover
- **Character Counter**: Real-time feedback for input limits
- **Confirmation Dialogs**: Safe delete operations with user confirmation
- **Smooth Transitions**: All state changes have smooth animations

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Escape, and arrow keys
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color ratios
- **Semantic HTML**: Proper use of roles, landmarks, and semantic elements
- **Screen Reader Support**: Optimized for assistive technologies

## Performance Optimizations

- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useCallback**: Optimized event handlers with proper dependencies
- **useMemo**: Computed values cached for performance
- **Lazy Loading**: Modal components loaded on demand
- **Efficient Rendering**: Only re-render changed calendar cells
- **Smooth Animations**: Hardware-accelerated CSS transitions

## Storybook Stories

The component includes comprehensive Storybook documentation:

1. **Default** - Enhanced calendar with sample events and animations
2. **Empty Calendar** - Clean calendar with hover effects
3. **Week View** - Interactive weekly hourly view
4. **Large Dataset** - Performance test with 25+ events
5. **Interactive Playground** - Full CRUD functionality with enhanced UI

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

## Contact

**Akhilesh Chitare**  
Email: akhileshchitare04@gmail.com

