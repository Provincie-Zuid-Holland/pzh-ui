import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from './InputGroup'

describe('InputGroup', () => {
    it('renders the input group', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Waarde" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group')).toBeInTheDocument()
    })

    it('uses the default size', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Waarde" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group')).toHaveAttribute(
            'data-size',
            'l'
        )
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(
            <InputGroup size={size}>
                <InputGroupInput aria-label="Waarde" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group')).toHaveAttribute(
            'data-size',
            size
        )
    })

    it('applies a custom className', () => {
        render(
            <InputGroup className="custom-class">
                <InputGroupInput aria-label="Waarde" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group')).toHaveClass('custom-class')
    })
})

describe('InputGroupInput', () => {
    it('renders the input control', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" />
            </InputGroup>
        )

        expect(
            screen.getByRole('textbox', { name: 'Bedrag' })
        ).toBeInTheDocument()
    })

    it('renders a placeholder', () => {
        render(
            <InputGroup>
                <InputGroupInput
                    aria-label="Bedrag"
                    placeholder="Vul een waarde in"
                />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveAttribute(
            'placeholder',
            'Vul een waarde in'
        )
    })

    it('renders a default value', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" defaultValue="123" />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveValue(
            '123'
        )
    })

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn()

        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" onChange={onChange} />
            </InputGroup>
        )

        fireEvent.change(screen.getByRole('textbox', { name: 'Bedrag' }), {
            target: {
                value: 'Nieuwe waarde',
            },
        })

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('supports disabled', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" disabled />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toBeDisabled()
    })

    it('supports readonly', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" readOnly />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveAttribute(
            'readonly'
        )
    })

    it('supports invalid state', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" aria-invalid />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveAttribute(
            'aria-invalid',
            'true'
        )
    })

    it('applies a custom className', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Bedrag" className="custom-class" />
            </InputGroup>
        )

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveClass(
            'custom-class'
        )
    })
})

describe('InputGroupAddon', () => {
    it('renders the addon', () => {
        render(
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>€</InputGroupText>
                </InputGroupAddon>

                <InputGroupInput aria-label="Bedrag" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group-addon')).toBeInTheDocument()
    })

    it('uses inline-start as the default alignment', () => {
        render(
            <InputGroup>
                <InputGroupAddon>€</InputGroupAddon>
                <InputGroupInput aria-label="Bedrag" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group-addon')).toHaveAttribute(
            'data-align',
            'inline-start'
        )
    })

    it.each([
        'inline-start',
        'inline-end',
        'block-start',
        'block-end',
    ] as const)('supports %s alignment', align => {
        render(
            <InputGroup>
                <InputGroupAddon align={align}>Addon</InputGroupAddon>
                <InputGroupInput aria-label="Waarde" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group-addon')).toHaveAttribute(
            'data-align',
            align
        )
    })

    it('focuses the input when the addon is clicked', () => {
        render(
            <InputGroup>
                <InputGroupAddon>€</InputGroupAddon>
                <InputGroupInput aria-label="Bedrag" />
            </InputGroup>
        )

        fireEvent.click(screen.getByTestId('input-group-addon'))

        expect(screen.getByRole('textbox', { name: 'Bedrag' })).toHaveFocus()
    })

    it('does not move focus to the input when a button inside the addon is clicked', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Zoeken" />

                <InputGroupAddon align="inline-end">
                    <button type="button">Actie</button>
                </InputGroupAddon>
            </InputGroup>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Actie' }))

        expect(
            screen.getByRole('textbox', { name: 'Zoeken' })
        ).not.toHaveFocus()
    })

    it('applies a custom className', () => {
        render(
            <InputGroup>
                <InputGroupAddon className="custom-class">€</InputGroupAddon>

                <InputGroupInput aria-label="Bedrag" />
            </InputGroup>
        )

        expect(screen.getByTestId('input-group-addon')).toHaveClass(
            'custom-class'
        )
    })
})

describe('InputGroupText', () => {
    it('renders text', () => {
        render(<InputGroupText>kg</InputGroupText>)

        expect(screen.getByText('kg')).toBeInTheDocument()
    })

    it('applies a custom className', () => {
        render(<InputGroupText className="custom-class">kg</InputGroupText>)

        expect(screen.getByText('kg')).toHaveClass('custom-class')
    })
})

describe('InputGroupButton', () => {
    it('renders the button', () => {
        render(
            <InputGroup>
                <InputGroupInput aria-label="Zoeken" />

                <InputGroupAddon align="inline-end">
                    <InputGroupButton>Zoeken</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        )

        expect(
            screen.getByRole('button', { name: 'Zoeken' })
        ).toBeInTheDocument()
    })

    it('uses button as the default type', () => {
        render(<InputGroupButton>Zoeken</InputGroupButton>)

        expect(screen.getByRole('button', { name: 'Zoeken' })).toHaveAttribute(
            'type',
            'button'
        )
    })

    it('supports submit type', () => {
        render(<InputGroupButton type="submit">Versturen</InputGroupButton>)

        expect(
            screen.getByRole('button', { name: 'Versturen' })
        ).toHaveAttribute('type', 'submit')
    })

    it('calls onPress when pressed', () => {
        const onPress = vi.fn()

        render(<InputGroupButton onPress={onPress}>Zoeken</InputGroupButton>)

        fireEvent.click(screen.getByRole('button', { name: 'Zoeken' }))

        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('applies a custom className', () => {
        render(
            <InputGroupButton className="custom-class">Zoeken</InputGroupButton>
        )

        expect(screen.getByRole('button', { name: 'Zoeken' })).toHaveClass(
            'custom-class'
        )
    })
})
