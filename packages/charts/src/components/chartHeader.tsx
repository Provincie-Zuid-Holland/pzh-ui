// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { createElement, FC } from 'react'

import { ChartLabels, ChartViewMode, HeadingLevel } from '../types'
import { ContrastToggle } from './contrastToggle'
import { ViewModeSwitch } from './viewModeSwitch'

type ChartHeaderProps = {
    titleId: string
    title?: string
    subtitle?: string
    headingLevel: HeadingLevel
    labels: ChartLabels
    viewMode: ChartViewMode
    highContrast: boolean
    onViewModeChange: (mode: ChartViewMode) => void
    onToggleContrast: () => void
}

export const ChartHeader: FC<ChartHeaderProps> = ({
    titleId,
    title,
    subtitle,
    headingLevel,
    labels,
    viewMode,
    highContrast,
    onViewModeChange,
    onToggleContrast,
}) => (
    <header className="pzh-header">
        <div className="pzh-header-text">
            {/* A real heading, so the card slots into the page outline for screen readers. */}
            {title
                ? createElement(
                      `h${headingLevel}`,
                      { className: 'pzh-title', id: titleId },
                      title
                  )
                : null}
            {subtitle ? <p className="pzh-subtitle">{subtitle}</p> : null}
        </div>
        <div className="pzh-controls">
            <ContrastToggle
                pressed={highContrast}
                label={labels.highContrast}
                onToggle={onToggleContrast}
            />
            <ViewModeSwitch
                value={viewMode}
                labels={labels}
                onChange={onViewModeChange}
            />
        </div>
    </header>
)
