// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { monotoneSegments, segmentsToAreaPath, segmentsToPath } from './curve'

const points = [
    { x: 0, y: 100 },
    { x: 100, y: 20 },
    { x: 200, y: 60 },
    { x: 300, y: 60 },
]

describe('monotoneSegments', () => {
    it('produces one bezier per interval', () => {
        const segments = monotoneSegments(points)
        expect(segments).toHaveLength(3)
        expect(segments[0].from).toEqual({ x: 0, y: 100 })
        expect(segments[2].to).toEqual({ x: 300, y: 60 })
    })

    it('flattens the tangent at direction changes (no overshoot at extrema)', () => {
        const segments = monotoneSegments(points)
        // Point (100, 20) is a minimum: both adjacent control points stay at y=20.
        expect(segments[0].c2.y).toBe(20)
        expect(segments[1].c1.y).toBe(20)
    })

    it('keeps flat runs perfectly flat', () => {
        const segments = monotoneSegments([
            { x: 0, y: 50 },
            { x: 100, y: 50 },
            { x: 200, y: 50 },
        ])
        for (const segment of segments) {
            expect(segment.c1.y).toBe(50)
            expect(segment.c2.y).toBe(50)
        }
    })

    it('returns nothing for fewer than two points', () => {
        expect(monotoneSegments([])).toHaveLength(0)
        expect(monotoneSegments([{ x: 0, y: 1 }])).toHaveLength(0)
    })
})

describe('paths', () => {
    it('starts with a move and chains cubics', () => {
        const path = segmentsToPath(monotoneSegments(points))
        expect(path.startsWith('M0,100C')).toBe(true)
        expect(path.match(/C/g)).toHaveLength(3)
    })

    it('closes the area path down to the baseline', () => {
        const area = segmentsToAreaPath(monotoneSegments(points), 400)
        expect(area).toContain('L300,400')
        expect(area).toContain('L0,400')
        expect(area.endsWith('Z')).toBe(true)
    })

    it('supports splitting into solid and dashed sub-paths at an index', () => {
        const segments = monotoneSegments(points)
        const solid = segmentsToPath(segments.slice(0, 2))
        const dashed = segmentsToPath(segments.slice(2))
        expect(solid.match(/C/g)).toHaveLength(2)
        expect(dashed.startsWith('M200,60')).toBe(true)
    })
})
