// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { LineChart } from './lineChart'

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
    title: 'Veestapel',
    subtitle: 'Per maand',
    categories: ['Jan', 'Feb', 'Mrt', 'Apr'],
    series: [
        { label: 'Koeien', data: [55, 88, 62, 55] },
        { label: 'Schapen', data: [70, 100, 78, 72], dashFromIndex: 2 },
    ],
    referenceLine: { value: 65, label: 'Landelijk maximum' },
}

describe('LineChart', () => {
    it('renders an accessible line chart with legend', () => {
        render(<LineChart {...props} />)
        expect(
            screen.getByRole('group', { name: 'Veestapel: lijndiagram' })
        ).toBeInTheDocument()
        expect(screen.getByText('Koeien')).toBeInTheDocument()
        expect(screen.getByText('Schapen')).toBeInTheDocument()
    })

    it('draws smooth line paths and soft area fills per series', () => {
        const { container } = render(<LineChart {...props} />)
        const lines = container.querySelectorAll('path.pzh-line')
        expect(lines.length).toBeGreaterThanOrEqual(2)
        for (const line of lines) {
            expect(line.getAttribute('d')).toContain('C')
        }
        const areas = container.querySelectorAll('path[fill-opacity]')
        expect(areas).toHaveLength(2)
    })

    it('dashes the forecast tail from dashFromIndex onward', () => {
        const { container } = render(<LineChart {...props} />)
        const dashed = container.querySelectorAll(
            'path.pzh-line[stroke-dasharray]'
        )
        expect(dashed).toHaveLength(1)
        // Solid part of the dashed series covers 2 intervals, dashed the remaining 1.
        expect(dashed[0].getAttribute('d')?.match(/C/g)).toHaveLength(1)
    })

    it('can disable the area fill per series', () => {
        const { container } = render(
            <LineChart
                {...props}
                series={[{ label: 'Koeien', data: [1, 2, 3, 4], area: false }]}
            />
        )
        expect(container.querySelectorAll('path[fill-opacity]')).toHaveLength(0)
    })

    it('renders the labeled reference line', () => {
        const { container } = render(<LineChart {...props} />)
        expect(screen.getByText('Landelijk maximum')).toBeInTheDocument()
        expect(
            container.querySelector('line[stroke-dasharray="3 4"]')
        ).not.toBeNull()
    })

    it('gives every category a keyboard-focusable readout', () => {
        const { container } = render(<LineChart {...props} />)
        const groups = container.querySelectorAll('.pzh-line-group')
        expect(groups).toHaveLength(4)
        expect(groups[1].getAttribute('aria-label')).toBe(
            'Feb — Koeien: 88, Schapen: 100'
        )
    })

    it('shares the table and summary views', async () => {
        const user = userEvent.setup()
        render(<LineChart {...props} />)
        await user.click(screen.getByRole('radio', { name: 'Tabel' }))
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(
            screen.getByRole('rowheader', { name: 'Feb' })
        ).toBeInTheDocument()
    })

    it('renders a line-shaped skeleton while loading', () => {
        const { container } = render(<LineChart {...props} loading />)
        const card = container.querySelector('.pzh-card') as HTMLElement
        expect(card).toHaveAttribute('aria-busy', 'true')
        expect(container.querySelector('svg.pzh-pulse')).not.toBeNull()
    })
})
