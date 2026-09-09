// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { RadarChart } from './radarChart'

const dimensies = [
    'Wonen',
    'Werk',
    'Milieu',
    'Veiligheid',
    'Gezondheid',
    'Onderwijs',
]

const meta = {
    title: 'Charts/RadarChart',
    component: RadarChart,
    argTypes: { ...baseArgTypes },
    args: {
        ...baseArgs,
        title: 'Brede welvaart',
        subtitle: 'Zes dimensies',
        categories: dimensies,
        series: [{ label: 'Zuid-Holland', data: [7, 8, 5, 6, 7, 8] }],
        axis: { max: 10, tickFormat: 'plain' },
    },
} satisfies Meta<typeof RadarChart>

export default meta
type Story = StoryObj<typeof meta>

/** Six spokes: the hexagon. Any three or more categories work. */
export const Hexagon: Story = {}

export const MultiSeries: Story = {
    args: {
        subtitle: 'Regio tegenover landelijk',
        series: [
            { label: 'Zuid-Holland', data: [7, 8, 5, 6, 7, 8] },
            { label: 'Landelijk', data: [6, 7, 6, 7, 6, 7] },
        ],
    },
}

export const FiveAxes: Story = {
    args: {
        title: 'Vijf assen',
        subtitle: 'Pentagoon',
        categories: ['A', 'B', 'C', 'D', 'E'],
        series: [{ label: 'Meting', data: [120, 90, 140, 60, 100] }],
        axis: undefined,
    },
}

export const Loading: Story = { args: { loading: true } }
