import { ComponentStory } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ListLink, ListLinkProps } from './ListLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/ListLink',
    component: ListLink,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ListLinkProps) => (
    <Router>
        <ListLink {...args} />
    </Router>
)

export const Default: ComponentStory<typeof ListLink> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    text: 'ListLink text',
    to: '/to-page',
}
