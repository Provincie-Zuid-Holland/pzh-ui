import { ComponentStory } from '@storybook/react'

import { Divider, DividerProps } from './Divider'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Divider',
    component: Divider,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: DividerProps) => <Divider {...args} />

export const Default: ComponentStory<typeof Divider> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
