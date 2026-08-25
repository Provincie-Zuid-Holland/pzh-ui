import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from './RadioGroup'

describe('RadioGroup', () => {
    it('selects one item and reports its value', () => {
        const onChange = vi.fn()

        render(
            <RadioGroup aria-label="Options" onChange={onChange}>
                <RadioGroupItem value="one">One</RadioGroupItem>
                <RadioGroupItem value="two">Two</RadioGroupItem>
            </RadioGroup>
        )

        fireEvent.click(screen.getByRole('radio', { name: 'Two' }))

        expect(onChange).toHaveBeenCalledWith('two')
        expect(screen.getByRole('radio', { name: 'Two' })).toBeChecked()
        expect(screen.getByRole('radio', { name: 'One' })).not.toBeChecked()
    })

    it('only renders the dot for the selected item', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="two">
                <RadioGroupItem value="one">One</RadioGroupItem>
                <RadioGroupItem value="two">Two</RadioGroupItem>
            </RadioGroup>
        )

        expect(
            container.querySelectorAll('[data-slot="radio-group-dot"]')
        ).toHaveLength(1)
        expect(screen.getByRole('radio', { name: 'Two' })).toBeChecked()
    })

    it.each([
        ['m', 'size-4'],
        ['l', 'size-[18px]'],
    ] as const)('applies the %s indicator and dot sizes', (size, ring) => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one">
                <RadioGroupItem value="one" size={size}>
                    One
                </RadioGroupItem>
            </RadioGroup>
        )

        expect(
            container.querySelector('[data-slot="radio-group-indicator"]')
        ).toHaveClass(ring, 'rounded-full', 'place-items-center')
        expect(
            container.querySelector('[data-slot="radio-group-dot"]')
        ).toHaveClass('size-2', 'rounded-full', 'bg-current')
    })

    it('applies the bordered l design', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one">
                <RadioGroupItem value="one" size="l" withBorder>
                    One
                </RadioGroupItem>
            </RadioGroup>
        )

        expect(
            container.querySelector('[data-slot="radio-group-item"]')
        ).toHaveClass('h-10', 'px-4', 'text-m', 'data-selected:border-success')
    })

    it('keeps the selected dot when disabled', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one" isDisabled>
                <RadioGroupItem value="one">One</RadioGroupItem>
            </RadioGroup>
        )

        expect(screen.getByRole('radio')).toBeDisabled()
        expect(
            container.querySelector('[data-slot="radio-group-dot"]')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-slot="radio-group-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/radio-group-item:group-data-[disabled]/radio-group-item:bg-text-disabled'
        )
    })

    it('keeps selected styling on hover', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one">
                <RadioGroupItem value="one" withBorder>
                    One
                </RadioGroupItem>
            </RadioGroup>
        )
        const item = container.querySelector('[data-slot="radio-group-item"]')!
        const indicator = container.querySelector(
            '[data-slot="radio-group-indicator"]'
        )

        fireEvent.pointerEnter(item, { pointerType: 'mouse' })

        expect(item).toHaveAttribute('data-hovered')
        expect(item).toHaveClass(
            'data-selected:data-hovered:border-success',
            'data-selected:data-hovered:bg-background'
        )
        expect(indicator).not.toHaveClass(
            'group-data-[selected]/radio-group-item:group-data-[hovered]/radio-group-item:bg-input-hover'
        )
    })

    it('uses the error border for a selected invalid item', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one" isInvalid>
                <RadioGroupItem value="one" withBorder>
                    One
                </RadioGroupItem>
            </RadioGroup>
        )

        expect(screen.getByRole('radiogroup')).toHaveAttribute(
            'aria-invalid',
            'true'
        )
        expect(
            container.querySelector('[data-slot="radio-group-item"]')
        ).toHaveAttribute('data-invalid')
        expect(
            container.querySelector('[data-slot="radio-group-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:border-destructive'
        )
    })

    it('uses a white dot while selected and pressed', () => {
        const { container } = render(
            <RadioGroup aria-label="Options" defaultValue="one">
                <RadioGroupItem value="one">One</RadioGroupItem>
            </RadioGroup>
        )
        const radio = container.querySelector('[data-slot="radio-group-item"]')!

        fireEvent.pointerDown(radio, { button: 0 })

        expect(radio).toHaveAttribute('data-pressed')
        expect(
            container.querySelector('[data-slot="radio-group-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/radio-group-item:group-data-[pressed]/radio-group-item:bg-success-foreground',
            'group-data-[selected]/radio-group-item:group-data-[pressed]/radio-group-item:text-text-inverse'
        )
    })
})
