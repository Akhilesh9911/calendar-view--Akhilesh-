import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalExample = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        size={size}
      >
        <div className="space-y-4">
          <p>This is a modal example with some content.</p>
          <p>You can close it by clicking the X button, clicking outside, or pressing Escape.</p>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <ModalExample />,
}

export const Small: Story = {
  render: () => <ModalExample size="sm" />,
}

export const Medium: Story = {
  render: () => <ModalExample size="md" />,
}

export const Large: Story = {
  render: () => <ModalExample size="lg" />,
}

export const ExtraLarge: Story = {
  render: () => <ModalExample size="xl" />,
}
