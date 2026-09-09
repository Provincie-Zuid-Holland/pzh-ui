// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { ProgressChart } from './progressChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

describe('ProgressChart', () => {
    it('shows the percentage headline and fills ticks up to the total', () => {
        const { container } = render(
            <ProgressChart
                title="Weidegang"
                items={[{ label: 'Met weidegang', value: 82 }]}
            />
        )
        expect(container.querySelector('.pzh-headline')?.textContent).toBe(
            '82%'
        )
        const ticks = [
            ...container.querySelectorAll('rect.pzh-bar'),
        ] as SVGElement[]
        const filled = ticks.filter(
            tick =>
                tick.style.getPropertyValue('--pzh-bar-fill') !==
                'var(--pzh-skeleton)'
        )
        expect(filled.length / ticks.length).toBeCloseTo(0.82, 1)
    })

    it('splits the fill across multiple parts in legend colors', () => {
        const { container } = render(
            <ProgressChart
                items={[
                    { label: 'Wind', value: 40 },
                    { label: 'Zon', value: 30 },
                ]}
            />
        )
        expect(container.querySelector('.pzh-headline')?.textContent).toBe(
            '70%'
        )
        const fills = new Set(
            [...container.querySelectorAll('rect.pzh-bar')].map(tick =>
                (tick as SVGElement).style.getPropertyValue('--pzh-bar-fill')
            )
        )
        expect(fills.has('var(--pzh-fill-1)')).toBe(true)
        expect(fills.has('var(--pzh-fill-2)')).toBe(true)
        expect(fills.has('var(--pzh-skeleton)')).toBe(true)
        expect(screen.getByText('Wind')).toBeInTheDocument()
        expect(screen.getByText('Zon')).toBeInTheDocument()
    })

    it('uses absolute labels with a custom max', () => {
        render(
            <ProgressChart max={50} items={[{ label: 'Bezet', value: 41 }]} />
        )
        expect(screen.getByText('82%')).toBeInTheDocument()
        expect(screen.getByText('50')).toBeInTheDocument()
        expect(screen.getByText('41')).toBeInTheDocument()
    })

    it('reads out parts and total for keyboard users', () => {
        const { container } = render(
            <ProgressChart items={[{ label: 'Met weidegang', value: 82 }]} />
        )
        expect(
            container
                .querySelector('.pzh-bar-group')
                ?.getAttribute('aria-label')
        ).toBe('Met weidegang: 82 (100%) — 82% van 100%')
    })

    it('shares the lijst view with percentage notes', async () => {
        const user = userEvent.setup()
        render(
            <ProgressChart
                items={[
                    { label: 'Wind', value: 40 },
                    { label: 'Zon', value: 30 },
                ]}
            />
        )
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        expect(
            screen.getByRole('rowheader', { name: 'Wind' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: /40 \(57%\)/ })
        ).toBeInTheDocument()
    })

    it('colors each list-view dot with its own part color, matching the legend', async () => {
        const user = userEvent.setup()
        const { container } = render(
            <ProgressChart
                items={[
                    { label: 'Wind', value: 40 },
                    { label: 'Zon', value: 30 },
                ]}
            />
        )
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        const dots = [...container.querySelectorAll('td .pzh-swatch rect')]
        expect(dots.map(dot => dot.getAttribute('fill'))).toEqual([
            'var(--pzh-fill-1)',
            'var(--pzh-fill-2)',
        ])
    })

    it('shows the empty state without positive values', () => {
        render(<ProgressChart items={[{ value: null }]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
