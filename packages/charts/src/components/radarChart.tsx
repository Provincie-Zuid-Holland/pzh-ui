// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { polarPoint, slicePath } from '../lib/arc'
import { formatCompact, formatNumber } from '../lib/format'
import { normalizeData } from '../lib/normalize'
import { niceTicks } from '../lib/scale'
import { markFill } from '../tokens'
import { ChartLabels, RadarChartProps } from '../types'
import { categoryReadout } from './barChartSvg'
import { ChartCard } from './chartCard'
import { ChartLegend, legendEntries } from './chartLegend'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import { Swatch } from './swatch'

const LABEL_PAD = 26

/**
 * The radar (spider) card: categories as spokes around the center — six
 * categories make the classic hexagon — with one filled area polygon per
 * series. Missing values count as 0.
 *
 * ```tsx
 * <RadarChart
 *     title='Brede welvaart'
 *     categories={['Wonen', 'Werk', 'Milieu', 'Veiligheid', 'Gezondheid', 'Onderwijs']}
 *     series={[{ label: '2026', data: [7, 6, 5, 8, 7, 6] }]}
 * />
 * ```
 */
export const RadarChart: FC<RadarChartProps> = ({
    categories,
    series,
    title,
    subtitle,
    loading,
    axis,
    palette,
    valueFormatter = formatNumber,
    summary,
    initialViewMode,
    initialHighContrast,
    labels,
    height = 320,
    className,
    id,
    headingLevel,
}) => {
    const data = useMemo(
        () => normalizeData(categories, series),
        [categories, series]
    )
    const mergedLabels: ChartLabels = useMemo(
        () => ({ ...defaultChartLabels, chartRole: 'radardiagram', ...labels }),
        [labels]
    )
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const tokenOverrides = useMemo(() => {
        const effectivePalette = palette ? [...palette] : []
        series.forEach((entry, index) => {
            if (entry.color) effectivePalette[index] = entry.color
        })
        return {
            palette: effectivePalette.length > 0 ? effectivePalette : undefined,
        }
    }, [palette, series])

    const scale = useMemo(
        () => niceTicks(0, data.dataMax, axis),
        [data.dataMax, axis]
    )
    const tickFormatter =
        axis?.tickFormat === 'plain' ? formatNumber : formatCompact

    const count = data.categories.length
    const svgHeight = Math.max(height, measuredHeight)
    const radius = Math.max(60, Math.min(width, svgHeight) / 2 - LABEL_PAD - 8)
    const cx = width / 2
    const cy = svgHeight / 2
    const angleAt = (index: number) => (index * Math.PI * 2) / count
    const pointAt = (index: number, value: number) =>
        polarPoint(
            cx,
            cy,
            radius * Math.min(1, Math.max(0, value / scale.max)),
            angleAt(index)
        )

    const polygonPath = (values: number[]) =>
        values
            .map(
                (value, index) =>
                    `${index === 0 ? 'M' : 'L'}${pointAt(index, value).x},${pointAt(index, value).y}`
            )
            .join('') + 'Z'
    const ringPathAt = (fraction: number) =>
        data.categories
            .map(
                (_, index) =>
                    `${index === 0 ? 'M' : 'L'}${polarPoint(cx, cy, radius * fraction, angleAt(index)).x},${polarPoint(cx, cy, radius * fraction, angleAt(index)).y}`
            )
            .join('') + 'Z'

    if (count < 3 || data.isEmpty) {
        return (
            <ChartCard
                title={title}
                subtitle={subtitle}
                loading={loading}
                labels={mergedLabels}
                initialViewMode={initialViewMode}
                initialHighContrast={initialHighContrast}
                tokenOverrides={tokenOverrides}
                height={height}
                className={className}
                id={id}
                headingLevel={headingLevel}
                visual={<p className="pzh-empty">{mergedLabels.emptyState}</p>}
                textual={
                    <ChartTable
                        data={data}
                        title={title}
                        labels={mergedLabels}
                        valueFormatter={valueFormatter}
                    />
                }
                summary={
                    <ChartSummary
                        data={data}
                        summary={summary}
                        valueFormatter={valueFormatter}
                    />
                }
                skeleton={
                    <ChartSkeleton
                        variant="radar"
                        height={height}
                        loadingLabel={mergedLabels.loading}
                        hasTitle={Boolean(title)}
                        hasSubtitle={Boolean(subtitle)}
                        legendCount={series.length}
                    />
                }
            />
        )
    }

    return (
        <ChartCard
            title={title}
            subtitle={subtitle}
            loading={loading}
            labels={mergedLabels}
            initialViewMode={initialViewMode}
            initialHighContrast={initialHighContrast}
            tokenOverrides={tokenOverrides}
            height={height}
            className={className}
            id={id}
            headingLevel={headingLevel}
            visual={
                <div
                    className="pzh-chart-area"
                    ref={ref}
                    onMouseLeave={() => setActiveIndex(null)}
                    style={{ minHeight: height }}>
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
                        {/* Ring grid + spokes */}
                        {scale.ticks
                            .filter(tick => tick > 0)
                            .map(tick => (
                                <path
                                    key={tick}
                                    d={ringPathAt(tick / scale.max)}
                                    fill="none"
                                    stroke="var(--pzh-grid)"
                                    strokeWidth={1}
                                />
                            ))}
                        {data.categories.map((_, index) => {
                            const end = polarPoint(
                                cx,
                                cy,
                                radius,
                                angleAt(index)
                            )
                            return (
                                <line
                                    key={index}
                                    x1={cx}
                                    y1={cy}
                                    x2={end.x}
                                    y2={end.y}
                                    stroke="var(--pzh-grid)"
                                    strokeWidth={1}
                                />
                            )
                        })}

                        {/* Series polygons */}
                        {data.series.map((entry, seriesIndex) => {
                            const values = entry.data.map(
                                datum => datum.value ?? 0
                            )
                            return (
                                <g key={seriesIndex}>
                                    <path
                                        className="pzh-fade-in"
                                        style={{
                                            animationDelay: `${seriesIndex * 120}ms`,
                                        }}
                                        d={polygonPath(values)}
                                        fill={markFill(entry.fill)}
                                        fillOpacity={0.15}
                                        stroke="none"
                                    />
                                    <path
                                        className="pzh-line pzh-fade-in"
                                        style={{
                                            animationDelay: `${seriesIndex * 120}ms`,
                                        }}
                                        d={polygonPath(values)}
                                        stroke={entry.fill}
                                    />
                                </g>
                            )
                        })}

                        {/* Active spoke emphasis */}
                        {activeIndex !== null ? (
                            <g aria-hidden="true">
                                <line
                                    x1={cx}
                                    y1={cy}
                                    x2={
                                        polarPoint(
                                            cx,
                                            cy,
                                            radius,
                                            angleAt(activeIndex)
                                        ).x
                                    }
                                    y2={
                                        polarPoint(
                                            cx,
                                            cy,
                                            radius,
                                            angleAt(activeIndex)
                                        ).y
                                    }
                                    stroke="var(--pzh-text-muted)"
                                    strokeWidth={1}
                                    strokeDasharray="2 3"
                                />
                                {data.series.map((entry, seriesIndex) => {
                                    const value = entry.data[activeIndex].value
                                    if (value === null) return null
                                    const point = pointAt(activeIndex, value)
                                    return (
                                        <circle
                                            key={seriesIndex}
                                            cx={point.x}
                                            cy={point.y}
                                            r={4.5}
                                            fill={entry.fill}
                                            stroke="var(--pzh-bg)"
                                            strokeWidth={1.5}
                                        />
                                    )
                                })}
                            </g>
                        ) : null}

                        {/* Spoke hit wedges + labels */}
                        {data.categories.map((category, index) => {
                            const half = Math.PI / count
                            const labelPoint = polarPoint(
                                cx,
                                cy,
                                radius + 14,
                                angleAt(index)
                            )
                            const cos = Math.cos(angleAt(index))
                            const sin = Math.sin(angleAt(index))
                            return (
                                <g
                                    key={`${category}-${index}`}
                                    className={
                                        activeIndex === index
                                            ? 'pzh-line-group pzh-active'
                                            : 'pzh-line-group'
                                    }
                                    role="img"
                                    tabIndex={0}
                                    aria-label={categoryReadout(
                                        data,
                                        index,
                                        mergedLabels,
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
                                        {categoryReadout(
                                            data,
                                            index,
                                            mergedLabels,
                                            valueFormatter
                                        )}
                                    </title>
                                    <path
                                        className="pzh-hit"
                                        d={slicePath(
                                            cx,
                                            cy,
                                            radius + LABEL_PAD,
                                            angleAt(index) - half,
                                            angleAt(index) + half
                                        )}
                                        fill="transparent"
                                    />
                                    <text
                                        className="pzh-category-label"
                                        x={labelPoint.x}
                                        y={
                                            labelPoint.y +
                                            (cos < -0.3
                                                ? 10
                                                : cos > 0.3
                                                  ? -2
                                                  : 4)
                                        }
                                        textAnchor={
                                            Math.abs(sin) < 0.3
                                                ? 'middle'
                                                : sin > 0
                                                  ? 'start'
                                                  : 'end'
                                        }>
                                        {category}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Scale reference on the top spoke */}
                        <text
                            className="pzh-tick-label"
                            x={cx + 6}
                            y={cy - radius + 4}
                            textAnchor="start">
                            {tickFormatter(scale.max)}
                        </text>
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
                                            radius * 0.75,
                                            angleAt(activeIndex)
                                        ).x,
                                        70
                                    ),
                                    width - 70
                                ),
                                top: polarPoint(
                                    cx,
                                    cy,
                                    radius * 0.75,
                                    angleAt(activeIndex)
                                ).y,
                                transform: 'translate(-50%, calc(-100% - 8px))',
                            }}>
                            <p className="pzh-tooltip-title">
                                {data.categories[activeIndex]}
                            </p>
                            {data.series.map((entry, seriesIndex) => {
                                const datum = entry.data[activeIndex]
                                return (
                                    <p
                                        className="pzh-tooltip-row"
                                        key={seriesIndex}>
                                        <Swatch color={entry.fill} />
                                        <span>
                                            {entry.label ??
                                                mergedLabels.valueHeader}
                                            :{' '}
                                            <strong>
                                                {datum.value === null
                                                    ? '—'
                                                    : valueFormatter(
                                                          datum.value
                                                      )}
                                            </strong>
                                        </span>
                                    </p>
                                )
                            })}
                        </div>
                    ) : null}
                </div>
            }
            textual={
                <ChartTable
                    data={data}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                    categoryHeader={axis?.xLabel}
                />
            }
            summary={
                <ChartSummary
                    data={data}
                    summary={summary}
                    valueFormatter={valueFormatter}
                />
            }
            legend={<ChartLegend data={data} labels={mergedLabels} />}
            skeleton={
                <ChartSkeleton
                    variant="radar"
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    legendCount={legendEntries(data, mergedLabels).length}
                />
            }
        />
    )
}
