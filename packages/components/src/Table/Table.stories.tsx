import { Meta, StoryObj } from '@storybook/react'

import { Table, TableProps } from './Table'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Table',
    component: Table,
} satisfies Meta<typeof Table>

type Story = StoryObj<typeof Table>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TableProps) => <Table {...args} />

export const Default = {
    render: Template,
    args: {
        limit: 3,
        total: 13,
        columns: [
            {
                header: 'Thema',
                accessorKey: 'theme',
            },
            {
                header: 'Titel',
                accessorKey: 'title',
            },
            {
                header: 'HS',
                accessorKey: 'currentSituation',
                enableSorting: false,
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
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
            {
                theme: 'Klimaat en water',
                title: 'Test',
                currentSituation: 'Test',
            },
        ],
        enableSortingRemoval: false,
        enableMultiSort: false,
    },
} satisfies Story
