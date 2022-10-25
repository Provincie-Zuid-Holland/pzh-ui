import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ListLink, ListLinkProps } from './ListLink'

describe('ListLink', () => {
    const defaultProps = {
        text: 'Button text',
        to: '/to-page',
    }

    const setup = (customProps?: Partial<ListLinkProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(
            <MemoryRouter>
                <ListLink {...props} />
            </MemoryRouter>
        )
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText('Button text')
        expect(element).toBeTruthy()
    })
})
