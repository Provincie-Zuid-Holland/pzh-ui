// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Meta, StoryObj } from '@storybook/react-vite'

import { baseArgs, baseArgTypes } from '../../.storybook/argTypes'
import { BarChart } from './barChart'

const top5 = ['Rotterdam', 'Den Haag', 'Delft', 'Leiden', 'Zoetermeer']
const jaren = ['2021', '2022', '2023', '2024', '2025', '2026']
const telefoons = [
    { label: 'Nieuw', data: [820, 790, 760, 700, 640, 590] },
    { label: 'Refurbished', data: [90, 140, 210, 300, 420, 560] },
    { label: 'Tweedehands', data: [200, 210, 230, 250, 260, 280] },
]

const meta = {
    title: 'Charts/BarChart',
    component: BarChart,
    argTypes: {
        ...baseArgTypes,
        stacked: { control: 'boolean', table: { category: 'Bar chart' } },
        horizontal: { control: 'boolean', table: { category: 'Bar chart' } },
        highlightColor: { control: 'color', table: { category: 'Bar chart' } },
        highlightLabel: { control: 'text', table: { category: 'Bar chart' } },
    },
    args: {
        ...baseArgs,
        title: 'Aantal AI-bedrijven per gemeente',
        subtitle: 'Top 5 gemeenten',
        categories: top5,
        series: [{ data: ['412', '288', '244', '117', '64'] }],
        axis: { xLabel: 'Gemeente', yLabel: 'Aantal bedrijven' },
    },
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

/** One unnamed series: the plainest form, and the snippet in the README. */
export const Default: Story = {}

/** Several named series side by side; the legend comes from the labels. */
export const Grouped: Story = {
    args: {
        title: 'Verkochte telefoons',
        subtitle: 'Drie categorieën per jaar',
        categories: jaren,
        series: telefoons,
        axis: { stepSize: 200, yLabel: 'Aantal per 1.000 inwoners' },
    },
}

/** `stacked` cumulates the series per category. Negative values are not supported here. */
export const Stacked: Story = {
    args: {
        ...Grouped.args,
        title: 'Verkochte telefoons, gestapeld',
        stacked: true,
        palette: ['#16113B', '#281F6B', '#7BADDE'],
    },
}

/** Bars left to right, categories on the y axis. Combines with `stacked`. */
export const Horizontal: Story = {
    args: { horizontal: true, axis: { xLabel: 'Aantal bedrijven' } },
}

export const StackedHorizontal: Story = {
    args: { ...Stacked.args, horizontal: true },
}

/**
 * Per-datum `highlight` with a `note`. The highlight is never colour alone: it adds
 * a legend entry and visually hidden text in the tabel view (WCAG 1.4.1).
 */
export const Highlighted: Story = {
    args: {
        subtitle: 'Met uitgelichte koploper',
        series: [
            {
                data: [
                    {
                        value: '412',
                        highlight: true,
                        note: '18% van het totaal',
                    },
                    { value: '288' },
                    { value: '244', note: 'sterke groei' },
                    { value: '117' },
                    { value: '64' },
                ],
            },
        ],
    },
}

/**
 * `axis.breakAbove` caps the axis and marks any bar that runs past it, printing
 * the real value beside the mark. Without it the 5462 flattens every other bar.
 * The full value stays in the readout, the tooltip and the tabel view.
 */
export const BrokenAxis: Story = {
    args: {
        title: 'Landelijke cyberaanvallen',
        subtitle: 'Eén uitschieter, gebroken as',
        horizontal: true,
        axis: { breakAbove: 600, xLabel: 'Aantal meldingen' },
        categories: [
            'Gezondheid & welzijn',
            'Openbaar bestuur',
            'Financiële dienstverlening',
            'Onderwijs',
            'Politie en Justitie',
        ],
        series: [
            { label: '2022', data: [424, 58, 144, 124, 3] },
            { label: '2023', data: [157, 183, 71, 67, 4] },
            { label: '2024', data: [5462, 117, 194, 174, 3] },
        ],
        height: 340,
    },
}

/** The skeleton mirrors the real bar, series and legend counts, not a generic block. */
export const Loading: Story = { args: { loading: true } }
