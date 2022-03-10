import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Notification, NotificationProps } from './Notification'

describe('Notification', () => {
    const defaultProps = {
        text: 'Dit is een toelichting.',
    }

    const setup = (customProps?: Partial<NotificationProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Notification {...props} />)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText(defaultProps.text)
        expect(element).toBeTruthy()
    })
})
