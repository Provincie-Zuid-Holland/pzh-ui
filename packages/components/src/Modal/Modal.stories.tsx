import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../Button'
import { FieldInput } from '../Form'
import { Modal, ModalProps } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Modal',
    component: Modal,
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }: ModalProps) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Button onPress={() => setOpen(true)}>Open modal</Button>
            <Modal isOpen={isOpen} onOpenChange={setOpen} {...args} />
        </>
    )
}

export const Default = {
    render: Template,
    args: {
        title: 'Modal',
        children: (
            <form className="mb-[1000px] flex flex-col p-4">
                <label htmlFor="first-name">First Name:</label>
                <FieldInput name="first-name" />
                <label htmlFor="last-name">Last Name:</label>
                <FieldInput name="last-name" />
            </form>
        ),
    },
} satisfies Story
