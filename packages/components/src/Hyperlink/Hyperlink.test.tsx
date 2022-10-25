import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Hyperlink, HyperlinkProps } from './Hyperlink'

describe('Hyperlink', () => {
    const defaultProps = {
        text: 'Button text',
        to: '/to-page',
    }

    const setup = (customProps?: Partial<HyperlinkProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(
            <MemoryRouter>
                <Hyperlink {...props} />
            </MemoryRouter>
        )
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()
    })
})
