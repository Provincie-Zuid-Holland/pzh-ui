import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from './Textarea'

describe('Textarea', () => {
    it('renders a textarea', () => {
        render(<Textarea />)

        expect(screen.getByTestId('textarea')).toBeInTheDocument()
    })

    it('uses the default size', () => {
        render(<Textarea />)

        expect(screen.getByTestId('textarea')).toHaveAttribute('data-size', 'l')
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(<Textarea size={size} />)

        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'data-size',
            size
        )
    })

    it('renders a placeholder', () => {
        render(<Textarea placeholder="Vul een toelichting in" />)

        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'placeholder',
            'Vul een toelichting in'
        )
    })

    it('renders a default value', () => {
        render(<Textarea defaultValue="Provincie Zuid-Holland" />)

        expect(screen.getByTestId('textarea')).toHaveValue(
            'Provincie Zuid-Holland'
        )
    })

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn()

        render(<Textarea onChange={onChange} />)

        fireEvent.change(screen.getByTestId('textarea'), {
            target: {
                value: 'Nieuwe waarde',
            },
        })

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('supports a controlled value', () => {
        render(<Textarea value="Vaste waarde" onChange={() => {}} />)

        expect(screen.getByTestId('textarea')).toHaveValue('Vaste waarde')
    })

    it('renders as disabled', () => {
        render(<Textarea disabled />)

        expect(screen.getByTestId('textarea')).toBeDisabled()
    })

    it('renders as readonly', () => {
        render(
            <Textarea
                readOnly
                defaultValue="Deze waarde kan niet worden aangepast"
            />
        )

        expect(screen.getByTestId('textarea')).toHaveAttribute('readonly')
    })

    it('renders the invalid state', () => {
        render(<Textarea aria-invalid />)

        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'aria-invalid',
            'true'
        )
    })

    it('does not render aria-invalid by default', () => {
        render(<Textarea />)

        expect(screen.getByTestId('textarea')).not.toHaveAttribute(
            'aria-invalid',
            'true'
        )
    })

    it('applies a custom className', () => {
        render(<Textarea className="custom-class" />)

        expect(screen.getByTestId('textarea')).toHaveClass('custom-class')
    })

    it('forwards HTML attributes', () => {
        render(
            <Textarea
                id="description"
                name="description"
                rows={5}
                maxLength={500}
            />
        )

        const textarea = screen.getByTestId('textarea')

        expect(textarea).toHaveAttribute('id', 'description')
        expect(textarea).toHaveAttribute('name', 'description')
        expect(textarea).toHaveAttribute('rows', '5')
        expect(textarea).toHaveAttribute('maxlength', '500')
    })

    it('supports aria-describedby', () => {
        render(<Textarea aria-describedby="description-help" />)

        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'aria-describedby',
            'description-help'
        )
    })

    it('supports aria-labelledby', () => {
        render(<Textarea aria-labelledby="description-label" />)

        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'aria-labelledby',
            'description-label'
        )
    })
})
