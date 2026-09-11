// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useMemo } from 'react'

import { defaultChartLabels } from '../defaultLabels'
import { computeBins, HistogramBin } from '../lib/bins'
import { formatNumber, parseValue } from '../lib/format'
import { sequentialVar } from '../tokens'
import { ChartLabels, HistogramChartProps, HistogramThreshold } from '../types'
import { ChartCard } from './chartCard'
import { ChartSkeleton } from './chartSkeleton'
import { HistogramChartSvg } from './histogramChartSvg'
import { Swatch } from './swatch'

/**
 * The histogram card. Two input modes:
 * - `values` (+ optional `bins`): raw observations, binned via Sturges' rule,
 *   colored on the sequential ramp — darker means fuller.
 * - `items`: pre-aggregated labeled values (one bar per label).
 * With `thresholds`, bars are colored by value class (status green/yellow/red
 * tokens by default) and a matching legend appears.
 */
export const HistogramChart: FC<HistogramChartProps> = ({
    values,
    bins: binCount,
    items,
    thresholds,
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
    const isDirect = Boolean(items && items.length > 0)

    const bins: HistogramBin[] = useMemo(() => {
        if (items && items.length > 0) {
            return items.map(item => {
                const value = parseValue(item.value) ?? 0
                return { x0: value, x1: value, count: value, label: item.label }
            })
        }
        return computeBins(values ?? [], binCount)
    }, [items, values, binCount])

    const mergedLabels: ChartLabels = useMemo(
        () => ({ ...defaultChartLabels, chartRole: 'histogram', ...labels }),
        [labels]
    )

    const thresholdColor = (threshold: HistogramThreshold, index: number) =>
        threshold.color ?? `var(--pzh-status-${index + 1})`
    const thresholdFor = (value: number): number => {
        if (!thresholds || thresholds.length === 0) return -1
        const index = thresholds.findIndex(
            threshold => threshold.upTo !== undefined && value <= threshold.upTo
        )
        return index === -1 ? thresholds.length - 1 : index
    }
    const binFill =
        thresholds && thresholds.length > 0
            ? (bin: HistogramBin) =>
                  thresholdColor(
                      thresholds[thresholdFor(bin.count)],
                      thresholdFor(bin.count)
                  )
            : undefined
    const binTickLabel = isDirect ? (bin: HistogramBin) => bin.label : undefined
    // The table dot mirrors the chart's actual bar color (threshold class or ramp step).
    const maxCount = bins.reduce((max, bin) => Math.max(max, bin.count), 0)
    const tableFill = (bin: HistogramBin) =>
        binFill?.(bin) ?? sequentialVar(maxCount > 0 ? bin.count / maxCount : 0)

    const total = bins.reduce((sum, bin) => sum + bin.count, 0)
    const modal = bins.reduce(
        (max, bin) => (bin.count > max.count ? bin : max),
        bins[0] ?? { label: '', count: 0, x0: 0, x1: 0 }
    )
    const lowest = bins.reduce(
        (min, bin) => (bin.count < min.count ? bin : min),
        bins[0] ?? { label: '', count: 0, x0: 0, x1: 0 }
    )
    const autoSummary = !bins.length
        ? mergedLabels.emptyState
        : isDirect
          ? `De hoogste waarde is ${valueFormatter(modal.count)} (${modal.label}), de laagste is ${valueFormatter(lowest.count)} (${lowest.label}). Het totaal is ${valueFormatter(total)}.`
          : `In totaal zijn er ${valueFormatter(total)} waarnemingen, verdeeld over ${valueFormatter(bins.length)} klassen. De meeste waarnemingen (${valueFormatter(modal.count)}) vallen in de klasse ${modal.label}.`

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
                <HistogramChartSvg
                    bins={bins}
                    axis={axis}
                    height={height}
                    title={title}
                    labels={mergedLabels}
                    valueFormatter={valueFormatter}
                    tickFormatter={valueFormatter}
                    binFill={binFill}
                    binTickLabel={binTickLabel}
                />
            }
            textual={
                <div
                    className="pzh-table-wrap"
                    tabIndex={0}
                    role="group"
                    aria-label={mergedLabels.textual}>
                    <table className="pzh-table">
                        {title ? (
                            <caption className="pzh-visually-hidden">
                                {title}
                            </caption>
                        ) : null}
                        <thead>
                            <tr>
                                <th scope="col">
                                    {axis?.xLabel ??
                                        mergedLabels.categoryHeader}
                                </th>
                                <th scope="col">{mergedLabels.countLabel}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bins.map((bin, binIndex) => (
                                <tr key={binIndex}>
                                    <th scope="row">{bin.label}</th>
                                    <td className="pzh-num">
                                        <span className="pzh-cell">
                                            <Swatch color={tableFill(bin)} />
                                            <span className="pzh-visually-hidden">
                                                {mergedLabels.countLabel}:{' '}
                                            </span>
                                            <span>
                                                {valueFormatter(bin.count)}
                                                {thresholds &&
                                                thresholds.length > 0 ? (
                                                    <span className="pzh-visually-hidden">
                                                        {' '}
                                                        (
                                                        {
                                                            thresholds[
                                                                thresholdFor(
                                                                    bin.count
                                                                )
                                                            ].label
                                                        }
                                                        )
                                                    </span>
                                                ) : null}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            summary={<p className="pzh-summary">{summary ?? autoSummary}</p>}
            legend={
                thresholds && thresholds.length > 0 ? (
                    <ul className="pzh-legend">
                        {thresholds.map((threshold, index) => (
                            <li
                                className="pzh-legend-item"
                                key={threshold.label}>
                                <Swatch
                                    color={thresholdColor(threshold, index)}
                                />
                                {threshold.label}
                            </li>
                        ))}
                    </ul>
                ) : undefined
            }
            skeleton={
                <ChartSkeleton
                    variant="bar"
                    height={height}
                    loadingLabel={mergedLabels.loading}
                    hasTitle={Boolean(title)}
                    hasSubtitle={Boolean(subtitle)}
                    categoryCount={bins.length || 18}
                    legendCount={thresholds?.length ?? 0}
                />
            }
        />
    )
}
