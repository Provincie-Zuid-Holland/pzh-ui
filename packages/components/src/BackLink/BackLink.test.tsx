import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { BackLink, BackLinkProps } from './BackLink'

describe('BackLink', () => {
    const defaultProps = {
        className: '',
        to: '/',
    }

    const setup = (customProps?: Partial<BackLinkProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(
            <MemoryRouter>
                <BackLink {...props} />
            </MemoryRouter>
        )
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('back-link')
        expect(element).toBeTruthy()
    })
})
