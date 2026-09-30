// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

const plainFormat = new Intl.NumberFormat('nl-NL')
const compactFormat = new Intl.NumberFormat('nl-NL', {
    notation: 'compact',
    maximumFractionDigits: 1,
})

export const formatNumber = (value: number): string => plainFormat.format(value)

export const formatCompact = (value: number): string =>
    compactFormat.format(value)

/** CMS content delivers numbers as strings ("1.234" is not expected — plain "1234"). */
export const parseValue = (
    value: number | string | null | undefined
): number | null => {
    if (value === null || value === undefined || value === '') return null
    const parsed =
        typeof value === 'number' ? value : Number(String(value).trim())
    return Number.isFinite(parsed) ? parsed : null
}

/**
 * Rough text width in px for layout math (Karbon/system-ui averages ~0.6em per
 * character). Only used to pick margins and label rotation, never for clipping.
 */
export const estimateTextWidth = (text: string, fontSize: number): number =>
    text.length * fontSize * 0.6

/** Middle-truncates a label; full text stays available via <title> and tooltip. */
export const truncateLabel = (text: string, maxChars: number): string => {
    if (text.length <= maxChars) return text
    const half = Math.max(1, Math.floor((maxChars - 1) / 2))
    return `${text.slice(0, half)}…${text.slice(text.length - half)}`
}
