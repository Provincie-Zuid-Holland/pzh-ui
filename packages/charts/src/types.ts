// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/**
 * Public types of the pzh-charts library.
 *
 * This folder is a future standalone npm package (@pzh/charts): it must not
 * import from the surrounding app (no `@/…`, no `next/*`, no Tailwind classes).
 */

export type BarChartDatum = {
    /** Strings are parsed with Number() — CMS content delivers numbers as strings. */
    value: number | string | null
    highlight?: boolean
    note?: string
}

export type BarChartSeries = {
    /** Legend label; optional for a single unnamed series. */
    label?: string
    /** Overrides the palette color for this series (ignored in high-contrast mode). */
    color?: string
    data: Array<BarChartDatum | number | string | null>
}

export type ChartViewMode = 'visual' | 'textual' | 'summary'

/** UI copy. Dutch defaults — override for other languages; the library has no i18n dependency. */
export type ChartLabels = {
    viewModeLabel: string
    visual: string
    textual: string
    summary: string
    highContrast: string
    valueHeader: string
    highlightLabel: string
    totalLabel: string
    /** Joins range ends: '−21 tot −1'. */
    rangeTo: string
    /** Table/tooltip header for histogram counts. */
    countLabel: string
    /** Fallback header for the table's category column. */
    categoryHeader: string
    loading: string
    chartRole: string
    emptyState: string
    /** BCP 47 tag matching the labels' language, set on the card root. */
    lang: string
}

export type AxisOptions = {
    min?: number
    max?: number
    stepSize?: number
    /** Caption under the x axis. */
    xLabel?: string
    /** Caption along the y axis. */
    yLabel?: string
    /** Y tick formatting, nl-NL. Default 'compact' (1,2 mln). */
    tickFormat?: 'plain' | 'compact'
    /**
     * Caps a bar chart's value axis here and marks any bar that runs past it
     * with a break, printing its real value beside the mark. For one outlier
     * that would otherwise flatten every other bar. The full value stays in the
     * readout, the tooltip and the tabel view, so nothing is hidden — only the
     * bar is shortened.
     */
    breakAbove?: number
}

/** Props every chart card shares, independent of chart type. */
/** Heading level of the card title; pick the one that fits the page outline. */
export type HeadingLevel = 2 | 3 | 4 | 5 | 6

export type ChartBaseProps = {
    /** X-axis labels; series[i].data aligns with these by index. */
    categories: string[]
    title?: string
    subtitle?: string
    /** Level of the title heading so the card slots into the page outline. Default 2. */
    headingLevel?: HeadingLevel
    /** Renders skeleton placeholders for title, subtitle, chart and legend. */
    loading?: boolean
    axis?: AxisOptions
    /** Default series colors (ignored in high-contrast mode). */
    palette?: string[]
    /** Formats values in tooltips, table and summary. Default nl-NL number format. */
    valueFormatter?: (value: number) => string
    /** Hand-written text for the 'samengevat' view; overrides the auto-generated summary. */
    summary?: string
    initialViewMode?: ChartViewMode
    initialHighContrast?: boolean
    labels?: Partial<ChartLabels>
    /** Chart area height in px. Default 280. */
    height?: number
    className?: string
    /** Used for aria wiring; falls back to useId(). */
    id?: string
}

export type BarChartProps = ChartBaseProps & {
    /** One series renders simple bars, more render grouped bars. */
    series: BarChartSeries[]
    /**
     * Stacks multiple series into one cumulative bar per category
     * (series[0] sits at the baseline). Negative values are not supported
     * in stacked mode and are left out.
     */
    stacked?: boolean
    /**
     * Renders bars left-to-right with category labels on the y axis.
     * Combines with grouped and stacked data alike.
     */
    horizontal?: boolean
    /** Color for `highlight: true` bars (ignored in high-contrast mode). */
    highlightColor?: string
    /** Legend entry shown when any datum is highlighted. */
    highlightLabel?: string
}

export type LineChartSeries = BarChartSeries & {
    /**
     * Renders the line dashed from this data index onward — for forecasts
     * or provisional values (same semantics as the CMS dashFromIndex).
     */
    dashFromIndex?: number
    /** Soft area fill under the line. Default true. */
    area?: boolean
}

/** A dashed horizontal threshold with an optional inline label. */
export type ReferenceLine = {
    value: number | string
    label?: string
}

export type LineChartProps = ChartBaseProps & {
    series: LineChartSeries[]
    /** E.g. a norm or national maximum, drawn as a labeled dashed line. */
    referenceLine?: ReferenceLine
}

