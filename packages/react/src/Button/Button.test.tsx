import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button, LinkButton } from './Button'

describe('Button', () => {
    it('renders the button', () => {
        render(<Button>Opslaan</Button>)

        expect(screen.getByTestId('button')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Opslaan' })
        ).toBeInTheDocument()
    })

    it('renders children', () => {
        render(<Button>Mijn button</Button>)

        expect(screen.getByTestId('button')).toHaveTextContent('Mijn button')
    })

    it('uses the default variant and size', () => {
        render(<Button>Button</Button>)

        const button = screen.getByTestId('button')

        expect(button).toHaveAttribute('data-variant', 'primary')
        expect(button).toHaveAttribute('data-size', 'l')
    })

    it.each([
        'primary',
        'secondary',
        'cta',
        'diapositive',
        'caution',
        'default',
    ] as const)('supports the %s variant', variant => {
        render(<Button variant={variant}>Button</Button>)

        expect(screen.getByTestId('button')).toHaveAttribute(
            'data-variant',
            variant
        )
    })

    it.each(['l', 'm', 's'] as const)('supports the %s size', size => {
        render(<Button size={size}>Button</Button>)

        expect(screen.getByTestId('button')).toHaveAttribute('data-size', size)
    })

    it('applies a custom className', () => {
        render(<Button className="custom-class">Button</Button>)

        expect(screen.getByTestId('button')).toHaveClass('custom-class')
    })

    it('calls onPress when pressed', () => {
        const onPress = vi.fn()

        render(<Button onPress={onPress}>Opslaan</Button>)

        fireEvent.click(screen.getByRole('button', { name: 'Opslaan' }))

        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not call onPress when disabled', () => {
        const onPress = vi.fn()

        render(
            <Button isDisabled onPress={onPress}>
                Opslaan
            </Button>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Opslaan' }))

        expect(onPress).not.toHaveBeenCalled()
    })

    it('renders a disabled button', () => {
        render(<Button isDisabled>Opslaan</Button>)

        expect(screen.getByRole('button', { name: 'Opslaan' })).toBeDisabled()
    })

    it('renders the pending state', () => {
        render(<Button isPending>Opslaan</Button>)

        expect(screen.getByTestId('button')).toHaveAttribute('data-pending')
    })

    it('renders a spinner when pending', () => {
        const { container } = render(<Button isPending>Opslaan</Button>)

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('keeps the button label visible while pending', () => {
        render(<Button isPending>Opslaan</Button>)

        expect(screen.getByText('Opslaan')).toBeInTheDocument()
    })

    it('does not trigger onPress while pending', () => {
        const onPress = vi.fn()

        render(
            <Button isPending onPress={onPress}>
                Opslaan
            </Button>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Opslaan' }))

        expect(onPress).not.toHaveBeenCalled()
    })

    it('forwards native button props', () => {
        render(
            <Button type="submit" aria-label="Formulier opslaan">
                Opslaan
            </Button>
        )

        const button = screen.getByRole('button', {
            name: 'Formulier opslaan',
        })

        expect(button).toHaveAttribute('type', 'submit')
    })
})

describe('LinkButton', () => {
    it('renders a link', () => {
        render(<LinkButton href="/documenten">Documenten</LinkButton>)

        expect(
            screen.getByRole('link', { name: 'Documenten' })
        ).toBeInTheDocument()
    })

    it('uses the default variant and size', () => {
        render(<LinkButton href="/documenten">Documenten</LinkButton>)

        const link = screen.getByTestId('link-button')

        expect(link).toHaveAttribute('data-variant', 'primary')
        expect(link).toHaveAttribute('data-size', 'l')
    })

    it.each([
        'primary',
        'secondary',
        'cta',
        'diapositive',
        'caution',
        'default',
    ] as const)('supports the %s variant', variant => {
        render(
            <LinkButton href="/documenten" variant={variant}>
                Documenten
            </LinkButton>
        )

        expect(screen.getByTestId('link-button')).toHaveAttribute(
            'data-variant',
            variant
        )
    })

    it.each(['l', 'm', 's'] as const)('supports the %s size', size => {
        render(
            <LinkButton href="/documenten" size={size}>
                Documenten
            </LinkButton>
        )

        expect(screen.getByTestId('link-button')).toHaveAttribute(
            'data-size',
            size
        )
    })

    it('uses the provided href', () => {
        render(<LinkButton href="/documenten">Documenten</LinkButton>)

        expect(
            screen.getByRole('link', { name: 'Documenten' })
        ).toHaveAttribute('href', '/documenten')
    })

    it('applies a custom className', () => {
        render(
            <LinkButton href="/documenten" className="custom-class">
                Documenten
            </LinkButton>
        )

        expect(screen.getByTestId('link-button')).toHaveClass('custom-class')
    })
})
