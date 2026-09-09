// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { CSSProperties, FC, useMemo, useState } from 'react'

import { useContainerSize } from '../hooks/useContainerSize'
import { estimateTextWidth, truncateLabel } from '../lib/format'
import { barLayout, horizontalBarPath, stackSegments } from '../lib/layout'
import { NormalizedData } from '../lib/normalize'
import { niceTicks } from '../lib/scale'
import { markFill } from '../tokens'
import { AxisOptions, ChartLabels } from '../types'
import { categoryReadout, categoryTotal } from './barChartSvg'
import { Swatch } from './swatch'

type BarChartSvgHorizontalProps = {
    data: NormalizedData
    axis?: AxisOptions
    height: number
    title?: string
    stacked?: boolean
    labels: ChartLabels
    valueFormatter: (value: number) => string
    tickFormatter: (value: number) => string
}

/** Width reserved past a broken bar for the break mark and the real value. */
const BREAK_MARK_WIDTH = 12
const BREAK_LABEL_GAP = 6

/**
 * A vertical zigzag across the bar, the conventional "this bar is cut" mark.
 */
const breakMarkPath = (x: number, top: number, barHeight: number): string => {
    const steps = Math.max(2, Math.round(barHeight / 6))
    const stepHeight = barHeight / steps
    const points = Array.from({ length: steps + 1 }, (_, index) => {
        const y = top + index * stepHeight
        return `${index % 2 === 0 ? x - 3 : x + 3},${y}`
    })
    return `M${points.join('L')}`
}

/**
 * Category labels never take more than this share of the card. Long names —
 * "Specialistische zakelijke dienstverlening" — would otherwise push the plot
 * into a sliver on the right. The full text stays in the readout and tooltip.
 */
const LABEL_MAX_SHARE = 0.38
const LABEL_FONT_SIZE = 12

const MIN_ROW_STRIDE = 32
/** Rows never spread further apart than this when the card is stretched. */
const MAX_SINGLE_ROW_STRIDE = 48

