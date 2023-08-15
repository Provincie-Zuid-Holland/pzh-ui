import { ComponentStory } from '@storybook/react'

import { Modal, ModalProps } from './Modal'
import { useState } from 'react'
import { Button } from '../Button'
import { FieldInput } from '../Form'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Modal',
    component: Modal,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }: ModalProps) => {
    const [isOpen, setOpen] = useState(true)

    return (
        <>
            <Button onPress={() => setOpen(true)}>Open modal</Button>
            <Modal isOpen={isOpen} onOpenChange={setOpen} {...args} />
        </>
    )
}

export const Default: ComponentStory<typeof Modal> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    title: 'Modal',
    children: (
        <form className="flex flex-col p-4">
            <label htmlFor="first-name">First Name:</label>
            <FieldInput name="first-name" />
            <label htmlFor="last-name">Last Name:</label>
            <FieldInput name="last-name" />
        </form>
    ),
}
