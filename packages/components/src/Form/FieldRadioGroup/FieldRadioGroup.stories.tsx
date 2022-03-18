import { ComponentStory } from '@storybook/react'

import { FieldRadioGroup, FieldRadioGroupProps } from './FieldRadioGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRadioGroup',
    component: FieldRadioGroup,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRadioGroupProps) => <FieldRadioGroup {...args} />

export const Default: ComponentStory<typeof FieldRadioGroup> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
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
