import { Meta, StoryObj } from '@storybook/react'

import { FieldLabel, FieldLabelProps } from './FieldLabel'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldLabel',
    component: FieldLabel,
} satisfies Meta<typeof FieldLabel>

type Story = StoryObj<typeof FieldLabel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldLabelProps) => <FieldLabel {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'titel',
        label: 'Form label',
    },
} satisfies Story

export const Required = {
    render: Template,
    args: {
        name: 'titel',
        label: 'Form label',
        required: true,
    },
} satisfies Story

export const WithDescription = {
    render: Template,
    args: {
        name: 'titel',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
    },
} satisfies Story

export const WithTooltip = {
    render: Template,
    args: {
        name: 'titel',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        tooltip: 'Dit is een tooltip',
    },
} satisfies Story
