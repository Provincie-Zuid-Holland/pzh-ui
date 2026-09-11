// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { RangeChart } from './rangeChart'

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
    title: 'Leeftijd van personeel',
    valueLabel: 'Leeftijd range',
    items: [
        { label: '8:00', start: 43, end: 53 },
        { label: '8:10', start: 41, end: 55 },
        { label: '8:20', start: 42, end: 53, highlight: true },
    ],
}

describe('RangeChart', () => {
    it('renders an accessible vertical range chart with the value legend', () => {
        render(<RangeChart {...props} />)
        expect(
            screen.getByRole('group', {
                name: 'Leeftijd van personeel: bereikdiagram',
            })
        ).toBeInTheDocument()
        expect(screen.getByText('Leeftijd range')).toBeInTheDocument()
        expect(screen.getByText('Uitgelicht')).toBeInTheDocument()
    })

    it('renders one pill per item spanning min to max', () => {
        const { container } = render(<RangeChart {...props} />)
        const pills = container.querySelectorAll('rect.pzh-bar')
        expect(pills).toHaveLength(3)
        const first = pills[0]
        expect(Number(first.getAttribute('height'))).toBeGreaterThan(0)
        expect(
            (pills[2] as SVGElement).style.getPropertyValue('--pzh-bar-fill')
        ).toBe('var(--pzh-fill-highlight)')
    })

    it('reads out ranges per column and shares the range table', async () => {
        const user = userEvent.setup()
        const { container } = render(<RangeChart {...props} />)
        expect(
            container
                .querySelectorAll('.pzh-bar-group')[0]
                ?.getAttribute('aria-label')
        ).toBe('8:00 — 43 tot 53')
        await user.click(screen.getByRole('radio', { name: 'Tabel' }))
        expect(
            screen.getByRole('rowheader', { name: '8:10' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: /41 tot 55/ })
        ).toBeInTheDocument()
    })

    it('shows an empty state without valid items', () => {
        render(<RangeChart items={[]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
