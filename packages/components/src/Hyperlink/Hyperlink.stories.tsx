import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Hyperlink, HyperlinkProps } from './Hyperlink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Hyperlink',
    component: Hyperlink,
} satisfies Meta<typeof Hyperlink>

type Story = StoryObj<typeof Hyperlink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: HyperlinkProps) => (
    <Router>
        <Hyperlink {...args} />
    </Router>
)

export const Default = {
    render: Template,
    args: {
        text: 'Hyperlink text',
        to: '/to-page',
    },
} satisfies Story
