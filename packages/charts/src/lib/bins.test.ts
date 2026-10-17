// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { computeBins } from './bins'

describe('computeBins', () => {
    it('defaults to Sturges rule for the bin count', () => {
        // 64 values → ceil(log2(64)) + 1 = 7 bins
        const values = Array.from({ length: 64 }, (_, index) => index)
        expect(computeBins(values)).toHaveLength(7)
    })

    it('respects an explicit bin count and counts every value once', () => {
        const values = Array.from({ length: 100 }, (_, index) => index % 50)
        const bins = computeBins(values, 10)
        expect(bins).toHaveLength(10)
        expect(bins.reduce((sum, bin) => sum + bin.count, 0)).toBe(100)
    })

    it('places the maximum value in the last bin', () => {
        const bins = computeBins([0, 5, 10], 2)
        expect(bins[1].count).toBe(2)
        expect(bins[0].count).toBe(1)
    })

    it('parses string values and skips unparseable ones', () => {
        const bins = computeBins(['1', '2', 'x', null, '3'], 3)
        expect(bins.reduce((sum, bin) => sum + bin.count, 0)).toBe(3)
    })

    it('handles a single distinct value without a zero-width crash', () => {
        const bins = computeBins([5, 5, 5])
        expect(bins).toHaveLength(1)
        expect(bins[0].count).toBe(3)
    })

    it('returns nothing for empty input', () => {
        expect(computeBins([])).toHaveLength(0)
    })

    it('labels bins with nl-NL formatting', () => {
        const bins = computeBins([0, 1000, 2000], 2)
        expect(bins[0].label).toContain('–')
        expect(bins[1].label).toContain('2.000')
    })
})
