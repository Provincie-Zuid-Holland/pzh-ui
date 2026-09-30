// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { barLayout, barPath, categoryLabelMode, stackSegments } from './layout'

describe('barLayout', () => {
    it('fills the plot edge to edge: first bar flush left, last flush right', () => {
        const layout = barLayout(1000, 5, 1)
        expect(layout.offsets[0]).toBe(0)
        const lastGroupEnd = 4 * layout.slotWidth + layout.groupWidth
        expect(lastGroupEnd).toBeCloseTo(1000)
    })

    it('caps the category gap at 24px on wide charts', () => {
        const layout = barLayout(2000, 5, 1)
        expect(layout.categoryGap).toBe(24)
    })

    it('spaces grouped series bars 2px apart within a full-width group', () => {
        const layout = barLayout(900, 2, 3)
        expect(layout.gap).toBe(2)
        expect(layout.offsets[1] - layout.offsets[0]).toBeCloseTo(
            layout.barWidth + 2
        )
        expect(3 * layout.barWidth + 2 * layout.gap).toBeCloseTo(
            layout.groupWidth
        )
    })

    it('keeps dense charts at a minimum 1px bar with a shrunken gap', () => {
        const layout = barLayout(600, 30, 1)
        expect(layout.barWidth).toBeGreaterThanOrEqual(1)
        expect(layout.categoryGap).toBeLessThan(24)
        const lastGroupEnd = 29 * layout.slotWidth + layout.groupWidth
        expect(lastGroupEnd).toBeCloseTo(600)
    })

    it('gives a single category the full width with no gap', () => {
        const layout = barLayout(500, 1, 1)
        expect(layout.categoryGap).toBe(0)
        expect(layout.barWidth).toBe(500)
    })
})

describe('categoryLabelMode', () => {
    it('keeps short labels horizontal', () => {
        expect(categoryLabelMode(['2024', '2025'], 120)).toEqual({
            rotate: false,
            maxChars: null,
        })
    })

    it('rotates labels that overflow their slot', () => {
        const mode = categoryLabelMode(['Een best wel lang label'], 60)
        expect(mode.rotate).toBe(true)
    })

    it('truncates labels far beyond the slot width', () => {
        const mode = categoryLabelMode(
            ['Een buitengewoon uitzonderlijk lang categorielabel'],
            40
        )
        expect(mode.rotate).toBe(true)
        expect(mode.maxChars).not.toBeNull()
    })
})

describe('stackSegments', () => {
    // Baseline (value 0) at pixel 100, 1px per unit upward.
    const toY = (value: number) => 100 - value

    it('stacks segments bottom-up with a 2px gap above the first', () => {
        const segments = stackSegments([30, 20, 10], toY)
        expect(segments[0]).toEqual({ y: 70, height: 30 })
        expect(segments[1]).toEqual({ y: 50, height: 18 })
        expect(segments[2]).toEqual({ y: 40, height: 8 })
    })

    it('skips null and negative values without breaking cumulative positions', () => {
        const segments = stackSegments([30, null, -5, 10], toY)
        expect(segments[0]).toEqual({ y: 70, height: 30 })
        expect(segments[1]).toBeNull()
        expect(segments[2]).toBeNull()
        expect(segments[3]).toEqual({ y: 60, height: 8 })
    })

    it('keeps tiny segments at least 1px tall near their own edge', () => {
        const segments = stackSegments([30, 1], toY)
        expect(segments[1]?.height).toBe(1)
        expect(segments[1]?.y).toBeCloseTo(67)
    })
})

describe('barPath', () => {
    it('draws upward bars from the baseline', () => {
        const path = barPath(10, 200, 100, 40)
        expect(path.startsWith('M10,200')).toBe(true)
        expect(path.endsWith('Z')).toBe(true)
    })

    it('returns an empty path for zero-height bars', () => {
        expect(barPath(10, 200, 200, 40)).toBe('')
    })

    it('limits the corner radius on tiny bars', () => {
        const path = barPath(0, 100, 99, 40)
        expect(path).toContain('V100')
    })
})
