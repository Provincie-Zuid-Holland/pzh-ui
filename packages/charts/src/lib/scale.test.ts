// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { niceTicks, valueToY } from './scale'

describe('niceTicks', () => {
    it('snaps steps to 1/2/5 magnitudes', () => {
        expect(niceTicks(0, 100).step).toBe(20)
        expect(niceTicks(0, 9).step).toBe(2)
        expect(niceTicks(0, 47).step).toBe(10)
        expect(niceTicks(0, 2400).step).toBe(500)
    })

    it('always includes zero for positive data', () => {
        const scale = niceTicks(40, 100)
        expect(scale.min).toBe(0)
        expect(scale.ticks[0]).toBe(0)
    })

    it('respects explicit min, max and stepSize exactly', () => {
        const scale = niceTicks(3, 97, { min: 0, max: 100, stepSize: 25 })
        expect(scale.min).toBe(0)
        expect(scale.max).toBe(100)
        expect(scale.ticks).toEqual([0, 25, 50, 75, 100])
    })

    it('handles a zero span without crashing', () => {
        const scale = niceTicks(0, 0)
        expect(scale.max).toBeGreaterThan(scale.min)
        expect(scale.ticks.length).toBeGreaterThan(1)
    })

    it('handles negative domains with a zero baseline in range', () => {
        const scale = niceTicks(-30, 80)
        expect(scale.min).toBeLessThanOrEqual(-30)
        expect(scale.max).toBeGreaterThanOrEqual(80)
        expect(scale.ticks).toContain(0)
    })

    it('caps automatic tick counts at 12', () => {
        const scale = niceTicks(0, 1000)
        expect(scale.ticks.length).toBeLessThanOrEqual(12)
    })

    it('produces clean fractional ticks without float noise', () => {
        const scale = niceTicks(0, 1.2)
        for (const tick of scale.ticks) {
            expect(String(tick).length).toBeLessThanOrEqual(4)
        }
    })
})

describe('valueToY', () => {
    it('maps max to top and min to bottom', () => {
        const scale = {
            min: 0,
            max: 100,
            step: 20,
            ticks: [0, 20, 40, 60, 80, 100],
        }
        expect(valueToY(100, scale, 10, 200)).toBe(10)
        expect(valueToY(0, scale, 10, 200)).toBe(210)
        expect(valueToY(50, scale, 10, 200)).toBe(110)
    })
})
