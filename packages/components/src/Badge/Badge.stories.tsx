import { Meta, StoryObj } from '@storybook/react'

import { Badge, BadgeProps } from './Badge'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Badge',
    component: Badge,
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BadgeProps) => <Badge {...args} />

export const Default = {
    render: Template,
    args: {
        text: 'Wegenbouw',
    },
} satisfies Story
