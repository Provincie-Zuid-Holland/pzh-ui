// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC, useMemo } from 'react'

import { formatNumber, parseValue } from '../lib/format'
import { NormalizedData } from '../lib/normalize'
import { seriesVar } from '../tokens'
import { PartItem } from '../types'
import { Swatch } from './swatch'

/** Parsed part of a whole — shared by ProgressChart, PieChart and SegmentChart. */
export type Part = {
    label: string
    value: number
    /** Share of the parts total, 0–1. */
    fraction: number
    fill: string
}

type Formatter = (value: number) => string

/**
 * Parses part items: values via parseValue, null/zero/negative dropped
 * (parts of a whole must be positive), labels falling back to the formatted
 * value (the pie mock's legend style), fills routed through the palette vars
 * so high contrast swaps them.
 */
export const usePartItems = (
    items: PartItem[],
    format: Formatter = formatNumber
): Part[] =>
    useMemo(() => {
        const parsed = items.flatMap((item, index) => {
            const value = parseValue(item.value)
            if (value === null || value <= 0) return []
            return [
                {
                    value,
                    label: item.label ?? format(value),
                    fill: item.color ?? seriesVar(index),
                },
            ]
        })
        const total = parsed.reduce((sum, part) => sum + part.value, 0)
        return parsed.map(part => ({
            ...part,
            fraction: total > 0 ? part.value / total : 0,
        }))
    }, [items, format])

export const partsTotal = (parts: Part[]): number =>
    parts.reduce((sum, part) => sum + part.value, 0)

export const formatPercent = (fraction: number): string =>
    `${Math.round(fraction * 100)}%`

export const partReadout = (part: Part, format: Formatter): string =>
    `${part.label}: ${format(part.value)} (${formatPercent(part.fraction)})`

/** Feeds the shared table/summary views: labels as categories, share as note. */
export const partsToNormalized = (parts: Part[]): NormalizedData => ({
    categories: parts.map(part => part.label),
    series: [
        {
            label: null,
            fill: 'var(--pzh-bar)',
            data: parts.map(part => ({
                value: part.value,
                highlight: false,
                note: formatPercent(part.fraction),
                fill: part.fill,
            })),
        },
    ],
    isGrouped: false,
    hasHighlight: false,
    dataMin: parts.length ? Math.min(...parts.map(part => part.value)) : 0,
    dataMax: parts.length ? Math.max(...parts.map(part => part.value)) : 0,
    stackedMax: partsTotal(parts),
    isEmpty: parts.length === 0,
})

export const PartsLegend: FC<{ parts: Part[] }> = ({ parts }) =>
    parts.length > 0 ? (
        <ul className="pzh-legend">
            {parts.map((part, index) => (
                <li className="pzh-legend-item" key={`${part.label}-${index}`}>
                    <Swatch color={part.fill} />
                    {part.label}
                </li>
            ))}
        </ul>
    ) : null

/** Big-number headline above the minimal KPI charts. */
export const ChartHeadline: FC<{ text?: string }> = ({ text }) =>
    text ? <p className="pzh-headline">{text}</p> : null

/**
 * The same headline centred in a donut hole or a ring. `maxWidth` is the hole
 * it has to stay inside; long text still overflows rather than clipping, so
 * text-only zoom keeps working.
 */
export const CenterHeadline: FC<{ text?: string; maxWidth?: number }> = ({
    text,
    maxWidth,
}) =>
    text ? (
        <p
            className="pzh-center-headline"
            style={maxWidth ? { maxWidth } : undefined}>
            {text}
        </p>
    ) : null
