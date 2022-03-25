import { render, screen } from '@testing-library/react'

import { Divider, DividerProps } from './Divider'

describe('Divider', () => {
    const defaultProps = {
        className: '',
    }

    const setup = (customProps?: Partial<DividerProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Divider {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('divider')
        expect(element).toBeTruthy()
    })
})
