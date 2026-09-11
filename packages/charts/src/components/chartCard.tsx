// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, ReactNode, useId, useState } from 'react'

import { chartStyles, STYLE_HREF } from '../styles'
import { getCssVars, TokenOverrides } from '../tokens'
import { ChartLabels, ChartViewMode, HeadingLevel } from '../types'
import { ChartHeader } from './chartHeader'
import { ChartSkeleton } from './chartSkeleton'
import { HcPatternDefs } from './hcPatternDefs'

type ChartCardProps = {
    title?: string
    subtitle?: string
    loading?: boolean
    labels: ChartLabels
    initialViewMode?: ChartViewMode
    initialHighContrast?: boolean
    tokenOverrides?: TokenOverrides
    height: number
    headingLevel?: HeadingLevel
    className?: string
    id?: string
    /** The three view-mode render slots; chart types plug in here. */
    visual: ReactNode
    textual: ReactNode
    summary: ReactNode
    legend?: ReactNode
    /** Loading placeholder; chart types pass a content-aware skeleton. */
    skeleton?: ReactNode
}

/**
 * The shared card shell: header (title, subtitle, contrast toggle, view mode
 * select), the active view, the legend, and the skeleton state. Chart types
 * (bar today, more later) supply the view slots.
 */
export const ChartCard: FC<ChartCardProps> = ({
    title,
    subtitle,
    loading = false,
    labels,
    initialViewMode = 'visual',
    initialHighContrast = false,
    tokenOverrides,
    height,
    headingLevel = 2,
    className,
    id,
    visual,
    textual,
    summary,
    legend,
    skeleton,
}) => {
    const generatedId = useId()
    const titleId = `${id ?? generatedId}-title`
    const [viewMode, setViewMode] = useState<ChartViewMode>(initialViewMode)
    const [highContrast, setHighContrast] = useState(initialHighContrast)
    // Announces user-initiated view switches; empty on mount so nothing fires on load.
    const [viewAnnouncement, setViewAnnouncement] = useState('')

    const changeViewMode = (mode: ChartViewMode) => {
        setViewMode(mode)
        setViewAnnouncement(labels[mode])
    }

    // Pattern ids must be url()-safe, so strip useId's colons.
    const patternPrefix = `pzh-pat-${(id ?? generatedId).replace(/[^a-zA-Z0-9-]/g, '')}`
    const cssVars = getCssVars(
        highContrast,
        tokenOverrides,
        patternPrefix
    ) as CSSProperties
    // pzh-hc is the hook for any CSS that cannot read a custom property (a url() image, say).
    const cardClass = ['pzh-card', highContrast ? 'pzh-hc' : null, className]
        .filter(Boolean)
        .join(' ')

    return (
        <section
            className={cardClass}
            style={cssVars}
            lang={labels.lang}
            aria-labelledby={title && !loading ? titleId : undefined}
            aria-busy={loading || undefined}>
            {/* React 19 hoists and dedupes this across cards via href+precedence. */}
            <style href={STYLE_HREF} precedence="default">
                {chartStyles}
            </style>
            {highContrast ? (
                <HcPatternDefs
                    prefix={patternPrefix}
                    overrides={tokenOverrides}
                />
            ) : null}
            {loading ? (
                (skeleton ?? (
                    <ChartSkeleton
                        height={height}
                        loadingLabel={labels.loading}
                    />
                ))
            ) : (
                <>
                    <ChartHeader
                        titleId={titleId}
                        title={title}
                        subtitle={subtitle}
                        headingLevel={headingLevel}
                        labels={labels}
                        viewMode={viewMode}
                        highContrast={highContrast}
                        onViewModeChange={changeViewMode}
                        onToggleContrast={() =>
                            setHighContrast(value => !value)
                        }
                    />
                    {/* Tells screen readers which view replaced the previous one. */}
                    <span className="pzh-visually-hidden" role="status">
                        {viewAnnouncement}
                    </span>
                    {viewMode === 'visual' ? (
                        <>
                            <div className="pzh-card-view">{visual}</div>
                            {legend}
                        </>
                    ) : null}
                    {/* The table's header row carries the legend itself. */}
                    {viewMode === 'textual' ? textual : null}
                    {viewMode === 'summary' ? summary : null}
                </>
            )}
        </section>
    )
}
