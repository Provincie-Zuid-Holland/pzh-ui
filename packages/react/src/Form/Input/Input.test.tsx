import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
    it('renders an input', () => {
        render(<Input />)

        expect(screen.getByTestId('input')).toBeInTheDocument()
    })

    it('forwards the input type', () => {
        render(<Input type="email" />)

        expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')
    })

    it('uses the default size', () => {
        render(<Input />)

        expect(screen.getByTestId('input')).toHaveAttribute('data-size', 'l')
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(<Input size={size} />)

        expect(screen.getByTestId('input')).toHaveAttribute('data-size', size)
    })

    it('renders a placeholder', () => {
        render(<Input placeholder="Vul je naam in" />)

        expect(screen.getByTestId('input')).toHaveAttribute(
            'placeholder',
            'Vul je naam in'
        )
    })

    it('renders a default value', () => {
        render(<Input defaultValue="Provincie Zuid-Holland" />)

        expect(screen.getByTestId('input')).toHaveValue(
            'Provincie Zuid-Holland'
        )
    })

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn()

        render(<Input onChange={onChange} />)

        fireEvent.change(screen.getByTestId('input'), {
            target: {
                value: 'Nieuwe waarde',
            },
        })

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('supports a controlled value', () => {
        render(<Input value="Vaste waarde" onChange={() => {}} />)

        expect(screen.getByTestId('input')).toHaveValue('Vaste waarde')
    })

    it('renders as disabled', () => {
        render(<Input disabled />)

        expect(screen.getByTestId('input')).toBeDisabled()
    })

    it('renders as readonly', () => {
        render(<Input defaultValue="PZH-2026-001" readOnly />)

        expect(screen.getByTestId('input')).toHaveAttribute('readonly')
    })

    it('renders the invalid state', () => {
        render(<Input aria-invalid />)

        expect(screen.getByTestId('input')).toHaveAttribute(
            'aria-invalid',
            'true'
        )
    })

    it('does not render aria-invalid by default', () => {
        render(<Input />)

        expect(screen.getByTestId('input')).not.toHaveAttribute(
            'aria-invalid',
            'true'
        )
    })

    it('applies a custom className', () => {
        render(<Input className="custom-class" />)

        expect(screen.getByTestId('input')).toHaveClass('custom-class')
    })

    it('forwards HTML attributes', () => {
        render(<Input id="name" name="name" autoComplete="name" />)

        const input = screen.getByTestId('input')

        expect(input).toHaveAttribute('id', 'name')
        expect(input).toHaveAttribute('name', 'name')
        expect(input).toHaveAttribute('autocomplete', 'name')
    })

    it('supports aria-describedby', () => {
        render(<Input aria-describedby="name-description" />)

        expect(screen.getByTestId('input')).toHaveAttribute(
            'aria-describedby',
            'name-description'
        )
    })
})
