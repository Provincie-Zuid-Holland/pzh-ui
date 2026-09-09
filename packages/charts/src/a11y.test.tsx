// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/**
 * Automated WCAG regression: every chart type runs through axe-core in all
 * three views and in high contrast. jsdom disables axe's color-contrast rule
 * automatically — contrast is asserted separately in tokens.test.ts.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import {
    BarChart,
    BubbleChart,
    GanttChart,
    GaugeChart,
    HistogramChart,
    LineChart,
    PieChart,
    ProgressChart,
    RadarChart,
    RadialChart,
    RangeChart,
    ScatterChart,
    SegmentChart,
} from './index'

beforeAll(() => {
    class ResizeObserverStub {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver =
        ResizeObserverStub as unknown as typeof ResizeObserver
})

const categories = ['Rotterdam', 'Den Haag', 'Delft']
const series = [
    { label: 'Nieuw', data: [100, 90, 40] },
    { label: 'Refurbished', data: [38, 150, 60] },
]
const items = [
    { label: 'IT', value: 412 },
    { label: 'Zorg', value: 244 },
    { label: 'Onderwijs', value: 120 },
]
const ranges = [
    { label: 'Jan', start: -5, end: 8 },
    { label: 'Feb', start: -2, end: 11 },
    { label: 'Mrt', start: 1, end: 14 },
]

const CHARTS: Array<[string, () => React.ReactElement]> = [
    [
        'BarChart',
        () => <BarChart title="Bar" categories={categories} series={series} />,
    ],
    [
        'BarChart stacked horizontal',
        () => (
            <BarChart
                title="Stacked"
                categories={categories}
                series={series}
                stacked
                horizontal
            />
        ),
    ],
    [
        'LineChart',
        () => (
            <LineChart title="Line" categories={categories} series={series} />
        ),
    ],
    [
        'ScatterChart',
        () => (
            <ScatterChart
                title="Scatter"
                categories={categories}
                series={series}
            />
        ),
    ],
    [
        'RadarChart',
        () => (
            <RadarChart title="Radar" categories={categories} series={series} />
        ),
    ],
    ['RangeChart', () => <RangeChart title="Range" items={ranges} />],
    ['GanttChart', () => <GanttChart title="Gantt" items={ranges} />],
    [
        'HistogramChart',
        () => (
            <HistogramChart
                title="Histogram"
                values={[1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7, 8]}
            />
        ),
    ],
    [
        'ProgressChart',
        () => (
            <ProgressChart
                title="Progress"
                items={[{ label: 'Breed', value: 82 }]}
            />
        ),
    ],
    ['PieChart', () => <PieChart title="Pie" items={items} />],
    [
        'PieChart donut',
        () => <PieChart title="Donut" donut headline="776" items={items} />,
    ],
    ['SegmentChart', () => <SegmentChart title="Segment" items={items} />],
    ['GaugeChart', () => <GaugeChart title="Gauge" items={items} />],
    [
        'RadialChart',
        () => <RadialChart title="Radial" max={500} items={items} />,
    ],
    [
        'RadialChart stacked',
        () => (
            <RadialChart
                title="Radial stacked"
                stacked
                max={1000}
                items={items}
            />
        ),
    ],
    ['BubbleChart', () => <BubbleChart title="Bubble" items={items} />],
]

describe.each(CHARTS)('%s', (_name, make) => {
    it('passes axe in the visual view', async () => {
        const { container } = render(make())
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe in the tabel view', async () => {
        const user = userEvent.setup()
        const { container } = render(make())
        await user.selectOptions(screen.getByLabelText('Weergave'), 'textual')
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe in the samengevat view', async () => {
        const user = userEvent.setup()
        const { container } = render(make())
        await user.selectOptions(screen.getByLabelText('Weergave'), 'summary')
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe in high contrast', async () => {
        const user = userEvent.setup()
        const { container } = render(make())
        await user.click(screen.getByRole('button', { name: 'Hoog contrast' }))
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe while loading (skeleton)', async () => {
        const { container } = render(
            <BarChart title="Loading" categories={[]} series={[]} loading />
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
