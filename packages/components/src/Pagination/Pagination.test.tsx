import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Pagination, PaginationProps } from './Pagination'

describe('Pagination', () => {
    const defaultProps = {
        onChange: console.log,
    }

    const setup = (customProps?: Partial<PaginationProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Pagination {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('pagination')
        expect(element).toBeTruthy()
    })
})
