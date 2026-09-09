// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

'use client'

import { FC, useId } from 'react'

import { ChartLabels, ChartViewMode } from '../types'

type ViewModeSelectProps = {
    value: ChartViewMode
    labels: ChartLabels
    onChange: (mode: ChartViewMode) => void
}

export const ViewModeSelect: FC<ViewModeSelectProps> = ({
    value,
    labels,
    onChange,
}) => {
    const selectId = useId()
    return (
        <span className="pzh-select-group">
            <label className="pzh-select-label" htmlFor={selectId}>
                {labels.viewModeLabel}
            </label>
            <select
                id={selectId}
                className="pzh-select"
                value={value}
                onChange={event =>
                    onChange(event.target.value as ChartViewMode)
                }>
                <option value="visual">{labels.visual}</option>
                <option value="textual">{labels.textual}</option>
                <option value="summary">{labels.summary}</option>
            </select>
        </span>
    )
}
