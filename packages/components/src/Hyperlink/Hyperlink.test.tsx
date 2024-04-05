import { render, screen } from '@testing-library/react'

import { Hyperlink, HyperlinkProps } from './Hyperlink'

describe('Hyperlink', () => {
    const defaultProps = {
        children: 'Button text',
    }

    const setup = (customProps?: Partial<HyperlinkProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Hyperlink {...props} />)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()
    })
})
