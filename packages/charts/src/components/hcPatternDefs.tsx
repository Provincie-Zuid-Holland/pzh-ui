// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC } from 'react'

import {
    defaultTokens,
    patternStrokeFor,
    resolveMarkColors,
    TokenOverrides,
} from '../tokens'

/**
 * Per-card SVG pattern definitions for high-contrast mode: each series slot
 * keeps its brand color and gets its own line direction on top (the design
 * team's diagonal/horizontal/vertical line patterns), with white lines on dark
 * fills and black lines on light ones.
 *
 * The defs live inside the card root so the pattern tiles resolve the card's
 * own `--pzh-*` color vars (palette overrides included); marks reference them
 * through the `--pzh-fill-*` vars set by `getCssVars`.
 */

/** Line direction per series slot, cycling the four provided patterns. */
const SERIES_LINES = [
    'diagRight',
    'diagLeft',
    'horizontal',
    'vertical',
    'diagRight',
] as const

type LineStyle = (typeof SERIES_LINES)[number]

const LINE_PATHS: Record<LineStyle, { size: number; d: string }> = {
    // Three strokes per diagonal tile keep the lines seamless across repeats.
    diagRight: { size: 8, d: 'M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6' },
    diagLeft: { size: 8, d: 'M0,0 L8,8 M6,-2 L10,2 M-2,6 L2,10' },
    horizontal: { size: 7, d: 'M0,3.5 H7' },
    vertical: { size: 7, d: 'M3.5,0 V7' },
}

const Pattern: FC<{
    id: string
    line: LineStyle
    color: string
    colorVar: string
}> = ({ id, line, color, colorVar }) => {
    const { size, d } = LINE_PATHS[line]
    return (
        <pattern
            id={id}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse">
            <rect width={size} height={size} fill={colorVar} />
            <path d={d} stroke={patternStrokeFor(color)} strokeWidth={1} />
        </pattern>
    )
}

export const HcPatternDefs: FC<{
    prefix: string
    overrides?: TokenOverrides
}> = ({ prefix, overrides }) => {
    const marks = resolveMarkColors(overrides)
    return (
        <svg
            width={0}
            height={0}
            aria-hidden="true"
            focusable="false"
            style={{ position: 'absolute' }}>
            <defs>
                {marks.series.map((color, index) => (
                    <Pattern
                        key={index}
                        id={`${prefix}-s${index + 1}`}
                        line={SERIES_LINES[index % SERIES_LINES.length]}
                        color={color}
                        colorVar={`var(--pzh-series-${index + 1})`}
                    />
                ))}
                {defaultTokens.sequential.map((color, index) => (
                    <Pattern
                        key={index}
                        id={`${prefix}-q${index + 1}`}
                        line={SERIES_LINES[index % SERIES_LINES.length]}
                        color={color}
                        colorVar={`var(--pzh-seq-${index + 1})`}
                    />
                ))}
                {defaultTokens.status.map((color, index) => (
                    <Pattern
                        key={index}
                        id={`${prefix}-t${index + 1}`}
                        line={SERIES_LINES[index % SERIES_LINES.length]}
                        color={color}
                        colorVar={`var(--pzh-status-${index + 1})`}
                    />
                ))}
                <Pattern
                    id={`${prefix}-bar`}
                    line="diagRight"
                    color={marks.bar}
                    colorVar="var(--pzh-bar)"
                />
                <Pattern
                    id={`${prefix}-hl`}
                    line="diagLeft"
                    color={marks.highlight}
                    colorVar="var(--pzh-highlight)"
                />
            </defs>
        </svg>
    )
}
