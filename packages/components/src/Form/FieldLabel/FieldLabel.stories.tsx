import { ComponentStory } from '@storybook/react'

import { FieldLabel, FieldLabelProps } from './FieldLabel'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldLabel',
    component: FieldLabel,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldLabelProps) => <FieldLabel {...args} />

export const Default: ComponentStory<typeof FieldLabel> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'titel',
    label: 'Form label',
}

export const Required: ComponentStory<typeof FieldLabel> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Required.args = {
    name: 'titel',
    label: 'Form label',
    required: true,
}

export const WithDescription: ComponentStory<typeof FieldLabel> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithDescription.args = {
    name: 'titel',
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
}
