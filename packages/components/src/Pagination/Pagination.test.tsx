import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Pagination, PaginationProps } from './Pagination'

describe('Pagination', () => {
    const defaultProps = {
        onPageChange: console.log,
        total: 100,
        current: 1,
    }

    const setup = (customProps?: Partial<PaginationProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Pagination {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByRole('navigation')
        expect(element).toBeTruthy()
    })
})
