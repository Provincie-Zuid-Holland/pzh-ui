import { render, screen } from '@testing-library/react'

import { Table, TableProps } from './Table'

describe('Table', () => {
    const defaultProps = {
        className: '',
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
