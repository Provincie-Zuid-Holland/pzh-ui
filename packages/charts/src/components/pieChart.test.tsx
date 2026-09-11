// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { PieChart } from './pieChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

/** jsdom has no layout: width falls back to 640 and height to the 280 default. */
const RADIUS = Math.min(640, 280) / 2 - 8
const outerRadiusOf = (d: string): number =>
    Number(d.match(/A([\d.]+),[\d.]+ 0 \d 1/)?.[1])
const innerRadiusOf = (d: string): number =>
    Number(d.match(/A([\d.]+),[\d.]+ 0 \d 0/)?.[1])

describe('PieChart', () => {
    it('renders one slice per positive part with accessible readouts', () => {
        const { container } = render(
            <PieChart
                title="Subsidies"
                items={[
                    { label: 'A', value: 75 },
                    { label: 'B', value: 25 },
                ]}
            />
        )
        expect(
            screen.getByRole('group', { name: 'Subsidies: cirkeldiagram' })
        ).toBeInTheDocument()
        const slices = container.querySelectorAll('path.pzh-slice')
        expect(slices).toHaveLength(2)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups[0].getAttribute('aria-label')).toBe('A: 75 (75%)')
        expect(groups[1].getAttribute('aria-label')).toBe('B: 25 (25%)')
    })

    it('falls back to formatted values as legend labels, like the mock', () => {
        render(<PieChart items={[{ value: 10401251 }, { value: 1603105 }]} />)
        expect(screen.getByText('10.401.251')).toBeInTheDocument()
        expect(screen.getByText('1.603.105')).toBeInTheDocument()
    })

    it('renders a single 100% part as a full circle without a center line', () => {
        const { container } = render(
            <PieChart items={[{ label: 'Alles', value: 10 }]} />
        )
        const slice = container.querySelector('path.pzh-slice')
        expect(slice?.getAttribute('d')).not.toContain('L')
    })

    it('shows an optional headline above the circle', () => {
        render(<PieChart headline="€12,5 mln" items={[{ value: 1 }]} />)
        expect(screen.getByText('€12,5 mln')).toBeInTheDocument()
    })

    it('cuts a hole and names itself a ringdiagram in donut mode', () => {
        const { container } = render(
            <PieChart
                title="Subsidies"
                donut
                items={[
                    { label: 'A', value: 75 },
                    { label: 'B', value: 25 },
                ]}
            />
        )
        expect(
            screen.getByRole('group', { name: 'Subsidies: ringdiagram' })
        ).toBeInTheDocument()
        const slice =
            container.querySelector('path.pzh-slice')?.getAttribute('d') ?? ''
        // A ring: an outer and an inner arc, and no line back to the center.
        expect(slice.match(/A/g)).toHaveLength(2)
        expect(slice).not.toContain('M320,140')
        expect(innerRadiusOf(slice)).toBeCloseTo(RADIUS * 0.6)
    })

    it('moves the headline into the hole', () => {
        const { container } = render(
            <PieChart donut headline="€12,5 mln" items={[{ value: 1 }]} />
        )
        expect(
            container.querySelector('.pzh-center-headline')?.textContent
        ).toBe('€12,5 mln')
        expect(container.querySelector('.pzh-headline')).toBeNull()
    })

    it('honours a hole fraction and clamps it to a drawable range', () => {
        const holeOf = (donut: number) => {
            const { container } = render(
                <PieChart donut={donut} items={[{ value: 1 }]} />
            )
            return innerRadiusOf(
                container.querySelector('path.pzh-slice')?.getAttribute('d') ??
                    ''
            )
        }
        expect(holeOf(0.5)).toBeCloseTo(RADIUS * 0.5)
        expect(holeOf(2)).toBeCloseTo(RADIUS * 0.85)
        expect(holeOf(0.01)).toBeCloseTo(RADIUS * 0.2)
    })

    it('grows the focused donut slice outward', () => {
        const { container } = render(
            <PieChart
                donut
                items={[
                    { label: 'A', value: 75 },
                    { label: 'B', value: 25 },
                ]}
            />
        )
        const group = container.querySelectorAll('.pzh-bar-group')[0]
        const outerBefore = outerRadiusOf(
            container.querySelector('path.pzh-slice')?.getAttribute('d') ?? ''
        )
        fireEvent.focus(group)
        expect(
            outerRadiusOf(
                container.querySelector('path.pzh-slice')?.getAttribute('d') ??
                    ''
            )
        ).toBeCloseTo(outerBefore + 4)
    })

    it('marks the active slice, so the dim survives the pointer moving onto the tooltip', () => {
        const { container } = render(
            <PieChart
                items={[
                    { label: 'A', value: 75 },
                    { label: 'B', value: 25 },
                ]}
            />
        )
        const groups = container.querySelectorAll('.pzh-bar-group')
        fireEvent.focus(groups[0])
        expect(groups[0].classList.contains('pzh-active')).toBe(true)
        expect(groups[1].classList.contains('pzh-active')).toBe(false)
    })

    it('renders the pie skeleton while loading', () => {
        const { container } = render(<PieChart loading items={[]} />)
        expect(container.querySelector('.pzh-card')).toHaveAttribute(
            'aria-busy',
            'true'
        )
    })
})