/** Left-to-right bars: the transposed sibling of BarChartSvg, same data model. */
export const BarChartSvgHorizontal: FC<BarChartSvgHorizontalProps> = ({
    data,
    axis,
    height: minHeight,
    title,
    stacked = false,
    labels,
    valueFormatter,
    tickFormatter,
}) => {
    const {
        ref,
        width,
        height: measuredHeight,
    } = useContainerSize<HTMLDivElement>()
    const [tooltip, setTooltip] = useState<number | null>(null)

    const domainMin = stacked ? 0 : data.dataMin
    const domainMax = stacked ? data.stackedMax : data.dataMax
    // breakAbove caps the axis; bars past it are drawn short and marked.
    const breakAbove =
        axis?.breakAbove !== undefined && axis.breakAbove > 0
            ? axis.breakAbove
            : undefined
    const scaleOptions = useMemo(
        () => (breakAbove === undefined ? axis : { ...axis, max: breakAbove }),
        [axis, breakAbove]
    )
    const scale = useMemo(
        () => niceTicks(domainMin, domainMax, scaleOptions),
        [domainMin, domainMax, scaleOptions]
    )
    // Every value that runs past the cap, so the gap fits the widest label.
    const brokenValues = useMemo(() => {
        if (breakAbove === undefined) return []
        return data.series.flatMap(series =>
            series.data
                .map(datum => datum.value)
                .filter(
                    (value): value is number =>
                        value !== null && value > scale.max
                )
        )
    }, [breakAbove, data.series, scale.max])
    const breakGap = brokenValues.length
        ? BREAK_MARK_WIDTH +
          BREAK_LABEL_GAP +
          Math.ceil(
              brokenValues.reduce(
                  (max, value) =>
                      Math.max(
                          max,
                          estimateTextWidth(valueFormatter(value), 12)
                      ),
                  0
              )
          )
        : 0
    const tickLabels = scale.ticks.map(tickFormatter)

    const rowCount = data.categories.length
    const seriesPerRow = stacked ? 1 : data.series.length
    // Never squeeze rows below a readable stride; grow with the card beyond that.
    const rowMin = Math.max(MIN_ROW_STRIDE, seriesPerRow * 14 + 18)
    const contentMinHeight = Math.max(
        minHeight,
        rowCount * rowMin + 32 + (axis?.xLabel ? 20 : 0)
    )
    const height = Math.max(contentMinHeight, measuredHeight)

    const labelMaxChars = Math.max(
        8,
        Math.floor((width * LABEL_MAX_SHARE) / (LABEL_FONT_SIZE * 0.6))
    )
    const displayLabel = (label: string) => truncateLabel(label, labelMaxChars)
    const labelWidth = data.categories.reduce(
        (max, label) =>
            Math.max(
                max,
                estimateTextWidth(displayLabel(label), LABEL_FONT_SIZE)
            ),
        0
    )
    const margins = {
        top: 8,
        right: 8,
        bottom: 24 + (axis?.xLabel ? 20 : 0),
        left: Math.ceil(labelWidth) + 16,
    }
    const innerWidth = Math.max(10, width - margins.left - margins.right)
    const innerHeight = Math.max(10, height - margins.top - margins.bottom)
    // Rows stay compact when the card stretches: capped stride, block centered.
    const maxStride = Math.max(MAX_SINGLE_ROW_STRIDE, seriesPerRow * 18 + 20)
    const usedHeight =
        rowCount > 0 ? Math.min(innerHeight, rowCount * maxStride) : innerHeight
    const rowsTop = margins.top + (innerHeight - usedHeight) / 2
    // Reuse the vertical slot math with the axes swapped: rows instead of columns.
    const layout = barLayout(usedHeight, rowCount, seriesPerRow)

    const toX = (value: number) =>
        margins.left +
        innerWidth *
            ((Math.max(scale.min, Math.min(scale.max, value)) - scale.min) /
                (scale.max - scale.min))
    const baselineValue = Math.max(scale.min, Math.min(scale.max, 0))
    const baselineX = toX(baselineValue)

    if (data.isEmpty) {
        return <p className="pzh-empty">{labels.emptyState}</p>
    }

    const rowY = (index: number) => rowsTop + index * layout.slotWidth

    return (
        <div
            className="pzh-chart-area"
            ref={ref}
            onMouseLeave={() => setTooltip(null)}
            style={{ minHeight: contentMinHeight }}>
            <svg
                className="pzh-svg"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                role="group"
                aria-label={
                    title ? `${title}: ${labels.chartRole}` : labels.chartRole
                }>
                {/* Vertical grid + x ticks */}
                {scale.ticks.map((tick, index) => {
                    const x = toX(tick)
                    return (
                        <g key={tick}>
                            <line
                                x1={x}
                                x2={x}
                                y1={margins.top}
                                y2={margins.top + innerHeight}
                                stroke={
                                    tick === baselineValue
                                        ? 'var(--pzh-baseline)'
                                        : 'var(--pzh-grid)'
                                }
                                strokeWidth={1}
                            />
                            <text
                                className="pzh-tick-label"
                                x={x}
                                y={margins.top + innerHeight + 16}
                                textAnchor="middle">
                                {tickLabels[index]}
                            </text>
                        </g>
                    )
                })}

                {/* Rows */}
                {data.categories.map((category, categoryIndex) => {
                    const y = rowY(categoryIndex)
                    return (
                        <g
                            key={`${category}-${categoryIndex}`}
                            className={
                                tooltip === categoryIndex
                                    ? 'pzh-bar-group pzh-active'
                                    : 'pzh-bar-group'
                            }
                            role="img"
                            tabIndex={0}
                            aria-label={categoryReadout(
                                data,
                                categoryIndex,
                                labels,
                                valueFormatter,
                                stacked && data.isGrouped
                            )}
                            onMouseEnter={() => setTooltip(categoryIndex)}
                            onFocus={() => setTooltip(categoryIndex)}
                            onBlur={() => setTooltip(null)}
                            onKeyDown={event => {
                                if (event.key === 'Escape') setTooltip(null)
                            }}>
                            <title>
                                {categoryReadout(
                                    data,
                                    categoryIndex,
                                    labels,
                                    valueFormatter,
                                    stacked && data.isGrouped
                                )}
                            </title>
                            {/* Full-row hit target */}
                            <rect
                                x={0}
                                y={y}
                                width={width}
                                height={layout.slotWidth}
                                fill="transparent"
                            />
                            {/* Flush left, not right-aligned against the plot: with
                                mixed label lengths a right-aligned column reads as
                                a ragged gutter. */}
                            <text
                                className="pzh-category-label"
                                x={0}
                                y={y + layout.groupWidth / 2 + 4}
                                textAnchor="start">
                                {displayLabel(category)}
                            </text>
                            {stacked
                                ? stackSegments(
                                      data.series.map(
                                          series =>
                                              series.data[categoryIndex].value
                                      ),
                                      value => -toX(value)
                                  ).map((segment, seriesIndex) => {
                                      if (!segment) return null
                                      const series = data.series[seriesIndex]
                                      return (
                                          <rect
                                              key={seriesIndex}
                                              className="pzh-bar pzh-bar-h"
                                              x={-segment.y - segment.height}
                                              y={y + layout.offsets[0]}
                                              width={segment.height}
                                              height={layout.barWidth}
                                              rx={Math.min(
                                                  4,
                                                  segment.height / 2,
                                                  layout.barWidth / 2
                                              )}
                                              style={
                                                  {
                                                      '--pzh-bar-fill':
                                                          markFill(series.fill),
                                                      animationDelay: `${categoryIndex * 25}ms`,
                                                  } as CSSProperties
                                              }
                                          />
                                      )
                                  })
                                : data.series.map((series, seriesIndex) => {
                                      const datum = series.data[categoryIndex]
                                      if (datum.value === null) return null
                                      const isBroken =
                                          breakGap > 0 &&
                                          datum.value > scale.max
                                      const barTop =
                                          y + layout.offsets[seriesIndex]
                                      const endX = isBroken
                                          ? toX(datum.value) - breakGap
                                          : toX(datum.value)
                                      const path = horizontalBarPath(
                                          barTop,
                                          baselineX,
                                          endX,
                                          layout.barWidth
                                      )
                                      if (!path) return null
                                      return (
                                          <g key={seriesIndex}>
                                              {isBroken ? (
                                                  <>
                                                      <path
                                                          className="pzh-break-mark"
                                                          d={breakMarkPath(
                                                              endX +
                                                                  BREAK_MARK_WIDTH /
                                                                      2,
                                                              barTop,
                                                              layout.barWidth
                                                          )}
                                                      />
                                                      <text
                                                          className="pzh-category-label"
                                                          x={
                                                              endX +
                                                              BREAK_MARK_WIDTH +
                                                              BREAK_LABEL_GAP
                                                          }
                                                          y={
                                                              barTop +
                                                              layout.barWidth /
                                                                  2 +
                                                              4
                                                          }
                                                          textAnchor="start">
                                                          {valueFormatter(
                                                              datum.value
                                                          )}
                                                      </text>
                                                  </>
                                              ) : null}
                                              <path
                                                  className="pzh-bar pzh-bar-h"
                                                  d={path}
                                                  style={
                                                      {
                                                          '--pzh-bar-fill':
                                                              markFill(
                                                                  datum.highlight
                                                                      ? 'var(--pzh-highlight)'
                                                                      : series.fill
                                                              ),
                                                          animationDelay: `${categoryIndex * 25}ms`,
                                                      } as CSSProperties
                                                  }
                                              />
                                          </g>
                                      )
                                  })}
                        </g>
                    )
                })}

                {/* Axis caption */}
                {axis?.xLabel ? (
                    <text
                        className="pzh-axis-caption"
                        x={margins.left + innerWidth / 2}
                        y={height - 6}
                        textAnchor="middle">
                        {axis.xLabel}
                    </text>
                ) : null}
            </svg>

            {tooltip !== null ? (
                <div
                    className="pzh-tooltip"
                    role="presentation"
                    style={{
                        left: Math.min(
                            Math.max(
                                stacked
                                    ? toX(
                                          Math.min(
                                              categoryTotal(data, tooltip),
                                              scale.max
                                          )
                                      ) /
                                          2 +
                                          baselineX / 2
                                    : (baselineX +
                                          toX(
                                              data.series
                                                  .map(
                                                      series =>
                                                          series.data[tooltip]
                                                              .value
                                                  )
                                                  .filter(
                                                      (
                                                          value
                                                      ): value is number =>
                                                          value !== null
                                                  )
                                                  .reduce(
                                                      (max, value) =>
                                                          Math.max(max, value),
                                                      baselineValue
                                                  )
                                          )) /
                                          2,
                                70
                            ),
                            width - 70
                        ),
                        top: rowY(tooltip) + layout.offsets[0],
                        transform: 'translate(-50%, calc(-100% - 8px))',
                    }}>
                    <p className="pzh-tooltip-title">
                        {data.categories[tooltip]}
                    </p>
                    {data.series.map((series, seriesIndex) => {
                        const datum = series.data[tooltip]
                        return (
                            <p className="pzh-tooltip-row" key={seriesIndex}>
                                <Swatch
                                    color={
                                        datum.highlight
                                            ? 'var(--pzh-highlight)'
                                            : series.fill
                                    }
                                />
                                <span>
                                    {series.label ?? labels.valueHeader}:{' '}
                                    <strong>
                                        {datum.value === null
                                            ? '—'
                                            : valueFormatter(datum.value)}
                                    </strong>
                                    {datum.note ? (
                                        <span className="pzh-tooltip-note">
                                            {' '}
                                            · {datum.note}
                                        </span>
                                    ) : null}
                                </span>
                            </p>
                        )
                    })}
                    {stacked && data.isGrouped ? (
                        <p className="pzh-tooltip-row">
                            <Swatch color={'transparent'} />
                            <span>
                                {labels.totalLabel}:{' '}
                                <strong>
                                    {valueFormatter(
                                        categoryTotal(data, tooltip)
                                    )}
                                </strong>
                            </span>
                        </p>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
