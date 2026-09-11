// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { seriesVar } from '../tokens'
import type { BarChartDatum, BarChartSeries } from '../types'
import { parseValue } from './format'

export type NormalizedDatum = {
    value: number | null
    highlight: boolean
    note?: string
    /** Per-datum fill override — parts-based charts color each row itself. */
    fill?: string
}

export type NormalizedSeries = {
    label: string | null
    /**
     * Always a `var(--pzh-*)` reference — explicit series/palette colors are
     * applied as variable overrides on the card root (see getCssVars), so
     * high-contrast mode can override every fill.
     */
    fill: string
    data: NormalizedDatum[]
}

export type NormalizedData = {
    categories: string[]
    series: NormalizedSeries[]
    isGrouped: boolean
    hasHighlight: boolean
    /** Data extent across all series; both 0 when there are no finite values. */
    dataMin: number
    dataMax: number
    /** Largest per-category sum of positive values — the stacked-mode domain. */
    stackedMax: number
    isEmpty: boolean
}

const toDatum = (
    raw: BarChartDatum | number | string | null
): NormalizedDatum => {
    if (raw !== null && typeof raw === 'object') {
        return {
            value: parseValue(raw.value),
            highlight: raw.highlight === true,
            note: raw.note,
        }
    }
    return { value: parseValue(raw), highlight: false }
}

/**
 * Converts the public props into the single internal shape every renderer
 * (SVG, table, summary, legend) consumes: numbers parsed, data padded to the
 * category count, colors resolved to CSS-variable references.
 */
export const normalizeData = (
    categories: string[],
    series: BarChartSeries[]
): NormalizedData => {
    const isGrouped = series.length > 1
    const normalizedSeries: NormalizedSeries[] = series.map(
        (entry, seriesIndex) => {
            const data = categories.map((_, categoryIndex) =>
                toDatum(entry.data[categoryIndex] ?? null)
            )
            return {
                label: entry.label ?? null,
                fill: isGrouped ? seriesVar(seriesIndex) : 'var(--pzh-bar)',
                data,
            }
        }
    )

    const values = normalizedSeries
        .flatMap(entry => entry.data)
        .map(datum => datum.value)
        .filter((value): value is number => value !== null)

    const stackedMax = categories.reduce((max, _, categoryIndex) => {
        const sum = normalizedSeries.reduce((total, entry) => {
            const value = entry.data[categoryIndex].value
            return value !== null && value > 0 ? total + value : total
        }, 0)
        return Math.max(max, sum)
    }, 0)

    return {
        categories,
        series: normalizedSeries,
        isGrouped,
        hasHighlight: normalizedSeries.some(entry =>
            entry.data.some(datum => datum.highlight)
        ),
        dataMin: values.length ? Math.min(...values) : 0,
        dataMax: values.length ? Math.max(...values) : 0,
        stackedMax,
        isEmpty: values.length === 0 || categories.length === 0,
    }
}
