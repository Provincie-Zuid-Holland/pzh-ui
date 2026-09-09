// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { RadialChart } from './radialChart'

const meta = {
    title: 'Charts/RadialChart',
    component: RadialChart,
    argTypes: {
        ...partsArgTypes,
        max: { control: 'number', table: { category: 'Ring chart' } },
        stacked: { control: 'boolean', table: { category: 'Ring chart' } },
        headline: { control: 'text', table: { category: 'Ring chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Doelbereik per bron',
        subtitle: 'Eén ring per bron, richting 100%',
        max: 100,
        items: [
            { label: 'Wind', value: 34 },
            { label: 'Zon', value: 27 },
            { label: 'Water', value: 12 },
        ],
    },
} satisfies Meta<typeof RadialChart>

export default meta
type Story = StoryObj<typeof meta>

/**
 * One concentric ring per part, each filled clockwise from 12 o'clock against
 * `max`, with a grey remainder track. Past five parts it falls back to `stacked`,
 * because thinner rings stop being readable and hittable.
 */
export const RingPerPart: Story = {}

/** `stacked` lays the parts end to end in a single ring instead. */
export const Stacked: Story = {
    args: {
        title: 'Vergunningen afgehandeld',
        subtitle: 'Eén ring, opgeteld tot het doel',
        stacked: true,
        max: 1200,
        items: [
            { label: 'Verleend', value: 640 },
            { label: 'Geweigerd', value: 180 },
            { label: 'In behandeling', value: 210 },
        ],
    },
}

/** A single value against a maximum: the ring equivalent of the gauge. */
export const SingleValue: Story = {
    args: {
        title: 'Security delta',
        subtitle: 'Score van 0 tot 100',
        palette: ['#004D2E'],
        items: [{ label: 'Score', value: 90 }],
    },
}

export const Loading: Story = { args: { loading: true } }
