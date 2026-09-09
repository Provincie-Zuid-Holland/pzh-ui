// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

/**
 * The library's single stylesheet, injected by chartCard via React's
 * `<style href precedence>` hoisting (deduped across cards, React 19+).
 * Inline styles cannot express keyframes, :focus-visible or media queries —
 * everything else uses tokens from tokens.ts via `var(--pzh-*)`.
 */

export const STYLE_HREF = 'pzh-charts'

/** Chevron for the view-mode select; url() cannot read CSS vars, so one per state. */
const chevron = (color: string): string =>
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`

export const chartStyles = `
.pzh-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    padding: 24px;
    border: 1px solid var(--pzh-border);
    border-radius: 4px;
    background: var(--pzh-bg);
    color: var(--pzh-text);
    font-family: var(--font-karbon, system-ui, sans-serif);
    container-type: inline-size;
}
/* The visual view grows to fill leftover card height; the chart area inside
   is sized by flex (not content), so the SVG can safely render at measured
   size without a layout feedback loop. */
.pzh-card-view {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
}
.pzh-card-view .pzh-chart-area {
    flex: 1 1 0;
}
.pzh-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px 24px;
}
.pzh-header-text {
    min-width: 200px;
    flex: 1 1 240px;
}
.pzh-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.3;
}
.pzh-subtitle {
    margin: 4px 0 0;
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--pzh-text-muted);
}
.pzh-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 20px;
}
.pzh-select-group {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
/* Same type as the contrast toggle's label, so the two controls read as a pair. */
.pzh-select-label {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--pzh-text);
}
/* Mirrors the monitor's secondary Button: white bg, brand-blue border and
   text, 40px tall, 6px radius, medium weight, inverting on hover. */
.pzh-select {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--pzh-control);
    /* Tailwind's rounded-md, same as the monitor's Button */
    border-radius: 0.375rem;
    background-color: var(--pzh-bg);
    color: var(--pzh-control);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-select {
        transition: all 0.15s ease;
    }
}
.pzh-select:hover {
    /* background-color, not the shorthand — the select carries a chevron
       background-image whose repeat/position must survive hover. */
    background-color: var(--pzh-control);
    color: var(--pzh-bg);
}
/* Labeled switch: text + pill track with a sliding knob. */
.pzh-contrast-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    padding: 0;
    border: none;
    background: none;
    color: var(--pzh-text);
    font: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
}
.pzh-toggle-track {
    position: relative;
    width: 44px;
    height: 26px;
    border-radius: 999px;
    background: #d5d5d5;
    flex: none;
}
.pzh-toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-toggle-track {
        transition: background 0.2s ease;
    }
    .pzh-toggle-knob {
        transition: transform 0.2s ease;
    }
}
.pzh-contrast-toggle[aria-pressed='true'] .pzh-toggle-track {
    /* Always brand blue, also in high-contrast mode (12:1 on white). */
    background: #281f6b;
}
.pzh-contrast-toggle[aria-pressed='true'] .pzh-toggle-knob {
    transform: translateX(18px);
}
.pzh-select {
    appearance: none;
    padding-right: 36px;
    background-image: ${chevron('#281F6B')};
    background-repeat: no-repeat;
    background-position: right 12px center;
}
.pzh-select:hover {
    background-image: ${chevron('#FFFFFF')};
}
.pzh-hc .pzh-select {
    background-image: ${chevron('#000000')};
}
.pzh-hc .pzh-select:hover {
    background-image: ${chevron('#FFFFFF')};
}
.pzh-contrast-toggle:focus-visible,
.pzh-table-wrap:focus-visible,
.pzh-select:focus-visible {
    outline: 2px solid var(--pzh-focus);
    outline-offset: 2px;
}
.pzh-headline {
    margin: 0 0 12px;
    font-size: 3.25rem;
    font-weight: 600;
    line-height: 1.1;
    color: var(--pzh-text);
    font-variant-numeric: tabular-nums;
}
/* Holds the SVG and the centred headline of the donut and ring charts, so the
   overlay lines up with the circle instead of the whole chart area. */
.pzh-center-wrap {
    position: relative;
}
/* The headline inside a donut hole. HTML rather than SVG text, so it keeps rem
   sizing under text-only zoom; never clipped, so 1.4.12 spacing still applies.
   pointer-events stay off — the ring underneath must remain hoverable. */
.pzh-center-headline {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    pointer-events: none;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.1;
    color: var(--pzh-text);
    font-variant-numeric: tabular-nums;
}
/* The "this bar is cut" zigzag drawn where a bar runs past axis.breakAbove.
   The real value is printed beside it, and is in the readout and tabel view too. */
.pzh-break-mark {
    fill: none;
    stroke: var(--pzh-text-muted);
    stroke-width: 1.5;
    stroke-linejoin: round;
}
.pzh-slice {
    stroke: none;
}
.pzh-chart-area {
    position: relative;
    width: 100%;
}
.pzh-svg {
    display: block;
    overflow: visible;
}
.pzh-bar {
    fill: var(--pzh-bar-fill, var(--pzh-bar));
    stroke: var(--pzh-bar-stroke);
    stroke-width: var(--pzh-bar-stroke-width);
}
/* Hover/focus emphasis: the active category keeps full strength, the rest
   of the chart fades back. Applies to every mark-per-group chart type. */
