import { Meta, StoryObj } from '@storybook/react'

import { DNABar, DNABarProps } from './DNABar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/DNABar',
    component: DNABar,
    argTypes: {
        blocks: {
            options: [2, 5, 6],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof DNABar>

type Story = StoryObj<typeof DNABar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: DNABarProps) => <DNABar {...args} />

export const Default = {
    render: Template,
    args: {
        blocks: 6,
    },
} satisfies Story
