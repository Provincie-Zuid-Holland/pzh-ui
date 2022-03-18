import { ComponentStory } from '@storybook/react'

import { Badge, BadgeProps } from './Badge'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Badge',
    component: Badge,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BadgeProps) => <Badge {...args} />

export const Default: ComponentStory<typeof Badge> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    text: 'Wegenbouw',
}
