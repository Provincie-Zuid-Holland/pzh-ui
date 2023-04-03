import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs'

describe('Breadcrumbs', () => {
    const defaultProps = {
        items: [
            { name: 'Home', path: '/' },
            { name: 'Another page', path: '/' },
            {
                name: 'Digitale toegankelijkheid',
                path: '/digi-toegankelijkheid',
            },
        ],
    }

    const setup = (customProps?: Partial<BreadcrumbsProps>) => {
        const props = { ...defaultProps, ...customProps }

        render(
            <MemoryRouter>
                <Breadcrumbs {...props} />
            </MemoryRouter>
        )
    }

    it('Component renders', () => {
        setup()

        const firstEl = screen.getByText('Home')
        expect(firstEl).toBeTruthy()

        const secondEl = screen.getAllByText('Another page')[0]
        expect(secondEl).toBeTruthy()

        const thirdEl = screen.getByText('Digitale toegankelijkheid')
        expect(thirdEl).toBeTruthy()
    })
})
