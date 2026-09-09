// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/**
 * Design tokens as CSS custom properties. Every renderer in the library reads
 * only `var(--pzh-*)`, so theming is a variable swap on the card root.
 *
 * All chart colors come from the PZH brand color groups (Kleuren.pdf): each
 * group is one hue in shades 10–900. Multi-series charts combine the 500
 * shades of different groups; stacked charts use shades of a single group.
 *
 * High contrast keeps the exact same colors — it is not a palette swap.
 * Instead, marks get an SVG line-pattern overlay (per-series line direction,
 * white lines on dark fills, black on light), so adjacent marks stay
 * distinguishable without relying on color alone. The patterns are the only
 * extra encoding — marks deliberately get no outline stroke.
 *
 * Extraction note: high-contrast state is per-card for now; when this becomes
 * a package, add controlled `highContrast`/`onHighContrastChange` props or a
 * provider for app-wide persistence.
 */

/** The PZH brand color groups (Kleuren.pdf), shades light→dark. */
export const colorGroups = {
    red: { 10: '#FFEDF0', 100: '#EB7085', 500: '#D11F3D', 900: '#97162C' },
    yellow: { 10: '#FFF9E3', 100: '#F1DB7E', 500: '#EFCC36', 900: '#C6A410' },
    blue: { 10: '#F2F7FC', 100: '#7BADDE', 500: '#281F6B', 900: '#16113B' },
    pink: { 100: '#D76AAC', 500: '#AA0067', 900: '#750047' },
    orange: { 100: '#FBA66A', 500: '#FF6B02', 900: '#B24A00' },
    appleGreen: { 100: '#ADD57D', 500: '#76BC21', 900: '#629623' },
    purple: { 100: '#9B99CC', 500: '#503D90', 900: '#32265A' },
    warmGray: { 100: '#BEB1A7', 500: '#847062', 900: '#584B41' },
    green: { 10: '#EDFAF0', 100: '#61B375', 500: '#00804D', 900: '#004D2E' },
    gray: {
        100: '#F8F8F8',
        200: '#E6E6E6',
        300: '#D5D5D5',
        400: '#BFBFBF',
        500: '#838383',
        600: '#5C5C5C',
        700: '#464646',
        800: '#222222',
    },
} as const

export type ChartTokens = {
    text: string
    textMuted: string
    grid: string
    /** The zero/baseline gridline — subtle by default, solid in high contrast. */
    baseline: string
    axis: string
    bg: string
    border: string
    skeleton: string
    focus: string
    /** Border/text color of the header controls — the monitor's secondary-button blue. */
    control: string
    bar: string
    highlight: string
    series: string[]
    /**
     * Sequential single-hue ramp (light→dark) for magnitude encoding
     * (histogram bins) — the blue group's shades.
     */
    sequential: string[]
    /**
     * Status classes (laag/middel/hoog…) for threshold coloring — the brand
     * green/yellow/red 500 shades. Reserved for state, never reused as
     * ordinary series colors; always shipped with a legend.
     */
    status: string[]
    barStroke: string
    barStrokeWidth: string
}

export const defaultTokens: ChartTokens = {
    text: colorGroups.blue[900],
    textMuted: colorGroups.gray[600],
    grid: colorGroups.gray[200],
    baseline: colorGroups.gray[200],
    axis: colorGroups.blue[900],
    bg: '#FFFFFF',
    border: colorGroups.gray[200],
    skeleton: colorGroups.gray[200],
    focus: colorGroups.blue[500],
    control: colorGroups.blue[500],
    bar: colorGroups.blue[500],
    highlight: colorGroups.orange[500],
    series: [
        colorGroups.blue[500],
        colorGroups.yellow[500],
        colorGroups.green[500],
        colorGroups.orange[500],
        colorGroups.pink[500],
    ],
    sequential: [
        colorGroups.blue[10],
        colorGroups.blue[100],
        colorGroups.blue[500],
        colorGroups.blue[900],
    ],
    status: [
        colorGroups.green[500],
        colorGroups.yellow[500],
        colorGroups.red[500],
    ],
    barStroke: 'transparent',
    barStrokeWidth: '0',
}

/**
 * High contrast keeps the brand colors untouched (patterns do the extra
 * distinguishing — deliberately no outline strokes on marks) and only hardens
 * the chrome: black text/axis, solid baseline, visible grid.
 */
export const highContrastTokens: ChartTokens = {
    ...defaultTokens,
    text: '#000000',
    textMuted: '#1A1A1A',
    grid: '#767676',
    baseline: '#000000',
    axis: '#000000',
    border: '#000000',
    skeleton: '#C7C7C7',
    focus: '#000000',
    control: '#000000',
}

export const MAX_SERIES = defaultTokens.series.length

/**
 * Shades of one group for stacked charts (darkest at the stack's base). Falls
 * back to undefined beyond four series — the categorical palette takes over.
 */
export const stackedShades = (
    count: number,
    group: {
        10?: string
        100: string
        500: string
        900: string
    } = colorGroups.blue
): string[] | undefined => {
    if (count <= 1) return [group[500]]
    if (count === 2) return [group[500], group[100]]
    if (count === 3) return [group[900], group[500], group[100]]
    if (count === 4 && group[10])
        return [group[900], group[500], group[100], group[10]]
    return undefined
}

export type TokenOverrides = {
    palette?: string[]
    highlightColor?: string
}

