// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

export type ArcPoint = {
    x: number
    y: number
}

/** Angle in radians, 0 at 12 o'clock, clockwise. */
export const polarPoint = (
    cx: number,
    cy: number,
    radius: number,
    angle: number
): ArcPoint => ({
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle),
})

/**
 * A filled pie-slice path from startAngle to endAngle (radians, clockwise
 * from 12 o'clock). A (near-)full circle gets two half-arcs — a single SVG
 * arc command cannot draw 360°.
 */
export const slicePath = (
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number
): string => {
    const sweep = endAngle - startAngle
    if (sweep <= 0) return ''
    if (sweep >= Math.PI * 2 - 1e-6) {
        const top = polarPoint(cx, cy, radius, 0)
        const bottom = polarPoint(cx, cy, radius, Math.PI)
        return [
            `M${top.x},${top.y}`,
            `A${radius},${radius} 0 1 1 ${bottom.x},${bottom.y}`,
            `A${radius},${radius} 0 1 1 ${top.x},${top.y}`,
            'Z',
        ].join('')
    }
    const from = polarPoint(cx, cy, radius, startAngle)
    const to = polarPoint(cx, cy, radius, endAngle)
    const largeArc = sweep > Math.PI ? 1 : 0
    return [
        `M${cx},${cy}`,
        `L${from.x},${from.y}`,
        `A${radius},${radius} 0 ${largeArc} 1 ${to.x},${to.y}`,
        'Z',
    ].join('')
}

/**
 * An annular (ring) segment between two radii — the gauge's and the ring
 * chart's building block. Angles in radians, clockwise from 12 o'clock.
 *
 * A (near-)full ring needs two half-arcs per radius, like slicePath, plus the
 * inner circle wound the other way (sweep flag 0) so the nonzero fill rule
 * punches the hole instead of filling a disc. A radius of 0 or less has no
 * hole to punch, so it falls back to a wedge — an arc command with a zero
 * radius degenerates to a straight line.
 */
export const ringPath = (
    cx: number,
    cy: number,
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
): string => {
    const sweep = endAngle - startAngle
    if (sweep <= 0) return ''
    if (innerRadius <= 0)
        return slicePath(cx, cy, outerRadius, startAngle, endAngle)
    if (sweep >= Math.PI * 2 - 1e-6) {
        const outerTop = polarPoint(cx, cy, outerRadius, 0)
        const outerBottom = polarPoint(cx, cy, outerRadius, Math.PI)
        const innerTop = polarPoint(cx, cy, innerRadius, 0)
        const innerBottom = polarPoint(cx, cy, innerRadius, Math.PI)
        return [
            `M${outerTop.x},${outerTop.y}`,
            `A${outerRadius},${outerRadius} 0 1 1 ${outerBottom.x},${outerBottom.y}`,
            `A${outerRadius},${outerRadius} 0 1 1 ${outerTop.x},${outerTop.y}`,
            `L${innerTop.x},${innerTop.y}`,
            `A${innerRadius},${innerRadius} 0 1 0 ${innerBottom.x},${innerBottom.y}`,
            `A${innerRadius},${innerRadius} 0 1 0 ${innerTop.x},${innerTop.y}`,
            'Z',
        ].join('')
    }
    const largeArc = sweep > Math.PI ? 1 : 0
    const outerFrom = polarPoint(cx, cy, outerRadius, startAngle)
    const outerTo = polarPoint(cx, cy, outerRadius, endAngle)
    const innerTo = polarPoint(cx, cy, innerRadius, endAngle)
    const innerFrom = polarPoint(cx, cy, innerRadius, startAngle)
    return [
        `M${outerFrom.x},${outerFrom.y}`,
        `A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${outerTo.x},${outerTo.y}`,
        `L${innerTo.x},${innerTo.y}`,
        `A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${innerFrom.x},${innerFrom.y}`,
        'Z',
    ].join('')
}
