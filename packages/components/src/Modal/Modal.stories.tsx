import { ComponentStory } from '@storybook/react'

import { Modal, ModalProps } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Modal',
    component: Modal,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }: ModalProps) => <Modal {...args} />

export const Default: ComponentStory<typeof Modal> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: <p>Modal</p>,
    open: true,
    onClose: () => {},
    closeButton: true,
}
