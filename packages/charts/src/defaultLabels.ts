// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { ChartLabels } from './types'

/** Dutch defaults; consumers override via the `labels` prop. */
export const defaultChartLabels: ChartLabels = {
    viewModeLabel: 'Weergave',
    visual: 'Visueel',
    textual: 'Tabel',
    summary: 'Samengevat',
    highContrast: 'Hoog contrast',
    valueHeader: 'Waarde',
    highlightLabel: 'Uitgelicht',
    totalLabel: 'Totaal',
    rangeTo: 'tot',
    countLabel: 'Aantal',
    categoryHeader: 'Categorie',
    loading: 'Aan het laden…',
    chartRole: 'staafdiagram',
    emptyState: 'Geen gegevens beschikbaar.',
    lang: 'nl',
}
