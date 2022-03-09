import { ComponentStory } from '@storybook/react'

import { Heading, HeadingProps } from './Heading'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Heading',
    component: Heading,
    argTypes: {
        level: {
            options: ['1', '2', '3', '4', '5', '6'],
            control: { type: 'select' },
        },
    },
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: HeadingProps) => <Heading {...args} />

export const Default: ComponentStory<typeof Heading> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    level: '1',
    children: 'Heading',
}
