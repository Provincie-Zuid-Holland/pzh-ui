import '@testing-library/jest-dom/vitest'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Alert, AlertAction, AlertDescription, AlertTitle } from './Alert'

describe('Alert', () => {
    it('renders an accessible alert', () => {
        render(
            <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an alert.</AlertDescription>
            </Alert>
        )

        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByText('Information')).toBeInTheDocument()
        expect(screen.getByText('This is an alert.')).toBeInTheDocument()
    })

    it('applies the default variant and medium size', () => {
        render(<Alert>Content</Alert>)

        expect(screen.getByRole('status')).toHaveClass(
            'bg-info-background',
            'border-info-border',
            'text-info-foreground',
            '*:data-[slot=alert-title]:text-heading-s',
            '*:data-[slot=alert-action]:top-4',
            '*:data-[slot=alert-action]:right-4'
        )
    })

    it.each([
        {
            variant: 'default' as const,
            expectedClasses: [
                'bg-info-background',
                'border-info-border',
                'text-info-foreground',
            ],
        },
        {
            variant: 'warning' as const,
            expectedClasses: [
                'bg-warning-background',
                'border-warning-border',
                'text-warning-foreground',
            ],
        },
        {
            variant: 'positive' as const,
            expectedClasses: [
                'bg-success-background',
                'border-success-border',
                'text-success-foreground',
            ],
        },
        {
            variant: 'negative' as const,
            expectedClasses: [
                'bg-destructive-background',
                'border-destructive-border',
                'text-destructive-foreground',
            ],
        },
    ])(
        'applies the $variant variant classes',
        ({ variant, expectedClasses }) => {
            render(<Alert variant={variant}>Content</Alert>)

            expect(screen.getByRole('status')).toHaveClass(...expectedClasses)
        }
    )

    it.each([
        {
            size: 'm' as const,
            expectedClasses: [
                '*:data-[slot=alert-title]:text-heading-s',
                '*:data-[slot=alert-action]:top-4',
                '*:data-[slot=alert-action]:right-4',
            ],
        },
        {
            size: 's' as const,
            expectedClasses: [
                '*:data-[slot=alert-title]:text-heading-xs',
                '*:data-[slot=alert-action]:top-2',
                '*:data-[slot=alert-action]:right-2',
                'pl-4',
                'pr-2',
                'py-2',
            ],
        },
        {
            size: 'xs' as const,
            expectedClasses: [
                '*:data-[slot=alert-title]:text-s',
                '*:data-[slot=alert-description]:text-xs',
                '*:data-[slot=alert-action]:top-1',
                '*:data-[slot=alert-action]:right-1',
                'pl-2',
                'pr-1',
                'py-1',
                'gap-0',
            ],
        },
    ])('applies the $size size classes', ({ size, expectedClasses }) => {
        render(<Alert size={size}>Content</Alert>)

        expect(screen.getByRole('status')).toHaveClass(...expectedClasses)
    })

    it('merges a custom class name', () => {
        render(<Alert className="custom-alert-class">Content</Alert>)

        expect(screen.getByRole('status')).toHaveClass('custom-alert-class')
    })

    it('forwards native div attributes', () => {
        render(
            <Alert id="alert-id" aria-label="Status message">
                Content
            </Alert>
        )

        const alert = screen.getByTestId('alert')

        expect(alert).toHaveAttribute('id', 'alert-id')
        expect(alert).toHaveAttribute('aria-label', 'Status message')
    })

    it('sets the alert data slot', () => {
        render(<Alert>Content</Alert>)

        expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'alert')
    })
})

describe('AlertTitle', () => {
    it('renders its content and data slot', () => {
        render(<AlertTitle>Alert title</AlertTitle>)

        const title = screen.getByText('Alert title')

        expect(title).toHaveAttribute('data-slot', 'alert-title')
        expect(title).toHaveClass('group-has-[>svg]/alert:col-start-2')
    })

    it('merges a custom class name', () => {
        render(
            <AlertTitle className="custom-title-class">Alert title</AlertTitle>
        )

        expect(screen.getByText('Alert title')).toHaveClass(
            'custom-title-class'
        )
    })
})

describe('AlertDescription', () => {
    it('renders its content and data slot', () => {
        render(
            <AlertDescription>
                <p>Alert description</p>
            </AlertDescription>
        )

        const description = screen.getByText('Alert description').parentElement

        expect(description).toHaveAttribute('data-slot', 'alert-description')
        expect(description).toHaveClass('text-balance', 'md:text-pretty')
    })

    it('applies spacing to non-last paragraphs and lists', () => {
        render(
            <AlertDescription data-testid="description">
                Description
            </AlertDescription>
        )

        expect(screen.getByTestId('description')).toHaveClass(
            '[&_:is(p,ul,ol):not(:last-child)]:mb-4'
        )
    })

    it('merges a custom class name', () => {
        render(
            <AlertDescription className="custom-description-class">
                Alert description
            </AlertDescription>
        )

        expect(screen.getByText('Alert description')).toHaveClass(
            'custom-description-class'
        )
    })
})

describe('AlertAction', () => {
    it('renders its content and data slot', () => {
        render(
            <AlertAction>
                <button type="button">Dismiss</button>
            </AlertAction>
        )

        const action = screen.getByRole('button', {
            name: 'Dismiss',
        }).parentElement

        expect(action).toHaveAttribute('data-slot', 'alert-action')
        expect(action).toHaveClass('absolute')
    })

    it('merges a custom class name', () => {
        render(
            <AlertAction className="custom-action-class">
                <button type="button">Dismiss</button>
            </AlertAction>
        )

        expect(
            screen.getByRole('button', { name: 'Dismiss' }).parentElement
        ).toHaveClass('custom-action-class')
    })
})

describe('Alert composition', () => {
    it('renders a complete alert with an icon and action', () => {
        render(
            <Alert variant="warning" role="alert">
                <svg aria-label="Warning icon" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    Something needs your attention.
                </AlertDescription>
                <AlertAction>
                    <button type="button">Dismiss</button>
                </AlertAction>
            </Alert>
        )

        const alert = screen.getByRole('alert')

        expect(alert).toContainElement(screen.getByLabelText('Warning icon'))
        expect(alert).toContainElement(screen.getByText('Warning'))
        expect(alert).toContainElement(
            screen.getByText('Something needs your attention.')
        )
        expect(alert).toContainElement(
            screen.getByRole('button', { name: 'Dismiss' })
        )
    })
})
