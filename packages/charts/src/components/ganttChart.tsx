// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC } from 'react'

import { GanttChartProps } from '../types'
import { RangeChart } from './rangeChart'

/**
 * The Gantt preset: RangeChart with `horizontal` fixed on — one pill per row
 * spanning start→end on a numeric axis (task planning in week numbers,
 * temperature ranges, …). Kept as its own name because "gantt" is what
 * people search for; everything else lives in RangeChart.
 */
export const GanttChart: FC<GanttChartProps> = props => (
    <RangeChart {...props} horizontal />
)
