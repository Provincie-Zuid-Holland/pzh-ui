import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NumberInput } from './NumberInput'

describe('NumberInput', () => {
    it('renders the number input', () => {
        render(<NumberInput aria-label="Aantal" />)

        expect(screen.getByTestId('number-input')).toBeInTheDocument()
        expect(
            screen.getByRole('textbox', { name: 'Aantal' })
        ).toBeInTheDocument()
    })

    it('uses the default size', () => {
        render(<NumberInput aria-label="Aantal" />)

        expect(screen.getByTestId('input-group')).toHaveAttribute(
            'data-size',
            'l'
        )
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(<NumberInput aria-label="Aantal" size={size} />)

        expect(screen.getByTestId('input-group')).toHaveAttribute(
            'data-size',
            size
        )
    })

    it('shows the default placeholder when empty', () => {
        render(<NumberInput aria-label="Aantal" />)

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveAttribute(
            'placeholder',
            '0'
        )
    })

    it('supports a custom placeholder', () => {
        render(<NumberInput aria-label="Aantal" placeholder="10" />)

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveAttribute(
            'placeholder',
            '10'
        )
    })

    it('renders a default value', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} />)

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveValue(
            '10'
        )
    })

    it('renders increment and decrement buttons', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} />)

        expect(
            screen.getByRole('button', { name: 'Verhogen' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'Verlagen' })
        ).toBeInTheDocument()
    })

    it('increments the value', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} step={1} />)

        fireEvent.click(screen.getByRole('button', { name: 'Verhogen' }))

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveValue(
            '11'
        )
    })

    it('decrements the value', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} step={1} />)

        fireEvent.click(screen.getByRole('button', { name: 'Verlagen' }))

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveValue('9')
    })

    it('respects the step value', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} step={5} />)

        fireEvent.click(screen.getByRole('button', { name: 'Verhogen' }))

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveValue(
            '15'
        )
    })

    it('disables the increment button at maxValue', () => {
        render(
            <NumberInput aria-label="Aantal" defaultValue={10} maxValue={10} />
        )

        expect(screen.getByRole('button', { name: 'Verhogen' })).toBeDisabled()
    })

    it('disables the decrement button at minValue', () => {
        render(
            <NumberInput aria-label="Aantal" defaultValue={0} minValue={0} />
        )

        expect(screen.getByRole('button', { name: 'Verlagen' })).toBeDisabled()
    })

    it('renders as disabled', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} isDisabled />)

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toBeDisabled()

        expect(screen.getByRole('button', { name: 'Verhogen' })).toBeDisabled()

        expect(screen.getByRole('button', { name: 'Verlagen' })).toBeDisabled()
    })

    it('renders as readonly', () => {
        render(<NumberInput aria-label="Aantal" defaultValue={10} isReadOnly />)

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveAttribute(
            'readonly'
        )
    })

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn()

        render(
            <NumberInput
                aria-label="Aantal"
                defaultValue={10}
                onChange={onChange}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'Verhogen' }))

        expect(onChange).toHaveBeenCalledWith(11)
    })

    it('supports a controlled value', () => {
        render(
            <NumberInput aria-label="Aantal" value={25} onChange={() => {}} />
        )

        expect(screen.getByRole('textbox', { name: 'Aantal' })).toHaveValue(
            '25'
        )
    })

    it('applies a custom className', () => {
        render(<NumberInput aria-label="Aantal" className="custom-class" />)

        expect(screen.getByTestId('number-input')).toHaveClass('custom-class')
    })

    it('forwards number field props', () => {
        render(
            <NumberInput
                aria-label="Aantal"
                name="amount"
                minValue={0}
                maxValue={100}
                step={5}
            />
        )

        expect(screen.getByTestId('number-input')).toBeInTheDocument()
    })
})
