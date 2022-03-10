import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Button } from './Button'

describe('Button', () => {
    const defaultProps = {
        label: 'Button text',
    }

    const setup = (customProps?: Record<string, unknown>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Button {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()
    })

    it('should be possible to click the button when providing onClick', () => {
        const onClick = jest.fn()

        setup({ onClick })

        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()

        fireEvent.click(element)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
