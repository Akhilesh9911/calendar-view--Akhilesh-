import React, { useState, useEffect } from 'react'
import { Modal } from '../primitives/Modal'
import { Button } from '../primitives/Button'
import { Select } from '../primitives/Select'
import { EventModalProps } from './CalendarView.types'
import { CalendarEvent } from '../../hooks/useEventManager'
import { formatDateTime, parseDateTime } from '../../utils/date.utils'
import { getEventColors, getEventCategories, validateEvent, generateEventId } from '../../utils/event.utils'

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedDate,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    color: '#3b82f6',
    category: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!event

  useEffect(() => {
    if (isOpen) {
      if (event) {
        // Editing existing event
        setFormData({
          title: event.title,
          description: event.description || '',
          startDate: formatDateTime(event.startDate),
          endDate: formatDateTime(event.endDate),
          color: event.color || '#3b82f6',
          category: event.category || '',
        })
      } else if (selectedDate) {
        // Creating new event
        const startDate = new Date(selectedDate)
        startDate.setHours(9, 0, 0, 0)
        const endDate = new Date(startDate)
        endDate.setHours(10, 0, 0, 0)
        
        setFormData({
          title: '',
          description: '',
          startDate: formatDateTime(startDate),
          endDate: formatDateTime(endDate),
          color: '#3b82f6',
          category: '',
        })
      }
      setErrors([])
    }
  }, [isOpen, event, selectedDate])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSave = async () => {
    const eventData: Partial<CalendarEvent> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      startDate: parseDateTime(formData.startDate),
      endDate: parseDateTime(formData.endDate),
      color: formData.color,
      category: formData.category || undefined,
    }

    const validationErrors = validateEvent(eventData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    
    try {
      const calendarEvent: CalendarEvent = {
        id: event?.id || generateEventId(),
        ...eventData,
      } as CalendarEvent

      await onSave(calendarEvent)
    } catch (error) {
      setErrors(['Failed to save event. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    if (event && onDelete) {
      if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        onDelete(event.id)
      }
    }
  }

  const colorOptions = getEventColors().map(color => ({
    value: color,
    label: color,
  }))

  const categoryOptions = getEventCategories().map(category => ({
    value: category,
    label: category,
  }))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Event' : 'Create New Event'}
      size="lg"
    >
      <div className="space-y-6">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
            </div>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-neutral-700 mb-2">
            Event Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="Enter event title"
            maxLength={100}
            disabled={isSubmitting}
          />
          <div className="text-xs text-neutral-500 mt-1">
            {formData.title.length}/100 characters
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="Enter event description (optional)"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-neutral-700 mb-2">
              Start Date & Time *
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-neutral-700 mb-2">
              End Date & Time *
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Color and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="color" className="block text-sm font-semibold text-neutral-700 mb-2">
              Event Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-12 h-12 border border-neutral-300 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                disabled={isSubmitting}
              />
              <div className="flex-1">
                <Select
                  value={formData.color}
                  onChange={(value) => handleInputChange('color', value)}
                  options={colorOptions}
                  placeholder="Select color"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 mb-2">
              Category
            </label>
            <Select
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              options={categoryOptions}
              placeholder="Select category"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
          <div>
            {isEditing && onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                disabled={isSubmitting}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Event
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSubmitting}
              className="transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {isEditing ? 'Update Event' : 'Create Event'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
