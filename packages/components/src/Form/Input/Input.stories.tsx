import { ComponentStory } from '@storybook/react'

import { Input, InputProps } from './Input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/Input',
    component: Input,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: InputProps) => <Input {...args} />

export const Default: ComponentStory<typeof Input> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    placeholder: 'Tekstvlak',
}

export const DisabledEmpty: ComponentStory<typeof Input> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledEmpty.args = {
    placeholder: 'Tekstvlak',
    disabled: true,
}

export const DisabledFilled: ComponentStory<typeof Input> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledFilled.args = {
    placeholder: 'Tekstvlak',
    disabled: true,
    value: 'Waarde',
}
