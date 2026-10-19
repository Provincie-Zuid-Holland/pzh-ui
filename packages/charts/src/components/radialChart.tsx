// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo, useState } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { useContainerSize } from '../hooks/useContainerSize'
import { polarPoint, ringPath } from '../lib/arc'
import { formatNumber } from '../lib/format'
import { markFill, seriesVar, stackedShades } from '../tokens'
import { ChartLabels, RadialChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import {
    CenterHeadline,
    formatPercent,
    Part,
    PartsLegend,
    partsToNormalized,
    partsTotal,
    usePartItems,
} from './partsViews'
import { Swatch } from './swatch'

const FULL_TURN = Math.PI * 2
const PAD = 8
/** Radius kept free in the middle for the headline. */
const HOLE_FRACTION = 0.34
const RING_GAP = 6
const MIN_THICKNESS = 12
const MAX_THICKNESS = 40
/** Keeps a tooltip in the upper half from leaving the card. */
const TOOLTIP_MIN_TOP = 48

/**
 * The ring card: a full circle per part, filled clockwise from 12 o'clock with
 * the remainder in gray, and the headline in the middle. `stacked` lays the
 * parts end to end in one ring instead of giving each its own.
 *
 * ```tsx
 * <RadialChart title='Doelbereik' max={100} items={[{ label: 'Wind', value: 34 }, { label: 'Zon', value: 27 }]} />
 * ```
 */
export const RadialChart: FC<RadialChartProps> = ({
    items,
    max,
    stacked,
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
    const positiveParts = usePartItems(items, valueFormatter)
    const mergedLabels: ChartLabels = useMemo(
        () => ({ ...defaultChartLabels, chartRole: 'ringdiagram', ...labels }),
        [labels]
    )
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const hasMax = max !== undefined && max > 0
    // usePartItems drops non-positive values, but a ring at 0% of a max is real
    // data — keep those items rather than falling through to the empty state.
    const parts: Part[] = useMemo(() => {
        if (positiveParts.length > 0 || items.length === 0 || !hasMax)
            return positiveParts
        return items.map((item, index) => ({
            label: item.label ?? valueFormatter(0),
            value: 0,
            fraction: 0,
            fill: item.color ?? seriesVar(index),
        }))
    }, [positiveParts, items, hasMax, valueFormatter])

    const total = partsTotal(parts)
    const largest = parts.length
        ? Math.max(...parts.map(part => part.value))
        : 0

    // A 100%-ring stack reads best as shades of one group, like the segment bar.
    const effectivePalette = useMemo(
        () =>
            stacked
                ? (palette ??
                  (items.some(item => item.color)
                      ? undefined
                      : stackedShades(items.length)))
                : palette,
        [stacked, palette, items]
    )

    const drawHeight = Math.max(160, Math.max(height, measuredHeight) - PAD * 2)
    // svgHeight stays within max(height, measuredHeight), so re-measuring cannot grow the card.
    const outerRadius = Math.max(50, Math.min(width / 2 - PAD, drawHeight / 2))
    const svgHeight = Math.ceil(outerRadius * 2) + PAD * 2
    const cx = width / 2
    const cy = svgHeight / 2

    // Rings thinner than MIN_THICKNESS are unreadable and unhittable, so past
    // that many parts the chart falls back to a single stacked ring.
    const band = outerRadius * (1 - HOLE_FRACTION)
    const maxRings = Math.max(
        1,
        Math.floor((band + RING_GAP) / (MIN_THICKNESS + RING_GAP))
    )
    const asStack = Boolean(stacked) || parts.length > maxRings
    const ringCount = asStack ? 1 : Math.max(1, parts.length)
    const thickness = Math.min(
        MAX_THICKNESS,
        (band - (ringCount - 1) * RING_GAP) / ringCount
    )
    const holeRadius =
        outerRadius - ringCount * thickness - (ringCount - 1) * RING_GAP

    const scaleMax = hasMax ? max : asStack ? total : largest
    const resolvedHeadline =
        headline ??
        (hasMax
            ? formatPercent(scaleMax > 0 ? total / scaleMax : 0)
            : undefined)

    /** One drawn arc: its ring band and its angular span. */
    const segments = useMemo(() => {
        let angle = 0
        return parts.map((part, index) => {
            const fraction =
                scaleMax > 0 ? Math.min(1, part.value / scaleMax) : 0
            const ring = asStack ? 0 : index
            const outer = outerRadius - ring * (thickness + RING_GAP)
            const start = asStack ? angle : 0
            const end = asStack
                ? angle + (scaleMax > 0 ? part.value / scaleMax : 0) * FULL_TURN
                : fraction * FULL_TURN
            if (asStack) angle = end
            return {
                part,
                fraction,
                outer,
                inner: outer - thickness,
                start,
                end,
                mid: (start + end) / 2,
            }
        })
    }, [parts, scaleMax, asStack, outerRadius, thickness])

    const stackFilledEnd = segments.length
        ? segments[segments.length - 1].end
        : 0
    // The percentages the rings show must be the ones announced and tabulated.
    const scaledParts = useMemo(
        () =>
            parts.map((part, index) => ({
                ...part,
                fraction: segments[index]?.fraction ?? 0,
            })),
        [parts, segments]
    )
    const readout = (index: number): string => {
        const { part, fraction } = segments[index]
        const value = `${part.label}: ${valueFormatter(part.value)}`
        return hasMax
            ? `${value} van ${valueFormatter(scaleMax)} (${formatPercent(fraction)})`
            : `${value} (${formatPercent(fraction)})`
    }

    const activeAnchor =
        activeIndex !== null
            ? polarPoint(
                  cx,
                  cy,
                  (segments[activeIndex].inner + segments[activeIndex].outer) /
                      2,
                  segments[activeIndex].mid
              )
            : null

    return (
        <ChartCard
            title={title}
            subtitle={subtitle}
            loading={loading}
            labels={mergedLabels}
            initialViewMode={initialViewMode}
            initialHighContrast={initialHighContrast}
            tokenOverrides={{ palette: effectivePalette }}
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
                                {/* Gray tracks first and outside the groups, so they neither dim on hover nor take focus. */}
                                {asStack ? (
                                    stackFilledEnd < FULL_TURN - 1e-6 ? (
                                        <path
                                            d={ringPath(
                                                cx,
                                                cy,
                                                outerRadius,
                                                outerRadius - thickness,
                                                stackFilledEnd,
                                                FULL_TURN
                                            )}
                                            fill="var(--pzh-skeleton)"
                                        />
                                    ) : null
                                ) : (
                                    segments.map((segment, index) => (
                                        <path
                                            key={index}
                                            d={ringPath(
                                                cx,
                                                cy,
                                                segment.outer,
                                                segment.inner,
                                                0,
                                                FULL_TURN
                                            )}
                                            fill="var(--pzh-skeleton)"
                                        />
                                    ))
                                )}
                                {segments.map((segment, index) => (
                                    <g
                                        key={index}
                                        className={
                                            activeIndex === index
                                                ? 'pzh-bar-group pzh-active'
                                                : 'pzh-bar-group'
                                        }
                                        role="img"
                                        tabIndex={0}
                                        aria-label={readout(index)}
                                        onMouseEnter={() =>
                                            setActiveIndex(index)
                                        }
                                        onFocus={() => setActiveIndex(index)}
                                        onBlur={() => setActiveIndex(null)}
                                        onKeyDown={event => {
                                            if (event.key === 'Escape')
                                                setActiveIndex(null)
                                        }}>
                                        <title>{readout(index)}</title>
                                        {/* The whole ring is the hit target, gaps included — a thin arc is a small one. */}
                                        <path
                                            className="pzh-hit"
                                            d={ringPath(
                                                cx,
                                                cy,
                                                segment.outer + RING_GAP / 2,
                                                Math.max(
                                                    1,
                                                    segment.inner - RING_GAP / 2
                                                ),
                                                asStack ? segment.start : 0,
                                                asStack
                                                    ? segment.end
                                                    : FULL_TURN
                                            )}
                                            fill="transparent"
                                        />
                                        <path
                                            className="pzh-slice pzh-fade-in"
                                            style={{
                                                animationDelay: `${index * 60}ms`,
                                            }}
                                            d={ringPath(
                                                cx,
                                                cy,
                                                segment.outer,
                                                segment.inner,
                                                segment.start,
                                                segment.end
                                            )}
                                            fill={markFill(segment.part.fill)}
                                        />
                                    </g>
                                ))}
                            </svg>
                            <CenterHeadline
                                text={resolvedHeadline}
                                maxWidth={holeRadius * 1.6}
                            />
                        </div>
                        {activeIndex !== null && activeAnchor ? (
                            <div
                                className="pzh-tooltip"
                                role="presentation"
                                style={{
                                    left: Math.min(
                                        Math.max(activeAnchor.x, 70),
                                        width - 70
                                    ),
                                    // Points away from the middle, so the headline in the hole stays readable.
                                    top:
                                        activeAnchor.y < cy
                                            ? Math.max(
                                                  activeAnchor.y,
                                                  TOOLTIP_MIN_TOP
                                              )
                                            : activeAnchor.y,
                                    transform:
                                        activeAnchor.y < cy
                                            ? 'translate(-50%, calc(-100% - 8px))'
                                            : 'translate(-50%, 8px)',
                                }}>
                                <p className="pzh-tooltip-row">
                                    <Swatch
                                        color={segments[activeIndex].part.fill}
                                    />
                                    <span>
                                        {segments[activeIndex].part.label}:{' '}
                                        <strong>
                                            {valueFormatter(
                                                segments[activeIndex].part.value
                                            )}
                                        </strong>
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            ·{' '}
                                            {formatPercent(
                                                segments[activeIndex].fraction
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
                    data={partsToNormalized(scaledParts)}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                />
            }
            summary={
                <ChartSummary
                    data={partsToNormalized(scaledParts)}
                    summary={summary}
                    valueFormatter={valueFormatter}
                />
            }
            legend={<PartsLegend parts={parts} />}
            skeleton={
                <ChartSkeleton
                    variant="radial"
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
