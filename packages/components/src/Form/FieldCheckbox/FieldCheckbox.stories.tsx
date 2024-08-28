import { Meta, StoryObj } from '@storybook/react'

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldCheckbox',
    component: FieldCheckbox,
} satisfies Meta<typeof FieldCheckbox>

type Story = StoryObj<typeof FieldCheckbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldCheckboxProps) => <FieldCheckbox {...args} />

export const Default = {
    render: Template,
    args: {
        id: 'option-1',
        children: 'Option 1',
        name: 'option-1',
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        id: 'option-1',
        children: 'Option 1',
        name: 'option-1',
        disabled: true,
    },
} satisfies Story

export const DisabledChecked = {
    render: Template,
    args: {
        id: 'option-1',
        children: 'Option 1',
        name: 'option-1',
        disabled: true,
        checked: true,
    },
} satisfies Story

export const WithBorder = {
    render: Template,
    args: {
        children: 'Option 1',
        name: 'option-1',
        withBorder: true,
    },
} satisfies Story
