// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { HistogramBin } from '../lib/bins'
import { chartMargins } from '../lib/layout'
import { niceTicks, valueToY } from '../lib/scale'
import { markFill, sequentialVar } from '../tokens'
import { AxisOptions, ChartLabels } from '../types'
import { Swatch } from './swatch'

type HistogramChartSvgProps = {
    bins: HistogramBin[]
    axis?: AxisOptions
    height: number
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
    /** Bar fill per bin; defaults to the sequential ramp by fullness. */
    binFill?: (bin: HistogramBin, ratio: number) => string
    /** Axis label per bin; defaults to the formatted lower edge. */
    binTickLabel?: (bin: HistogramBin) => string
}

const BIN_GAP = 3

export const binReadout = (
    bin: HistogramBin,
    labels: ChartLabels,
    format: (value: number) => string
): string => `${bin.label} — ${labels.countLabel}: ${format(bin.count)}`

export const HistogramChartSvg: FC<HistogramChartSvgProps> = ({
    bins,
    axis,
    height: minHeight,
    title,
    labels,
    valueFormatter,
    tickFormatter,
    binFill,
    binTickLabel,
}) => {
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const height = Math.max(minHeight, measuredHeight)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const maxCount = bins.reduce((max, bin) => Math.max(max, bin.count), 0)
    const scale = useMemo(() => niceTicks(0, maxCount, axis), [maxCount, axis])
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
        valueToY(value, scale, margins.top, innerHeight)
    const baselineY = toY(0)

    const barWidth =
        bins.length > 0
            ? Math.max(
                  1.5,
                  (innerWidth - (bins.length - 1) * BIN_GAP) / bins.length
              )
            : innerWidth
    const barX = (index: number) => margins.left + index * (barWidth + BIN_GAP)
    // Label roughly six bin edges to keep the axis readable at any bin count.
    const edgeLabelEvery = Math.max(1, Math.ceil(bins.length / 6))
    const fillFor = (bin: HistogramBin) =>
        (
            binFill ??
            ((entry: HistogramBin, ratio: number) => sequentialVar(ratio))
        )(bin, maxCount > 0 ? bin.count / maxCount : 0)
    const tickLabelFor =
        binTickLabel ?? ((bin: HistogramBin) => valueFormatter(bin.x0))

    if (bins.length === 0) {
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
                                stroke={
                                    tick === 0
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

                {/* Bins, colored by count on the sequential ramp */}
                {bins.map((bin, binIndex) => {
                    const barHeight = Math.max(
                        bin.count > 0 ? 2 : 0,
                        baselineY - toY(bin.count)
                    )
                    return (
                        <g
                            key={binIndex}
                            className={
                                activeIndex === binIndex
                                    ? 'pzh-bar-group pzh-active'
                                    : 'pzh-bar-group'
                            }
                            role="img"
                            tabIndex={0}
                            aria-label={binReadout(bin, labels, valueFormatter)}
                            onMouseEnter={() => setActiveIndex(binIndex)}
                            onFocus={() => setActiveIndex(binIndex)}
                            onBlur={() => setActiveIndex(null)}
                            onKeyDown={event => {
                                if (event.key === 'Escape') setActiveIndex(null)
                            }}>
                            <title>
                                {binReadout(bin, labels, valueFormatter)}
                            </title>
                            <rect
                                x={barX(binIndex)}
                                y={margins.top}
                                width={barWidth + BIN_GAP}
                                height={innerHeight}
                                fill="transparent"
                            />
                            {barHeight > 0 ? (
                                <rect
                                    className="pzh-bar"
                                    x={barX(binIndex)}
                                    y={baselineY - barHeight}
                                    width={barWidth}
                                    height={barHeight}
                                    rx={Math.min(barWidth / 2, 3)}
                                    style={
                                        {
                                            '--pzh-bar-fill': markFill(
                                                fillFor(bin)
                                            ),
                                            animationDelay: `${binIndex * 12}ms`,
                                        } as CSSProperties
                                    }
                                />
                            ) : null}
                        </g>
                    )
                })}

                {/* Sparse bin-edge labels */}
                {bins.map((bin, binIndex) =>
                    binIndex % edgeLabelEvery === 0 ? (
                        <text
                            key={`edge-${binIndex}`}
                            className="pzh-category-label"
                            x={barX(binIndex)}
                            y={margins.top + innerHeight + 16}
                            textAnchor="middle">
                            {tickLabelFor(bin)}
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
                            Math.max(barX(activeIndex) + barWidth / 2, 70),
                            width - 70
                        ),
                        top: toY(bins[activeIndex].count),
                        transform: 'translate(-50%, calc(-100% - 8px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {bins[activeIndex].label}
                    </p>
                    <p className="pzh-tooltip-row">
                        <Swatch color={fillFor(bins[activeIndex])} />
                        <span>
                            {labels.countLabel}:{' '}
                            <strong>
                                {valueFormatter(bins[activeIndex].count)}
                            </strong>
                        </span>
                    </p>
                </div>
            ) : null}
        </div>
    )
}
