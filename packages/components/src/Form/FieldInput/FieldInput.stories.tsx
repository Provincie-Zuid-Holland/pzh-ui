import { Meta, StoryObj } from '@storybook/react'

import { MagnifyingGlass } from '../../../../icons'
import { FieldInput, FieldInputProps } from './FieldInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldInput',
    component: FieldInput,
} satisfies Meta<typeof FieldInput>

type Story = StoryObj<typeof FieldInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldInputProps) => <FieldInput {...args} />

export const Default = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
    },
} satisfies Story

export const DisabledEmpty = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        disabled: true,
    },
} satisfies Story

export const DisabledFilled = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        disabled: true,
        value: 'Waarde',
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        required: true,
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

export const WithError = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        hasError: true,
        value: 'Waarde',
    },
} satisfies Story

export const WithIcon = {
    render: Template,
    args: {
        placeholder: 'Zoek naar indicator',
        icon: MagnifyingGlass as any,
    },
} satisfies Story
