// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC } from 'react'

import { markFill } from '../tokens'

/**
 * The legend/table/tooltip color dot. An inline SVG rather than a span with a
 * CSS background: contrast checkers then measure the neighbouring text on
 * the real (white) background instead of on the dot, and in high contrast the
 * dot shows the same line pattern as the marks it explains.
 */
export const Swatch: FC<{ color: string }> = ({ color }) => (
    <svg
        className="pzh-swatch"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false">
        <rect width="10" height="10" rx="3" fill={markFill(color)} />
    </svg>
)
