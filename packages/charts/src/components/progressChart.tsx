// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { formatNumber } from '../lib/format'
import { markFill } from '../tokens'
import { ChartLabels, ProgressChartProps } from '../types'
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

const TICK_WIDTH = 8
const TICK_GAP = 6
const TICK_HEIGHT = 56
const LABEL_ROW = 24

/**
 * The 0–100% progress card: a tick bar that fills up with the parts' legend
 * colors, a big percentage headline, and the total marked on the track.
 * A custom `max` switches the track and labels to absolute values
 * (e.g. 41 of 50 places).
 *
 * ```tsx
 * <ProgressChart title='Weidegang' items={[{ label: 'Holstein-Friesian', value: 82 }]} />
 * ```
 */
export const ProgressChart: FC<ProgressChartProps> = ({
    items,
    max = 100,
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
            chartRole: 'voortgangsbalk',
            ...labels,
        }),
        [labels]
    )
    const { ref, width } = useContainerSize<HTMLDivElement>()
    // Discrete per-part hover, like the histogram: the part under the cursor
    // gets a tooltip pinned to its span; keyboard focus shows all parts.
    const [active, setActive] = useState<number | 'all' | null>(null)

    const total = partsTotal(parts)
    const totalFraction = max > 0 ? Math.min(1, total / max) : 0
    const isPercentTrack = max === 100
    const trackLabel = (value: number) =>
        isPercentTrack ? `${Math.round(value)}%` : valueFormatter(value)
    const resolvedHeadline =
        headline ?? formatPercent(max > 0 ? total / max : 0)

    const tickCount = Math.max(
        10,
        Math.floor((width + TICK_GAP) / (TICK_WIDTH + TICK_GAP))
    )
    const stride = (width - TICK_WIDTH) / Math.max(1, tickCount - 1)
    const svgHeight = TICK_HEIGHT + LABEL_ROW

    // Cumulative track fractions decide tick colors and which part is hovered.
    const boundaries = useMemo(() => {
        let cumulative = 0
        return parts.map(part => {
            const from = cumulative
            cumulative += max > 0 ? part.value / max : 0
            return { fill: part.fill, from, upTo: cumulative }
        })
    }, [parts, max])
    const tickFill = (index: number): string => {
        const center = (index + 0.5) / tickCount
        const covering = boundaries.find(boundary => center <= boundary.upTo)
        return covering ? covering.fill : 'var(--pzh-skeleton)'
    }
    const partAt = (fraction: number): number | null => {
        const index = boundaries.findIndex(
            boundary => fraction >= boundary.from && fraction <= boundary.upTo
        )
        return index === -1 ? null : index
    }

    const readout = parts.length
        ? `${parts.map(part => partReadout(part, valueFormatter)).join(', ')} — ${trackLabel(total)} van ${trackLabel(max)}`
        : mergedLabels.emptyState
    const markerX = Math.min(Math.max(totalFraction * width, 24), width - 24)

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
                        onMouseLeave={() => setActive(null)}
                        style={{ minHeight: svgHeight, flex: 'none' }}>
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
                            <g
                                className="pzh-bar-group"
                                role="img"
                                tabIndex={0}
                                aria-label={readout}
                                onMouseMove={event => {
                                    const rect =
                                        ref.current?.getBoundingClientRect()
                                    if (rect && width > 0)
                                        setActive(
                                            partAt(
                                                (event.clientX - rect.left) /
                                                    width
                                            )
                                        )
                                }}
                                onFocus={() => setActive('all')}
                                onBlur={() => setActive(null)}
                                onKeyDown={event => {
                                    if (event.key === 'Escape') setActive(null)
                                }}>
                                <title>{readout}</title>
                                {/* Continuous hit target so the gaps between ticks stay hoverable */}
                                <rect
                                    x={0}
                                    y={0}
                                    width={width}
                                    height={TICK_HEIGHT}
                                    fill="transparent"
                                />
                                {Array.from(
                                    { length: tickCount },
                                    (_, index) => (
                                        <rect
                                            key={index}
                                            className="pzh-bar"
                                            x={index * stride}
                                            y={0}
                                            width={TICK_WIDTH}
                                            height={TICK_HEIGHT}
                                            rx={TICK_WIDTH / 2}
                                            style={
                                                {
                                                    '--pzh-bar-fill': markFill(
                                                        tickFill(index)
                                                    ),
                                                    animationDelay: `${index * 12}ms`,
                                                } as never
                                            }
                                        />
                                    )
                                )}
                            </g>
                            <text
                                className="pzh-category-label"
                                x={0}
                                y={TICK_HEIGHT + 18}
                                textAnchor="start">
                                {trackLabel(0)}
                            </text>
                            {totalFraction > 0.06 && totalFraction < 0.94 ? (
                                <text
                                    className="pzh-category-label"
                                    x={markerX}
                                    y={TICK_HEIGHT + 18}
                                    textAnchor="middle"
                                    style={{ fontWeight: 700 }}>
                                    {trackLabel(total)}
                                </text>
                            ) : null}
                            <text
                                className="pzh-category-label"
                                x={width}
                                y={TICK_HEIGHT + 18}
                                textAnchor="end">
                                {trackLabel(max)}
                            </text>
                        </svg>
                        {active !== null ? (
                            <div
                                className="pzh-tooltip"
                                role="presentation"
                                style={{
                                    left: Math.min(
                                        Math.max(
                                            active === 'all'
                                                ? markerX
                                                : ((boundaries[active].from +
                                                      boundaries[active].upTo) /
                                                      2) *
                                                      width,
                                            70
                                        ),
                                        width - 70
                                    ),
                                    top: TICK_HEIGHT / 2,
                                    transform:
                                        'translate(-50%, calc(-100% + 8px))',
                                }}>
                                {(active === 'all'
                                    ? parts
                                    : [parts[active]]
                                ).map((part, index) => (
                                    <p className="pzh-tooltip-row" key={index}>
                                        <Swatch color={part.fill} />
                                        <span>
                                            {part.label}:{' '}
                                            <strong>
                                                {valueFormatter(part.value)}
                                            </strong>
                                            <span className="pzh-tooltip-note">
                                                {' '}
                                                ·{' '}
                                                {formatPercent(
                                                    max > 0
                                                        ? part.value / max
                                                        : 0
                                                )}
                                            </span>
                                        </span>
                                    </p>
                                ))}
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
                    variant="progress"
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    legendCount={Math.min(items.length, 4)}
                />
            }
        />
    )
}
