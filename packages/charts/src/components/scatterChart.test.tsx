// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { ScatterChart } from './scatterChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const props = {
    title: 'Leeftijd door de dag',
    categories: ['8:00', '9:00', '10:00', '11:00'],
    series: [{ label: 'Leeftijd', data: [31, null, 47, 39] }],
}

describe('ScatterChart', () => {
    it('renders dots for non-null values with an accessible name', () => {
        const { container } = render(<ScatterChart {...props} />)
        expect(
            screen.getByRole('group', {
                name: 'Leeftijd door de dag: spreidingsdiagram',
            })
        ).toBeInTheDocument()
        // 3 data dots (null skipped).
        const dots = container.querySelectorAll('g.pzh-line-group circle')
        expect(dots).toHaveLength(3)
    })

    it('draws a least-squares trend line by default and omits it when disabled', () => {
        const { container } = render(<ScatterChart {...props} />)
        expect(
            container.querySelectorAll('svg > line[stroke-linecap="round"]')
        ).toHaveLength(1)
        const { container: without } = render(
            <ScatterChart {...props} trendLine={false} />
        )
        expect(
            without.querySelectorAll('svg > line[stroke-linecap="round"]')
        ).toHaveLength(0)
    })

    it('computes a rising trend for rising data', () => {
        const { container } = render(
            <ScatterChart
                title="t"
                categories={['a', 'b', 'c']}
                series={[{ data: [10, 20, 30] }]}
            />
        )
        const trend = container.querySelector(
            'svg > line[stroke-linecap="round"]'
        )
        // Rising data: the line's start y (low value) is below its end y in svg coords.
        expect(Number(trend?.getAttribute('y1'))).toBeGreaterThan(
            Number(trend?.getAttribute('y2'))
        )
    })

    it('gives categories keyboard readouts', () => {
        const { container } = render(<ScatterChart {...props} />)
        const groups = container.querySelectorAll('.pzh-line-group')
        expect(groups[0].getAttribute('aria-label')).toBe('8:00 — Leeftijd: 31')
        expect(groups[1].getAttribute('aria-label')).toBe('9:00 — Leeftijd: —')
    })
})
