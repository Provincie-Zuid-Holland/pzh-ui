// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { PieChart } from './pieChart'

const vervoer = [
    { label: 'Auto', value: 46 },
    { label: 'Fiets', value: 28 },
    { label: 'OV', value: 18 },
    { label: 'Lopend', value: 8 },
]

const meta = {
    title: 'Charts/PieChart',
    component: PieChart,
    argTypes: {
        ...partsArgTypes,
        donut: { control: 'boolean', table: { category: 'Pie chart' } },
        headline: { control: 'text', table: { category: 'Pie chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Vervoer naar werk',
        subtitle: 'Aandeel per vervoerswijze',
        items: vervoer,
    },
} satisfies Meta<typeof PieChart>

export default meta
type Story = StoryObj<typeof meta>

/** Slices run clockwise from 12 o'clock. Values and percentages sit in the tooltip. */
export const Default: Story = {}

/** An optional headline above the circle. */
export const WithHeadline: Story = { args: { headline: '100%' } }

/** `donut` cuts a hole, moves the headline into it and grows the active slice. */
export const Donut: Story = { args: { donut: true, headline: '100%' } }

/** A number sets the hole as a fraction of the outer radius, clamped to 0.2–0.85. */
export const CustomHoleFraction: Story = {
    args: { donut: 0.35, headline: '12.400' },
}

export const Loading: Story = { args: { loading: true } }
