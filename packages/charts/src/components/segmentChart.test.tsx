// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { SegmentChart } from './segmentChart'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const euro = (value: number) =>
    `€${new Intl.NumberFormat('nl-NL').format(value)}`

describe('SegmentChart', () => {
    it('defaults the headline to the formatted total, split across legend items', () => {
        render(
            <SegmentChart
                valueFormatter={euro}
                items={[
                    { label: 'Infrastructuur', value: 10401251 },
                    { label: 'Dienstverlening', value: 1603105 },
                ]}
            />
        )
        expect(screen.getByText('€12.004.356')).toBeInTheDocument()
        expect(screen.getByText('Infrastructuur')).toBeInTheDocument()
        expect(screen.getByText('Dienstverlening')).toBeInTheDocument()
    })

    it('accepts a headline override like 100%', () => {
        render(<SegmentChart headline="100%" items={[{ value: 1 }]} />)
        expect(screen.getByText('100%')).toBeInTheDocument()
    })

    it('renders proportional segments in order with readouts', () => {
        const { container } = render(
            <SegmentChart
                items={[
                    { label: 'Groot', value: 80 },
                    { label: 'Klein', value: 20 },
                ]}
            />
        )
        const segments = [...container.querySelectorAll('rect.pzh-bar')]
        expect(segments).toHaveLength(2)
        expect(Number(segments[0].getAttribute('width'))).toBeGreaterThan(
            Number(segments[1].getAttribute('width'))
        )
        expect(Number(segments[1].getAttribute('x'))).toBeGreaterThan(
            Number(segments[0].getAttribute('width'))
        )
        expect(
            container
                .querySelectorAll('.pzh-bar-group')[0]
                .getAttribute('aria-label')
        ).toBe('Groot: 80 (80%)')
    })

    it('shows the empty state without positive values', () => {
        render(<SegmentChart items={[]} />)
        expect(
            screen.getByText('Geen gegevens beschikbaar.')
        ).toBeInTheDocument()
    })
})
