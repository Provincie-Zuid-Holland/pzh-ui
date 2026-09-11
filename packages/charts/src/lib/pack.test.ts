// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { packCircles } from './pack'

describe('packCircles', () => {
    it('scales radius with the square root of the value', () => {
        const [small, big] = packCircles([25, 100]).sort((a, b) => a.r - b.r)
        expect(small.r).toBe(5)
        expect(big.r).toBe(10)
    })

    it('puts the largest circle at the center', () => {
        const packed = packCircles([10, 400, 30])
        const biggest = packed.find(circle => circle.index === 1)!
        expect(biggest.x).toBe(0)
        expect(biggest.y).toBe(0)
    })

    it('packs without overlaps', () => {
        const packed = packCircles([120, 80, 60, 45, 30, 22, 15, 8])
        for (const a of packed) {
            for (const b of packed) {
                if (a.index === b.index) continue
                const distance = Math.hypot(a.x - b.x, a.y - b.y)
                expect(distance).toBeGreaterThanOrEqual(a.r + b.r)
            }
        }
    })

    it('keeps input order in the result and drops non-positive values', () => {
        const packed = packCircles([5, 0, 12, -3])
        expect(packed.map(circle => circle.index)).toEqual([0, 2])
    })

    it('is deterministic', () => {
        expect(packCircles([50, 30, 20])).toEqual(packCircles([50, 30, 20]))
    })
})
