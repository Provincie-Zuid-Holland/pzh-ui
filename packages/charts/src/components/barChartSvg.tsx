// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { truncateLabel } from '../lib/format'
import {
    barLayout,
    barPath,
    categoryLabelMode,
    chartMargins,
    stackSegments,
} from '../lib/layout'
import { NormalizedData } from '../lib/normalize'
import { niceTicks, valueToY } from '../lib/scale'
import { markFill } from '../tokens'
import { AxisOptions, ChartLabels } from '../types'
import { Swatch } from './swatch'

type BarChartSvgProps = {
    data: NormalizedData
    axis?: AxisOptions
    height: number
    title?: string
    stacked?: boolean
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

type TooltipState = {
    categoryIndex: number
    left: number
    top: number
}

export const categoryTotal = (
    data: NormalizedData,
    categoryIndex: number
): number =>
    data.series.reduce((total, series) => {
        const value = series.data[categoryIndex].value
        return value !== null && value > 0 ? total + value : total
    }, 0)

export const categoryReadout = (
    data: NormalizedData,
    categoryIndex: number,
    labels: ChartLabels,
    format: (value: number) => string,
    withTotal = false
): string => {
    const parts = data.series.map(series => {
        const datum = series.data[categoryIndex]
        const name = series.label ?? labels.valueHeader
        const value = datum.value === null ? '—' : format(datum.value)
        const note = datum.note ? ` (${datum.note})` : ''
        return `${name}: ${value}${note}`
    })
    if (withTotal)
        parts.push(
            `${labels.totalLabel}: ${format(categoryTotal(data, categoryIndex))}`
        )
    return `${data.categories[categoryIndex]} — ${parts.join(', ')}`
}

export const BarChartSvg: FC<BarChartSvgProps> = ({
    data,
    axis,
    height: minHeight,
    title,
    stacked = false,
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
    const [tooltip, setTooltip] = useState<TooltipState | null>(null)

    const domainMin = stacked ? 0 : data.dataMin
    const domainMax = stacked ? data.stackedMax : data.dataMax
    const scale = useMemo(
        () => niceTicks(domainMin, domainMax, axis),
        [domainMin, domainMax, axis]
    )

    const tickLabels = scale.ticks.map(tickFormatter)
    const provisionalLeft = chartMargins(
        tickLabels,
        { rotate: false, maxChars: null },
        false,
        false
    ).left
    const labelMode = categoryLabelMode(
        data.categories,
        Math.max(
            1,
            (width - provisionalLeft - 8) / Math.max(1, data.categories.length)
        )
    )
    const margins = chartMargins(
        tickLabels,
        labelMode,
        Boolean(axis?.xLabel),
        Boolean(axis?.yLabel)
    )

    const innerWidth = Math.max(10, width - margins.left - margins.right)
    const innerHeight = Math.max(10, height - margins.top - margins.bottom)
    const layout = barLayout(
        innerWidth,
        data.categories.length,
        stacked ? 1 : data.series.length
    )
    const toY = (value: number) =>
        valueToY(value, scale, margins.top, innerHeight)
    const baselineValue = Math.max(scale.min, Math.min(scale.max, 0))
    const baselineY = valueToY(baselineValue, scale, margins.top, innerHeight)

    if (data.isEmpty) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

    const showTooltip = (categoryIndex: number) => {
        const slotX = margins.left + categoryIndex * layout.slotWidth
        const topValues = data.series
            .map(series => series.data[categoryIndex].value)
            .filter((value): value is number => value !== null)
        const highest = stacked
            ? Math.min(categoryTotal(data, categoryIndex), scale.max)
            : topValues.length
              ? Math.max(...topValues, baselineValue)
              : baselineValue
        setTooltip({
            categoryIndex,
            left: Math.min(
                Math.max(slotX + layout.groupWidth / 2, 70),
                width - 70
            ),
            top: toY(Math.min(Math.max(highest, scale.min), scale.max)),
        })
    }

    return (
        <div
            className="pzh-chart-area"
            ref={ref}
            onMouseLeave={() => setTooltip(null)}
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
                    const y = valueToY(tick, scale, margins.top, innerHeight)
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

                {/* Bars per category */}
                {data.categories.map((category, categoryIndex) => {
                    const slotX =
                        margins.left + categoryIndex * layout.slotWidth
                    return (
                        <g
                            key={`${category}-${categoryIndex}`}
                            className={
                                tooltip?.categoryIndex === categoryIndex
                                    ? 'pzh-bar-group pzh-active'
                                    : 'pzh-bar-group'
                            }
                            role="img"
                            tabIndex={0}
                            aria-label={categoryReadout(
                                data,
                                categoryIndex,
                                labels,
                                valueFormatter,
                                stacked && data.isGrouped
                            )}
                            onMouseEnter={() => showTooltip(categoryIndex)}
                            onFocus={() => showTooltip(categoryIndex)}
                            onBlur={() => setTooltip(null)}
                            onKeyDown={event => {
                                if (event.key === 'Escape') setTooltip(null)
                            }}>
                            <title>
                                {categoryReadout(
                                    data,
                                    categoryIndex,
                                    labels,
                                    valueFormatter,
                                    stacked && data.isGrouped
                                )}
                            </title>
                            {/* Full-slot hit target, larger than the bars themselves */}
                            <rect
                                x={slotX}
                                y={margins.top}
                                width={layout.groupWidth + layout.categoryGap}
                                height={innerHeight}
                                fill="transparent"
                            />
                            {stacked
                                ? stackSegments(
                                      data.series.map(
                                          series =>
                                              series.data[categoryIndex].value
                                      ),
                                      toY
                                  ).map((segment, seriesIndex) => {
                                      if (!segment) return null
                                      const series = data.series[seriesIndex]
                                      return (
                                          <rect
                                              key={seriesIndex}
                                              className="pzh-bar"
                                              x={slotX + layout.offsets[0]}
                                              y={segment.y}
                                              width={layout.barWidth}
                                              height={segment.height}
                                              rx={Math.min(
                                                  4,
                                                  segment.height / 2,
                                                  layout.barWidth / 2
                                              )}
                                              style={
                                                  {
                                                      '--pzh-bar-fill':
                                                          markFill(series.fill),
                                                      animationDelay: `${categoryIndex * 25}ms`,
                                                  } as CSSProperties
                                              }
                                          />
                                      )
                                  })
                                : data.series.map((series, seriesIndex) => {
                                      const datum = series.data[categoryIndex]
                                      if (datum.value === null) return null
                                      const clamped = Math.max(
                                          scale.min,
                                          Math.min(scale.max, datum.value)
                                      )
                                      const y = toY(clamped)
                                      const path = barPath(
                                          slotX + layout.offsets[seriesIndex],
                                          baselineY,
                                          y,
                                          layout.barWidth
                                      )
                                      if (!path) return null
                                      return (
                                          <path
                                              key={seriesIndex}
                                              className="pzh-bar"
                                              d={path}
                                              style={
                                                  {
                                                      '--pzh-bar-fill':
                                                          markFill(
                                                              datum.highlight
                                                                  ? 'var(--pzh-highlight)'
                                                                  : series.fill
                                                          ),
                                                      animationDelay: `${categoryIndex * 25}ms`,
                                                  } as CSSProperties
                                              }
                                          />
                                      )
                                  })}
                        </g>
                    )
                })}

                {/* Category labels */}
                {data.categories.map((category, categoryIndex) => {
                    const x =
                        margins.left +
                        categoryIndex * layout.slotWidth +
                        layout.groupWidth / 2
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

            {tooltip ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: tooltip.left,
                        top: tooltip.top,
                        transform: 'translate(-50%, calc(-100% - 8px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {data.categories[tooltip.categoryIndex]}
                    </p>
                    {data.series.map((series, seriesIndex) => {
                        const datum = series.data[tooltip.categoryIndex]
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
                    {stacked && data.isGrouped ? (
                        <p className="pzh-tooltip-row">
                            <Swatch color={'transparent'} />
                            <span>
                                {labels.totalLabel}:{' '}
                                <strong>
                                    {valueFormatter(
                                        categoryTotal(
                                            data,
                                            tooltip.categoryIndex
                                        )
                                    )}
                                </strong>
                            </span>
                        </p>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
