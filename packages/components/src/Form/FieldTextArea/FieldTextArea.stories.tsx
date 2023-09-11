import { Meta, StoryObj } from '@storybook/react'

import { FieldTextArea, FieldTextAreaProps } from './FieldTextArea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldTextArea',
    component: FieldTextArea,
} satisfies Meta<typeof FieldTextArea>

type Story = StoryObj<typeof FieldTextArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldTextAreaProps) => <FieldTextArea {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'textarea',
        placeholder: 'Tekstvlak',
    },
} satisfies Story

export const DisabledEmpty = {
    render: Template,
    args: {
        name: 'textarea',
        placeholder: 'Tekstvlak',
        disabled: true,
    },
} satisfies Story

export const DisabledFilled = {
    render: Template,
    args: {
        name: 'textarea',
        placeholder: 'Tekstvlak',
        disabled: true,
        value: 'Waarde',
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        name: 'textarea',
        placeholder: 'Tekstvlak',
        label: 'Form label',
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        required: true,
        layout: 'grid',
    },
} satisfies Story
