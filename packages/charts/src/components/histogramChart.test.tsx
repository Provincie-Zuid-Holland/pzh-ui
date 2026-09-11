// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { HistogramChart } from './histogramChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

// 0..9 uniform, ×10 → 40 values
const values = Array.from({ length: 40 }, (_, index) => index % 10)

describe('HistogramChart', () => {
    it('renders binned bars with an accessible name', () => {
        const { container } = render(
            <HistogramChart title="Reistijd" values={values} bins={5} />
        )
        expect(
            screen.getByRole('group', { name: 'Reistijd: histogram' })
        ).toBeInTheDocument()
        expect(container.querySelectorAll('rect.pzh-bar')).toHaveLength(5)
    })

    it('colors fuller bins darker on the sequential ramp', () => {
        // 30 low values, 10 high → first bin fullest.
        const skewed = [
            ...Array.from({ length: 30 }, () => 1),
            ...Array.from({ length: 10 }, () => 9),
        ]
        const { container } = render(
            <HistogramChart values={skewed} bins={2} />
        )
        const bars = [
            ...container.querySelectorAll('rect.pzh-bar'),
        ] as SVGElement[]
        expect(bars[0].style.getPropertyValue('--pzh-bar-fill')).toBe(
            'var(--pzh-fill-seq-4)'
        )
        expect(bars[1].style.getPropertyValue('--pzh-bar-fill')).toBe(
            'var(--pzh-fill-seq-2)'
        )
    })

    it('reads out bin range and count per group', () => {
        const { container } = render(
            <HistogramChart values={values} bins={5} />
        )
        const group = container.querySelector('.pzh-bar-group')
        expect(group?.getAttribute('aria-label')).toMatch(/Aantal: 8/)
    })

    it('shows bins and counts in the lijst view', async () => {
        const user = userEvent.setup()
        render(<HistogramChart values={values} bins={5} />)
        await user.click(screen.getByRole('radio', { name: 'Tabel' }))
        expect(screen.getAllByRole('rowheader')).toHaveLength(5)
        expect(screen.getAllByRole('cell')[0].textContent).toContain('8')
    })

    it('summarizes total and modal class in Dutch', async () => {
        const user = userEvent.setup()
        render(<HistogramChart values={values} bins={5} />)
        await user.click(screen.getByRole('radio', { name: 'Samengevat' }))
        expect(
            screen.getByText(/In totaal zijn er 40 waarnemingen/)
        ).toBeInTheDocument()
    })

    it('shows the empty state without values', () => {
        render(<HistogramChart values={[]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })

    it('renders pre-aggregated items with threshold status colors and a legend', () => {
        const { container } = render(
            <HistogramChart
                title="Overbezetting"
                items={[
                    { label: '8:00', value: 18 },
                    { label: '12:00', value: 37 },
                    { label: '13:30', value: 28 },
                ]}
                thresholds={[
                    { upTo: 25, label: 'Laag' },
                    { upTo: 31, label: 'Middel' },
                    { label: 'Hoog' },
                ]}
            />
        )
        expect(screen.getByText('Laag')).toBeInTheDocument()
        expect(screen.getByText('Middel')).toBeInTheDocument()
        expect(screen.getByText('Hoog')).toBeInTheDocument()
        const bars = [
            ...container.querySelectorAll('rect.pzh-bar'),
        ] as SVGElement[]
        expect(bars[0].style.getPropertyValue('--pzh-bar-fill')).toBe(
            'var(--pzh-fill-status-1)'
        )
        expect(bars[1].style.getPropertyValue('--pzh-bar-fill')).toBe(
            'var(--pzh-fill-status-3)'
        )
        expect(bars[2].style.getPropertyValue('--pzh-bar-fill')).toBe(
            'var(--pzh-fill-status-2)'
        )
        // Direct mode reads out label + value.
        expect(
            container
                .querySelector('.pzh-bar-group')
                ?.getAttribute('aria-label')
        ).toBe('8:00 — Aantal: 18')
    })

    it('summarizes direct mode with highest and lowest labels', async () => {
        const user = userEvent.setup()
        render(
            <HistogramChart
                items={[
                    { label: '8:00', value: 18 },
                    { label: '12:00', value: 37 },
                ]}
            />
        )
        await user.click(screen.getByRole('radio', { name: 'Samengevat' }))
        expect(
            screen.getByText(/De hoogste waarde is 37 \(12:00\)/)
        ).toBeInTheDocument()
    })
})
