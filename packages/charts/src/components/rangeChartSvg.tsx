// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { estimateTextWidth } from '../lib/format'
import { chartMargins } from '../lib/layout'
import { niceTicks, valueToY } from '../lib/scale'
import { AxisOptions, ChartLabels } from '../types'
import { rangeReadout, RangeRow } from './rangeViews'
import { Swatch } from './swatch'

type RangeChartSvgProps = {
    rows: RangeRow[]
    axis?: AxisOptions
    height: number
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

const MAX_PILL_WIDTH = 14
const PILL_GAP_RATIO = 0.4

export const RangeChartSvg: FC<RangeChartSvgProps> = ({
    rows,
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

    const dataMin = rows.length ? Math.min(...rows.map(row => row.start)) : 0
    const dataMax = rows.length ? Math.max(...rows.map(row => row.end)) : 0
    const scale = useMemo(
        () => niceTicks(dataMin, dataMax, axis),
        [dataMin, dataMax, axis]
    )
    const tickLabels = scale.ticks.map(tickFormatter)
    const margins = chartMargins(
        tickLabels,
        { rotate: false, maxChars: null },
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

    const stride = rows.length > 0 ? innerWidth / rows.length : innerWidth
    const pillWidth = Math.min(
        MAX_PILL_WIDTH,
        Math.max(3, stride * (1 - PILL_GAP_RATIO))
    )
    const pillX = (index: number) =>
        margins.left + index * stride + (stride - pillWidth) / 2

    // Thin category labels so they never collide (the mock labels every few pills).
    const widestLabel = rows.reduce(
        (max, row) => Math.max(max, estimateTextWidth(row.label, 12)),
        0
    )
    const labelEvery = Math.max(1, Math.ceil((widestLabel + 12) / stride))

    if (rows.length === 0) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

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

                {/* Range pills per category */}
                {rows.map((row, rowIndex) => {
                    const top = toY(row.end)
                    const bottom = toY(row.start)
                    const pillHeight = Math.max(pillWidth, bottom - top)
                    return (
                        <g
                            key={`${row.label}-${rowIndex}`}
                            className={
                                activeIndex === rowIndex
                                    ? 'pzh-bar-group pzh-active'
                                    : 'pzh-bar-group'
                            }
                            role="img"
                            tabIndex={0}
                            aria-label={rangeReadout(
                                row,
                                labels,
                                valueFormatter
                            )}
                            onMouseEnter={() => setActiveIndex(rowIndex)}
                            onFocus={() => setActiveIndex(rowIndex)}
                            onBlur={() => setActiveIndex(null)}
                            onKeyDown={event => {
                                if (event.key === 'Escape') setActiveIndex(null)
                            }}>
                            <title>
                                {rangeReadout(row, labels, valueFormatter)}
                            </title>
                            {/* Full-column hit target */}
                            <rect
                                x={margins.left + rowIndex * stride}
                                y={margins.top}
                                width={stride}
                                height={innerHeight}
                                fill="transparent"
                            />
                            <rect
                                className="pzh-bar"
                                x={pillX(rowIndex)}
                                y={top}
                                width={pillWidth}
                                height={pillHeight}
                                rx={pillWidth / 2}
                                style={
                                    {
                                        '--pzh-bar-fill': row.highlight
                                            ? 'var(--pzh-fill-highlight)'
                                            : 'var(--pzh-fill-bar)',
                                        animationDelay: `${rowIndex * 12}ms`,
                                    } as CSSProperties
                                }
                            />
                        </g>
                    )
                })}

                {/* Thinned category labels */}
                {rows.map((row, rowIndex) =>
                    rowIndex % labelEvery === 0 ? (
                        <text
                            key={`label-${rowIndex}`}
                            className="pzh-category-label"
                            x={pillX(rowIndex) + pillWidth / 2}
                            y={margins.top + innerHeight + 16}
                            textAnchor="middle">
                            {row.label}
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

            {activeIndex !== null ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: Math.min(
                            Math.max(pillX(activeIndex) + pillWidth / 2, 70),
                            width - 70
                        ),
                        top: toY(rows[activeIndex].end),
                        transform: 'translate(-50%, calc(-100% - 8px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {rows[activeIndex].label}
                    </p>
                    <p className="pzh-tooltip-row">
                        <Swatch
                            color={
                                rows[activeIndex].highlight
                                    ? 'var(--pzh-highlight)'
                                    : 'var(--pzh-bar)'
                            }
                        />
                        <span>
                            <strong>
                                {valueFormatter(rows[activeIndex].start)}{' '}
                                {labels.rangeTo}{' '}
                                {valueFormatter(rows[activeIndex].end)}
                            </strong>
                            {rows[activeIndex].note ? (
                                <span className="pzh-tooltip-note">
                                    {' '}
                                    · {rows[activeIndex].note}
                                </span>
                            ) : null}
                        </span>
                    </p>
                </div>
            ) : null}
        </div>
    )
}
