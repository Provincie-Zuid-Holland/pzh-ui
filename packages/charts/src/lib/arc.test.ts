// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { polarPoint, ringPath, slicePath } from './arc'

describe('polarPoint', () => {
    it('starts at 12 o clock and goes clockwise', () => {
        expect(polarPoint(0, 0, 10, 0)).toEqual({ x: 0, y: -10 })
        const threeOclock = polarPoint(0, 0, 10, Math.PI / 2)
        expect(threeOclock.x).toBeCloseTo(10)
        expect(threeOclock.y).toBeCloseTo(0)
        const sixOclock = polarPoint(0, 0, 10, Math.PI)
        expect(sixOclock.x).toBeCloseTo(0)
        expect(sixOclock.y).toBeCloseTo(10)
    })
})

describe('slicePath', () => {
    it('draws a quarter slice with a small-arc flag', () => {
        const path = slicePath(100, 100, 50, 0, Math.PI / 2)
        expect(path.startsWith('M100,100')).toBe(true)
        expect(path).toContain('A50,50 0 0 1')
        expect(path.endsWith('Z')).toBe(true)
    })

    it('uses the large-arc flag beyond 180 degrees', () => {
        const path = slicePath(100, 100, 50, 0, Math.PI * 1.5)
        expect(path).toContain('A50,50 0 1 1')
    })

    it('renders a full circle as two half-arcs without a center line', () => {
        const path = slicePath(100, 100, 50, 0, Math.PI * 2)
        expect(path.match(/A/g)).toHaveLength(2)
        expect(path).not.toContain('L')
    })

    it('returns an empty path for zero or negative sweeps', () => {
        expect(slicePath(0, 0, 10, 1, 1)).toBe('')
        expect(slicePath(0, 0, 10, 1, 0.5)).toBe('')
    })
})

describe('ringPath', () => {
    it('draws outer and inner arcs without touching the center', () => {
        const path = ringPath(100, 100, 50, 30, 0, Math.PI / 2)
        expect(path).toContain('A50,50 0 0 1')
        expect(path).toContain('A30,30 0 0 0')
        expect(path).not.toContain('M100,100')
        expect(path.endsWith('Z')).toBe(true)
    })

    it('uses the large-arc flag on wide segments and rejects empty sweeps', () => {
        expect(ringPath(0, 0, 50, 30, 0, Math.PI * 1.4)).toContain(
            'A50,50 0 1 1'
        )
        expect(ringPath(0, 0, 50, 30, 1, 1)).toBe('')
    })

    it('draws a full ring as two half-arcs per radius, the inner one wound back', () => {
        const path = ringPath(100, 100, 50, 30, 0, Math.PI * 2)
        expect(path.match(/A/g)).toHaveLength(4)
        // Inner arcs run the other way, so the nonzero fill rule leaves a hole.
        expect(path.match(/A50,50 0 1 1/g)).toHaveLength(2)
        expect(path.match(/A30,30 0 1 0/g)).toHaveLength(2)
        expect(path).not.toContain('M100,100')
    })

    it('clamps sweeps beyond a full turn to one ring', () => {
        expect(ringPath(100, 100, 50, 30, 0, Math.PI * 2.5)).toBe(
            ringPath(100, 100, 50, 30, 0, Math.PI * 2)
        )
    })

    it('falls back to a wedge without an inner radius', () => {
        expect(ringPath(100, 100, 50, 0, 0, Math.PI / 2)).toBe(
            slicePath(100, 100, 50, 0, Math.PI / 2)
        )
        expect(ringPath(100, 100, 50, -5, 0, Math.PI * 2)).toBe(
            slicePath(100, 100, 50, 0, Math.PI * 2)
        )
    })
})
