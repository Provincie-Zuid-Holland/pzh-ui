import { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { FieldDate, FieldDateProps } from './FieldDate'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldDate',
    component: FieldDate,
} satisfies Meta<typeof FieldDate>

type Story = StoryObj<typeof FieldDate>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldDateProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null)

    return (
        <FieldDate
            {...args}
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
        />
    )
}

export const Default = {
    render: Template,
    args: {
        name: 'date',
        placeholderText: 'Datum',
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        name: 'date',
        placeholderText: 'Datum',
        disabled: true,
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        name: 'date',
        placeholderText: 'Datum',
        label: 'Datum',
        required: true,
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        name: 'date',
        placeholderText: 'Datum',
        label: 'Datum',
        required: true,
        layout: 'grid',
    },
} satisfies Story
