import { ComponentStory } from '@storybook/react'

import { Table, TableProps } from './Table'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Table',
    component: Table,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TableProps) => <Table {...args} />

export const Default: ComponentStory<typeof Table> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
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
}
