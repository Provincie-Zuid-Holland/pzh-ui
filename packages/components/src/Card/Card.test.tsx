import { render, screen } from '@testing-library/react'

import { Card, CardProps } from './Card'

describe('Card', () => {
    const defaultProps = {
        className: '',
    }

    const setup = (customProps?: Partial<CardProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Card {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('card')
        expect(element).toBeTruthy()
    })
})
