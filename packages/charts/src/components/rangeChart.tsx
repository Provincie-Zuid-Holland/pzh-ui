// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { formatCompact, formatNumber } from '../lib/format'
import { ChartLabels, RangeChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartSkeleton } from './chartSkeleton'
import { GanttChartSvg } from './ganttChartSvg'
import { RangeChartSvg } from './rangeChartSvg'
import {
    RangeLegend,
    rangeSummary,
    RangeTable,
    useRangeRows,
} from './rangeViews'

/**
 * The range card of pzh-charts: one min–max pill per category. Vertical
 * columns by default (e.g. age range per time slot); `horizontal` renders
 * left-to-right rows — the classic Gantt look (see the GanttChart preset).
 *
 * ```tsx
 * <RangeChart
 *     title='Leeftijd van personeel'
 *     valueLabel='Leeftijd range'
 *     items={[{ label: '8:00', start: 43, end: 53 }]}
 * />
 * ```
 */
export const RangeChart: FC<RangeChartProps> = ({
    items,
    horizontal,
    valueLabel,
    highlightLabel,
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
    height = 280,
    className,
    id,
    headingLevel,
}) => {
    const rows = useRangeRows(items)
    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            chartRole: 'bereikdiagram',
            ...(highlightLabel ? { highlightLabel } : undefined),
            ...labels,
        }),
        [labels, highlightLabel]
    )
    const hasHighlight = rows.some(row => row.highlight)
    const tickFormatter =
        axis?.tickFormat === 'plain' ? formatNumber : formatCompact

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
                horizontal ? (
                    <GanttChartSvg
                        rows={rows}
                        axis={axis}
                        height={height}
                        title={title}
                        labels={mergedLabels}
                        valueFormatter={valueFormatter}
                        tickFormatter={tickFormatter}
                    />
                ) : (
                    <RangeChartSvg
                        rows={rows}
                        axis={axis}
                        height={height}
                        title={title}
                        labels={mergedLabels}
                        valueFormatter={valueFormatter}
                        tickFormatter={tickFormatter}
                    />
                )
            }
            textual={
                <RangeTable
                    rows={rows}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                    valueLabel={valueLabel}
                />
            }
            summary={
                <p className="pzh-summary">
                    {summary ??
                        rangeSummary(rows, mergedLabels, valueFormatter)}
                </p>
            }
            legend={
                <RangeLegend
                    valueLabel={valueLabel}
                    hasHighlight={hasHighlight}
                    labels={mergedLabels}
                />
            }
            skeleton={
                <ChartSkeleton
                    variant={horizontal ? 'gantt' : 'range'}
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    categoryCount={items.length}
                    legendCount={valueLabel ? 1 : 0}
                />
            }
        />
    )
}
