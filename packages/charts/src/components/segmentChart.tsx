// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { formatNumber } from '../lib/format'
import { markFill, stackedShades } from '../tokens'
import { ChartLabels, SegmentChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import {
    ChartHeadline,
    formatPercent,
    partReadout,
    PartsLegend,
    partsToNormalized,
    partsTotal,
    usePartItems,
} from './partsViews'
import { Swatch } from './swatch'

const BAR_HEIGHT = 48
const SEGMENT_GAP = 6
const MIN_SEGMENT = 10

/**
 * The 100%-segment card: one horizontal bar split proportionally across the
 * legend items. The headline defaults to the formatted total (e.g. a budget
 * split out over posts); pass `headline='100%'` for percentage framing.
 *
 * ```tsx
 * <SegmentChart title='Begroting' items={[{ label: 'Natuur', value: 10401251 }]} valueFormatter={(v) => `€${formatNumber(v)}`} />
 * ```
 */
export const SegmentChart: FC<SegmentChartProps> = ({
    items,
    headline,
    title,
    subtitle,
    loading,
    palette,
    valueFormatter = formatNumber,
    summary,
    initialViewMode,
    initialHighContrast,
    labels,
    height = 160,
    className,
    id,
    headingLevel,
}) => {
    const parts = usePartItems(items, valueFormatter)
    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            chartRole: 'segmentdiagram',
            ...labels,
        }),
        [labels]
    )
    const { ref, width } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const resolvedHeadline = headline ?? valueFormatter(partsTotal(parts))

    // A 100%-bar is a stack: without explicit colors it reads best as shades
    // of one color group rather than competing hues.
    const effectivePalette = useMemo(
        () =>
            palette ??
            (items.some(item => item.color)
                ? undefined
                : stackedShades(items.length)),
        [palette, items]
    )

    // Proportional widths with a sliver clamp, gaps carved from the available run.
    const segments = useMemo(() => {
        const available = Math.max(0, width - (parts.length - 1) * SEGMENT_GAP)
        let x = 0
        return parts.map(part => {
            const segmentWidth = Math.max(
                MIN_SEGMENT,
                part.fraction * available
            )
            const segment = { part, x, width: segmentWidth }
            x += segmentWidth + SEGMENT_GAP
            return segment
        })
    }, [parts, width])

    return (
        <ChartCard
            title={title}
            subtitle={subtitle}
            loading={loading}
            labels={mergedLabels}
            initialViewMode={initialViewMode}
            initialHighContrast={initialHighContrast}
            tokenOverrides={{ palette: effectivePalette }}
            height={height}
            className={className}
            id={id}
            headingLevel={headingLevel}
            visual={
                parts.length === 0 ? (
                    <p className="pzh-empty">{mergedLabels.emptyState}</p>
                ) : (
                    <div
                        className="pzh-chart-area"
                        ref={ref}
                        onMouseLeave={() => setActiveIndex(null)}
                        style={{ minHeight: BAR_HEIGHT, flex: 'none' }}>
                        <ChartHeadline text={resolvedHeadline} />
                        <svg
                            className="pzh-svg"
                            width={width}
                            height={BAR_HEIGHT}
                            viewBox={`0 0 ${width} ${BAR_HEIGHT}`}
                            role="group"
                            aria-label={
                                title
                                    ? `${title}: ${mergedLabels.chartRole}`
                                    : mergedLabels.chartRole
                            }>
                            {segments.map((segment, index) => (
                                <g
                                    key={index}
                                    className={
                                        activeIndex === index
                                            ? 'pzh-bar-group pzh-active'
                                            : 'pzh-bar-group'
                                    }
                                    role="img"
                                    tabIndex={0}
                                    aria-label={partReadout(
                                        segment.part,
                                        valueFormatter
                                    )}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    onBlur={() => setActiveIndex(null)}
                                    onKeyDown={event => {
                                        if (event.key === 'Escape')
                                            setActiveIndex(null)
                                    }}>
                                    <title>
                                        {partReadout(
                                            segment.part,
                                            valueFormatter
                                        )}
                                    </title>
                                    <rect
                                        className="pzh-bar pzh-bar-h"
                                        x={segment.x}
                                        y={0}
                                        width={segment.width}
                                        height={BAR_HEIGHT}
                                        rx={6}
                                        style={
                                            {
                                                '--pzh-bar-fill': markFill(
                                                    segment.part.fill
                                                ),
                                                animationDelay: `${index * 60}ms`,
                                            } as never
                                        }
                                    />
                                </g>
                            ))}
                        </svg>
                        {activeIndex !== null ? (
                            <div
                                className="pzh-tooltip"
                                role="presentation"
                                style={{
                                    left: Math.min(
                                        Math.max(
                                            segments[activeIndex].x +
                                                segments[activeIndex].width / 2,
                                            70
                                        ),
                                        width - 70
                                    ),
                                    top: resolvedHeadline ? 72 : 0,
                                    transform:
                                        'translate(-50%, calc(-100% - 8px))',
                                }}>
                                <p className="pzh-tooltip-row">
                                    <Swatch
                                        color={segments[activeIndex].part.fill}
                                    />
                                    <span>
                                        {segments[activeIndex].part.label}:{' '}
                                        <strong>
                                            {valueFormatter(
                                                segments[activeIndex].part.value
                                            )}
                                        </strong>
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            ·{' '}
                                            {formatPercent(
                                                segments[activeIndex].part
                                                    .fraction
                                            )}
                                        </span>
                                    </span>
                                </p>
                            </div>
                        ) : null}
                    </div>
                )
            }
            textual={
                <ChartTable
                    data={partsToNormalized(parts)}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                />
            }
            summary={
                <ChartSummary
                    data={partsToNormalized(parts)}
                    summary={summary}
                    valueFormatter={valueFormatter}
                />
            }
            legend={<PartsLegend parts={parts} />}
            skeleton={
                <ChartSkeleton
                    variant="segment"
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    legendCount={Math.min(items.length || 3, 4)}
                />
            }
        />
    )
}
