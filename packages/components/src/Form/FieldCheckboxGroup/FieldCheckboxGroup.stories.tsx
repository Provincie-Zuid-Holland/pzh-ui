import { ComponentStory } from '@storybook/react'

import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from './FieldCheckboxGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldCheckboxGroup',
    component: FieldCheckboxGroup,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldCheckboxGroupProps) => (
    <FieldCheckboxGroup {...args} />
)

export const Default: ComponentStory<typeof FieldCheckboxGroup> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'option',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
    ],
}
