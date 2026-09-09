// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { estimateTextWidth } from '../lib/format'
import { niceTicks } from '../lib/scale'
import { AxisOptions, ChartLabels } from '../types'
import { rangeReadout, RangeRow } from './rangeViews'
import { Swatch } from './swatch'

type GanttChartSvgProps = {
    rows: RangeRow[]
    axis?: AxisOptions
    height: number
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

/**
 * Every row gets exactly this stride, no matter how many rows the chart has —
 * cards grow with their row count, so two gantts side by side always show
 * identical spacing. The row block (with its grid and axis) centers in any
 * extra height a stretched card provides.
 */
const ROW_STRIDE = 48
const MAX_BAR_HEIGHT = 18

export const GanttChartSvg: FC<GanttChartSvgProps> = ({
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
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const dataMin = rows.length ? Math.min(...rows.map(row => row.start)) : 0
    const dataMax = rows.length ? Math.max(...rows.map(row => row.end)) : 0
    const scale = useMemo(
        () => niceTicks(dataMin, dataMax, axis),
        [dataMin, dataMax, axis]
    )
    const tickLabels = scale.ticks.map(tickFormatter)

    const labelWidth = rows.reduce(
        (max, row) => Math.max(max, estimateTextWidth(row.label, 12)),
        0
    )
    const margins = {
        top: 8,
        right: 8,
        bottom: 24 + (axis?.xLabel ? 20 : 0),
        left: Math.ceil(labelWidth) + 16,
    }

    // The card grows with its rows so the stride never compresses.
    const rowsHeight = rows.length * ROW_STRIDE
    const contentMinHeight = Math.max(
        minHeight,
        rowsHeight + margins.top + margins.bottom
    )
    const height = Math.max(contentMinHeight, measuredHeight)

    const innerWidth = Math.max(10, width - margins.left - margins.right)
    const innerHeight = Math.max(10, height - margins.top - margins.bottom)
    const rowsTop = margins.top + Math.max(0, (innerHeight - rowsHeight) / 2)
    const rowStride = ROW_STRIDE
    const barHeight = Math.min(MAX_BAR_HEIGHT, rowStride * 0.55)

    const toX = (value: number) =>
        margins.left +
        innerWidth *
            ((Math.max(scale.min, Math.min(scale.max, value)) - scale.min) /
                (scale.max - scale.min))
    const zeroInDomain = scale.min < 0 && scale.max > 0

    if (rows.length === 0) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

    const rowCenter = (index: number) =>
        rowsTop + index * rowStride + rowStride / 2

    return (
        <div
            className="pzh-chart-area"
            ref={ref}
            onMouseLeave={() => setActiveIndex(null)}
            style={{ minHeight: contentMinHeight }}>
            <svg
                className="pzh-svg"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                role="group"
                aria-label={
                    title ? `${title}: ${labels.chartRole}` : labels.chartRole
                }>
                {/* Vertical grid + x ticks */}
                {scale.ticks.map((tick, index) => {
                    const x = toX(tick)
                    return (
                        <g key={tick}>
                            <line
                                x1={x}
                                x2={x}
                                y1={rowsTop}
                                y2={rowsTop + rowsHeight}
                                stroke={
                                    zeroInDomain && tick === 0
                                        ? 'var(--pzh-baseline)'
                                        : 'var(--pzh-grid)'
                                }
                                strokeWidth={1}
                            />
                            <text
                                className="pzh-tick-label"
                                x={x}
                                y={rowsTop + rowsHeight + 16}
                                textAnchor="middle">
                                {tickLabels[index]}
                            </text>
                        </g>
                    )
                })}

                {/* Rows: label + range pill */}
                {rows.map((row, rowIndex) => {
                    const y = rowCenter(rowIndex)
                    const startX = toX(row.start)
                    const endX = toX(row.end)
                    const pillWidth = Math.max(barHeight, endX - startX)
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
                            {/* Full-row hit target */}
                            <rect
                                x={0}
                                y={y - rowStride / 2}
                                width={width}
                                height={rowStride}
                                fill="transparent"
                            />
                            <text
                                className="pzh-category-label"
                                x={margins.left - 12}
                                y={y + 4}
                                textAnchor="end">
                                {row.label}
                            </text>
                            <rect
                                className="pzh-bar"
                                x={startX}
                                y={y - barHeight / 2}
                                width={pillWidth}
                                height={barHeight}
                                rx={barHeight / 2}
                                style={
                                    {
                                        '--pzh-bar-fill': row.highlight
                                            ? 'var(--pzh-fill-highlight)'
                                            : 'var(--pzh-fill-bar)',
                                        animationDelay: `${rowIndex * 25}ms`,
                                    } as CSSProperties
                                }
                            />
                        </g>
                    )
                })}

                {/* Axis caption */}
                {axis?.xLabel ? (
                    <text
                        className="pzh-axis-caption"
                        x={margins.left + innerWidth / 2}
                        y={rowsTop + rowsHeight + 38}
                        textAnchor="middle">
                        {axis.xLabel}
                    </text>
                ) : null}
            </svg>

            {activeIndex !== null ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: Math.min(
                            Math.max(
                                (toX(rows[activeIndex].start) +
                                    toX(rows[activeIndex].end)) /
                                    2,
                                70
                            ),
                            width - 70
                        ),
                        top: rowCenter(activeIndex) - barHeight / 2,
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
