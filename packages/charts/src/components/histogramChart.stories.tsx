// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { HistogramChart } from './histogramChart'

const seeded = (count: number, seed: number): number[] => {
    let value = seed
    return Array.from({ length: count }, () => {
        value = (value * 1103515245 + 12345) % 2147483648
        return Math.round((value / 2147483648) * 60 + 20)
    })
}

const meta = {
    title: 'Charts/HistogramChart',
    component: HistogramChart,
    argTypes: {
        ...baseArgTypes,
        bins: {
            control: { type: 'range', min: 3, max: 20, step: 1 },
            table: { category: 'Histogram' },
        },
        thresholds: { control: 'object', table: { category: 'Histogram' } },
    },
    args: {
        ...baseArgs,
        title: 'Verdeling van wachttijden',
        subtitle: 'Ruwe metingen, automatisch verdeeld',
        values: seeded(120, 7),
    },
} satisfies Meta<typeof HistogramChart>

export default meta
type Story = StoryObj<typeof meta>

/** Raw `values`, binned with Sturges' rule and coloured on a sequential ramp. */
export const RawValues: Story = {}

/** `bins` overrides the automatic bin count. */
export const FixedBinCount: Story = { args: { bins: 6 } }

/** Pre-aggregated `items` instead: one labelled value per bar, no binning. */
export const PreAggregated: Story = {
    args: {
        title: 'Meldingen per categorie',
        subtitle: 'Vooraf geteld',
        values: undefined,
        items: [
            { label: '0–10', value: 12 },
            { label: '10–20', value: 34 },
            { label: '20–30', value: 51 },
            { label: '30–40', value: 28 },
            { label: '40–50', value: 9 },
        ],
    },
}

/**
 * `thresholds` colour bars by value class and render a matching legend. A value
 * falls in the first class whose `upTo` it does not exceed; the last may omit it.
 */
export const WithThresholds: Story = {
    args: {
        ...PreAggregated.args,
        title: 'Meldingen per risiconiveau',
        thresholds: [
            { upTo: 20, label: 'Laag' },
            { upTo: 40, label: 'Middel' },
            { label: 'Hoog' },
        ],
    },
}

export const Loading: Story = { args: { loading: true } }
