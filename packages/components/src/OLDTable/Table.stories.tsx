import { Meta, StoryObj } from '@storybook/react'

import { OLDTable, OLDTableProps } from './Table'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/OLDTable',
    component: OLDTable,
} satisfies Meta<typeof OLDTable>

type Story = StoryObj<typeof OLDTable>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: OLDTableProps) => <OLDTable {...args} />

export const Default = {
    render: Template,
    args: {
        columns: [
            {
                Header: 'Thema',
                accessor: 'theme',
            },
            {
                Header: 'Titel',
                accessor: 'title',
            },
            {
                Header: 'HS',
                accessor: 'currentSituation',
                disableSortBy: true,
            },
        ],
        data: [
            {
                theme: 'Economie',
                title: 'Innovatie Zuid-Holland',
                currentSituation: (
                    <div className="bg-pzh-red h-4 w-4 rounded-full" />
                ),
                onClick: () => console.log('clicked'),
            },
            {
                theme: 'Economie',
                title: 'Grondstoffen gebruik',
                currentSituation: (
                    <div className="bg-pzh-red h-4 w-4 rounded-full" />
                ),
            },
            {
                theme: 'Klimaat en water',
                title: 'Waterveiligheid',
                currentSituation: (
                    <div className="bg-pzh-yellow h-4 w-4 rounded-full" />
                ),
            },
        ],
        disableSortRemove: true,
        disableMultiSort: true,
    },
} satisfies Story
