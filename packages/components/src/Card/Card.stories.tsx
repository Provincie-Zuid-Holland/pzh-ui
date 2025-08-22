import { Meta, StoryObj } from '@storybook/react-vite'

import { Card, CardProps } from './Card'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Card',
    component: Card,
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof Card>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: CardProps) => <Card {...args} />

export const Default = {
    render: Template,
    args: {
        children: 'Content',
    },
} satisfies Story
