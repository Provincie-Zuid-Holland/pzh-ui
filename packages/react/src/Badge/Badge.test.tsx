import '@testing-library/jest-dom/vitest'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
    it('renders with default variant and appearance', () => {
        render(<Badge>Badge</Badge>)

        const badge = screen.getByTestId('badge')

        expect(badge).toBeInTheDocument()
        expect(badge).toHaveTextContent('Badge')
        expect(badge).toHaveAttribute('data-variant', 'success')
        expect(badge).toHaveAttribute('data-appearance', 'solid')
        expect(badge).toHaveClass(
            'border-badge-success',
            'bg-badge-success',
            'text-badge-success-foreground',
            'uppercase'
        )
    })

    it.each([
        {
            variant: 'primary' as const,
            expectedClasses: [
                'border-badge-primary',
                'bg-badge-primary',
                'text-badge-primary-foreground',
            ],
        },
        {
            variant: 'success' as const,
            expectedClasses: [
                'border-badge-success',
                'bg-badge-success',
                'text-badge-success-foreground',
            ],
        },
        {
            variant: 'warning' as const,
            expectedClasses: [
                'border-badge-warning',
                'bg-badge-warning',
                'text-badge-warning-foreground',
            ],
        },
        {
            variant: 'destructive' as const,
            expectedClasses: [
                'border-badge-destructive',
                'bg-badge-destructive',
                'text-badge-destructive-foreground',
            ],
        },
        {
            variant: 'neutral' as const,
            expectedClasses: [
                'border-badge-neutral',
                'bg-badge-neutral',
                'text-badge-neutral-foreground',
            ],
        },
    ])(
        'applies the $variant solid variant classes',
        ({ variant, expectedClasses }) => {
            render(
                <Badge variant={variant} appearance="solid">
                    Badge
                </Badge>
            )

            expect(screen.getByTestId('badge')).toHaveClass(...expectedClasses)
        }
    )

    it.each([
        {
            variant: 'primary' as const,
            expectedClasses: [
                'border-badge-primary',
                'bg-badge-primary-subtle',
                'text-badge-primary-subtle-foreground',
            ],
        },
        {
            variant: 'success' as const,
            expectedClasses: [
                'border-badge-success',
                'bg-badge-success-subtle',
                'text-badge-success-subtle-foreground',
            ],
        },
        {
            variant: 'warning' as const,
            expectedClasses: [
                'border-badge-warning',
                'bg-badge-warning-subtle',
                'text-badge-warning-subtle-foreground',
            ],
        },
        {
            variant: 'destructive' as const,
            expectedClasses: [
                'border-badge-destructive',
                'bg-badge-destructive-subtle',
                'text-badge-destructive-subtle-foreground',
            ],
        },
        {
            variant: 'neutral' as const,
            expectedClasses: [
                'border-badge-neutral',
                'bg-badge-neutral-subtle',
                'text-badge-neutral-subtle-foreground',
            ],
        },
    ])(
        'applies the $variant outline variant classes',
        ({ variant, expectedClasses }) => {
            render(
                <Badge variant={variant} appearance="outline">
                    Badge
                </Badge>
            )

            expect(screen.getByTestId('badge')).toHaveClass(...expectedClasses)
        }
    )

    it.each([
        {
            variant: 'primary' as const,
            expectedClasses: [
                'border-badge-primary-inverted',
                'bg-badge-primary-inverted',
                'text-badge-primary-inverted-foreground',
            ],
        },
        {
            variant: 'success' as const,
            expectedClasses: [
                'border-badge-success-inverted',
                'bg-badge-success-inverted',
                'text-badge-success-inverted-foreground',
            ],
        },
        {
            variant: 'warning' as const,
            expectedClasses: [
                'border-badge-warning-inverted',
                'bg-badge-warning-inverted',
                'text-badge-warning-inverted-foreground',
            ],
        },
        {
            variant: 'destructive' as const,
            expectedClasses: [
                'border-badge-destructive-inverted',
                'bg-badge-destructive-inverted',
                'text-badge-destructive-inverted-foreground',
            ],
        },
        {
            variant: 'neutral' as const,
            expectedClasses: [
                'border-badge-neutral-inverted',
                'bg-badge-neutral-inverted',
                'text-badge-neutral-inverted-foreground',
            ],
        },
    ])(
        'applies the $variant inverted variant classes',
        ({ variant, expectedClasses }) => {
            render(
                <Badge variant={variant} appearance="inverted">
                    Badge
                </Badge>
            )

            expect(screen.getByTestId('badge')).toHaveClass(...expectedClasses)
        }
    )

    it('sets the correct data attributes', () => {
        render(
            <Badge variant="warning" appearance="outline">
                Warning
            </Badge>
        )

        const badge = screen.getByTestId('badge')

        expect(badge).toHaveAttribute('data-slot', 'badge')
        expect(badge).toHaveAttribute('data-variant', 'warning')
        expect(badge).toHaveAttribute('data-appearance', 'outline')
    })

    it('applies uppercase styling by default', () => {
        render(<Badge>Badge</Badge>)

        expect(screen.getByTestId('badge')).toHaveClass('uppercase')
    })

    it('can disable uppercase styling', () => {
        render(<Badge uppercase={false}>Badge</Badge>)

        expect(screen.getByTestId('badge')).not.toHaveClass('uppercase')
    })

    it('merges a custom class name', () => {
        render(<Badge className="custom-badge-class">Badge</Badge>)

        expect(screen.getByTestId('badge')).toHaveClass('custom-badge-class')
    })

    it('forwards native span attributes', () => {
        render(
            <Badge id="badge-id" aria-label="Status">
                Badge
            </Badge>
        )

        const badge = screen.getByTestId('badge')

        expect(badge).toHaveAttribute('id', 'badge-id')
        expect(badge).toHaveAttribute('aria-label', 'Status')
    })

    it('renders content with an icon', () => {
        render(
            <Badge>
                <svg data-icon="inline-start" aria-label="Status icon" />
                Badge
            </Badge>
        )

        const badge = screen.getByTestId('badge')

        expect(badge).toContainElement(screen.getByLabelText('Status icon'))
        expect(badge).toHaveTextContent('Badge')
        expect(badge).toHaveClass(
            'has-data-[icon=inline-start]:pl-1.5',
            '[&>svg]:pointer-events-none',
            '[&>svg]:shrink-0'
        )
    })

    it('supports a custom render function', () => {
        render(
            <Badge
                variant="primary"
                appearance="outline"
                render={props => <a href="/example" {...props} />}>
                Badge
            </Badge>
        )

        const badge = screen.getByRole('link')

        expect(badge).toHaveAttribute('href', '/example')
        expect(badge).toHaveAttribute('data-slot', 'badge')
        expect(badge).toHaveAttribute('data-variant', 'primary')
        expect(badge).toHaveAttribute('data-appearance', 'outline')
        expect(badge).toHaveClass(
            'border-badge-primary',
            'bg-badge-primary-subtle',
            'text-badge-primary-subtle-foreground'
        )
    })
})
