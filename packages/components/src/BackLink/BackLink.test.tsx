import { render, screen } from '@testing-library/react'

import { BackLink, BackLinkProps } from './BackLink'

describe('BackLink', () => {
    const defaultProps = {
        className: '',
    }

    const setup = (customProps?: Partial<BackLinkProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<BackLink {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('back-link')
        expect(element).toBeTruthy()
    })
})
