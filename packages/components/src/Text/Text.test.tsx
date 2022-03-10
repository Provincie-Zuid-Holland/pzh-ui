import { render, screen } from '@testing-library/react'

import { Text, TextProps } from './Text'

describe('Text', () => {
    const defaultProps = {
        type: 'quote' as TextProps['type'],
        color: 'text-pzh-blue-dark',
        className: '',
    }

    const setup = (customProps?: Partial<TextProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Text {...props} />)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByTestId('quote-span')
        expect(element).toBeTruthy()
    })
})
