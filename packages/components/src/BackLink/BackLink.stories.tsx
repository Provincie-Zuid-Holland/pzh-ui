import { ComponentStory } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { BackLink, BackLinkProps } from './BackLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/BackLink',
    component: BackLink,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BackLinkProps) => (
    <Router>
        <BackLink {...args} />
    </Router>
)

export const Default: ComponentStory<typeof BackLink> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    to: '/',
    label: 'Terug',
}
