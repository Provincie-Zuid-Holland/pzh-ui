// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { formatNumber, parseValue } from './format'

export type HistogramBin = {
    x0: number
    x1: number
    count: number
    /** nl-NL label like '0 – 10'. */
    label: string
}

/** Rounds bin edges to a friendly precision derived from the bin width. */
const roundEdge = (value: number, binWidth: number): number => {
    const decimals = Math.max(0, -Math.floor(Math.log10(binWidth)) + 1)
    return Number(value.toFixed(decimals))
}

/**
 * Bins raw observations into equal-width intervals. Default bin count via
 * Sturges' rule (⌈log2 n⌉ + 1); values on an edge fall into the upper bin,
 * except the maximum which stays in the last bin.
 */
export const computeBins = (
    rawValues: Array<number | string | null>,
    binCount?: number
): HistogramBin[] => {
    const values = rawValues
        .map(parseValue)
        .filter((value): value is number => value !== null)
    if (values.length === 0) return []

    const min = Math.min(...values)
    const max = Math.max(...values)
    const count =
        binCount && binCount > 0
            ? Math.floor(binCount)
            : Math.ceil(Math.log2(values.length)) + 1

    if (min === max) {
        return [
            {
                x0: min,
                x1: max,
                count: values.length,
                label: formatNumber(min),
            },
        ]
    }

    const binWidth = (max - min) / count
    const bins: HistogramBin[] = Array.from({ length: count }, (_, index) => {
        const x0 = roundEdge(min + index * binWidth, binWidth)
        const x1 = roundEdge(
            index === count - 1 ? max : min + (index + 1) * binWidth,
            binWidth
        )
        return {
            x0,
            x1,
            count: 0,
            label: `${formatNumber(x0)} – ${formatNumber(x1)}`,
        }
    })

    for (const value of values) {
        const index = Math.min(count - 1, Math.floor((value - min) / binWidth))
        bins[index].count += 1
    }
    return bins
}
