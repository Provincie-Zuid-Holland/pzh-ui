// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { formatCompact, formatNumber } from '../lib/format'
import { normalizeData } from '../lib/normalize'
import { ChartLabels, ScatterChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartLegend, legendEntries } from './chartLegend'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import { ScatterChartSvg } from './scatterChartSvg'

/**
 * The scatter card of pzh-charts: one dot per category per series, with an
 * optional least-squares trend line per series (on by default).
 *
 * ```tsx
 * <ScatterChart
 *     title='Leeftijd door de dag'
 *     categories={['8:00', '9:00', '10:00']}
 *     series={[{ data: [31, 47, 39] }]}
 * />
 * ```
 */
export const ScatterChart: FC<ScatterChartProps> = ({
    categories,
    series,
    trendLine = true,
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
    const data = useMemo(
        () => normalizeData(categories, series),
        [categories, series]
    )

    const mergedLabels: ChartLabels = useMemo(
        () => ({
            ...defaultChartLabels,
            chartRole: 'spreidingsdiagram',
            ...labels,
        }),
        [labels]
    )

    const tokenOverrides = useMemo(() => {
        const effectivePalette = palette ? [...palette] : []
        series.forEach((entry, index) => {
            if (entry.color) effectivePalette[index] = entry.color
        })
        return {
            palette: effectivePalette.length > 0 ? effectivePalette : undefined,
        }
    }, [palette, series])

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
                <ScatterChartSvg
                    data={data}
                    trendLine={trendLine}
                    axis={axis}
                    height={height}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                    tickFormatter={tickFormatter}
                />
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
                    variant="scatter"
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    categoryCount={categories.length}
                    seriesCount={series.length}
                    legendCount={legendEntries(data, mergedLabels).length}
                />
            }
        />
    )
}
