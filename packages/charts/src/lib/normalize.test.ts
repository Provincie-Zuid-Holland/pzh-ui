// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { normalizeData } from './normalize'

describe('normalizeData', () => {
    it('parses string values from the CMS', () => {
        const data = normalizeData(['A', 'B'], [{ data: ['412', '18'] }])
        expect(data.series[0].data.map(datum => datum.value)).toEqual([412, 18])
        expect(data.dataMax).toBe(412)
    })

    it('accepts mixed datum shapes and keeps notes and highlights', () => {
        const data = normalizeData(
            ['A', 'B', 'C'],
            [
                {
                    data: [
                        12,
                        { value: '30', highlight: true, note: '18%' },
                        null,
                    ],
                },
            ]
        )
        expect(data.series[0].data[1]).toEqual({
            value: 30,
            highlight: true,
            note: '18%',
        })
        expect(data.series[0].data[2].value).toBeNull()
        expect(data.hasHighlight).toBe(true)
    })

    it('pads missing data up to the category count', () => {
        const data = normalizeData(['A', 'B', 'C'], [{ data: [1] }])
        expect(data.series[0].data).toHaveLength(3)
        expect(data.series[0].data[2].value).toBeNull()
    })

    it('treats unparseable strings as missing values', () => {
        const data = normalizeData(['A'], [{ data: ['n.v.t.'] }])
        expect(data.series[0].data[0].value).toBeNull()
        expect(data.isEmpty).toBe(true)
    })

    it('assigns var-based fills: single series uses --pzh-bar, grouped use the palette', () => {
        const single = normalizeData(['A'], [{ data: [1] }])
        expect(single.series[0].fill).toBe('var(--pzh-bar)')
        const grouped = normalizeData(['A'], [{ data: [1] }, { data: [2] }])
        expect(grouped.series[0].fill).toBe('var(--pzh-series-1)')
        expect(grouped.series[1].fill).toBe('var(--pzh-series-2)')
        expect(grouped.isGrouped).toBe(true)
    })
})
