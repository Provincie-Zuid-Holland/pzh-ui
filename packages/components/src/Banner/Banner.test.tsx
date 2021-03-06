import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Banner, BannerProps } from './Banner'

describe('Banner', () => {
    const defaultProps = {
        isActive: true,
        text: 'Let op! De Monitor Leefomgeving van Provincie Zuid-Holland is momenteel nog in ontwikkeling.',
        cookieName: 'cookie',
    }

    const setup = (customProps?: Partial<BannerProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Banner {...props} />)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText(defaultProps.text)
        expect(element).toBeTruthy()
    })
})
