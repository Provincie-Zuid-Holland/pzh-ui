// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { formatCompact, formatNumber } from '../lib/format'
import { normalizeData } from '../lib/normalize'
import { stackedShades } from '../tokens'
import { BarChartProps, ChartLabels } from '../types'
import { BarChartSvg } from './barChartSvg'
import { BarChartSvgHorizontal } from './barChartSvgHorizontal'
import { ChartCard } from './chartCard'
import { ChartLegend, legendEntries } from './chartLegend'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'

/**
 * The public bar chart card of pzh-charts.
 *
 * ```tsx
 * <BarChart
 *     title='Aantal bedrijven'
 *     categories={['2024', '2025']}
 *     series={[{ label: 'Refurbished', data: ['38', '150'] }]}
 * />
 * ```
 */
export const BarChart: FC<BarChartProps> = ({
    categories,
    series,
    stacked,
    horizontal,
    title,
    subtitle,
    loading,
    axis,
    palette,
    highlightColor,
    highlightLabel,
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
    const data = useMemo(
        () => normalizeData(categories, series),
        [categories, series]
    )

    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            ...(highlightLabel ? { highlightLabel } : undefined),
            ...labels,
        }),
        [labels, highlightLabel]
    )

    // Explicit series colors win over the palette prop. Stacked charts with
    // neither default to shades of one color group (parts of a whole read
    // better as one hue than as competing hues).
    const tokenOverrides = useMemo(() => {
        const effectivePalette = palette
            ? [...palette]
            : (stacked && series.length > 1 && stackedShades(series.length)) ||
              []
        series.forEach((entry, index) => {
            if (entry.color) effectivePalette[index] = entry.color
        })
        return {
            palette: effectivePalette.length > 0 ? effectivePalette : undefined,
            highlightColor,
        }
    }, [palette, stacked, series, highlightColor])

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
            tokenOverrides={tokenOverrides}
            height={height}
            className={className}
            id={id}
            headingLevel={headingLevel}
            visual={
                horizontal ? (
                    <BarChartSvgHorizontal
                        data={data}
                        axis={axis}
                        height={height}
                        title={title}
                        stacked={stacked}
                        labels={mergedLabels}
                        valueFormatter={valueFormatter}
                        tickFormatter={tickFormatter}
                    />
                ) : (
                    <BarChartSvg
                        data={data}
                        axis={axis}
                        height={height}
                        title={title}
                        stacked={stacked}
                        labels={mergedLabels}
                        valueFormatter={valueFormatter}
                        tickFormatter={tickFormatter}
                    />
                )
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
                    variant={horizontal ? 'gantt' : 'bar'}
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    categoryCount={categories.length}
                    seriesCount={stacked ? 1 : series.length}
                    legendCount={legendEntries(data, mergedLabels).length}
                />
            }
        />
    )
}
