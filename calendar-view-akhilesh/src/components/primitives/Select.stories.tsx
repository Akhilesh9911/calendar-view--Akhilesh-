import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { useState } from 'react'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Select>

const SelectExample = ({ placeholder, disabled }: { placeholder?: string; disabled?: boolean }) => {
  const [value, setValue] = useState('')
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ]

  return (
    <div className="w-64">
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
      />
      <p className="mt-2 text-sm text-gray-600">Selected: {value || 'None'}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <SelectExample />,
}

export const WithPlaceholder: Story = {
  render: () => <SelectExample placeholder="Choose an option..." />,
}

export const Disabled: Story = {
  render: () => <SelectExample disabled={true} />,
}

export const ColorOptions: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    const colorOptions = [
      { value: '#3b82f6', label: 'Blue' },
      { value: '#ef4444', label: 'Red' },
      { value: '#10b981', label: 'Green' },
      { value: '#f59e0b', label: 'Yellow' },
      { value: '#8b5cf6', label: 'Purple' },
    ]

    return (
      <div className="w-64">
        <Select
          value={value}
          onChange={setValue}
          options={colorOptions}
          placeholder="Select a color"
        />
        <p className="mt-2 text-sm text-gray-600">Selected: {value || 'None'}</p>
      </div>
    )
  },
}
