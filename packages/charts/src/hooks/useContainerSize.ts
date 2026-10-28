// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Observes an element's size so charts render at real pixel dimensions —
 * crisp text (no viewBox stretching) and card-filling height.
 */
export const useContainerSize = <T extends HTMLElement>(
    fallbackWidth = 640
) => {
    const ref = useRef<T | null>(null)
    const [size, setSize] = useState({ width: fallbackWidth, height: 0 })

    useEffect(() => {
        const element = ref.current
        if (!element || typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(entries => {
            const rect = entries[0]?.contentRect
            if (rect && rect.width > 0) {
                setSize({ width: rect.width, height: Math.floor(rect.height) })
            }
        })
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return { ref, width: size.width, height: size.height }
}
