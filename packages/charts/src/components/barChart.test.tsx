// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { highContrastTokens } from '../tokens'
import { BarChart } from './barChart'

beforeAll(() => {
    // jsdom has no ResizeObserver; the chart falls back to its default width.
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const singleSeries = {
    title: 'Aantal AI-bedrijven',
    subtitle: 'Per gemeente, 2025',
    categories: ['Rotterdam', 'Den Haag', 'Delft'],
    series: [
        {
            data: [
                { value: '412', highlight: true, note: '18%' },
                { value: '230' },
                { value: '120' },
            ],
        },
    ],
}

const groupedSeries = {
    title: 'Verkochte telefoons',
    categories: ['2024', '2025'],
    series: [
        { label: 'Nieuw', data: [100, 90] },
        { label: 'Refurbished', data: [38, 150] },
    ],
}

describe('BarChart', () => {
    it('renders title, subtitle and an accessible SVG', () => {
        render(<BarChart {...singleSeries} />)
        expect(screen.getByText('Aantal AI-bedrijven')).toBeInTheDocument()
        expect(screen.getByText('Per gemeente, 2025')).toBeInTheDocument()
        expect(
            screen.getByRole('group', {
                name: 'Aantal AI-bedrijven: staafdiagram',
            })
        ).toBeInTheDocument()
    })

    it('shows a highlight legend for a single series with highlighted bars', () => {
        render(<BarChart {...singleSeries} />)
        expect(screen.getByText('Uitgelicht')).toBeInTheDocument()
    })

    it('shows a series legend for grouped data', () => {
        render(<BarChart {...groupedSeries} />)
        expect(screen.getByText('Nieuw')).toBeInTheDocument()
        expect(screen.getByText('Refurbished')).toBeInTheDocument()
    })

    it('renders no legend for a single series without highlights', () => {
        const { container } = render(
            <BarChart categories={['A', 'B']} series={[{ data: [1, 2] }]} />
        )
        expect(container.querySelector('.pzh-legend')).toBeNull()
    })

    it('switches to the tabel view: header row carries the legend dots', async () => {
        const user = userEvent.setup()
        const { container } = render(<BarChart {...groupedSeries} />)
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(
            screen.getByRole('rowheader', { name: '2024' })
        ).toBeInTheDocument()
        // The header row names each series with its legend dot.
        expect(
            screen.getByRole('columnheader', { name: 'Nieuw' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('columnheader', { name: 'Refurbished' })
        ).toBeInTheDocument()
        expect(container.querySelectorAll('thead .pzh-swatch')).toHaveLength(2)
        expect(screen.getByRole('cell', { name: '150' })).toBeInTheDocument()
        // Plain cells carry no dots — identity lives in the header now,
        // so the separate legend disappears in the tabel view.
        expect(container.querySelectorAll('td .pzh-swatch')).toHaveLength(0)
        expect(container.querySelector('.pzh-legend')).toBeNull()
        expect(container.querySelector('.pzh-svg')).toBeNull()
    })

    it('switches to the generated Dutch summary view', async () => {
        const user = userEvent.setup()
        render(
            <BarChart
                categories={['2022', '2024']}
                series={[{ data: [100, 400] }]}
            />
        )
        await user.selectOptions(screen.getByLabelText('Weergave'), 'summary')
        expect(
            screen.getByText(/gestegen van 100 naar 400/)
        ).toBeInTheDocument()
    })

    it('prefers the summary prop over the generated text', async () => {
        const user = userEvent.setup()
        render(
            <BarChart
                categories={['A']}
                series={[{ data: [1] }]}
                summary="Handgeschreven samenvatting."
            />
        )
        await user.selectOptions(screen.getByLabelText('Weergave'), 'summary')
        expect(
            screen.getByText('Handgeschreven samenvatting.')
        ).toBeInTheDocument()
    })

    it('flips high-contrast tokens on the card root via aria-pressed toggle', async () => {
        const user = userEvent.setup()
        const { container } = render(<BarChart {...singleSeries} />)
        const toggle = screen.getByRole('button', { name: 'Hoog contrast' })
        expect(toggle).toHaveAttribute('aria-pressed', 'false')
        await user.click(toggle)
        expect(toggle).toHaveAttribute('aria-pressed', 'true')
        const card = container.querySelector('.pzh-card') as HTMLElement
        expect(card.style.getPropertyValue('--pzh-bar')).toBe(
            highContrastTokens.bar
        )
        expect(card.style.getPropertyValue('--pzh-series-1')).toBe(
            highContrastTokens.series[0]
        )
    })

    it('renders skeletons with aria-busy while loading', () => {
        const { container } = render(<BarChart {...singleSeries} loading />)
        const card = container.querySelector('.pzh-card') as HTMLElement
        expect(card).toHaveAttribute('aria-busy', 'true')
        expect(screen.queryByText('Aantal AI-bedrijven')).toBeNull()
        expect(screen.getByRole('status')).toHaveTextContent('Aan het laden…')
        expect(
            container.querySelectorAll('.pzh-skeleton').length
        ).toBeGreaterThan(5)
    })

    it('gives every category a keyboard-focusable readout', () => {
        const { container } = render(<BarChart {...singleSeries} />)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(3)
        expect(groups[0]).toHaveAttribute('tabindex', '0')
        expect(groups[0].getAttribute('aria-label')).toContain('Rotterdam')
        expect(groups[0].getAttribute('aria-label')).toContain('412')
        expect(groups[0].getAttribute('aria-label')).toContain('18%')
    })

    it('stacks series into one cumulative bar per category when stacked', () => {
        const { container } = render(<BarChart {...groupedSeries} stacked />)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(2)
        const segments = groups[0].querySelectorAll('rect.pzh-bar')
        expect(segments).toHaveLength(2)
        // Segments share one column: same x, non-overlapping vertical spans.
        expect(segments[0].getAttribute('x')).toBe(
            segments[1].getAttribute('x')
        )
        expect(groups[0].getAttribute('aria-label')).toContain('Totaal: 138')
    })

    it('renders horizontal bars as paths anchored at the value baseline', () => {
        const { container } = render(<BarChart {...singleSeries} horizontal />)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(3)
        // Horizontal bars are paths with the grow-from-left animation class.
        const bars = container.querySelectorAll('path.pzh-bar.pzh-bar-h')
        expect(bars).toHaveLength(3)
        expect(groups[0].getAttribute('aria-label')).toContain('Rotterdam')
    })

    it('stacks horizontally into one row of segments per category', () => {
        const { container } = render(
            <BarChart {...groupedSeries} horizontal stacked />
        )
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(2)
        const segments = groups[0].querySelectorAll('rect.pzh-bar')
        expect(segments).toHaveLength(2)
        // Segments share one row: same y, sequential x spans.
        expect(segments[0].getAttribute('y')).toBe(
            segments[1].getAttribute('y')
        )
        const firstEnd =
            Number(segments[0].getAttribute('x')) +
            Number(segments[0].getAttribute('width'))
        expect(Number(segments[1].getAttribute('x'))).toBeGreaterThanOrEqual(
            firstEnd
        )
        expect(groups[0].getAttribute('aria-label')).toContain('Totaal: 138')
    })

    it('renders an empty state for data without values', () => {
        render(<BarChart categories={['A']} series={[{ data: [null] }]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
