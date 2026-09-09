// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/** A circle packed in abstract units; `index` refers to the input position. */
export type PackedCircle = {
    index: number
    r: number
    x: number
    y: number
}

/**
 * Packs circles with area ∝ value into a cluster: the largest sits at the
 * center, each next circle walks a deterministic spiral outward until it fits
 * without overlap. No randomness, so layouts are stable between renders.
 */
export const packCircles = (
    values: number[],
    gapRatio = 0.04
): PackedCircle[] => {
    const entries = values
        .map((value, index) => ({ index, r: Math.sqrt(Math.max(0, value)) }))
        .filter(entry => entry.r > 0)
    entries.sort((a, b) => b.r - a.r || a.index - b.index)
    if (entries.length === 0) return []

    const maxR = entries[0].r
    const gap = maxR * gapRatio
    const placed: PackedCircle[] = []

    for (const { index, r } of entries) {
        if (placed.length === 0) {
            placed.push({ index, r, x: 0, y: 0 })
            continue
        }
        let found: { x: number; y: number } | null = null
        for (let step = 1; step < 20000 && !found; step += 1) {
            const angle = step * 0.35
            const dist = step * maxR * 0.004
            const x = Math.cos(angle) * dist
            const y = Math.sin(angle) * dist
            if (
                placed.every(
                    other =>
                        (other.x - x) ** 2 + (other.y - y) ** 2 >=
                        (other.r + r + gap) ** 2
                )
            ) {
                found = { x, y }
            }
        }
        // The spiral always terminates in practice; the fallback keeps rendering sane.
        placed.push({ index, r, x: found?.x ?? 0, y: found?.y ?? maxR * 4 })
    }

    return placed.sort((a, b) => a.index - b.index)
}
