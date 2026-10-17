// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC } from 'react'

import { NormalizedData } from '../lib/normalize'
import { generateSummary } from '../lib/summary'

type ChartSummaryProps = {
    data: NormalizedData
    /** Hand-written override; when absent the summary is generated from the data. */
    summary?: string
    valueFormatter: (value: number) => string
}

/** The 'samengevat' view: a short prose description of the data. */
export const ChartSummary: FC<ChartSummaryProps> = ({
    data,
    summary,
    valueFormatter,
}) => {
    const paragraphs = summary
        ? [summary]
        : generateSummary(data, valueFormatter)
    return (
        <div>
            {paragraphs.map((paragraph, index) => (
                <p className="pzh-summary" key={index}>
                    {paragraph}
                </p>
            ))}
        </div>
    )
}
