// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { polarPoint, ringPath } from '../lib/arc'
import { formatNumber } from '../lib/format'
import { markFill } from '../tokens'
import { ChartLabels, GaugeChartProps } from '../types'
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

/** 240°: a bit more than a half circle, symmetric around 12 o'clock. */
const GAUGE_SWEEP = (Math.PI * 4) / 3
const GAUGE_START = -GAUGE_SWEEP / 2

/**
 * The gauge card: parts fill a 240° arc in order. Without `max` the parts
 * span the whole arc (e.g. levels 30/30/5); with `max` the remainder stays
 * gray and the headline defaults to the percentage (e.g. a 90% test score).
 *
 * ```tsx
 * <GaugeChart title='Security delta' max={100} items={[{ label: 'Score', value: 90 }]} />
 * ```
 */
export const GaugeChart: FC<GaugeChartProps> = ({
    items,
    max,
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
    height = 240,
    className,
    id,
    headingLevel,
}) => {
    const parts = usePartItems(items, valueFormatter)
    const mergedLabels: ChartLabels = useMemo(
        () => ({ ...defaultChartLabels, chartRole: 'meterdiagram', ...labels }),
        [labels]
    )
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const total = partsTotal(parts)
    const scaleMax = max !== undefined && max > 0 ? max : total
    const resolvedHeadline =
        headline ??
        (max !== undefined && max > 0 ? formatPercent(total / max) : undefined)

    const headlineSpace = resolvedHeadline ? 76 : 0
    const drawHeight = Math.max(
        120,
        Math.max(height, measuredHeight) - headlineSpace - 8
    )
    // The arc's bounding box is outerRadius tall on top, ½·outerRadius below center.
    const outerRadius = Math.max(50, Math.min(width / 2 - 8, drawHeight / 1.55))
    const thickness = Math.max(18, outerRadius * 0.22)
    const cx = width / 2
    const cy = outerRadius + 4
    const svgHeight = Math.ceil(outerRadius * 1.55) + 8

    // Cumulative angles across the sweep.
    const segments = useMemo(() => {
        let angle = GAUGE_START
        return parts.map(part => {
            const fraction = scaleMax > 0 ? part.value / scaleMax : 0
            const start = angle
            angle += fraction * GAUGE_SWEEP
            return {
                part,
                fraction,
                start,
                end: angle,
                mid: (start + angle) / 2,
            }
        })
    }, [parts, scaleMax])
    const filledEnd = segments.length
        ? segments[segments.length - 1].end
        : GAUGE_START

    return (
        <ChartCard
            title={title}
            subtitle={subtitle}
            loading={loading}
            labels={mergedLabels}
            initialViewMode={initialViewMode}
            initialHighContrast={initialHighContrast}
            tokenOverrides={{ palette }}
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
                        style={{ minHeight: height }}>
                        <ChartHeadline text={resolvedHeadline} />
                        <svg
                            className="pzh-svg"
                            width={width}
                            height={svgHeight}
                            viewBox={`0 0 ${width} ${svgHeight}`}
                            role="group"
                            aria-label={
                                title
                                    ? `${title}: ${mergedLabels.chartRole}`
                                    : mergedLabels.chartRole
                            }>
                            {/* Gray remainder track */}
                            {filledEnd < GAUGE_START + GAUGE_SWEEP - 1e-6 ? (
                                <path
                                    d={ringPath(
                                        cx,
                                        cy,
                                        outerRadius,
                                        outerRadius - thickness,
                                        filledEnd,
                                        GAUGE_START + GAUGE_SWEEP
                                    )}
                                    fill="var(--pzh-skeleton)"
                                />
                            ) : null}
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
                                    <path
                                        className="pzh-slice pzh-fade-in"
                                        style={{
                                            animationDelay: `${index * 60}ms`,
                                        }}
                                        d={ringPath(
                                            cx,
                                            cy,
                                            outerRadius,
                                            outerRadius - thickness,
                                            segment.start,
                                            segment.end
                                        )}
                                        fill={markFill(segment.part.fill)}
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
                                            polarPoint(
                                                cx,
                                                cy,
                                                outerRadius - thickness / 2,
                                                segments[activeIndex].mid
                                            ).x,
                                            70
                                        ),
                                        width - 70
                                    ),
                                    top:
                                        headlineSpace +
                                        polarPoint(
                                            cx,
                                            cy,
                                            outerRadius - thickness / 2,
                                            segments[activeIndex].mid
                                        ).y,
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
                                                segments[activeIndex].fraction
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
                    variant="gauge"
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
