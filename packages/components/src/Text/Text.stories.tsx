import { Meta, StoryObj } from '@storybook/react-vite'

import { Text, TextProps } from './Text'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Text',
    component: Text,
} satisfies Meta<typeof Text>

type Story = StoryObj<typeof Text>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TextProps) => <Text {...args} />

export const Default = {
    render: Template,
    args: {
        children: 'Text',
    },
} satisfies Story
