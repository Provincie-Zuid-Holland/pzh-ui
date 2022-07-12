import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Notification, NotificationProps } from './Notification'

describe('Notification', () => {
    const defaultProps = {
        children: 'Dit is een toelichting.',
    }

    const setup = (customProps?: Partial<NotificationProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Notification {...props}>{defaultProps.children}</Notification>)
    }

    it('Component renders', () => {
        setup()
        const element = screen.getByText(defaultProps.children)
        expect(element).toBeTruthy()
    })
})
