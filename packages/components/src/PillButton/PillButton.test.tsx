import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { PillButton, PillButtonProps } from './PillButton'

describe('Button', () => {
    const defaultProps = {
        children: 'Button text',
    }

    const setup = (customProps?: Partial<PillButtonProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<PillButton {...props} />)
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
