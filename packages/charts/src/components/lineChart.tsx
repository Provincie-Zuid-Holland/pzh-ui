// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { formatCompact, formatNumber } from '../lib/format'
import { normalizeData } from '../lib/normalize'
import { ChartLabels, LineChartProps } from '../types'
import { ChartCard } from './chartCard'
import { ChartLegend, legendEntries } from './chartLegend'
import { ChartSkeleton } from './chartSkeleton'
import { ChartSummary } from './chartSummary'
import { ChartTable } from './chartTable'
import { LineChartSvg } from './lineChartSvg'

/**
 * The public line chart card of pzh-charts: smooth monotone curves with soft
 * area fills, an optional labeled reference line, and dashed forecast tails.
 *
 * ```tsx
 * <LineChart
 *     title='Aantal koeien'
 *     categories={['Jan', 'Feb', 'Mrt']}
 *     series={[{ label: 'Koeien', data: [90, 150, 105] }]}
 *     referenceLine={{ value: 130, label: 'Landelijk maximum' }}
 * />
 * ```
 */
export const LineChart: FC<LineChartProps> = ({
    categories,
    series,
    referenceLine,
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
        () => ({ ...defaultChartLabels, chartRole: 'lijndiagram', ...labels }),
        [labels]
    )

    const seriesOptions = useMemo(
        () =>
            series.map(entry => ({
                dashFromIndex: entry.dashFromIndex,
                area: entry.area !== false,
            })),
        [series]
    )

    // Explicit series colors win over the palette prop; both only apply
    // outside high-contrast mode (see getCssVars).
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
                <LineChartSvg
                    data={data}
                    seriesOptions={seriesOptions}
                    axis={axis}
                    referenceLine={referenceLine}
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
                    variant="line"
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
