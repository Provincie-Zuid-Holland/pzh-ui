import { ComponentStory } from '@storybook/react'

import { Tooltip, TooltipProps } from './Tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TooltipProps) => <Tooltip {...args} />

export const Default: ComponentStory<typeof Tooltip> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: <p className="inline-block font-bold">hover me</p>,
    label: 'Tooltip',
}
