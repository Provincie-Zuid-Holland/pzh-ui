import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Feedback, FeedbackProps, getMailToLink } from './Feedback'

describe('FeedbackComponent', () => {
    const defaultProps = {
        email: 'omgevingsbeleid@pzh.nl',
        website: 'obzh.nl',
    }

    const setup = (customProps?: Partial<FeedbackProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<Feedback {...props} />)
    }

    it('should render', () => {
        setup()
        const feedbackButton = screen.getByText('Feedback')
        expect(feedbackButton).toBeTruthy()
    })

    it('mailTo function should return a "mailto:" link', () => {
        const mailto = getMailToLink(defaultProps.email, defaultProps.website)
        expect(mailto.length).toBeGreaterThan(10)
        expect(mailto.includes('mailto:')).toBeTruthy()
    })

    it('should contain a link to email', () => {
        setup()

        const mailToLink = getMailToLink(
            defaultProps.email,
            defaultProps.website
        )

        expect(screen.getByText('Feedback').closest('a')).toHaveAttribute(
            'href',
            mailToLink
        )
    })
})
