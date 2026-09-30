// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { NormalizedData, NormalizedSeries } from './normalize'

type Formatter = (value: number) => string

const seriesSentences = (
    series: NormalizedSeries,
    categories: string[],
    format: Formatter
): string | null => {
    const points = series.data
        .map((datum, index) => ({
            category: categories[index],
            value: datum.value,
        }))
        .filter(
            (point): point is { category: string; value: number } =>
                point.value !== null
        )
    if (points.length === 0) return null

    const highest = points.reduce((max, point) =>
        point.value > max.value ? point : max
    )
    const lowest = points.reduce((min, point) =>
        point.value < min.value ? point : min
    )
    const total = points.reduce((sum, point) => sum + point.value, 0)

    const sentences: string[] = []
    if (points.length === 1) {
        sentences.push(
            `${points[0].category} heeft een waarde van ${format(points[0].value)}.`
        )
    } else {
        sentences.push(
            `De hoogste waarde is ${format(highest.value)} (${highest.category}), de laagste is ${format(lowest.value)} (${lowest.category}).`
        )
        sentences.push(`Het totaal is ${format(total)}.`)

        // A trend only makes sense on an ordered axis (years); for nominal
        // categories like municipalities "gestegen van A naar B" reads wrong.
        const isOrdinal = points.every(point => /^\d+$/.test(point.category))
        if (isOrdinal) {
            const first = points[0]
            const last = points[points.length - 1]
            if (first.value < last.value) {
                sentences.push(
                    `Tussen ${first.category} en ${last.category} is de waarde gestegen van ${format(first.value)} naar ${format(last.value)}.`
                )
            } else if (first.value > last.value) {
                sentences.push(
                    `Tussen ${first.category} en ${last.category} is de waarde gedaald van ${format(first.value)} naar ${format(last.value)}.`
                )
            } else {
                sentences.push(
                    `Tussen ${first.category} en ${last.category} is de waarde gelijk gebleven (${format(first.value)}).`
                )
            }
        }
    }
    const text = sentences.join(' ')
    return series.label ? `${series.label}: ${text}` : text
}

/**
 * Generates the 'samengevat' view: one Dutch paragraph per series with the
 * highest, lowest, total and first-to-last trend. Overridable via the
 * `summary` prop on BarChart.
 */
export const generateSummary = (
    data: NormalizedData,
    format: Formatter
): string[] =>
    data.series
        .map(series => seriesSentences(series, data.categories, format))
        .filter((paragraph): paragraph is string => paragraph !== null)
