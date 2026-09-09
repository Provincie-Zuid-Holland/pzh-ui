// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/**
 * pzh-charts — a dependency-free React/SVG chart library.
 *
 * Future standalone npm package (@pzh/charts): nothing in this folder may
 * import from the app (`@/…`, `next/*`) or use Tailwind classes.
 */

export { BarChart } from './components/barChart'
export { LineChart } from './components/lineChart'
export { GanttChart } from './components/ganttChart'
export { RangeChart } from './components/rangeChart'
export { ScatterChart } from './components/scatterChart'
export { HistogramChart } from './components/histogramChart'
export { ProgressChart } from './components/progressChart'
export { PieChart } from './components/pieChart'
export { SegmentChart } from './components/segmentChart'
export { GaugeChart } from './components/gaugeChart'
export { RadarChart } from './components/radarChart'
export { RadialChart } from './components/radialChart'
export { BubbleChart } from './components/bubbleChart'
export { defaultChartLabels } from './defaultLabels'
export {
    colorGroups,
    defaultTokens,
    highContrastTokens,
    stackedShades,
} from './tokens'
export type {
    AxisOptions,
    BarChartDatum,
    BarChartProps,
    BarChartSeries,
    BubbleChartProps,
    ChartBaseProps,
    ChartLabels,
    ChartViewMode,
    GanttChartItem,
    GanttChartProps,
    GaugeChartProps,
    HeadingLevel,
    HistogramChartItem,
    HistogramChartProps,
    HistogramThreshold,
    LineChartProps,
    LineChartSeries,
    PartItem,
    PieChartProps,
    ProgressChartProps,
    RadarChartProps,
    RadialChartProps,
    RangeChartProps,
    RangeItem,
    ReferenceLine,
    ScatterChartProps,
    SegmentChartProps,
} from './types'
