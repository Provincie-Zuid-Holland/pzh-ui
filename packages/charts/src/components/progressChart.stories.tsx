// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { ProgressChart } from './progressChart'

const meta = {
    title: 'Charts/ProgressChart',
    component: ProgressChart,
    argTypes: {
        ...partsArgTypes,
        max: { control: 'number', table: { category: 'Progress' } },
        headline: { control: 'text', table: { category: 'Progress' } },
    },
    args: {
        ...baseArgs,
        title: 'Weidegang',
        subtitle: 'Aandeel van de veestapel',
        items: [{ label: 'Weidegang', value: 82 }],
        height: 160,
    },
} satisfies Meta<typeof ProgressChart>

export default meta
type Story = StoryObj<typeof meta>

/** The default `max` of 100 makes the track a percentage scale. */
export const Default: Story = {}

/** Several parts fill the same track in order, each with its own legend colour. */
export const MultiPart: Story = {
    args: {
        title: 'Voortgang programma',
        items: [
            { label: 'Afgerond', value: 46 },
            { label: 'Loopt', value: 22 },
            { label: 'Gepland', value: 14 },
        ],
    },
}

/** A custom `max` switches track and labels to absolute values: 41 van 50 plaatsen. */
export const AbsoluteMax: Story = {
    args: {
        title: 'Bezette plaatsen',
        subtitle: 'Absolute schaal',
        max: 50,
        items: [{ label: 'Bezet', value: 41 }],
    },
}

export const Loading: Story = { args: { loading: true } }
