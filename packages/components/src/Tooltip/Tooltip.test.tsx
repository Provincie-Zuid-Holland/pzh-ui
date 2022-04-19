import { render, screen } from '@testing-library/react'

import { Tooltip, TooltipProps } from './Tooltip'

describe('Tooltip', () => {
    const defaultProps = {
        label: 'Tooltip',
        children: <p>click me</p>,
    }

    const setup = (customProps?: Partial<TooltipProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Tooltip {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('tooltip')
        expect(element).toBeTruthy()
    })
})
