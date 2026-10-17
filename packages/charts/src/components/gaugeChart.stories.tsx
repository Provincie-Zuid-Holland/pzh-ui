// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { GaugeChart } from './gaugeChart'

const meta = {
    title: 'Charts/GaugeChart',
    component: GaugeChart,
    argTypes: {
        ...partsArgTypes,
        max: { control: 'number', table: { category: 'Gauge' } },
        headline: { control: 'text', table: { category: 'Gauge' } },
    },
    args: {
        ...baseArgs,
        title: 'Volwassenheidsniveau',
        subtitle: 'Drie niveaus vullen de meter',
        headline: 'Niveau 2',
        height: 240,
        items: [
            { label: 'Niveau 1', value: 30 },
            { label: 'Niveau 2', value: 30 },
            { label: 'Niveau 3', value: 5 },
        ],
    },
} satisfies Meta<typeof GaugeChart>

export default meta
type Story = StoryObj<typeof meta>

/** A 240° arc. Without `max` the parts span the whole arc. */
export const Levels: Story = {}

/** With `max` the remainder stays grey and the headline defaults to the percentage. */
export const Percentage: Story = {
    args: {
        title: 'Security delta',
        subtitle: 'Score van 0 tot 100',
        headline: undefined,
        max: 100,
        items: [{ label: 'Score', value: 90 }],
    },
}

export const MultiPartTowardsMax: Story = {
    args: {
        title: 'Doelbereik per bron',
        headline: undefined,
        max: 100,
        items: [
            { label: 'Wind', value: 34 },
            { label: 'Zon', value: 27 },
        ],
    },
}

export const Loading: Story = { args: { loading: true } }
