// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC } from 'react'

import { NormalizedData } from '../lib/normalize'
import { ChartLabels } from '../types'
import { Swatch } from './swatch'

type ChartTableProps = {
    data: NormalizedData
    title?: string
    labels: ChartLabels
    valueFormatter: (value: number) => string
    /** First column header, e.g. the x-axis caption ('Maand'). */
    categoryHeader?: string
}

/**
 * The 'tabel' view: the same data as a semantic table. The header row carries
 * the legend — a colored dot per series column. Rows with their own color
 * (parts-based charts, highlights) show a dot in the cell instead.
 */
export const ChartTable: FC<ChartTableProps> = ({
    data,
    title,
    labels,
    valueFormatter,
    categoryHeader,
}) => {
    // Parts-based charts color each row themselves; the header dot would lie.
    const hasDatumFills = data.series.some(series =>
        series.data.some(datum => datum.fill)
    )

    return (
        // Focusable, labeled region: a table wider than the card scrolls
        // horizontally, and keyboard users need to reach it to scroll.
        <div
            className="pzh-table-wrap"
            tabIndex={0}
            role="group"
            aria-label={labels.textual}>
            <table className="pzh-table">
                {title ? (
                    <caption className="pzh-visually-hidden">{title}</caption>
                ) : null}
                <thead>
                    <tr>
                        <th scope="col">
                            {categoryHeader ?? labels.categoryHeader}
                        </th>
                        {data.series.map((series, index) => (
                            <th scope="col" key={index}>
                                <span className="pzh-cell">
                                    {!hasDatumFills ? (
                                        <Swatch color={series.fill} />
                                    ) : null}
                                    {series.label ?? labels.valueHeader}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.categories.map((category, categoryIndex) => (
                        <tr key={`${category}-${categoryIndex}`}>
                            <th scope="row">{category}</th>
                            {data.series.map((series, seriesIndex) => {
                                const datum = series.data[categoryIndex]
                                const cellFill =
                                    datum.fill ??
                                    (datum.highlight
                                        ? 'var(--pzh-highlight)'
                                        : null)
                                return (
                                    <td className="pzh-num" key={seriesIndex}>
                                        <span className="pzh-cell">
                                            {cellFill ? (
                                                <Swatch color={cellFill} />
                                            ) : null}
                                            <span>
                                                {datum.value === null
                                                    ? '—'
                                                    : valueFormatter(
                                                          datum.value
                                                      )}
                                                {datum.note
                                                    ? ` (${datum.note})`
                                                    : ''}
                                                {datum.highlight ? (
                                                    <span className="pzh-visually-hidden">
                                                        {' '}
                                                        ({labels.highlightLabel}
                                                        )
                                                    </span>
                                                ) : null}
                                            </span>
                                        </span>
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
