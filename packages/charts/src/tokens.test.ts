// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { describe, expect, it } from 'vitest'

import {
    colorGroups,
    contrastRatio,
    defaultTokens,
    getCssVars,
    highContrastTokens,
    markFill,
    MAX_SERIES,
    patternStrokeFor,
    stackedShades,
} from './tokens'

// WCAG 2.x relative luminance + contrast ratio (test-only helper, not shipped).
const luminance = (hex: string): number => {
    const channels = [1, 3, 5].map(offset => {
        const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255
        return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

const contrast = (foreground: string, background: string): number => {
    const [light, dark] = [luminance(foreground), luminance(background)].sort(
        (a, b) => b - a
    )
    return (light + 0.05) / (dark + 0.05)
}

describe('brand palettes', () => {
    it('builds every palette from the PZH color groups', () => {
        const groupColors = new Set<string>(
            Object.values(colorGroups).flatMap(group => Object.values(group))
        )
        for (const color of [
            ...defaultTokens.series,
            ...defaultTokens.sequential,
            ...defaultTokens.status,
            defaultTokens.bar,
            defaultTokens.highlight,
        ]) {
            expect(groupColors.has(color)).toBe(true)
        }
    })

    it('keeps the sequential ramp monotonically darkening', () => {
        for (let step = 1; step < defaultTokens.sequential.length; step += 1) {
            expect(luminance(defaultTokens.sequential[step])).toBeLessThan(
                luminance(defaultTokens.sequential[step - 1])
            )
        }
    })
})

describe('high-contrast tokens', () => {
    it('keeps the exact same mark colors — patterns do the distinguishing', () => {
        expect(highContrastTokens.series).toEqual(defaultTokens.series)
        expect(highContrastTokens.sequential).toEqual(defaultTokens.sequential)
        expect(highContrastTokens.status).toEqual(defaultTokens.status)
        expect(highContrastTokens.bar).toBe(defaultTokens.bar)
        expect(highContrastTokens.highlight).toBe(defaultTokens.highlight)
    })

    it('hardens the chrome: text and grid contrast', () => {
        expect(
            contrast(highContrastTokens.grid, highContrastTokens.bg)
        ).toBeGreaterThanOrEqual(3)
        expect(
            contrast(highContrastTokens.text, highContrastTokens.bg)
        ).toBeGreaterThanOrEqual(7)
        expect(
            contrast(highContrastTokens.textMuted, highContrastTokens.bg)
        ).toBeGreaterThanOrEqual(7)
    })

    it('gives marks no outline stroke — the pattern is the only extra encoding', () => {
        expect(highContrastTokens.barStroke).toBe('transparent')
        expect(Number(highContrastTokens.barStrokeWidth)).toBe(0)
    })
})

describe('default tokens', () => {
    it('keeps the brand bar color well above 3:1 on white', () => {
        expect(
            contrast(defaultTokens.bar, defaultTokens.bg)
        ).toBeGreaterThanOrEqual(3)
    })

    it('keeps text at AA contrast', () => {
        expect(
            contrast(defaultTokens.text, defaultTokens.bg)
        ).toBeGreaterThanOrEqual(4.5)
        expect(
            contrast(defaultTokens.textMuted, defaultTokens.bg)
        ).toBeGreaterThanOrEqual(4.5)
    })
})

describe('stackedShades', () => {
    it('returns darkest-first shades of one group', () => {
        expect(stackedShades(2)).toEqual([
            colorGroups.blue[500],
            colorGroups.blue[100],
        ])
        expect(stackedShades(3)).toEqual([
            colorGroups.blue[900],
            colorGroups.blue[500],
            colorGroups.blue[100],
        ])
        expect(stackedShades(4)).toEqual([
            colorGroups.blue[900],
            colorGroups.blue[500],
            colorGroups.blue[100],
            colorGroups.blue[10],
        ])
    })

    it('bails out beyond four series so the categorical palette takes over', () => {
        expect(stackedShades(5)).toBeUndefined()
    })
})

describe('patternStrokeFor', () => {
    it('uses white lines on dark fills and black on light ones', () => {
        expect(patternStrokeFor(colorGroups.blue[500])).toBe('white')
        expect(patternStrokeFor(colorGroups.yellow[500])).toBe('black')
        expect(patternStrokeFor(colorGroups.blue[10])).toBe('black')
    })

    it('reaches ≥3:1 (WCAG 1.4.11) on every brand color used as a mark fill', () => {
        const markColors = [
            ...defaultTokens.series,
            ...defaultTokens.sequential,
            ...defaultTokens.status,
            defaultTokens.bar,
            defaultTokens.highlight,
        ]
        for (const color of markColors) {
            const stroke =
                patternStrokeFor(color) === 'white' ? '#FFFFFF' : '#000000'
            expect(
                contrastRatio(color, stroke),
                `${color} vs ${stroke}`
            ).toBeGreaterThanOrEqual(3)
        }
    })
})

describe('markFill', () => {
    it('maps series, bar and highlight references to pattern-capable fill vars', () => {
        expect(markFill('var(--pzh-series-2)')).toBe('var(--pzh-fill-2)')
        expect(markFill('var(--pzh-bar)')).toBe('var(--pzh-fill-bar)')
        expect(markFill('var(--pzh-highlight)')).toBe(
            'var(--pzh-fill-highlight)'
        )
    })

    it('maps sequential and status references too — every chart type patterns', () => {
        expect(markFill('var(--pzh-seq-3)')).toBe('var(--pzh-fill-seq-3)')
        expect(markFill('var(--pzh-status-2)')).toBe('var(--pzh-fill-status-2)')
    })

    it('leaves custom colors untouched', () => {
        expect(markFill('#D11F3D')).toBe('#D11F3D')
        expect(markFill('var(--pzh-skeleton)')).toBe('var(--pzh-skeleton)')
    })
})

describe('getCssVars', () => {
    it('applies palette and highlight overrides in default mode', () => {
        const vars = getCssVars(false, {
            palette: ['#123456'],
            highlightColor: '#654321',
        })
        expect(vars['--pzh-series-1']).toBe('#123456')
        expect(vars['--pzh-series-2']).toBe(defaultTokens.series[1])
        expect(vars['--pzh-bar']).toBe('#123456')
        expect(vars['--pzh-highlight']).toBe('#654321')
    })

    it('keeps override colors in high-contrast mode — colors stay, patterns are added', () => {
        const vars = getCssVars(true, {
            palette: ['#123456'],
            highlightColor: '#654321',
        })
        expect(vars['--pzh-series-1']).toBe('#123456')
        expect(vars['--pzh-bar']).toBe('#123456')
        expect(vars['--pzh-highlight']).toBe('#654321')
        expect(vars['--pzh-bar-stroke']).toBe('transparent')
    })

    it('redirects fill vars to the card pattern defs in high contrast', () => {
        expect(getCssVars(false, {}, 'pat')['--pzh-fill-1']).toBe(
            'var(--pzh-series-1)'
        )
        expect(getCssVars(false, {}, 'pat')['--pzh-fill-bar']).toBe(
            'var(--pzh-bar)'
        )
        const hcVars = getCssVars(true, {}, 'pat')
        expect(hcVars['--pzh-fill-1']).toBe('url(#pat-s1)')
        expect(hcVars['--pzh-fill-bar']).toBe('url(#pat-bar)')
        expect(hcVars['--pzh-fill-highlight']).toBe('url(#pat-hl)')
        expect(hcVars['--pzh-fill-seq-1']).toBe('url(#pat-q1)')
        expect(hcVars['--pzh-fill-status-3']).toBe('url(#pat-t3)')
    })
})

describe('categorical palette capacity', () => {
    it('has a distinct colour for every series slot', () => {
        expect(new Set(defaultTokens.series).size).toBe(
            defaultTokens.series.length
        )
    })

    it('covers the six series real content asks for', () => {
        // A Monitor theme charts company-size bands as six series; with five
        // the sixth took the first one's colour, and the two bands sat next to
        // each other in the legend.
        expect(MAX_SERIES).toBeGreaterThanOrEqual(6)
    })
})
