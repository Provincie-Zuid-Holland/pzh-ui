// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

export type CurvePoint = {
    x: number
    y: number
}

export type BezierSegment = {
    /** Interval start point. */
    from: CurvePoint
    /** Control points and end point of the cubic bezier. */
    c1: CurvePoint
    c2: CurvePoint
    to: CurvePoint
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson, as in d3's curveMonotoneX):
 * smooth curves that never overshoot the data — a local maximum in the data
 * stays the maximum of the curve. Returns one cubic bezier per interval, so
 * callers can split runs (e.g. solid vs dashed forecast) at any data index.
 */
export const monotoneSegments = (points: CurvePoint[]): BezierSegment[] => {
    const count = points.length
    if (count < 2) return []

    // Slopes of the secant lines between points.
    const secants = Array.from({ length: count - 1 }, (_, index) => {
        const dx = points[index + 1].x - points[index].x
        return dx === 0 ? 0 : (points[index + 1].y - points[index].y) / dx
    })

    // Tangents per point, flattened where the data changes direction.
    const tangents = points.map((_, index) => {
        if (index === 0) return secants[0]
        if (index === count - 1) return secants[count - 2]
        const previous = secants[index - 1]
        const next = secants[index]
        if (previous * next <= 0) return 0
        // Harmonic mean keeps the curve inside the data envelope.
        return (2 * previous * next) / (previous + next)
    })

    return secants.map((_, index) => {
        const from = points[index]
        const to = points[index + 1]
        const dx = (to.x - from.x) / 3
        return {
            from,
            c1: { x: from.x + dx, y: from.y + tangents[index] * dx },
            c2: { x: to.x - dx, y: to.y - tangents[index + 1] * dx },
            to,
        }
    })
}

const bezier = (segment: BezierSegment): string =>
    `C${segment.c1.x},${segment.c1.y} ${segment.c2.x},${segment.c2.y} ${segment.to.x},${segment.to.y}`

/** SVG path for a range of segments, starting with a move to the first point. */
export const segmentsToPath = (segments: BezierSegment[]): string => {
    if (segments.length === 0) return ''
    return `M${segments[0].from.x},${segments[0].from.y}${segments.map(bezier).join('')}`
}

/** Closed area path: the curve, down to the baseline and back to the start. */
export const segmentsToAreaPath = (
    segments: BezierSegment[],
    baselineY: number
): string => {
    if (segments.length === 0) return ''
    const last = segments[segments.length - 1].to
    const first = segments[0].from
    return `${segmentsToPath(segments)}L${last.x},${baselineY}L${first.x},${baselineY}Z`
}
