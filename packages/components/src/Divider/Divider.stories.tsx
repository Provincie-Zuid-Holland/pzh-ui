import { Meta, StoryObj } from '@storybook/react'

import { Divider, DividerProps } from './Divider'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Divider',
    component: Divider,
} satisfies Meta<typeof Divider>

type Story = StoryObj<typeof Divider>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: DividerProps) => <Divider {...args} />

export const Default = {
    render: Template,
} satisfies Story
