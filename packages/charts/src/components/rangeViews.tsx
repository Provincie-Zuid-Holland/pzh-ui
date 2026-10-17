// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC, useMemo } from 'react'

import { parseValue } from '../lib/format'
import { ChartLabels, RangeItem } from '../types'
import { Swatch } from './swatch'

/** Parsed, ordered min–max rows shared by GanttChart (rows) and RangeChart (columns). */
export type RangeRow = {
    label: string
    start: number
    end: number
    note?: string
    highlight: boolean
}

type Formatter = (value: number) => string

export const useRangeRows = (items: RangeItem[]): RangeRow[] =>
    useMemo(
        () =>
            items.flatMap(item => {
                const start = parseValue(item.start)
                const end = parseValue(item.end)
                if (start === null || end === null) return []
                return [
                    {
                        label: item.label,
                        start: Math.min(start, end),
                        end: Math.max(start, end),
                        note: item.note,
                        highlight: item.highlight === true,
                    },
                ]
            }),
        [items]
    )

export const rangeReadout = (
    row: RangeRow,
    labels: ChartLabels,
    format: Formatter
): string => {
    const note = row.note ? ` (${row.note})` : ''
    return `${row.label} — ${format(row.start)} ${labels.rangeTo} ${format(row.end)}${note}`
}

export const rangeSummary = (
    rows: RangeRow[],
    labels: ChartLabels,
    format: Formatter
): string => {
    if (rows.length === 0) return labels.emptyState
    const highest = rows.reduce((max, row) => (row.end > max.end ? row : max))
    const lowest = rows.reduce((min, row) =>
        row.start < min.start ? row : min
    )
    const widest = rows.reduce((max, row) =>
        row.end - row.start > max.end - max.start ? row : max
    )
    return [
        `De hoogste waarde is ${format(highest.end)} (${highest.label}), de laagste is ${format(lowest.start)} (${lowest.label}).`,
        `Het grootste bereik heeft ${widest.label}: ${format(widest.start)} ${labels.rangeTo} ${format(widest.end)}.`,
    ].join(' ')
}

export const RangeTable: FC<{
    rows: RangeRow[]
    title?: string
    labels: ChartLabels
    valueFormatter: Formatter
    valueLabel?: string
}> = ({ rows, title, labels, valueFormatter, valueLabel }) => (
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
                    <th scope="col">{labels.categoryHeader}</th>
                    <th scope="col">
                        <span className="pzh-cell">
                            <Swatch color={'var(--pzh-bar)'} />
                            {valueLabel ?? labels.valueHeader}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={`${row.label}-${rowIndex}`}>
                        <th scope="row">{row.label}</th>
                        <td className="pzh-num">
                            <span className="pzh-cell">
                                {row.highlight ? (
                                    <Swatch color={'var(--pzh-highlight)'} />
                                ) : null}
                                <span>
                                    {valueFormatter(row.start)} {labels.rangeTo}{' '}
                                    {valueFormatter(row.end)}
                                    {row.note ? ` (${row.note})` : ''}
                                    {row.highlight ? (
                                        <span className="pzh-visually-hidden">
                                            {' '}
                                            ({labels.highlightLabel})
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
)

export const RangeLegend: FC<{
    valueLabel?: string
    hasHighlight: boolean
    labels: ChartLabels
}> = ({ valueLabel, hasHighlight, labels }) =>
    valueLabel || hasHighlight ? (
        <ul className="pzh-legend">
            {valueLabel ? (
                <li className="pzh-legend-item">
                    <Swatch color={'var(--pzh-bar)'} />
                    {valueLabel}
                </li>
            ) : null}
            {hasHighlight ? (
                <li className="pzh-legend-item">
                    <Swatch color={'var(--pzh-highlight)'} />
                    {labels.highlightLabel}
                </li>
            ) : null}
        </ul>
    ) : null
