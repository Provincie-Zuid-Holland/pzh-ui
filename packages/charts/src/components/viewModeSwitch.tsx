// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, KeyboardEvent, useId, useRef } from 'react'

import { ChartLabels, ChartViewMode } from '../types'

type ViewModeSwitchProps = {
    value: ChartViewMode
    labels: ChartLabels
    onChange: (mode: ChartViewMode) => void
}

const MODES: ChartViewMode[] = ['visual', 'textual', 'summary']

/** Chart, table and text — each drawn on a 20px grid, currentColor strokes. */
const ICONS: Record<ChartViewMode, React.ReactNode> = {
    visual: (
        <>
            <path d="M3 3v14h14" />
            <path d="M6 12l3.5-4 3 2.5L16 6" />
        </>
    ),
    textual: (
        <>
            <rect x="3" y="4" width="14" height="12" rx="1" />
            <path d="M3 8h14M3 12h14M8 4v12" />
        </>
    ),
    summary: <path d="M5 4h10M10 4v12" />,
}

/**
 * Segmented control for the three views. A radio group rather than tabs: the
 * views are one setting with three values, the panels render lazily, and a
 * radio group is a single tab stop with arrow keys — exactly what the select
 * it replaces gave keyboard users. Icons are decorative; each option carries
 * its label as visually hidden text, and the group is named by the visible
 * "Weergave" label beside it.
 */
export const ViewModeSwitch: FC<ViewModeSwitchProps> = ({
    value,
    labels,
    onChange,
}) => {
    const labelId = useId()
    const buttons = useRef<
        Partial<Record<ChartViewMode, HTMLButtonElement | null>>
    >({})

    // Roving tabindex: arrows move the selection and focus together.
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step =
            event.key === 'ArrowRight' || event.key === 'ArrowDown'
                ? 1
                : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                  ? -1
                  : null
        const index =
            step !== null
                ? (MODES.indexOf(value) + step + MODES.length) % MODES.length
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? MODES.length - 1
                    : null
        if (index === null) return
        event.preventDefault()
        onChange(MODES[index])
        buttons.current[MODES[index]]?.focus()
    }

    return (
        <span className="pzh-view-group">
            <span id={labelId} className="pzh-view-label">
                {labels.viewModeLabel}
            </span>
            <div
                className="pzh-segmented"
                role="radiogroup"
                aria-labelledby={labelId}
                onKeyDown={onKeyDown}>
                {MODES.map(mode => (
                    <button
                        key={mode}
                        ref={element => {
                            buttons.current[mode] = element
                        }}
                        type="button"
                        role="radio"
                        className="pzh-segment"
                        aria-checked={value === mode}
                        tabIndex={value === mode ? 0 : -1}
                        onClick={() => onChange(mode)}>
                        <svg
                            className="pzh-segment-icon"
                            viewBox="0 0 20 20"
                            width={20}
                            height={20}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false">
                            {ICONS[mode]}
                        </svg>
                        <span className="pzh-visually-hidden">
                            {labels[mode]}
                        </span>
                    </button>
                ))}
            </div>
        </span>
    )
}
