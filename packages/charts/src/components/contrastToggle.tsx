// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC } from 'react'

type ContrastToggleProps = {
    pressed: boolean
    label: string
    onToggle: () => void
}

/** Labeled switch: gray track when off, control-blue when on, sliding knob. */
export const ContrastToggle: FC<ContrastToggleProps> = ({
    pressed,
    label,
    onToggle,
}) => (
    <button
        type="button"
        className="pzh-contrast-toggle"
        aria-pressed={pressed}
        onClick={onToggle}>
        <span className="pzh-toggle-label">{label}</span>
        <span className="pzh-toggle-track" aria-hidden="true">
            <span className="pzh-toggle-knob" />
        </span>
    </button>
)