@media (prefers-reduced-motion: no-preference) {
    .pzh-bar-group,
    .pzh-line-group {
        transition: opacity 0.25s ease;
    }
}
.pzh-svg:has(.pzh-bar-group:hover) .pzh-bar-group:not(:hover),
.pzh-svg:has(.pzh-bar-group:focus) .pzh-bar-group:not(:focus),
.pzh-svg:has(.pzh-line-group:hover) .pzh-line-group:not(:hover),
.pzh-svg:has(.pzh-line-group:focus) .pzh-line-group:not(:focus),
/* The tooltip is hoverable (1.4.13), so the pointer leaving the mark for the
   tooltip drops :hover. The active group carries a class instead, and the
   emphasis survives the trip. */
.pzh-svg:has(.pzh-active) .pzh-bar-group:not(.pzh-active),
.pzh-svg:has(.pzh-active) .pzh-line-group:not(.pzh-active) {
    opacity: 0.35;
}
.pzh-bar-group:focus-visible {
    outline: none;
}
.pzh-bar-group:focus-visible .pzh-bar,
.pzh-bar-group:focus-visible .pzh-slice,
.pzh-bar-group:focus-visible circle {
    stroke: var(--pzh-focus);
    stroke-width: 2;
}
.pzh-line {
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.pzh-line-group:focus-visible {
    outline: none;
}
.pzh-line-group:focus-visible rect,
.pzh-line-group:focus-visible .pzh-hit {
    stroke: var(--pzh-focus);
    stroke-width: 2;
}
.pzh-ref-label {
    fill: var(--pzh-text);
    font-size: 13px;
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-bar {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: pzh-grow 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    }
}
@keyframes pzh-grow {
    from {
        transform: scaleY(0);
    }
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-bar-h {
        transform-origin: left center;
        animation-name: pzh-grow-h;
    }
}
@keyframes pzh-grow-h {
    from {
        transform: scaleX(0);
    }
}
/* Line draw-in: pathLength=1 normalizes the dash to the whole path. */
@media (prefers-reduced-motion: no-preference) {
    .pzh-line-draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: pzh-draw 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .pzh-fade-in {
        animation: pzh-fade 0.5s ease-out backwards;
    }
    .pzh-pop {
        transform-box: fill-box;
        transform-origin: center;
        animation: pzh-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    }
}
@keyframes pzh-draw {
    to {
        stroke-dashoffset: 0;
    }
}
@keyframes pzh-fade {
    from {
        opacity: 0;
    }
}
@keyframes pzh-pop {
    from {
        transform: scale(0);
    }
}
.pzh-tick-label {
    fill: var(--pzh-text-muted);
    font-size: 12px;
}
.pzh-bubble-label {
    font-size: 13px;
    font-weight: 700;
    pointer-events: none;
}
.pzh-bubble-value {
    font-size: 12px;
    pointer-events: none;
}
.pzh-category-label {
    fill: var(--pzh-text);
    font-size: 12px;
}
.pzh-axis-caption {
    fill: var(--pzh-text-muted);
    font-size: 12px;
}
.pzh-tooltip {
    position: absolute;
    z-index: 1;
    /* Hoverable (WCAG 1.4.13): the pointer lands on the tooltip, not a neighbouring mark. */
    pointer-events: auto;
    padding: 8px 12px;
    border-radius: 8px;
    background: #222222;
    color: #ffffff;
    font-size: 0.8125rem;
    line-height: 1.4;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    max-width: 260px;
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-tooltip {
        animation: pzh-tooltip-in 0.18s ease-out;
        transition:
            left 0.18s ease,
            top 0.18s ease;
    }
}
@keyframes pzh-tooltip-in {
    from {
        opacity: 0;
    }
}
.pzh-tooltip-title {
    font-weight: 700;
    margin: 0 0 2px;
}
.pzh-tooltip-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin: 0;
}
.pzh-tooltip-note {
    color: #b8b8b8;
}
.pzh-swatch {
    flex: none;
    width: 10px;
    height: 10px;
    align-self: center;
}
.pzh-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.8125rem;
}
.pzh-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.pzh-table-wrap {
    overflow-x: auto;
}
.pzh-table {
    width: 100%;
    /* Single-direction borders: each cell draws bottom+right only, so lines
       can never double up the way collapsed borders sometimes render. */
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.875rem;
}
.pzh-table th,
.pzh-table td {
    padding: 10px 14px;
    text-align: left;
    border-right: 1px solid var(--pzh-grid);
    border-bottom: 1px solid var(--pzh-grid);
}
.pzh-table th:first-child,
.pzh-table td:first-child {
    border-left: 1px solid var(--pzh-grid);
}
.pzh-table thead th {
    border-top: 1px solid var(--pzh-grid);
    font-weight: 700;
}
.pzh-table td {
    font-variant-numeric: tabular-nums;
}
.pzh-table .pzh-num {
    /* Left-aligned so the legend dots stack in a straight vertical line;
       right-alignment would shift them with every extra digit. */
    text-align: left;
}
.pzh-cell {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.pzh-summary {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.6;
    max-width: 65ch;
}
.pzh-empty {
    margin: 0;
    font-size: 0.875rem;
    color: var(--pzh-text-muted);
}
.pzh-skeleton {
    background: var(--pzh-skeleton);
    border-radius: 6px;
}
@media (prefers-reduced-motion: no-preference) {
    .pzh-pulse {
        animation: pzh-pulse 1.6s ease-in-out 3;
    }
}
@keyframes pzh-pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.45;
    }
}
.pzh-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
}
`
