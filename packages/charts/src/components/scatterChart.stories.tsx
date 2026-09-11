// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { ScatterChart } from './scatterChart'

const gemeenten = [
    'Rotterdam',
    'Den Haag',
    'Delft',
    'Leiden',
    'Gouda',
    'Dordrecht',
    'Zoetermeer',
]

const meta = {
    title: 'Charts/ScatterChart',
    component: ScatterChart,
    argTypes: {
        ...baseArgTypes,
        trendLine: { control: 'boolean', table: { category: 'Scatter chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Bedrijven per gemeente',
        subtitle: 'Met trendlijn',
        categories: gemeenten,
        series: [
            { label: 'AI-bedrijven', data: [412, 288, 244, 190, 120, 150, 64] },
        ],
    },
} satisfies Meta<typeof ScatterChart>

export default meta
type Story = StoryObj<typeof meta>

/** A least-squares trend line per series is on by default. */
export const Default: Story = {}

export const MultiSeries: Story = {
    args: {
        series: [
            { label: 'AI-bedrijven', data: [412, 288, 244, 190, 120, 150, 64] },
            { label: 'Datacenters', data: [40, 32, 18, 22, 9, 14, 6] },
        ],
    },
}

/** Turn the regression off when the relationship is not the point. */
export const WithoutTrendLine: Story = { args: { trendLine: false } }

export const Loading: Story = { args: { loading: true } }
