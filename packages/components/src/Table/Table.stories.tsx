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
            disableSortBy: true,
        },
    ],
    data: [
        {
            theme: 'Economie',
            title: 'Innovatie Zuid-Holland',
        },
        {
            theme: 'Economie',
            title: 'Grondstoffen gebruik',
        },
        {
            theme: 'Klimaat en water',
            title: 'Waterveiligheid',
        },
    ],
}
