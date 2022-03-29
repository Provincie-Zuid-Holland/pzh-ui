import { ComponentStory } from '@storybook/react'

import { Card, CardProps } from './Card'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Card',
    component: Card,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: CardProps) => <Card {...args} />

export const Default: ComponentStory<typeof Card> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: 'Content',
}
