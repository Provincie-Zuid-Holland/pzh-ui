import { ComponentStory } from '@storybook/react'

import { FieldInput, FieldInputProps } from './FieldInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldInput',
    component: FieldInput,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldInputProps) => <FieldInput {...args} />

export const Default: ComponentStory<typeof FieldInput> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    placeholder: 'Tekstvlak',
}

export const DisabledEmpty: ComponentStory<typeof FieldInput> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledEmpty.args = {
    placeholder: 'Tekstvlak',
    disabled: true,
}

export const DisabledFilled: ComponentStory<typeof FieldInput> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledFilled.args = {
    placeholder: 'Tekstvlak',
    disabled: true,
    value: 'Waarde',
}

export const WithLabel: ComponentStory<typeof FieldInput> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    placeholder: 'Tekstvlak',
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
    required: true,
}
