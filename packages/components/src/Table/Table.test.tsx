import { render, screen } from '@testing-library/react'

import { Table, TableProps } from './Table'

describe('Table', () => {
    const defaultProps = {
        className: '',
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
                    <div className="bg-pzh-red-500 h-4 w-4 rounded-full" />
                ),
                onClick: () => console.log('clicked'),
            },
            {
                theme: 'Economie',
                title: 'Grondstoffen gebruik',
                currentSituation: (
                    <div className="bg-pzh-red-500 h-4 w-4 rounded-full" />
                ),
            },
            {
                theme: 'Klimaat en water',
                title: 'Waterveiligheid',
                currentSituation: (
                    <div className="bg-pzh-yellow-500 h-4 w-4 rounded-full" />
                ),
            },
        ],
    }

    const setup = (customProps?: Partial<TableProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Table {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('table')
        expect(element).toBeTruthy()
    })
})
