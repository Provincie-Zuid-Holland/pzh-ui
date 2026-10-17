// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, partsArgTypes } from '../../.storybook/argTypes'
import { SegmentChart } from './segmentChart'

const meta = {
    title: 'Charts/SegmentChart',
    component: SegmentChart,
    argTypes: {
        ...partsArgTypes,
        headline: { control: 'text', table: { category: 'Segment chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Begroting per post',
        subtitle: 'Honderd procent, verdeeld',
        headline: '100%',
        height: 160,
        items: [
            { label: 'Natuur', value: 34 },
            { label: 'Mobiliteit', value: 28 },
            { label: 'Wonen', value: 22 },
            { label: 'Overig', value: 16 },
        ],
    },
} satisfies Meta<typeof SegmentChart>

export default meta
type Story = StoryObj<typeof meta>

/** One horizontal bar split proportionally. Without a palette it uses shades of one group. */
export const Default: Story = {}

/** Drop the headline override and it defaults to the formatted total. */
export const TotalAsHeadline: Story = { args: { headline: undefined } }

export const Loading: Story = { args: { loading: true } }
