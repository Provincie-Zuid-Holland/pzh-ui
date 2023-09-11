import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ElementType } from 'react'

import { Button, ButtonProps } from './Button'

describe('Button', () => {
    const defaultProps = {
        children: 'Button text',
    }

    const setup = (customProps?: Partial<ButtonProps<ElementType>>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Button {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()
    })

    it('should be possible to click the button when providing onPress', () => {
        const onPress = vi.fn()

        setup({ onPress })

        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()

        fireEvent.click(element)
        expect(onPress).toHaveBeenCalledTimes(1)
    })
})
