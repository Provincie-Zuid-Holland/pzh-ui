import { render, screen } from '@testing-library/react'

import { Badge, BadgeProps } from './Badge'

describe('Badge', () => {
    const defaultProps = {
        text: 'Badge',
        className: '',
    }

    const setup = (customProps?: Partial<BadgeProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Badge {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('badge')
        expect(element).toBeTruthy()
    })
})
