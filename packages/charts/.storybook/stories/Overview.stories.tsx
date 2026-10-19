// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { FC } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
} from '../../src/index'
import type { ChartViewMode } from '../../src/types'

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

type Shared = { initialViewMode?: ChartViewMode; initialHighContrast?: boolean }

/** Every chart type on one page, so a change of shell or tokens is visible at a glance. */
const Gallery: FC<Shared> = shared => (
    <div
        style={{
            display: 'grid',
            gap: 32,
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            width: '100%',
        }}>
        <BarChart
            title="Staafdiagram"
            categories={categories}
            series={series}
            {...shared}
        />
        <BarChart
            title="Gestapeld, horizontaal"
            categories={categories}
            series={series}
            stacked
            horizontal
            {...shared}
        />
        <LineChart
            title="Lijndiagram"
            categories={categories}
            series={series}
            {...shared}
        />
        <ScatterChart
            title="Spreidingsdiagram"
            categories={categories}
            series={series}
            {...shared}
        />
        <RadarChart
            title="Radardiagram"
            categories={categories}
            series={series}
            {...shared}
        />
        <RangeChart title="Bereikdiagram" items={ranges} {...shared} />
        <GanttChart title="Gantt" items={ranges} {...shared} />
        <HistogramChart
            title="Histogram"
            values={[1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7, 8]}
            {...shared}
        />
        <ProgressChart
            title="Voortgang"
            items={[{ label: 'Breed', value: 82 }]}
            {...shared}
        />
        <PieChart title="Cirkeldiagram" items={items} {...shared} />
        <PieChart
            title="Ring (donut)"
            donut
            headline="776"
            items={items}
            {...shared}
        />
        <SegmentChart title="Segmenten" items={items} {...shared} />
        <GaugeChart title="Meter" items={items} {...shared} />
        <RadialChart title="Ringdiagram" max={500} items={items} {...shared} />
        <RadialChart
            title="Ring, gestapeld"
            stacked
            max={1000}
            items={items}
            {...shared}
        />
        <BubbleChart title="Bubbeldiagram" items={items} {...shared} />
    </div>
)

const meta = {
    title: 'Overview/Gallery',
    component: Gallery,
    parameters: { layout: 'fullscreen' },
    // The gallery is a layout, not a component: its own props are the shared ones.
    decorators: [Story => <div style={{ padding: 24 }}>{<Story />}</div>],
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

/** All sixteen configurations in the visual view. */
export const AllCharts: Story = { args: {} }

/** One snapshot covering every high-contrast pattern the library defines. */
export const HighContrast: Story = { args: { initialHighContrast: true } }

/** The tabel view: the conformant equivalent of every chart on the page. */
export const TableView: Story = { args: { initialViewMode: 'textual' } }

/** The generated Dutch prose summary for each chart. */
export const SummaryView: Story = { args: { initialViewMode: 'summary' } }
