// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { LineChart } from './lineChart'

const jaren = ['2021', '2022', '2023', '2024', '2025', '2026']

const meta = {
    title: 'Charts/LineChart',
    component: LineChart,
    argTypes: {
        ...baseArgTypes,
        referenceLine: { control: 'object', table: { category: 'Line chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Digitale vaardigheden',
        subtitle: 'Index per jaar',
        categories: jaren,
        series: [{ label: 'Zuid-Holland', data: [62, 65, 68, 70, 73, 76] }],
        axis: { tickFormat: 'plain' },
    },
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

/** Monotone curve with a soft area fill under it. */
export const Default: Story = {}

export const MultiSeries: Story = {
    args: {
        subtitle: 'Regio tegenover landelijk',
        series: [
            { label: 'Zuid-Holland', data: [62, 65, 68, 70, 73, 76] },
            { label: 'Landelijk', data: [60, 62, 65, 66, 68, 70] },
        ],
    },
}

/** `dashFromIndex` dashes the tail: provisional or forecast values, same as the CMS field. */
export const Forecast: Story = {
    args: {
        subtitle: 'Laatste twee jaar geraamd',
        series: [
            {
                label: 'Zuid-Holland',
                data: [62, 65, 68, 70, 73, 76],
                dashFromIndex: 3,
            },
        ],
    },
}

/** A norm or national maximum, drawn as a labelled dashed line. */
export const WithReferenceLine: Story = {
    args: { referenceLine: { value: 72, label: 'Landelijke norm' } },
}

/** `area: false` leaves the line alone — better when several series overlap. */
export const WithoutArea: Story = {
    args: {
        series: [
            {
                label: 'Zuid-Holland',
                data: [62, 65, 68, 70, 73, 76],
                area: false,
            },
            { label: 'Landelijk', data: [60, 62, 65, 66, 68, 70], area: false },
        ],
    },
}

/** `null` breaks the line rather than interpolating across a missing measurement. */
export const WithGaps: Story = {
    args: {
        series: [{ label: 'Zuid-Holland', data: [62, 65, null, null, 73, 76] }],
    },
}

export const Loading: Story = { args: { loading: true } }
