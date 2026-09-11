// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { formatNumber, truncateLabel } from '../lib/format'
import { packCircles } from '../lib/pack'
import {
    defaultTokens,
    markFill,
    MAX_SERIES,
    patternStrokeFor,
} from '../tokens'
import { BubbleChartProps, ChartLabels } from '../types'
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
    usePartItems,
} from './partsViews'
import { Swatch } from './swatch'

/** Bubbles below this radius (px) carry no inline text — the tooltip covers them. */
const LABEL_MIN_RADIUS = 34

/**
 * The bubble card: one packed circle per part, area proportional to value,
 * the largest at the center. Labels render inside bubbles that are big
 * enough; every bubble keeps a focus readout and hover tooltip.
 *
 * ```tsx
 * <BubbleChart title='Bedrijven per sector' items={[{ label: 'IT', value: 412 }, { label: 'Zorg', value: 244 }]} />
 * ```
 */
export const BubbleChart: FC<BubbleChartProps> = ({
    items,
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
    height = 320,
    className,
    id,
    headingLevel,
}) => {
    const parts = usePartItems(items, valueFormatter)
    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            chartRole: 'bubbeldiagram',
            ...labels,
        }),
        [labels]
    )
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const svgHeight = Math.max(
        height - (headline ? 72 : 0),
        measuredHeight - (headline ? 72 : 0),
        200
    )

    // Pack in abstract units, then scale the cluster to fit the card.
    const bubbles = useMemo(() => {
        const packed = packCircles(parts.map(part => part.value))
        if (packed.length === 0 || width === 0) return []
        const minX = Math.min(...packed.map(circle => circle.x - circle.r))
        const maxX = Math.max(...packed.map(circle => circle.x + circle.r))
        const minY = Math.min(...packed.map(circle => circle.y - circle.r))
        const maxY = Math.max(...packed.map(circle => circle.y + circle.r))
        const scale = Math.min(
            (width - 16) / (maxX - minX),
            (svgHeight - 16) / (maxY - minY)
        )
        const offsetX = width / 2 - ((minX + maxX) / 2) * scale
        const offsetY = svgHeight / 2 - ((minY + maxY) / 2) * scale
        return packed.map(circle => ({
            part: parts[circle.index],
            x: circle.x * scale + offsetX,
            y: circle.y * scale + offsetY,
            r: circle.r * scale,
        }))
    }, [parts, width, svgHeight])

    // Inline label color needs the resolved hex (fills are usually var() refs).
    const textColorFor = (fill: string): string => {
        const series = fill.match(/--pzh-series-(\d)/)
        const hex = series
            ? (palette?.[Number(series[1]) - 1] ??
              defaultTokens.series[(Number(series[1]) - 1) % MAX_SERIES])
            : fill
        return patternStrokeFor(hex)
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
                        <ChartHeadline text={headline} />
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
                            {bubbles.map((bubble, index) => (
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
                                        bubble.part,
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
                                            bubble.part,
                                            valueFormatter
                                        )}
                                    </title>
                                    <circle
                                        className="pzh-pop"
                                        style={{
                                            animationDelay: `${index * 60}ms`,
                                        }}
                                        cx={bubble.x}
                                        cy={bubble.y}
                                        r={bubble.r}
                                        fill={markFill(bubble.part.fill)}
                                    />
                                    {bubble.r >= LABEL_MIN_RADIUS ? (
                                        // Unlabeled parts fall back to the formatted value as their
                                        // label — skip the value line then, it would just repeat.
                                        bubble.part.label ===
                                        valueFormatter(bubble.part.value) ? (
                                            <text
                                                className="pzh-bubble-label"
                                                x={bubble.x}
                                                y={bubble.y + 5}
                                                textAnchor="middle"
                                                fill={textColorFor(
                                                    bubble.part.fill
                                                )}>
                                                {bubble.part.label}
                                            </text>
                                        ) : (
                                            <>
                                                <text
                                                    className="pzh-bubble-label"
                                                    x={bubble.x}
                                                    y={bubble.y - 2}
                                                    textAnchor="middle"
                                                    fill={textColorFor(
                                                        bubble.part.fill
                                                    )}>
                                                    {truncateLabel(
                                                        bubble.part.label,
                                                        Math.floor(bubble.r / 4)
                                                    )}
                                                </text>
                                                <text
                                                    className="pzh-bubble-value"
                                                    x={bubble.x}
                                                    y={bubble.y + 16}
                                                    textAnchor="middle"
                                                    fill={textColorFor(
                                                        bubble.part.fill
                                                    )}>
                                                    {valueFormatter(
                                                        bubble.part.value
                                                    )}
                                                </text>
                                            </>
                                        )
                                    ) : null}
                                </g>
                            ))}
                        </svg>
                        {activeIndex !== null && bubbles[activeIndex] ? (
                            <div
                                className="pzh-tooltip"
                                role="presentation"
                                style={{
                                    left: Math.min(
                                        Math.max(bubbles[activeIndex].x, 70),
                                        width - 70
                                    ),
                                    top:
                                        (headline ? 72 : 0) +
                                        bubbles[activeIndex].y -
                                        bubbles[activeIndex].r,
                                    transform:
                                        'translate(-50%, calc(-100% - 8px))',
                                }}>
                                <p className="pzh-tooltip-row">
                                    <Swatch
                                        color={bubbles[activeIndex].part.fill}
                                    />
                                    <span>
                                        {bubbles[activeIndex].part.label}:{' '}
                                        <strong>
                                            {valueFormatter(
                                                bubbles[activeIndex].part.value
                                            )}
                                        </strong>
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            ·{' '}
                                            {formatPercent(
                                                bubbles[activeIndex].part
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
                    variant="bubble"
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
