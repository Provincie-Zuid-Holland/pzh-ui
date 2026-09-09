// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { RadialChart } from './radialChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const bronnen = [
    { label: 'Wind', value: 34 },
    { label: 'Zon', value: 27 },
]

describe('RadialChart', () => {
    it('gives every part its own ring and gray track, measured against max', () => {
        const { container } = render(
            <RadialChart title="Doelbereik" max={100} items={bronnen} />
        )
        expect(
            screen.getByRole('group', { name: 'Doelbereik: ringdiagram' })
        ).toBeInTheDocument()
        expect(container.querySelectorAll('path.pzh-slice')).toHaveLength(2)
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(2)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups[0].getAttribute('aria-label')).toBe(
            'Wind: 34 van 100 (34%)'
        )
        expect(groups[1].getAttribute('aria-label')).toBe(
            'Zon: 27 van 100 (27%)'
        )
        expect(
            container.querySelector('.pzh-center-headline')?.textContent
        ).toBe('61%')
    })

    it('lays the parts end to end in one ring when stacked', () => {
        const { container } = render(
            <RadialChart
                stacked
                max={100}
                items={[
                    { label: 'Af', value: 60 },
                    { label: 'Loopt', value: 20 },
                ]}
            />
        )
        expect(container.querySelectorAll('path.pzh-slice')).toHaveLength(2)
        // One shared ring, so one remainder track for the missing 20%.
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(1)
        expect(
            container.querySelector('.pzh-center-headline')?.textContent
        ).toBe('80%')
    })

    it('scales rings to the largest part and drops the headline without max', () => {
        const { container } = render(
            <RadialChart
                items={[
                    { label: 'A', value: 50 },
                    { label: 'B', value: 25 },
                ]}
            />
        )
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups[0].getAttribute('aria-label')).toBe('A: 50 (100%)')
        expect(groups[1].getAttribute('aria-label')).toBe('B: 25 (50%)')
        expect(container.querySelector('.pzh-center-headline')).toBeNull()
    })

    it('falls back to one stacked ring past the readable ring count', () => {
        const { container } = render(
            <RadialChart
                max={100}
                items={Array.from({ length: 6 }, (_, index) => ({
                    label: `R${index}`,
                    value: 5,
                }))}
            />
        )
        expect(container.querySelectorAll('path.pzh-slice')).toHaveLength(6)
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(1)
    })

    it('draws an empty ring at 0% of a max instead of the empty state', () => {
        const { container } = render(
            <RadialChart max={100} items={[{ label: 'Score', value: 0 }]} />
        )
        expect(screen.queryByText('Geen gegevens beschikbaar.')).toBeNull()
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(1)
        expect(
            container.querySelector('.pzh-center-headline')?.textContent
        ).toBe('0%')
        expect(
            container
                .querySelector('.pzh-bar-group')
                ?.getAttribute('aria-label')
        ).toBe('Score: 0 van 100 (0%)')
    })

    it('shows the tooltip on focus and dismisses it with Escape', () => {
        const { container } = render(<RadialChart max={100} items={bronnen} />)
        const group = container.querySelectorAll('.pzh-bar-group')[0]
        fireEvent.focus(group)
        expect(container.querySelector('.pzh-tooltip')?.textContent).toContain(
            'Wind'
        )
        fireEvent.keyDown(group, { key: 'Escape' })
        expect(container.querySelector('.pzh-tooltip')).toBeNull()
    })

    it('shows the ring percentages in the tabel view, not the share of the total', async () => {
        const user = userEvent.setup()
        render(<RadialChart max={100} items={bronnen} />)
        expect(screen.getByText('Wind')).toBeInTheDocument()
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        expect(
            screen.getByRole('rowheader', { name: 'Wind' })
        ).toBeInTheDocument()
        expect(screen.getByText(/34%/)).toBeInTheDocument()
        expect(screen.getByText(/27%/)).toBeInTheDocument()
    })

    it('renders the ring skeleton while loading, in the header layout that wraps', () => {
        const { container } = render(
            <RadialChart title="X" loading items={[]} />
        )
        expect(container.querySelector('.pzh-card')).toHaveAttribute(
            'aria-busy',
            'true'
        )
        expect(
            container.querySelectorAll('.pzh-skeleton').length
        ).toBeGreaterThan(2)
        // Same wrapping header as the loaded card, so narrow cards do not overflow.
        expect(
            container.querySelector('header.pzh-header .pzh-header-text')
        ).not.toBeNull()
        expect(
            container.querySelector('header.pzh-header .pzh-controls')
        ).not.toBeNull()
    })

    it('shows an empty state without positive values and without a max', () => {
        render(<RadialChart items={[{ value: null }, { value: -5 }]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
