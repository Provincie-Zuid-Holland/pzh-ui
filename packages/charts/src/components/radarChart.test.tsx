// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { RadarChart } from './radarChart'

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
    title: 'Brede welvaart',
    categories: [
        'Wonen',
        'Werk',
        'Milieu',
        'Veiligheid',
        'Gezondheid',
        'Onderwijs',
    ],
    series: [
        { label: 'Zuid-Holland', data: [7, 8, 5, 6, 7, 8] },
        { label: 'Landelijk', data: [6, 7, 6, 7, 6, 7] },
    ],
}

describe('RadarChart', () => {
    it('renders one closed polygon pair per series over six spokes', () => {
        const { container } = render(<RadarChart {...props} />)
        expect(
            screen.getByRole('group', { name: 'Brede welvaart: radardiagram' })
        ).toBeInTheDocument()
        // Fill + stroke path per series.
        const polygons = [...container.querySelectorAll('path')].filter(
            path =>
                path.getAttribute('d')?.endsWith('Z') &&
                path.getAttribute('d')?.split('L').length === 6
        )
        expect(polygons.length).toBeGreaterThanOrEqual(4)
        expect(container.querySelectorAll('.pzh-line-group')).toHaveLength(6)
        expect(screen.getByText('Wonen')).toBeInTheDocument()
    })

    it('reads out every series per spoke', () => {
        const { container } = render(<RadarChart {...props} />)
        expect(
            container
                .querySelectorAll('.pzh-line-group')[1]
                .getAttribute('aria-label')
        ).toBe('Werk — Zuid-Holland: 8, Landelijk: 7')
    })

    it('renders the series legend', () => {
        render(<RadarChart {...props} />)
        expect(screen.getByText('Zuid-Holland')).toBeInTheDocument()
        expect(screen.getByText('Landelijk')).toBeInTheDocument()
    })

    it('shows an empty state below three categories', () => {
        render(
            <RadarChart categories={['A', 'B']} series={[{ data: [1, 2] }]} />
        )
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
