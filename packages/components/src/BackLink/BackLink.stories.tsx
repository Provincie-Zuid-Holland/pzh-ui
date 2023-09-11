import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { BackLink, BackLinkProps } from './BackLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/BackLink',
    component: BackLink,
} satisfies Meta<typeof BackLink>

type Story = StoryObj<typeof BackLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BackLinkProps) => (
    <Router>
        <BackLink {...args} />
    </Router>
)

export const Default = {
    render: Template,
    args: {
        to: '/',
        label: 'Terug',
    },
} satisfies Story
