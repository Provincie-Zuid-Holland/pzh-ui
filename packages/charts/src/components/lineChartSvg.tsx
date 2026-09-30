// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import {
    BezierSegment,
    CurvePoint,
    monotoneSegments,
    segmentsToAreaPath,
    segmentsToPath,
} from '../lib/curve'
import { parseValue, truncateLabel } from '../lib/format'
import { categoryLabelMode, chartMargins } from '../lib/layout'
import { NormalizedData } from '../lib/normalize'
import { niceTicks, valueToY } from '../lib/scale'
import { markFill } from '../tokens'
import { AxisOptions, ChartLabels, ReferenceLine } from '../types'
import { Swatch } from './swatch'

type LineSeriesOptions = {
    dashFromIndex?: number
    area: boolean
}

type LineChartSvgProps = {
    data: NormalizedData
    seriesOptions: LineSeriesOptions[]
    axis?: AxisOptions
    referenceLine?: ReferenceLine
    height: number
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

/** A continuous run of non-null points with its starting data index. */
type PointRun = {
    startIndex: number
    points: CurvePoint[]
}

const categoryReadout = (
    data: NormalizedData,
    categoryIndex: number,
    labels: ChartLabels,
    format: (value: number) => string
): string => {
    const parts = data.series.map(series => {
        const datum = series.data[categoryIndex]
        const name = series.label ?? labels.valueHeader
        const value = datum.value === null ? '—' : format(datum.value)
        const note = datum.note ? ` (${datum.note})` : ''
        return `${name}: ${value}${note}`
    })
    return `${data.categories[categoryIndex]} — ${parts.join(', ')}`
}

const buildRuns = (
    values: Array<number | null>,
    xAt: (index: number) => number,
    yAt: (value: number) => number
): PointRun[] => {
    const runs: PointRun[] = []
    let current: PointRun | null = null
    values.forEach((value, index) => {
        if (value === null) {
            current = null
            return
        }
        if (!current) {
            current = { startIndex: index, points: [] }
            runs.push(current)
        }
        current.points.push({ x: xAt(index), y: yAt(value) })
    })
    return runs
}

/** Splits a run's bezier segments into solid and dashed parts at a data index. */
const splitAtDash = (
    run: PointRun,
    segments: BezierSegment[],
    dashFromIndex: number | undefined
): { solid: BezierSegment[]; dashed: BezierSegment[] } => {
    if (dashFromIndex === undefined) return { solid: segments, dashed: [] }
    const boundary = Math.max(
        0,
        Math.min(segments.length, dashFromIndex - run.startIndex)
    )
    return {
        solid: segments.slice(0, boundary),
        dashed: segments.slice(boundary),
    }
}

export const LineChartSvg: FC<LineChartSvgProps> = ({
    data,
    seriesOptions,
    axis,
    referenceLine,
    height: minHeight,
    title,
    labels,
    valueFormatter,
    tickFormatter,
}) => {
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    // The height prop is a minimum; the chart grows with its card.
    const height = Math.max(minHeight, measuredHeight)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const referenceValue = parseValue(referenceLine?.value)
    const domainMin = Math.min(data.dataMin, referenceValue ?? data.dataMin)
    const domainMax = Math.max(data.dataMax, referenceValue ?? data.dataMax)
    const scale = useMemo(
        () => niceTicks(domainMin, domainMax, axis),
        [domainMin, domainMax, axis]
    )

    const tickLabels = scale.ticks.map(tickFormatter)
    const pointCount = data.categories.length
    const provisionalLeft = chartMargins(
        tickLabels,
        { rotate: false, maxChars: null },
        false,
        false
    ).left
    const labelMode = categoryLabelMode(
        data.categories,
        Math.max(1, (width - provisionalLeft) / Math.max(1, pointCount))
    )
    const margins = chartMargins(
        tickLabels,
        labelMode,
        Boolean(axis?.xLabel),
        Boolean(axis?.yLabel)
    )

    const innerWidth = Math.max(10, width - margins.left - margins.right)
    const innerHeight = Math.max(10, height - margins.top - margins.bottom)
    const toY = (value: number) =>
        valueToY(
            Math.max(scale.min, Math.min(scale.max, value)),
            scale,
            margins.top,
            innerHeight
        )
    const xAt = (index: number) =>
        pointCount > 1
            ? margins.left + (index * innerWidth) / (pointCount - 1)
            : margins.left + innerWidth / 2
    const stride = pointCount > 1 ? innerWidth / (pointCount - 1) : innerWidth
    const baselineValue = Math.max(scale.min, Math.min(scale.max, 0))
    const baselineY = toY(baselineValue)

    if (data.isEmpty) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

    const showTooltip = (categoryIndex: number) => setActiveIndex(categoryIndex)

    const activeValues =
        activeIndex === null
            ? []
            : data.series
                  .map((series, seriesIndex) => ({
                      seriesIndex,
                      value: series.data[activeIndex].value,
                  }))
                  .filter(
                      (
                          entry
                      ): entry is { seriesIndex: number; value: number } =>
                          entry.value !== null
                  )
    const tooltipTop = activeValues.length
        ? Math.min(...activeValues.map(entry => toY(entry.value)))
        : margins.top
    const tooltipLeft =
        activeIndex === null
            ? 0
            : Math.min(Math.max(xAt(activeIndex), 70), width - 70)

    return (
        <div
            className="pzh-chart-area"
            ref={ref}
            onMouseLeave={() => setActiveIndex(null)}
            style={{ minHeight }}>
            <svg
                className="pzh-svg"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                role="group"
                aria-label={
                    title ? `${title}: ${labels.chartRole}` : labels.chartRole
                }>
                {/* Grid + y ticks */}
                {scale.ticks.map((tick, index) => {
                    const y = toY(tick)
                    return (
                        <g key={tick}>
                            <line
                                x1={margins.left}
                                x2={margins.left + innerWidth}
                                y1={y}
                                y2={y}
                                stroke={
                                    tick === baselineValue
                                        ? 'var(--pzh-baseline)'
                                        : 'var(--pzh-grid)'
                                }
                                strokeWidth={1}
                            />
                            <text
                                className="pzh-tick-label"
                                x={margins.left - 8}
                                y={y + 4}
                                textAnchor="end">
                                {tickLabels[index]}
                            </text>
                        </g>
                    )
                })}

                {/* Area fills first, so every line draws above every fill */}
                {data.series.map((series, seriesIndex) => {
                    if (!seriesOptions[seriesIndex]?.area) return null
                    return buildRuns(
                        series.data.map(datum => datum.value),
                        xAt,
                        toY
                    ).map((run, runIndex) => {
                        const segments = monotoneSegments(run.points)
                        if (segments.length === 0) return null
                        return (
                            <path
                                key={`${seriesIndex}-${runIndex}`}
                                className="pzh-fade-in"
                                style={{ animationDelay: '0.35s' }}
                                d={segmentsToAreaPath(segments, baselineY)}
                                fill={markFill(series.fill)}
                                fillOpacity={0.12}
                                stroke="none"
                            />
                        )
                    })
                })}

                {/* Lines */}
                {data.series.map((series, seriesIndex) => {
                    const options = seriesOptions[seriesIndex]
                    return buildRuns(
                        series.data.map(datum => datum.value),
                        xAt,
                        toY
                    ).map((run, runIndex) => {
                        if (run.points.length === 1) {
                            return (
                                <circle
                                    key={`${seriesIndex}-${runIndex}`}
                                    className="pzh-pop"
                                    cx={run.points[0].x}
                                    cy={run.points[0].y}
                                    r={3.5}
                                    fill={series.fill}
                                />
                            )
                        }
                        const segments = monotoneSegments(run.points)
                        const { solid, dashed } = splitAtDash(
                            run,
                            segments,
                            options?.dashFromIndex
                        )
                        return (
                            <g key={`${seriesIndex}-${runIndex}`}>
                                {solid.length > 0 ? (
                                    <path
                                        className="pzh-line pzh-line-draw"
                                        pathLength={1}
                                        style={{
                                            animationDelay: `${seriesIndex * 0.15}s`,
                                        }}
                                        d={segmentsToPath(solid)}
                                        stroke={series.fill}
                                    />
                                ) : null}
                                {dashed.length > 0 ? (
                                    <path
                                        className="pzh-line pzh-fade-in"
                                        style={{
                                            animationDelay: `${0.7 + seriesIndex * 0.15}s`,
                                        }}
                                        d={segmentsToPath(dashed)}
                                        stroke={series.fill}
                                        strokeDasharray="6 6"
                                    />
                                ) : null}
                            </g>
                        )
                    })
                })}

                {/* Reference line with label */}
                {referenceValue !== null ? (
                    <g>
                        {referenceLine?.label ? (
                            <text
                                className="pzh-ref-label"
                                x={margins.left + innerWidth - 4}
                                y={toY(referenceValue) - 8}
                                textAnchor="end">
                                {referenceLine.label}
                            </text>
                        ) : null}
                        <line
                            x1={margins.left}
                            x2={margins.left + innerWidth}
                            y1={toY(referenceValue)}
                            y2={toY(referenceValue)}
                            stroke="var(--pzh-axis)"
                            strokeWidth={1.5}
                            strokeDasharray="3 4"
                        />
                    </g>
                ) : null}

                {/* Crosshair + dots for the active category */}
                {activeIndex !== null ? (
                    <g aria-hidden="true">
                        <line
                            x1={xAt(activeIndex)}
                            x2={xAt(activeIndex)}
                            y1={margins.top}
                            y2={margins.top + innerHeight}
                            stroke="var(--pzh-text-muted)"
                            strokeWidth={1}
                            strokeDasharray="2 3"
                        />
                        {activeValues.map(entry => (
                            <circle
                                key={entry.seriesIndex}
                                cx={xAt(activeIndex)}
                                cy={toY(entry.value)}
                                r={4.5}
                                fill={data.series[entry.seriesIndex].fill}
                                stroke="var(--pzh-bg)"
                                strokeWidth={1.5}
                            />
                        ))}
                    </g>
                ) : null}

                {/* Keyboard/hover hit strips per category */}
                {data.categories.map((category, categoryIndex) => (
                    <g
                        key={`${category}-${categoryIndex}`}
                        className={
                            activeIndex === categoryIndex
                                ? 'pzh-line-group pzh-active'
                                : 'pzh-line-group'
                        }
                        role="img"
                        tabIndex={0}
                        aria-label={categoryReadout(
                            data,
                            categoryIndex,
                            labels,
                            valueFormatter
                        )}
                        onMouseEnter={() => showTooltip(categoryIndex)}
                        onFocus={() => showTooltip(categoryIndex)}
                        onBlur={() => setActiveIndex(null)}
                        onKeyDown={event => {
                            if (event.key === 'Escape') setActiveIndex(null)
                        }}>
                        <title>
                            {categoryReadout(
                                data,
                                categoryIndex,
                                labels,
                                valueFormatter
                            )}
                        </title>
                        <rect
                            x={Math.max(
                                margins.left,
                                xAt(categoryIndex) - stride / 2
                            )}
                            y={margins.top}
                            width={Math.min(stride, innerWidth)}
                            height={innerHeight}
                            fill="transparent"
                        />
                    </g>
                ))}

                {/* Category labels */}
                {data.categories.map((category, categoryIndex) => {
                    const x = xAt(categoryIndex)
                    const y = margins.top + innerHeight + 16
                    const text = labelMode.maxChars
                        ? truncateLabel(category, labelMode.maxChars)
                        : category
                    return (
                        <text
                            key={`label-${categoryIndex}`}
                            className="pzh-category-label"
                            x={x}
                            y={y}
                            textAnchor={labelMode.rotate ? 'end' : 'middle'}
                            transform={
                                labelMode.rotate
                                    ? `rotate(-45 ${x} ${y})`
                                    : undefined
                            }>
                            {text}
                        </text>
                    )
                })}

                {/* Axis captions */}
                {axis?.xLabel ? (
                    <text
                        className="pzh-axis-caption"
                        x={margins.left + innerWidth / 2}
                        y={height - 6}
                        textAnchor="middle">
                        {axis.xLabel}
                    </text>
                ) : null}
                {axis?.yLabel ? (
                    <text
                        className="pzh-axis-caption"
                        x={12}
                        y={margins.top + innerHeight / 2}
                        textAnchor="middle"
                        transform={`rotate(-90 12 ${margins.top + innerHeight / 2})`}>
                        {axis.yLabel}
                    </text>
                ) : null}
            </svg>

            {activeIndex !== null ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: tooltipLeft,
                        top: tooltipTop,
                        transform: 'translate(-50%, calc(-100% - 12px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {data.categories[activeIndex]}
                    </p>
                    {data.series.map((series, seriesIndex) => {
                        const datum = series.data[activeIndex]
                        return (
                            <p className="pzh-tooltip-row" key={seriesIndex}>
                                <Swatch color={series.fill} />
                                <span>
                                    {series.label ?? labels.valueHeader}:{' '}
                                    <strong>
                                        {datum.value === null
                                            ? '—'
                                            : valueFormatter(datum.value)}
                                    </strong>
                                    {datum.note ? (
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            · {datum.note}
                                        </span>
                                    ) : null}
                                </span>
                            </p>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}
