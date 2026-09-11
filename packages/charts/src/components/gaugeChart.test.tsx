// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { GaugeChart } from './gaugeChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

describe('GaugeChart', () => {
    it('fills the whole arc with parts when no max is set', () => {
        const { container } = render(
            <GaugeChart
                title="Niveau"
                headline="Niveau 2"
                items={[
                    { label: 'Niveau 1', value: 30 },
                    { label: 'Niveau 2', value: 30 },
                    { label: 'Niveau 3', value: 5 },
                ]}
            />
        )
        expect(
            screen.getByText('Niveau 2', { selector: '.pzh-headline' })
        ).toBeInTheDocument()
        expect(container.querySelectorAll('path.pzh-slice')).toHaveLength(3)
        // No max → no gray remainder track.
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(0)
        expect(
            container
                .querySelectorAll('.pzh-bar-group')[0]
                .getAttribute('aria-label')
        ).toBe('Niveau 1: 30 (46%)')
    })

    it('shows a gray remainder and defaults the headline to the percentage with max', () => {
        const { container } = render(
            <GaugeChart max={100} items={[{ label: 'Score', value: 90 }]} />
        )
        expect(container.querySelector('.pzh-headline')?.textContent).toBe(
            '90%'
        )
        expect(container.querySelectorAll('path.pzh-slice')).toHaveLength(1)
        expect(
            container.querySelectorAll('path[fill="var(--pzh-skeleton)"]')
        ).toHaveLength(1)
    })

    it('renders the legend and shares the tabel view', () => {
        render(
            <GaugeChart
                max={100}
                items={[
                    { label: 'Wind', value: 34 },
                    { label: 'Zon', value: 27 },
                ]}
            />
        )
        expect(screen.getByText('Wind')).toBeInTheDocument()
        expect(screen.getByText('Zon')).toBeInTheDocument()
    })

    it('shows the empty state without positive values', () => {
        render(<GaugeChart items={[]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
