import { Meta, StoryObj } from '@storybook/react'

import { OLDModal, OLDModalProps } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/OLDModal',
    component: OLDModal,
} satisfies Meta<typeof OLDModal>

type Story = StoryObj<typeof OLDModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }: OLDModalProps) => <OLDModal {...args} />

export const Default = {
    render: Template,
    args: {
        children: <p>Modal</p>,
        open: true,
        onClose: () => {},
        closeButton: true,
    },
} satisfies Story