/** One min–max range per category, for RangeChart / GanttChart. */
export type RangeItem = {
    /** Category label (y axis when horizontal, x axis when vertical). */
    label: string
    start: number | string | null
    end: number | string | null
    note?: string
    highlight?: boolean
}

/** Back-compat alias; GanttChart is RangeChart preset to horizontal. */
export type GanttChartItem = RangeItem

/**
 * Min–max range pills per category. Vertical columns by default (age range
 * per time slot); `horizontal` renders rows — the classic Gantt planning
 * look (task start/end on a numeric axis; dates map to numbers).
 */
export type RangeChartProps = Omit<ChartBaseProps, 'categories'> & {
    items: RangeItem[]
    /** Rows left-to-right instead of vertical columns. */
    horizontal?: boolean
    /** Legend entry naming the value, e.g. 'Temperatuur in Celsius (°C)'. */
    valueLabel?: string
    /** Legend entry for highlighted ranges. */
    highlightLabel?: string
}

/** Props of the GanttChart preset — RangeChart with `horizontal` fixed on. */
export type GanttChartProps = Omit<RangeChartProps, 'horizontal'>

export type ScatterChartProps = ChartBaseProps & {
    series: BarChartSeries[]
    /** Draws a least-squares regression line per series. Default true. */
    trendLine?: boolean
}

/**
 * Value classes for threshold coloring: a value falls in the first class
 * whose `upTo` it does not exceed; the last class may omit `upTo` as a
 * catch-all. Default colors: status green / yellow / red tokens.
 */
export type HistogramThreshold = {
    upTo?: number
    label: string
    /** Explicit CSS color; defaults to the `--pzh-status-*` tokens by index. */
    color?: string
}

export type HistogramChartItem = {
    label: string
    value: number | string | null
}

/** One part of a whole, for the minimal ProgressChart / PieChart / SegmentChart. */
export type PartItem = {
    /** Legend/table label; falls back to the formatted value. */
    label?: string
    value: number | string | null
    /** Explicit CSS color; defaults to the categorical palette by index. */
    color?: string
}

/** Big-number KPI charts share these props on top of the card basics. */
type PartsChartBaseProps = Omit<ChartBaseProps, 'categories' | 'axis'> & {
    items: PartItem[]
    /** Big number above the chart; each type has a sensible default. */
    headline?: string
}

/** 0–100% tick bar: parts fill the track in order, remainder stays gray. */
export type ProgressChartProps = PartsChartBaseProps & {
    /** The value the track represents when full. Default 100 (percentages). */
    max?: number
}

export type PieChartProps = PartsChartBaseProps & {
    /**
     * Cuts a hole in the middle — the donut variant. `true` uses 0.6 of the
     * outer radius; a number sets the fraction and is clamped to 0.2–0.85.
     * The headline moves into the hole.
     */
    donut?: boolean | number
}

/**
 * A 240° arc filled by the parts in order. With `max` set, the remainder
 * stays gray and the headline defaults to the percentage — the 0–100%
 * single-value variant.
 */
export type GaugeChartProps = PartsChartBaseProps & {
    /** The value a full arc represents; defaults to the parts total. */
    max?: number
}

/**
 * Full-circle ring chart: one concentric ring per part by default, each filled
 * clockwise from 12 o'clock with the remainder in gray. `stacked` lays the
 * parts end to end in a single ring instead.
 */
export type RadialChartProps = PartsChartBaseProps & {
    /** The value a full ring represents; defaults to the parts total (stacked) or the largest part. */
    max?: number
    /** One shared ring with the parts end to end, instead of a ring per part. */
    stacked?: boolean
}

/** Radar / spider chart: one filled polygon per series over the category spokes. */
export type RadarChartProps = ChartBaseProps & {
    series: BarChartSeries[]
}

/** One horizontal 100% bar split into proportional segments. */
export type SegmentChartProps = PartsChartBaseProps

/** Packed bubbles: circle area ∝ value, the largest part at the center. */
export type BubbleChartProps = PartsChartBaseProps

export type HistogramChartProps = Omit<ChartBaseProps, 'categories'> & {
    /** Raw observations; the chart bins them itself (Sturges, or `bins`). */
    values?: Array<number | string | null>
    /** Bin count; defaults to Sturges' rule. */
    bins?: number
    /** Pre-aggregated mode: one labeled value per bar instead of binning. */
    items?: HistogramChartItem[]
    /** Colors bars by value class and renders a matching legend. */
    thresholds?: HistogramThreshold[]
}
