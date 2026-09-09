// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { BubbleChart } from './bubbleChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const sectoren = {
    title: 'AI-bedrijven per sector',
    items: [
        { label: 'IT & software', value: 412 },
        { label: 'Zakelijke diensten', value: 288 },
        { label: 'Zorg', value: 122 },
    ],
}

describe('BubbleChart', () => {
    it('renders an accessible SVG with one focusable bubble per part', () => {
        const { container } = render(<BubbleChart {...sectoren} />)
        expect(
            screen.getByRole('group', {
                name: 'AI-bedrijven per sector: bubbeldiagram',
            })
        ).toBeInTheDocument()
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(3)
        expect(groups[0]).toHaveAttribute('tabindex', '0')
        expect(groups[0].getAttribute('aria-label')).toContain('IT & software')
        expect(groups[0].getAttribute('aria-label')).toContain('412')
        expect(groups[0].getAttribute('aria-label')).toContain('50%')
    })

    it('sizes bubbles by value: largest part gets the largest radius', () => {
        const { container } = render(<BubbleChart {...sectoren} />)
        const radii = [...container.querySelectorAll('circle.pzh-pop')].map(
            circle => Number(circle.getAttribute('r'))
        )
        expect(radii[0]).toBeGreaterThan(radii[1])
        expect(radii[1]).toBeGreaterThan(radii[2])
    })

    it('routes bubble fills through the pattern-capable fill vars', () => {
        const { container } = render(<BubbleChart {...sectoren} />)
        const fills = [...container.querySelectorAll('circle.pzh-pop')].map(
            circle => circle.getAttribute('fill')
        )
        expect(fills).toEqual([
            'var(--pzh-fill-1)',
            'var(--pzh-fill-2)',
            'var(--pzh-fill-3)',
        ])
    })

    it('shows a legend and a table view with percentages', async () => {
        const user = userEvent.setup()
        render(<BubbleChart {...sectoren} />)
        expect(screen.getByText('Zakelijke diensten')).toBeInTheDocument()
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(
            screen.getByRole('rowheader', { name: 'IT & software' })
        ).toBeInTheDocument()
        expect(screen.getByText(/50%/)).toBeInTheDocument()
    })

    it('renders the bubble skeleton while loading', () => {
        const { container } = render(
            <BubbleChart title="X" loading items={[]} />
        )
        expect(container.querySelector('.pzh-card')).toHaveAttribute(
            'aria-busy',
            'true'
        )
        expect(
            container.querySelectorAll('.pzh-skeleton').length
        ).toBeGreaterThan(3)
    })

    it('renders an empty state without positive values', () => {
        render(<BubbleChart items={[{ value: null }, { value: -5 }]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
