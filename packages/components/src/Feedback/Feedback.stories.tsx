import { Meta, StoryObj } from '@storybook/react'

import { Feedback, FeedbackProps } from './Feedback'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Feedback',
    component: Feedback,
} satisfies Meta<typeof Feedback>

type Story = StoryObj<typeof Feedback>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FeedbackProps) => <Feedback {...args} />

export const Default = {
    render: Template,
    args: {
        email: 'omgevingsbeleid@pzh.nl',
        website: 'obzh.nl',
    },
} satisfies Story
