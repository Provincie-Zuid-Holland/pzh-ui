// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC } from 'react'

import { NormalizedData } from '../lib/normalize'
import { ChartLabels } from '../types'
import { Swatch } from './swatch'

type ChartLegendProps = {
    data: NormalizedData
    labels: ChartLabels
}

type LegendEntry = {
    label: string
    color: string
}

/**
 * Derives legend entries from the data: one per series when grouped; base +
 * highlight entries when a single series has highlighted bars; nothing for a
 * single undifferentiated series (the title already names it).
 */
export const legendEntries = (
    data: NormalizedData,
    labels: ChartLabels
): LegendEntry[] => {
    if (data.isGrouped) {
        return data.series.map((series, index) => ({
            label: series.label ?? `${labels.valueHeader} ${index + 1}`,
            color: series.fill,
        }))
    }
    if (data.hasHighlight) {
        return [
            {
                label: data.series[0]?.label ?? labels.valueHeader,
                color: 'var(--pzh-bar)',
            },
            { label: labels.highlightLabel, color: 'var(--pzh-highlight)' },
        ]
    }
    return []
}

export const ChartLegend: FC<ChartLegendProps> = ({ data, labels }) => {
    const entries = legendEntries(data, labels)
    if (entries.length === 0) return null
    return (
        <ul className="pzh-legend">
            {entries.map(entry => (
                <li className="pzh-legend-item" key={entry.label}>
                    <Swatch color={entry.color} />
                    {entry.label}
                </li>
            ))}
        </ul>
    )
}
