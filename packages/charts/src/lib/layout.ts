// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { estimateTextWidth } from './format'

const BAR_GAP = 2
const MAX_CATEGORY_GAP = 24
const CATEGORY_GAP_RATIO = 0.15

export type BarSlotLayout = {
    /** Stride from one category start to the next (group + category gap). */
    slotWidth: number
    /** Width of one category's bar cluster. */
    groupWidth: number
    barWidth: number
    /** Gap between series bars within a group. */
    gap: number
    /** Gap between categories. */
    categoryGap: number
    /** X offset of each series bar relative to its category's start. */
    offsets: number[]
}

/**
 * Edge-to-edge layout: the first bar starts flush at the plot's left edge and
 * the last ends flush at the right edge, with gaps only *between* categories.
 */
export const barLayout = (
    innerWidth: number,
    categoryCount: number,
    seriesCount: number
): BarSlotLayout => {
    const count = Math.max(1, categoryCount)
    const categoryGap =
        count > 1
            ? Math.min(
                  MAX_CATEGORY_GAP,
                  (innerWidth / count) * CATEGORY_GAP_RATIO
              )
            : 0
    const slotWidth = (innerWidth + categoryGap) / count
    const groupWidth = Math.max(1, slotWidth - categoryGap)
    const gap = seriesCount > 1 ? BAR_GAP : 0
    const barWidth = Math.max(
        1,
        (groupWidth - (seriesCount - 1) * gap) / Math.max(1, seriesCount)
    )
    const offsets = Array.from(
        { length: seriesCount },
        (_, index) => index * (barWidth + gap)
    )
    return { slotWidth, groupWidth, barWidth, gap, categoryGap, offsets }
}

export type CategoryLabelMode = {
    rotate: boolean
    maxChars: number | null
}

const LABEL_FONT_SIZE = 12
const TRUNCATE_AT = 14

/** Horizontal when labels fit their slot, −45° when they don't, truncated beyond ~1.8×. */
export const categoryLabelMode = (
    labels: string[],
    slotWidth: number
): CategoryLabelMode => {
    const widest = labels.reduce(
        (max, label) =>
            Math.max(max, estimateTextWidth(label, LABEL_FONT_SIZE)),
        0
    )
    if (widest <= slotWidth - 8) return { rotate: false, maxChars: null }
    if (widest <= slotWidth * 1.8) return { rotate: true, maxChars: null }
    return { rotate: true, maxChars: TRUNCATE_AT }
}

export type ChartMargins = {
    top: number
    right: number
    bottom: number
    left: number
}

export const chartMargins = (
    tickLabels: string[],
    labelMode: CategoryLabelMode,
    hasXCaption: boolean,
    hasYCaption: boolean
): ChartMargins => {
    const widestTick = tickLabels.reduce(
        (max, label) =>
            Math.max(max, estimateTextWidth(label, LABEL_FONT_SIZE)),
        0
    )
    return {
        top: 8,
        right: 0,
        bottom: (labelMode.rotate ? 64 : 24) + (hasXCaption ? 20 : 0),
        left: Math.ceil(widestTick) + 12 + (hasYCaption ? 20 : 0),
    }
}

export type StackSegment = {
    y: number
    height: number
}

/**
 * Vertical geometry for one category's stacked segments: cumulative bottom-up
 * from series[0], with a 2px visual gap carved out of every segment above the
 * first. Null/negative values yield null (not drawn) without breaking the
 * cumulative position of segments above them.
 */
export const stackSegments = (
    values: Array<number | null>,
    toY: (value: number) => number,
    gap = 2
): Array<StackSegment | null> => {
    let cumulative = 0
    let isFirst = true
    return values.map(value => {
        if (value === null || value <= 0) return null
        const bottom = toY(cumulative)
        cumulative += value
        const top = toY(cumulative)
        const inset = isFirst ? 0 : gap
        isFirst = false
        const height = Math.max(1, bottom - top - inset)
        return { y: bottom - inset - height, height }
    })
}

/**
 * Horizontal bar path with only its data end rounded (4px), anchored to the
 * baseline. Negative bars grow leftward and round their left corners.
 */
export const horizontalBarPath = (
    y: number,
    baselineX: number,
    valueX: number,
    height: number
): string => {
    const rightward = valueX >= baselineX
    const width = Math.abs(valueX - baselineX)
    const radius = Math.min(4, width, height / 2)
    if (width === 0) return ''
    if (rightward) {
        return [
            `M${baselineX},${y}`,
            `H${valueX - radius}`,
            `Q${valueX},${y} ${valueX},${y + radius}`,
            `V${y + height - radius}`,
            `Q${valueX},${y + height} ${valueX - radius},${y + height}`,
            `H${baselineX}`,
            'Z',
        ].join('')
    }
    return [
        `M${baselineX},${y}`,
        `H${valueX + radius}`,
        `Q${valueX},${y} ${valueX},${y + radius}`,
        `V${y + height - radius}`,
        `Q${valueX},${y + height} ${valueX + radius},${y + height}`,
        `H${baselineX}`,
        'Z',
    ].join('')
}

/**
 * A bar path with only its data end rounded (4px), anchored to the baseline.
 * Negative bars grow downward and round their bottom corners instead.
 */
export const barPath = (
    x: number,
    baselineY: number,
    valueY: number,
    width: number
): string => {
    const up = valueY <= baselineY
    const height = Math.abs(baselineY - valueY)
    const radius = Math.min(4, height, width / 2)
    if (height === 0) return ''
    if (up) {
        return [
            `M${x},${baselineY}`,
            `V${valueY + radius}`,
            `Q${x},${valueY} ${x + radius},${valueY}`,
            `H${x + width - radius}`,
            `Q${x + width},${valueY} ${x + width},${valueY + radius}`,
            `V${baselineY}`,
            'Z',
        ].join('')
    }
    return [
        `M${x},${baselineY}`,
        `V${valueY - radius}`,
        `Q${x},${valueY} ${x + radius},${valueY}`,
        `H${x + width - radius}`,
        `Q${x + width},${valueY} ${x + width},${valueY - radius}`,
        `V${baselineY}`,
        'Z',
    ].join('')
}
