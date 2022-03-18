import { ComponentStory } from '@storybook/react'

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldCheckbox',
    component: FieldCheckbox,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldCheckboxProps) => <FieldCheckbox {...args} />

export const Default: ComponentStory<typeof FieldCheckbox> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    id: 'option-1',
    children: 'Option 1',
    name: 'option-1',
}

export const Disabled: ComponentStory<typeof FieldCheckbox> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    id: 'option-1',
    children: 'Option 1',
    name: 'option-1',
    disabled: true,
}

export const DisabledChecked: ComponentStory<typeof FieldCheckbox> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledChecked.args = {
    id: 'option-1',
    children: 'Option 1',
    name: 'option-1',
    disabled: true,
    checked: true,
}
