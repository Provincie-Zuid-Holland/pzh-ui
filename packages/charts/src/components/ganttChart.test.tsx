// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { GanttChart } from './ganttChart'

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
    title: 'Temperatuur per maand',
    valueLabel: 'Temperatuur in Celsius (°C)',
    items: [
        { label: 'Jan', start: -21, end: -1 },
        { label: 'Feb', start: 4, end: -11 },
        { label: 'Mrt', start: -7, end: 10, highlight: true, note: 'record' },
    ],
}

describe('GanttChart', () => {
    it('renders an accessible range chart with the value legend', () => {
        render(<GanttChart {...props} />)
        expect(
            screen.getByRole('group', {
                name: 'Temperatuur per maand: bereikdiagram',
            })
        ).toBeInTheDocument()
        expect(
            screen.getByText('Temperatuur in Celsius (°C)')
        ).toBeInTheDocument()
        expect(screen.getByText('Uitgelicht')).toBeInTheDocument()
    })

    it('gives every row a keyboard readout and swaps reversed ranges', () => {
        const { container } = render(<GanttChart {...props} />)
        const groups = container.querySelectorAll('.pzh-bar-group')
        expect(groups).toHaveLength(3)
        expect(groups[0].getAttribute('aria-label')).toBe('Jan — -21 tot -1')
        // Feb was passed reversed (4 → −11); normalize orders it.
        expect(groups[1].getAttribute('aria-label')).toBe('Feb — -11 tot 4')
        expect(groups[2].getAttribute('aria-label')).toContain('(record)')
    })

    it('renders highlighted rows with the highlight fill', () => {
        const { container } = render(<GanttChart {...props} />)
        const pills = container.querySelectorAll('rect.pzh-bar')
        expect(pills).toHaveLength(3)
        expect(
            (pills[2] as SVGElement).style.getPropertyValue('--pzh-bar-fill')
        ).toBe('var(--pzh-fill-highlight)')
    })

    it('shows the range table in the lijst view', async () => {
        const user = userEvent.setup()
        render(<GanttChart {...props} />)
        await user.click(screen.getByRole('radio', { name: 'Tabel' }))
        expect(
            screen.getByRole('rowheader', { name: 'Jan' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('cell', { name: /-21 tot -1/ })
        ).toBeInTheDocument()
    })

    it('generates a Dutch range summary', async () => {
        const user = userEvent.setup()
        render(<GanttChart {...props} />)
        await user.click(screen.getByRole('radio', { name: 'Samengevat' }))
        expect(
            screen.getByText(/De hoogste waarde is 10 \(Mrt\)/)
        ).toBeInTheDocument()
        expect(screen.getByText(/grootste bereik/)).toBeInTheDocument()
    })

    it('skips rows with unparseable values and shows an empty state when none remain', () => {
        render(<GanttChart items={[{ label: 'A', start: null, end: 4 }]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
