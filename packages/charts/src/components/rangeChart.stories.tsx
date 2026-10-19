// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { RangeChart } from './rangeChart'

const temperatuur = [
    { label: 'Jan', start: -5, end: 8 },
    { label: 'Feb', start: -2, end: 11 },
    { label: 'Mrt', start: 1, end: 14 },
    { label: 'Apr', start: 4, end: 18 },
    {
        label: 'Mei',
        start: 8,
        end: 22,
        highlight: true,
        note: 'warmste meimaand',
    },
]

const meta = {
    title: 'Charts/RangeChart',
    component: RangeChart,
    argTypes: {
        ...baseArgTypes,
        horizontal: { control: 'boolean', table: { category: 'Range chart' } },
        valueLabel: { control: 'text', table: { category: 'Range chart' } },
        highlightLabel: { control: 'text', table: { category: 'Range chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Temperatuurbereik',
        subtitle: 'Minimum en maximum per maand',
        items: temperatuur,
        valueLabel: 'Temperatuur in Celsius (°C)',
    },
} satisfies Meta<typeof RangeChart>

export default meta
type Story = StoryObj<typeof meta>

/** Vertical columns: one min–max pill per category. */
export const Default: Story = {}

/** Rows left to right — the classic planning look. GanttChart is this preset. */
export const Horizontal: Story = { args: { horizontal: true } }

/** Highlighted ranges get their own legend entry, never colour alone. */
export const Highlighted: Story = { args: { highlightLabel: 'Record' } }

export const Loading: Story = { args: { loading: true } }
