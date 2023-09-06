import { render, screen } from '@testing-library/react'

import { Text, TextProps } from './Text'

describe('Text', () => {
    const defaultProps = {
        id: 'text',
        children: 'Text',
    }

    const setup = (customProps?: Partial<TextProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Text {...props} />)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByTestId('text')
        expect(element).toBeTruthy()
    })
})
