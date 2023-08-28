import { render, screen } from '@testing-library/react'

import { Table } from './Table'

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
                enableSorting: false,
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

    const setup = (customProps?: any) => {
        const props = { ...defaultProps, ...customProps }
        render(<Table {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('table')
        expect(element).toBeTruthy()
    })
})
