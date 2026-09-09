// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { polarPoint, ringPath, slicePath } from '../lib/arc'
import { formatNumber } from '../lib/format'
import { markFill } from '../tokens'
import { ChartLabels, PieChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import {
    CenterHeadline,
    ChartHeadline,
    formatPercent,
    partReadout,
    PartsLegend,
    partsToNormalized,
    usePartItems,
} from './partsViews'
import { Swatch } from './swatch'

/** Hole size of `donut` without an explicit fraction, and the range a number is clamped to. */
const DEFAULT_HOLE = 0.6
const MIN_HOLE = 0.2
const MAX_HOLE = 0.85
/** Extra outer radius on the hovered or focused donut slice. */
const ACTIVE_GROWTH = 4
/** Flow height of the headline above the circle, matching .pzh-headline. */
const HEADLINE_SPACE = 72

/**
 * The pie card: parts of a whole from 12 o'clock clockwise, values and
 * percentages in the tooltip and lijst view. `donut` cuts a hole in the middle
 * and moves the headline into it.
 *
 * ```tsx
 * <PieChart title='Subsidies' items={[{ value: 10401251 }, { value: 1603105 }]} valueFormatter={(v) => `€${formatNumber(v)}`} />
 * ```
 */
export const PieChart: FC<PieChartProps> = ({
    items,
    donut,
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
    height = 280,
    className,
    id,
    headingLevel,
}) => {
    const parts = usePartItems(items, valueFormatter)
    const holeFraction =
        donut === true
            ? DEFAULT_HOLE
            : typeof donut === 'number'
              ? Math.min(MAX_HOLE, Math.max(MIN_HOLE, donut))
              : 0
    const isDonut = holeFraction > 0
    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            chartRole: isDonut ? 'ringdiagram' : 'cirkeldiagram',
            ...labels,
        }),
        [isDonut, labels]
    )
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    // A donut headline sits inside the hole, so it takes no flow height.
    const headlineSpace = headline && !isDonut ? HEADLINE_SPACE : 0
    const svgHeight = Math.max(
        height - headlineSpace,
        measuredHeight - headlineSpace,
        160
    )
    const radius = Math.max(40, Math.min(width, svgHeight) / 2 - 8)
    const innerRadius = radius * holeFraction
    const cx = width / 2
    const cy = svgHeight / 2
    // Tooltips and the active slice anchor to the middle of the drawn band.
    const anchorRadius = isDonut ? (innerRadius + radius) / 2 : radius * 0.65

    // Cumulative angles, clockwise from 12 o'clock.
    const slices = useMemo(() => {
        let angle = 0
        return parts.map(part => {
            const start = angle
            angle += part.fraction * Math.PI * 2
            return { part, start, end: angle, mid: (start + angle) / 2 }
        })
    }, [parts])

    // The active donut slice grows outward. An attribute swap, not a transition,
    // so it stays instant under prefers-reduced-motion.
    const slicePathFor = (
        index: number,
        start: number,
        end: number
    ): string => {
        const outer =
            isDonut && activeIndex === index ? radius + ACTIVE_GROWTH : radius
        return isDonut
            ? ringPath(cx, cy, outer, innerRadius, start, end)
            : slicePath(cx, cy, outer, start, end)
    }

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
                        {isDonut ? null : <ChartHeadline text={headline} />}
                        <div className="pzh-center-wrap">
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
                                {slices.map((slice, index) => (
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
                                            slice.part,
                                            valueFormatter
                                        )}
                                        onMouseEnter={() =>
                                            setActiveIndex(index)
                                        }
                                        onFocus={() => setActiveIndex(index)}
                                        onBlur={() => setActiveIndex(null)}
                                        onKeyDown={event => {
                                            if (event.key === 'Escape')
                                                setActiveIndex(null)
                                        }}>
                                        <title>
                                            {partReadout(
                                                slice.part,
                                                valueFormatter
                                            )}
                                        </title>
                                        <path
                                            className="pzh-slice pzh-fade-in"
                                            style={{
                                                animationDelay: `${index * 60}ms`,
                                            }}
                                            d={slicePathFor(
                                                index,
                                                slice.start,
                                                slice.end
                                            )}
                                            fill={markFill(slice.part.fill)}
                                        />
                                    </g>
                                ))}
                            </svg>
                            {isDonut ? (
                                <CenterHeadline
                                    text={headline}
                                    maxWidth={innerRadius * 1.6}
                                />
                            ) : null}
                        </div>
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
                                                anchorRadius,
                                                slices[activeIndex].mid
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
                                            anchorRadius,
                                            slices[activeIndex].mid
                                        ).y,
                                    transform:
                                        'translate(-50%, calc(-100% - 8px))',
                                }}>
                                <p className="pzh-tooltip-row">
                                    <Swatch
                                        color={slices[activeIndex].part.fill}
                                    />
                                    <span>
                                        {slices[activeIndex].part.label}:{' '}
                                        <strong>
                                            {valueFormatter(
                                                slices[activeIndex].part.value
                                            )}
                                        </strong>
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            ·{' '}
                                            {formatPercent(
                                                slices[activeIndex].part
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
                    variant={isDonut ? 'radial' : 'pie'}
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
