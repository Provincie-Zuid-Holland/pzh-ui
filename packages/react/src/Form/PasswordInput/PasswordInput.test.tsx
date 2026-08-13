import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
    it('renders a password input', () => {
        render(<PasswordInput aria-label="Wachtwoord" />)

        expect(screen.getByLabelText('Wachtwoord')).toHaveAttribute(
            'type',
            'password'
        )
    })

    it('uses the default size', () => {
        render(<PasswordInput aria-label="Wachtwoord" />)

        expect(screen.getByTestId('password-input')).toHaveAttribute(
            'data-size',
            'l'
        )
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(<PasswordInput aria-label="Wachtwoord" size={size} />)

        expect(screen.getByTestId('password-input')).toHaveAttribute(
            'data-size',
            size
        )
    })

    it('does not show the toggle when the input is empty', () => {
        render(<PasswordInput aria-label="Wachtwoord" />)

        expect(
            screen.queryByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).not.toBeInTheDocument()
    })

    it('shows the toggle when a default value is provided', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
            />
        )

        expect(
            screen.getByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).toBeInTheDocument()
    })

    it('shows the toggle after entering a value', () => {
        render(<PasswordInput aria-label="Wachtwoord" />)

        fireEvent.change(screen.getByLabelText('Wachtwoord'), {
            target: {
                value: 'SuperSecret123!',
            },
        })

        expect(
            screen.getByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).toBeInTheDocument()
    })

    it('hides the toggle when the value is cleared', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
            />
        )

        fireEvent.change(screen.getByLabelText('Wachtwoord'), {
            target: {
                value: '',
            },
        })

        expect(
            screen.queryByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).not.toBeInTheDocument()
    })

    it('toggles the password visibility', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
            />
        )

        const input = screen.getByLabelText('Wachtwoord')

        expect(input).toHaveAttribute('type', 'password')

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Wachtwoord tonen',
            })
        )

        expect(input).toHaveAttribute('type', 'text')

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Wachtwoord verbergen',
            })
        )

        expect(input).toHaveAttribute('type', 'password')
    })

    it('does not render the toggle when showToggle is false', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
                showToggle={false}
            />
        )

        expect(
            screen.queryByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).not.toBeInTheDocument()
    })

    it('does not render the toggle when disabled', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
                disabled
            />
        )

        expect(screen.getByLabelText('Wachtwoord')).toBeDisabled()

        expect(
            screen.queryByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).not.toBeInTheDocument()
    })

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn()

        render(<PasswordInput aria-label="Wachtwoord" onChange={onChange} />)

        fireEvent.change(screen.getByLabelText('Wachtwoord'), {
            target: {
                value: 'SuperSecret123!',
            },
        })

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('supports an uncontrolled value', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                defaultValue="SuperSecret123!"
            />
        )

        expect(screen.getByLabelText('Wachtwoord')).toHaveValue(
            'SuperSecret123!'
        )
    })

    it('supports a controlled value', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                value="SuperSecret123!"
                onChange={() => {}}
            />
        )

        expect(screen.getByLabelText('Wachtwoord')).toHaveValue(
            'SuperSecret123!'
        )

        expect(
            screen.getByRole('button', {
                name: 'Wachtwoord tonen',
            })
        ).toBeInTheDocument()
    })

    it('does not update the value internally when controlled', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                value="SuperSecret123!"
                onChange={() => {}}
            />
        )

        fireEvent.change(screen.getByLabelText('Wachtwoord'), {
            target: {
                value: 'Changed',
            },
        })

        expect(screen.getByLabelText('Wachtwoord')).toHaveValue(
            'SuperSecret123!'
        )
    })

    it('forwards input props', () => {
        render(
            <PasswordInput
                aria-label="Wachtwoord"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Voer een wachtwoord in"
            />
        )

        const input = screen.getByLabelText('Wachtwoord')

        expect(input).toHaveAttribute('id', 'password')
        expect(input).toHaveAttribute('name', 'password')
        expect(input).toHaveAttribute('autocomplete', 'current-password')
        expect(input).toHaveAttribute('placeholder', 'Voer een wachtwoord in')
    })
})
