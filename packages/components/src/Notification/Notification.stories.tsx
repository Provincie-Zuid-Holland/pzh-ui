import { Meta, StoryObj } from '@storybook/react'

import { Notification, NotificationProps } from './Notification'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Notification',
    component: Notification,
} satisfies Meta<typeof Notification>

type Story = StoryObj<typeof Notification>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: NotificationProps) => <Notification {...args} />

export const Info = {
    render: Template,
    args: {
        title: 'Titel van melding',
        children: 'Dit is een toelichting.',
        variant: 'info',
    },
} satisfies Story

export const Warning = {
    render: Template,
    args: {
        children: 'Dit is een melding.',
        variant: 'warning',
    },
} satisfies Story

export const Positive = {
    render: Template,
    args: {
        title: 'Titel van de melding',
        children: 'Dit is een melding.',
        variant: 'positive',
    },
} satisfies Story

export const Negative = {
    render: Template,
    args: {
        title: 'Titel van de melding',
        children: 'Dit is een melding.',
        variant: 'negative',
    },
} satisfies Story
