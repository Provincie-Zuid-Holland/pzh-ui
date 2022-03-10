import { ComponentStory } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BreadcrumbsProps) => (
    <Router>
        <Breadcrumbs {...args} />
    </Router>
)

export const Default: ComponentStory<typeof Breadcrumbs> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    items: [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Stap 1',
            path: 'stap-1',
        },
        {
            name: 'Stap 2',
            path: 'stap-1/stap-2',
        },
    ],
}
