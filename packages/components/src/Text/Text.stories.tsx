import { ComponentStory } from '@storybook/react'

import { Text, TextProps } from './Text'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Text',
    component: Text,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TextProps) => <Text {...args} />

export const Default: ComponentStory<typeof Text> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: 'Text',
}
