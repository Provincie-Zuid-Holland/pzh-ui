import { ComponentStory } from '@storybook/react'

import { Select, SelectProps } from './Select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/Select',
    component: Select,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: SelectProps) => <Select {...args} />

export const Default: ComponentStory<typeof Select> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
}

export const DisabledEmpty: ComponentStory<typeof Select> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledEmpty.args = {
    placeholder: 'Placeholder',
    disabled: true,
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
}

export const DisabledFilled: ComponentStory<typeof Select> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledFilled.args = {
    placeholder: 'Placeholder',
    disabled: true,
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    defaultValue: {
        label: 'Option 2',
        value: 'option-2',
    },
}
