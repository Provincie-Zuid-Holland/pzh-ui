// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

export type TickScale = {
    min: number
    max: number
    step: number
    ticks: number[]
}

export type ScaleOptions = {
    min?: number
    max?: number
    stepSize?: number
}

const MAX_TICKS = 12

/** Snaps a raw step to 1 / 2 / 5 × 10ⁿ, rounding up so ticks never overcrowd. */
const niceStep = (raw: number): number => {
    const magnitude = 10 ** Math.floor(Math.log10(raw))
    const normalized = raw / magnitude
    if (normalized <= 1) return magnitude
    if (normalized <= 2) return 2 * magnitude
    if (normalized <= 5) return 5 * magnitude
    return 10 * magnitude
}

/** Kills float noise like 0.30000000000000004 in tick values. */
const roundTo = (value: number, step: number): number => {
    const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1)
    return Number(value.toFixed(decimals + 1))
}

/**
 * Computes a y-axis scale with human-friendly ticks. Positive data always
 * includes 0; explicit min/max/stepSize are respected exactly.
 */
export const niceTicks = (
    dataMin: number,
    dataMax: number,
    options: ScaleOptions = {}
): TickScale => {
    let min = options.min ?? Math.min(0, dataMin)
    let max = options.max ?? Math.max(0, dataMax)
    if (!Number.isFinite(min)) min = 0
    if (!Number.isFinite(max)) max = 0
    if (min === max) {
        if (options.min === undefined && options.max === undefined) {
            max = min + 1
            if (min > 0) min = 0
        } else {
            max = min + 1
        }
    }

    let step =
        options.stepSize && options.stepSize > 0
            ? options.stepSize
            : niceStep((max - min) / 5)

    let niceMin =
        options.min !== undefined ? options.min : Math.floor(min / step) * step
    let niceMax =
        options.max !== undefined ? options.max : Math.ceil(max / step) * step

    let tickCount = Math.floor((niceMax - niceMin) / step) + 1
    while (tickCount > MAX_TICKS && !options.stepSize) {
        step = niceStep(step * 2)
        niceMin =
            options.min !== undefined
                ? options.min
                : Math.floor(min / step) * step
        niceMax =
            options.max !== undefined
                ? options.max
                : Math.ceil(max / step) * step
        tickCount = Math.floor((niceMax - niceMin) / step) + 1
    }

    const ticks: number[] = []
    for (let tick = niceMin; tick <= niceMax + step * 1e-6; tick += step) {
        ticks.push(roundTo(tick, step))
        if (ticks.length > MAX_TICKS * 4) break
    }

    return { min: niceMin, max: niceMax, step, ticks }
}

/** Maps a data value to a y pixel within the chart's inner area. */
export const valueToY = (
    value: number,
    scale: TickScale,
    top: number,
    innerHeight: number
): number => top + innerHeight * ((scale.max - value) / (scale.max - scale.min))

/** Least-squares fit y = slope·x + intercept; null for fewer than two points. */
export const linearRegression = (
    points: Array<{ x: number; y: number }>
): { slope: number; intercept: number } | null => {
    if (points.length < 2) return null
    const n = points.length
    const meanX = points.reduce((sum, point) => sum + point.x, 0) / n
    const meanY = points.reduce((sum, point) => sum + point.y, 0) / n
    const denominator = points.reduce(
        (sum, point) => sum + (point.x - meanX) ** 2,
        0
    )
    if (denominator === 0) return null
    const slope =
        points.reduce(
            (sum, point) => sum + (point.x - meanX) * (point.y - meanY),
            0
        ) / denominator
    return { slope, intercept: meanY - slope * meanX }
}
