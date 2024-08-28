import { Meta, StoryObj } from '@storybook/react'

import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from './FieldCheckboxGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldCheckboxGroup',
    component: FieldCheckboxGroup,
} satisfies Meta<typeof FieldCheckboxGroup>

type Story = StoryObj<typeof FieldCheckboxGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldCheckboxGroupProps) => (
    <FieldCheckboxGroup {...args} />
)

export const Default = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const WithBorder = {
    render: Template,
    args: {
        name: 'radiogroup',
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
        layout: 'horizontal',
        withBorder: true,
    },
} satisfies Story
