# `@pzh-ui/charts`

This package contains accessible charts to use in Provincie Zuid-Holland projects. Thirteen chart types in React and SVG, without a charting runtime: no Chart.js, no d3, no canvas, and no runtime dependencies.

In order to add the charts, install [@pzh-ui/charts](https://www.npmjs.com/package/@pzh-ui/charts) using your favorite package manager.

For example, `yarn add @pzh-ui/charts`

After installing the dependency, you can start using the charts as follows:

```jsx
import { BarChart } from '@pzh-ui/charts'

function Page() {
    return (
        <BarChart
            title="Aantal AI-bedrijven per gemeente"
            categories={['Rotterdam', 'Den Haag', 'Delft']}
            series={[{ data: ['412', '288', '244'] }]}
        />
    )
}
```

## Three things that differ from the other packages

- **There is no CSS to import.** The stylesheet is injected by the components themselves and deduped through React 19 `<style href precedence>` hoisting.
- **React 19 is required**, for that reason — the peer range is `^19.0.0` rather than the `^18.2.0 || ^19.0.0` used elsewhere in this repository.
- **The copy is Dutch by default.** Every string comes from `ChartLabels` and can be overridden per card through the `labels` prop. When localising, override `valueFormatter` too: it defaults to `nl-NL` number formatting independently of `labels`.

## Chart types

`BarChart` (grouped, stacked, horizontal), `LineChart` (area fills, forecast tails, reference line), `RangeChart` and `GanttChart`, `ScatterChart` (with trend line), `HistogramChart` (auto-binned or pre-aggregated, with thresholds), `ProgressChart`, `PieChart` (with donut), `SegmentChart`, `GaugeChart`, `RadarChart`, `RadialChart` (rings, stacked) and `BubbleChart`.

Every card carries a `Visueel` / `Tabel` / `Samengevat` switch, a high-contrast mode that adds SVG line patterns so series stay distinguishable without colour, keyboard-reachable data points with full screen-reader readouts, and a loading skeleton shaped like the chart that will load.

## Accessibility

The library targets WCAG 2.2 AA. [ACCESSIBILITY.md](ACCESSIBILITY.md) records the implementation per criterion, the two known deviations and their mitigations. `src/a11y.test.tsx` runs axe-core over every chart type in every view on each test run, and the Storybook has the a11y addon enabled, which additionally evaluates colour contrast in a real browser.

## Licence

ISC. See [LICENSE](LICENSE).
