// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import { formatNumber } from './format'
import { normalizeData } from './normalize'
import { generateSummary } from './summary'

describe('generateSummary', () => {
    it('summarizes a single series with highest, lowest, total and trend', () => {
        const data = normalizeData(
            ['2022', '2023', '2024'],
            [{ data: [100, 250, 400] }]
        )
        const [paragraph] = generateSummary(data, formatNumber)
        expect(paragraph).toBe(
            'De hoogste waarde is 400 (2024), de laagste is 100 (2022). ' +
                'Het totaal is 750. ' +
                'Tussen 2022 en 2024 is de waarde gestegen van 100 naar 400.'
        )
    })

    it('reports a falling trend', () => {
        const data = normalizeData(['2022', '2024'], [{ data: [80, 20] }])
        expect(generateSummary(data, formatNumber)[0]).toContain(
            'gedaald van 80 naar 20'
        )
    })

    it('reports a flat trend', () => {
        const data = normalizeData(['2022', '2024'], [{ data: [50, 50] }])
        expect(generateSummary(data, formatNumber)[0]).toContain(
            'gelijk gebleven (50)'
        )
    })

    it('prefixes series labels for grouped data', () => {
        const data = normalizeData(
            ['2024', '2025'],
            [
                { label: 'Nieuw', data: [10, 20] },
                { label: 'Refurbished', data: [38, 150] },
            ]
        )
        const paragraphs = generateSummary(data, formatNumber)
        expect(paragraphs).toHaveLength(2)
        expect(paragraphs[0].startsWith('Nieuw: ')).toBe(true)
        expect(paragraphs[1].startsWith('Refurbished: ')).toBe(true)
    })

    it('skips series without values and handles single points', () => {
        const data = normalizeData(['A'], [{ data: [null] }, { data: [12] }])
        const paragraphs = generateSummary(data, formatNumber)
        expect(paragraphs).toHaveLength(1)
        expect(paragraphs[0]).toBe('A heeft een waarde van 12.')
    })

    it('uses nl-NL formatting for large numbers', () => {
        const data = normalizeData(['A', 'B'], [{ data: [1000, 2500] }])
        expect(generateSummary(data, formatNumber)[0]).toContain('1.000')
    })

    it('omits the trend sentence for nominal categories like municipalities', () => {
        const data = normalizeData(
            ['Rotterdam', 'Delft'],
            [{ data: [412, 64] }]
        )
        const [paragraph] = generateSummary(data, formatNumber)
        expect(paragraph).toContain('De hoogste waarde is 412 (Rotterdam)')
        expect(paragraph).not.toContain('gedaald')
        expect(paragraph).not.toContain('Tussen')
    })
})
