import { Meta, StoryObj } from '@storybook/react'

import { FieldRadio, FieldRadioProps } from './FieldRadio'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRadio',
    component: FieldRadio,
} satisfies Meta<typeof FieldRadio>

type Story = StoryObj<typeof FieldRadio>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRadioProps) => <FieldRadio {...args} />

export const Default = {
    render: Template,
    args: {
        children: 'Option 1',
        name: 'option-1',
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        children: 'Option 1',
        name: 'option-1',
        disabled: true,
    },
} satisfies Story

export const DisabledChecked = {
    render: Template,
    args: {
        children: 'Option 1',
        name: 'option-1',
        disabled: true,
        checked: true,
    },
} satisfies Story
