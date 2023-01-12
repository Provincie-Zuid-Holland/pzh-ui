import { ComponentStory } from '@storybook/react'

import { FieldTextArea, FieldTextAreaProps } from './FieldTextArea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldTextArea',
    component: FieldTextArea,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldTextAreaProps) => <FieldTextArea {...args} />

export const Default: ComponentStory<typeof FieldTextArea> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'textarea',
    placeholder: 'Tekstvlak',
}

export const DisabledEmpty: ComponentStory<typeof FieldTextArea> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledEmpty.args = {
    name: 'textarea',
    placeholder: 'Tekstvlak',
    disabled: true,
}

export const DisabledFilled: ComponentStory<typeof FieldTextArea> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledFilled.args = {
    name: 'textarea',
    placeholder: 'Tekstvlak',
    disabled: true,
    value: 'Waarde',
}

export const WithLabel: ComponentStory<typeof FieldTextArea> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'textarea',
    placeholder: 'Tekstvlak',
    label: 'Form label',
}

export const LayoutGrid: ComponentStory<typeof FieldTextArea> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LayoutGrid.args = {
    placeholder: 'Tekstvlak',
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
    required: true,
    layout: 'grid',
}
