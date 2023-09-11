import { Meta, StoryObj } from '@storybook/react'

import { Heading, HeadingProps } from './Heading'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Heading',
    component: Heading,
    argTypes: {
        level: {
            options: ['1', '2', '3', '4', '5', '6'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Heading>

type Story = StoryObj<typeof Heading>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: HeadingProps) => <Heading {...args} />

export const Default = {
    render: Template,
    args: {
        level: '1',
        children: 'Heading',
    },
} satisfies Story
