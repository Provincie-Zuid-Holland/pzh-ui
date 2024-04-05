import { Meta, StoryObj } from '@storybook/react'

import { Hyperlink, HyperlinkProps } from './Hyperlink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Hyperlink',
    component: Hyperlink,
} satisfies Meta<typeof Hyperlink>

type Story = StoryObj<typeof Hyperlink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: HyperlinkProps) => <Hyperlink {...args} />

export const Default = {
    render: Template,
    args: {
        children: 'Hyperlink text',
    },
} satisfies Story
