// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { BubbleChart } from './bubbleChart'

const meta = {
    title: 'Charts/BubbleChart',
    component: BubbleChart,
    argTypes: {
        ...partsArgTypes,
        headline: { control: 'text', table: { category: 'Bubble chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Banen per sector',
        subtitle: 'Oppervlak evenredig aan de waarde',
        height: 320,
        items: [
            { label: 'IT & software', value: 412 },
            { label: 'Zakelijke diensten', value: 244 },
            { label: 'Zorg', value: 190 },
            { label: 'Onderwijs', value: 120 },
        ],
    },
} satisfies Meta<typeof BubbleChart>

export default meta
type Story = StoryObj<typeof meta>

/** Circle area is proportional to the value, with the largest bubble centred. */
export const Default: Story = {}

/** Labels only appear inside bubbles with room for them; the rest rely on the tooltip. */
export const ManyBubbles: Story = {
    args: {
        items: [
            { label: 'IT & software', value: 412 },
            { label: 'Zakelijke diensten', value: 244 },
            { label: 'Zorg', value: 190 },
            { label: 'Onderwijs', value: 120 },
            { label: 'Bouw', value: 74 },
            { label: 'Landbouw', value: 31 },
            { label: 'Cultuur', value: 18 },
        ],
    },
}

export const Loading: Story = { args: { loading: true } }
