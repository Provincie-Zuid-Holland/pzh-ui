import { parseDate } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar, RangeCalendar } from './Calendar'

const meta = {
    title: 'Componenten/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <Calendar {...args} aria-label="Datum kiezen" />,
}

export const WithDropdowns: Story = {
    render: args => (
        <Calendar
            {...args}
            aria-label="Datum kiezen"
            captionLayout="dropdown"
        />
    ),
}

export const TwoMonths: Story = {
    render: args => (
        <Calendar {...args} aria-label="Datum kiezen" numberOfMonths={2} />
    ),
}

export const SelectedDate: Story = {
    render: args => (
        <Calendar
            {...args}
            aria-label="Datum kiezen"
            defaultValue={parseDate('2026-08-19')}
        />
    ),
}

export const Range: Story = {
    render: () => (
        <RangeCalendar
            aria-label="Periode kiezen"
            defaultValue={{
                start: parseDate('2026-08-12'),
                end: parseDate('2026-08-18'),
            }}
        />
    ),
}

export const RangeTwoMonths: Story = {
    render: () => (
        <RangeCalendar
            aria-label="Periode kiezen"
            numberOfMonths={2}
            captionLayout="dropdown"
            defaultValue={{
                start: parseDate('2026-08-12'),
                end: parseDate('2026-08-18'),
            }}
        />
    ),
}
