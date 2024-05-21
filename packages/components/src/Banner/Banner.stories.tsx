import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Banner, BannerProps } from './Banner'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Banner',
    component: Banner,
} satisfies Meta<typeof Banner>

type Story = StoryObj<typeof Banner>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BannerProps) => <Banner {...args} />

export const Default: Story = {
    render: Template,
    args: {
        text: 'Let op! De Monitor Leefomgeving van Provincie Zuid-Holland is momenteel nog in ontwikkeling.',
        isActive: true,
        color: 'blue',
        onRemoveCallback: fn(),
    },
}