/** WCAG relative luminance of a #rrggbb color; used to pick pattern line color. */
const luminance = (hex: string): number => {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return 0
    const [r, g, b] = [1, 3, 5].map(offset => {
        const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255
        return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2.x contrast ratio between two #rrggbb colors. */
export const contrastRatio = (a: string, b: string): number => {
    const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Pattern lines take whichever of white/black contrasts more with the fill —
 * ≥3:1 (WCAG 1.4.11) against every fill either can reach, so the pattern
 * itself carries the non-text contrast even on light brand colors.
 */
export const patternStrokeFor = (hex: string): 'white' | 'black' =>
    contrastRatio(hex, '#FFFFFF') >= contrastRatio(hex, '#000000')
        ? 'white'
        : 'black'

/** The resolved mark colors (with overrides applied) — same in both modes. */
export const resolveMarkColors = (overrides: TokenOverrides = {}) => ({
    series: defaultTokens.series.map(
        (color, index) => overrides.palette?.[index] ?? color
    ),
    bar: overrides.palette?.[0] ?? defaultTokens.bar,
    highlight: overrides.highlightColor ?? defaultTokens.highlight,
})

/**
 * Builds the inline `style` object for the card root. Colors are identical in
 * both modes; `patternPrefix` (set by the card in high contrast) redirects the
 * `--pzh-fill-*` vars from plain colors to the card's SVG pattern defs.
 */
export const getCssVars = (
    highContrast: boolean,
    overrides: TokenOverrides = {},
    patternPrefix?: string
): Record<string, string> => {
    const tokens = highContrast ? highContrastTokens : defaultTokens
    const marks = resolveMarkColors(overrides)
    const vars: Record<string, string> = {
        '--pzh-text': tokens.text,
        '--pzh-text-muted': tokens.textMuted,
        '--pzh-grid': tokens.grid,
        '--pzh-baseline': tokens.baseline,
        '--pzh-axis': tokens.axis,
        '--pzh-bg': tokens.bg,
        '--pzh-border': tokens.border,
        '--pzh-skeleton': tokens.skeleton,
        '--pzh-focus': tokens.focus,
        '--pzh-control': tokens.control,
        '--pzh-bar': marks.bar,
        '--pzh-highlight': marks.highlight,
        '--pzh-bar-stroke': tokens.barStroke,
        '--pzh-bar-stroke-width': tokens.barStrokeWidth,
    }
    marks.series.forEach((color, index) => {
        vars[`--pzh-series-${index + 1}`] = color
    })
    tokens.sequential.forEach((color, index) => {
        vars[`--pzh-seq-${index + 1}`] = color
    })
    tokens.status.forEach((color, index) => {
        vars[`--pzh-status-${index + 1}`] = color
    })
    // Mark fills: plain colors normally, per-series patterns in high contrast.
    const usePatterns = highContrast && patternPrefix
    marks.series.forEach((_, index) => {
        vars[`--pzh-fill-${index + 1}`] = usePatterns
            ? `url(#${patternPrefix}-s${index + 1})`
            : `var(--pzh-series-${index + 1})`
    })
    tokens.sequential.forEach((_, index) => {
        vars[`--pzh-fill-seq-${index + 1}`] = usePatterns
            ? `url(#${patternPrefix}-q${index + 1})`
            : `var(--pzh-seq-${index + 1})`
    })
    tokens.status.forEach((_, index) => {
        vars[`--pzh-fill-status-${index + 1}`] = usePatterns
            ? `url(#${patternPrefix}-t${index + 1})`
            : `var(--pzh-status-${index + 1})`
    })
    vars['--pzh-fill-bar'] = usePatterns
        ? `url(#${patternPrefix}-bar)`
        : 'var(--pzh-bar)'
    vars['--pzh-fill-highlight'] = usePatterns
        ? `url(#${patternPrefix}-hl)`
        : 'var(--pzh-highlight)'
    return vars
}

/** CSS var reference for a sequential ramp step; ratio clamped to [0, 1]. */
export const sequentialVar = (ratio: number): string => {
    const steps = defaultTokens.sequential.length
    const step = Math.min(steps, Math.max(1, Math.ceil(ratio * steps)))
    return `var(--pzh-seq-${step})`
}

/** CSS var reference for a series fill; palettes repeat beyond MAX_SERIES. */
export const seriesVar = (seriesIndex: number): string =>
    `var(--pzh-series-${(seriesIndex % MAX_SERIES) + 1})`

/**
 * Translates a mark's color reference into its pattern-capable counterpart.
 * SVG marks use this for their fill; legend dots, table swatches and tooltips
 * keep the plain color reference so they stay renderable as HTML backgrounds.
 */
export const markFill = (fill: string): string => {
    const series = fill.match(/^var\(--pzh-series-(\d)\)$/)
    if (series) return `var(--pzh-fill-${series[1]})`
    const sequential = fill.match(/^var\(--pzh-seq-(\d)\)$/)
    if (sequential) return `var(--pzh-fill-seq-${sequential[1]})`
    const status = fill.match(/^var\(--pzh-status-(\d)\)$/)
    if (status) return `var(--pzh-fill-status-${status[1]})`
    if (fill === 'var(--pzh-bar)') return 'var(--pzh-fill-bar)'
    if (fill === 'var(--pzh-highlight)') return 'var(--pzh-fill-highlight)'
    return fill
}
