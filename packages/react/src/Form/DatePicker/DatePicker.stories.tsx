import { parseDate } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldLabel } from '../Field'
import { DatePicker } from './DatePicker'

const meta = {
    title: 'Componenten/Form/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(500px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Field>
            <FieldLabel htmlFor="date">Datum</FieldLabel>

            <DatePicker id="date" name="date" />
        </Field>
    ),
}

export const WithDefaultValue: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel>Datum</FieldLabel>
            <DatePicker defaultValue={parseDate('2030-01-11')} />
        </Field>
    ),
}

export const Medium: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel>Datum</FieldLabel>
            <DatePicker size="m" />
        </Field>
    ),
}

export const Disabled: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel>Datum</FieldLabel>
            <DatePicker disabled defaultValue={parseDate('2030-01-11')} />
        </Field>
    ),
}

export const CalendarWithDropdowns: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel>Datum</FieldLabel>
            <DatePicker
                defaultValue={parseDate('2030-01-11')}
                calendarProps={{
                    captionLayout: 'dropdown',
                }}
            />
        </Field>
    ),
}
