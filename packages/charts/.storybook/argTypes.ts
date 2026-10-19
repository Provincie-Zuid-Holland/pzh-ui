// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { ArgTypes } from '@storybook/react-vite'

import type { ChartBaseProps } from '../src/types'

/**
 * Controls for the props every chart shares. Descriptions are not written here —
 * react-docgen-typescript reads the TSDoc in types.ts — so this only adds the
 * widgets and the control-panel grouping. Spread it into each chart's meta.
 */
export const baseArgTypes: Partial<ArgTypes<ChartBaseProps>> = {
    title: { control: 'text', table: { category: 'Card' } },
    subtitle: { control: 'text', table: { category: 'Card' } },
    headingLevel: {
        control: 'select',
        options: [2, 3, 4, 5, 6],
        table: { category: 'Card' },
    },
    height: {
        control: { type: 'range', min: 120, max: 600, step: 20 },
        table: { category: 'Card' },
    },
    className: { control: false, table: { category: 'Card' } },
    id: { control: false, table: { category: 'Card' } },
    initialViewMode: {
        control: 'inline-radio',
        options: ['visual', 'textual', 'summary'],
        table: { category: 'Views' },
    },
    initialHighContrast: { control: 'boolean', table: { category: 'Views' } },
    loading: { control: 'boolean', table: { category: 'Views' } },
    summary: { control: 'text', table: { category: 'Views' } },
    axis: { control: 'object', table: { category: 'Data' } },
    valueFormatter: {
        control: false,
        table: {
            category: 'Data',
            type: { summary: '(value: number) => string' },
        },
    },
    palette: { control: 'object', table: { category: 'Theme' } },
    labels: { control: 'object', table: { category: 'Labels' } },
}

/**
 * The parts charts (pie, segment, gauge, radial, progress, bubble) take `items`
 * and Omit `categories` and `axis` from the base props, so showing an axis
 * control on them would advertise a prop they do not have.
 */
export const partsArgTypes: Partial<ArgTypes<ChartBaseProps>> = {
    ...baseArgTypes,
    axis: { table: { disable: true } },
}

/**
 * headingLevel 3 because a docs page already owns the h1/h2; leaving the h2
 * default would give addon-a11y a heading-order finding that is a Storybook
 * artefact rather than a library bug.
 */
export const baseArgs = { headingLevel: 3, height: 300 } as const
