import { ComponentStory } from '@storybook/react'

import { FieldRte, FieldRteProps } from './FieldRte'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRte',
    component: FieldRte,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRteProps) => <FieldRte {...args} />

export const Default: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: '<p>InitialValue</p><ul><li>List<ul><li>List 1</li><li>List 2</li></ul></li></ul>',
}

export const Disabled: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: '<p>InitialValue</p><ul><li>List<ul><li>List 1</li><li>List 2</li></ul></li></ul>',
    disabled: true,
}

export const WithLabel: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: 'InitialValue',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
}
