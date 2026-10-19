// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { GanttChart } from './ganttChart'

const planning = [
    { label: 'Verkenning', start: 1, end: 6 },
    { label: 'Ontwerp', start: 5, end: 12 },
    { label: 'Bouw', start: 11, end: 24, highlight: true, note: 'kritiek pad' },
    { label: 'Test', start: 22, end: 30 },
    { label: 'Oplevering', start: 29, end: 32 },
]

const meta = {
    title: 'Charts/GanttChart',
    component: GanttChart,
    argTypes: {
        ...baseArgTypes,
        valueLabel: { control: 'text', table: { category: 'Gantt' } },
        highlightLabel: { control: 'text', table: { category: 'Gantt' } },
    },
    args: {
        ...baseArgs,
        title: 'Projectplanning',
        subtitle: 'Start en eind per fase, in weken',
        items: planning,
        valueLabel: 'Week',
        axis: { tickFormat: 'plain' },
    },
} satisfies Meta<typeof GanttChart>

export default meta
type Story = StoryObj<typeof meta>

/** A preset: RangeChart with `horizontal` fixed on. Dates map to numbers. */
export const Default: Story = {}

export const Highlighted: Story = { args: { highlightLabel: 'Kritiek pad' } }
