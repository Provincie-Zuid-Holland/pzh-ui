// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { estimateTextWidth, truncateLabel } from '../lib/format'
import { categoryLabelMode, chartMargins } from '../lib/layout'
import { NormalizedData } from '../lib/normalize'
import { linearRegression, niceTicks, valueToY } from '../lib/scale'
import { markFill } from '../tokens'
import { AxisOptions, ChartLabels } from '../types'
import { Swatch } from './swatch'

type ScatterChartSvgProps = {
    data: NormalizedData
    trendLine: boolean
    axis?: AxisOptions
    height: number
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

const DOT_RADIUS = 6

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

export const ScatterChartSvg: FC<ScatterChartSvgProps> = ({
    data,
    trendLine,
    axis,
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
    const height = Math.max(minHeight, measuredHeight)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const scale = useMemo(
        () => niceTicks(data.dataMin, data.dataMax, axis),
        [data.dataMin, data.dataMax, axis]
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

    // Thin category labels when they would collide (times every 30 min etc.).
    const widestLabel = data.categories.reduce(
        (max, label) => Math.max(max, estimateTextWidth(label, 12)),
        0
    )
    const labelEvery = labelMode.rotate
        ? 1
        : Math.max(1, Math.ceil((widestLabel + 12) / stride))

    if (data.isEmpty) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

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
                                stroke="var(--pzh-grid)"
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

                {/* Trend lines under the dots */}
                {trendLine
                    ? data.series.map((series, seriesIndex) => {
                          const points = series.data.flatMap((datum, index) =>
                              datum.value === null
                                  ? []
                                  : [{ x: index, y: datum.value }]
                          )
                          const fit = linearRegression(points)
                          if (!fit) return null
                          const yStart = fit.intercept
                          const yEnd =
                              fit.slope * (pointCount - 1) + fit.intercept
                          return (
                              <line
                                  key={seriesIndex}
                                  className="pzh-fade-in"
                                  style={{ animationDelay: '0.5s' }}
                                  x1={xAt(0)}
                                  y1={toY(yStart)}
                                  x2={xAt(pointCount - 1)}
                                  y2={toY(yEnd)}
                                  stroke={series.fill}
                                  strokeWidth={2.5}
                                  strokeLinecap="round"
                              />
                          )
                      })
                    : null}

                {/* Dots */}
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
                        onMouseEnter={() => setActiveIndex(categoryIndex)}
                        onFocus={() => setActiveIndex(categoryIndex)}
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
                        {data.series.map((series, seriesIndex) => {
                            const datum = series.data[categoryIndex]
                            if (datum.value === null) return null
                            return (
                                <circle
                                    key={seriesIndex}
                                    className="pzh-pop"
                                    style={{
                                        animationDelay: `${categoryIndex * 25}ms`,
                                    }}
                                    cx={xAt(categoryIndex)}
                                    cy={toY(datum.value)}
                                    r={
                                        activeIndex === categoryIndex
                                            ? DOT_RADIUS + 1.5
                                            : DOT_RADIUS
                                    }
                                    fill={markFill(
                                        datum.highlight
                                            ? 'var(--pzh-highlight)'
                                            : series.fill
                                    )}
                                    stroke="var(--pzh-bg)"
                                    strokeWidth={1.5}
                                />
                            )
                        })}
                    </g>
                ))}

                {/* Thinned category labels */}
                {data.categories.map((category, categoryIndex) =>
                    categoryIndex % labelEvery === 0 ? (
                        <text
                            key={`label-${categoryIndex}`}
                            className="pzh-category-label"
                            x={xAt(categoryIndex)}
                            y={margins.top + innerHeight + 16}
                            textAnchor={labelMode.rotate ? 'end' : 'middle'}
                            transform={
                                labelMode.rotate
                                    ? `rotate(-45 ${xAt(categoryIndex)} ${margins.top + innerHeight + 16})`
                                    : undefined
                            }>
                            {labelMode.maxChars
                                ? truncateLabel(category, labelMode.maxChars)
                                : category}
                        </text>
                    ) : null
                )}

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

            {activeIndex !== null && activeValues.length > 0 ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: Math.min(
                            Math.max(xAt(activeIndex), 70),
                            width - 70
                        ),
                        top: tooltipTop,
                        transform: 'translate(-50%, calc(-100% - 12px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {data.categories[activeIndex]}
                    </p>
                    {data.series.map((series, seriesIndex) => {
                        const datum = series.data[activeIndex]
                        if (datum.value === null) return null
                        return (
                            <p className="pzh-tooltip-row" key={seriesIndex}>
                                <Swatch
                                    color={
                                        datum.highlight
                                            ? 'var(--pzh-highlight)'
                                            : series.fill
                                    }
                                />
                                <span>
                                    {series.label ?? labels.valueHeader}:{' '}
                                    <strong>
                                        {valueFormatter(datum.value)}
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
