import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
    it('toggles and reports its value', () => {
        const onChange = vi.fn()

        render(<Checkbox onChange={onChange}>Checkbox</Checkbox>)
        fireEvent.click(screen.getByRole('checkbox'))

        expect(onChange).toHaveBeenCalledWith(true)
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders the indeterminate state', () => {
        const { container } = render(
            <Checkbox isIndeterminate>Checkbox</Checkbox>
        )

        expect(screen.getByRole('checkbox')).toBePartiallyChecked()
        expect(
            container.querySelector('[data-slot="checkbox-indeterminate-icon"]')
        ).toBeInTheDocument()
    })

    it('keeps the check icon when selected and disabled', () => {
        const { container } = render(
            <Checkbox defaultSelected isDisabled>
                Checkbox
            </Checkbox>
        )

        expect(
            container.querySelector('[data-slot="checkbox-check-icon"]')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/checkbox:group-data-[disabled]/checkbox:border-border'
        )
    })

    it('uses the error border when selected and invalid', () => {
        const { container } = render(
            <Checkbox defaultSelected isInvalid>
                Checkbox
            </Checkbox>
        )

        expect(screen.getByRole('checkbox')).toHaveAttribute(
            'aria-invalid',
            'true'
        )
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:border-destructive'
        )
    })

    it('applies the bordered l design', () => {
        const { container } = render(
            <Checkbox size="l" withBorder>
                Checkbox
            </Checkbox>
        )

        expect(container.querySelector('[data-slot="checkbox"]')).toHaveClass(
            'h-10',
            'px-4',
            'text-m',
            'data-selected:border-success'
        )
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass('size-5')
    })

    it('uses the subtle surface for bordered hover and focus states', () => {
        const { container } = render(<Checkbox withBorder>Checkbox</Checkbox>)
        const checkbox = container.querySelector('[data-slot="checkbox"]')

        expect(checkbox).toHaveClass(
            'data-hovered:bg-surface-subtle',
            'data-focus-visible:bg-surface-subtle'
        )
    })

    it('lets hover and focus override the resting bordered error state', () => {
        const { container } = render(
            <Checkbox defaultSelected isInvalid withBorder>
                Checkbox
            </Checkbox>
        )
        const checkbox = container.querySelector('[data-slot="checkbox"]')
        const indicator = container.querySelector(
            '[data-slot="checkbox-indicator"]'
        )

        expect(checkbox).toHaveClass(
            'data-invalid:data-hovered:border-success',
            'data-invalid:data-hovered:bg-surface-subtle',
            'data-invalid:data-focus-visible:border-focus',
            'data-invalid:data-focus-visible:bg-surface-subtle'
        )
        expect(indicator).toHaveClass(
            'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
            'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent'
        )
    })

    it('keeps the unchecked indicator at its configured size', () => {
        const { container } = render(<Checkbox size="m">Checkbox</Checkbox>)

        expect(container.querySelector('[data-slot="checkbox"]')).toHaveClass(
            'align-middle'
        )
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass(
            'grid',
            'size-4',
            'place-items-center',
            'rounded-sm',
            'leading-none'
        )
        expect(
            container.querySelector('[data-slot="checkbox-check-icon"]')
        ).not.toBeInTheDocument()
        expect(
            container.querySelector('[data-slot="checkbox-indeterminate-icon"]')
        ).not.toBeInTheDocument()
    })

    it.each([
        ['m', '10'],
        ['l', '12'],
    ] as const)('passes the %s icon size to the svg', (size, iconSize) => {
        const { container } = render(
            <Checkbox defaultSelected size={size}>
                Checkbox
            </Checkbox>
        )

        const checkIcon = container.querySelector(
            '[data-slot="checkbox-check-icon"]'
        )

        expect(checkIcon).toHaveAttribute('width', iconSize)
        expect(checkIcon).toHaveAttribute('height', iconSize)
        expect(checkIcon).toHaveClass('m-auto', 'block', 'shrink-0')
    })

    it('uses the alternate checked hover treatment', () => {
        const { container } = render(
            <Checkbox defaultSelected>Checkbox</Checkbox>
        )
        const checkbox = container.querySelector('[data-slot="checkbox"]')!

        fireEvent.pointerEnter(checkbox, { pointerType: 'mouse' })

        expect(checkbox).toHaveAttribute('data-hovered')
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass(
            'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:border-input-border',
            'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
            'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:text-foreground'
        )
    })

    it.each([{ defaultSelected: true }, { isIndeterminate: true }])(
        'removes the indicator background when focused and selected',
        props => {
            const { container } = render(
                <Checkbox {...props}>Checkbox</Checkbox>
            )

            expect(
                container.querySelector('[data-slot="checkbox-indicator"]')
            ).toHaveClass(
                'group-data-[selected]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent',
                'group-data-[indeterminate]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent'
            )
        }
    )

    it('applies the pressed style to an unchecked checkbox', () => {
        const { container } = render(<Checkbox>Checkbox</Checkbox>)
        const checkbox = container.querySelector('[data-slot="checkbox"]')!

        fireEvent.pointerDown(checkbox, { button: 0 })

        expect(checkbox).toHaveAttribute('data-pressed')
        expect(
            container.querySelector('[data-slot="checkbox-indicator"]')
        ).toHaveClass('group-data-[pressed]/checkbox:bg-success-foreground')
        expect(
            container.querySelector('[data-slot="checkbox-check-icon"]')
        ).not.toBeInTheDocument()
        expect(
            container.querySelector('[data-slot="checkbox-indeterminate-icon"]')
        ).not.toBeInTheDocument()
    })

    it.each([{ defaultSelected: true }, { isIndeterminate: true }])(
        'keeps the settled mark while applying the pressed style',
        props => {
            const { container } = render(
                <Checkbox {...props}>Checkbox</Checkbox>
            )
            const checkbox = container.querySelector('[data-slot="checkbox"]')!

            fireEvent.pointerDown(checkbox, { button: 0 })

            expect(checkbox).toHaveAttribute('data-pressed')
            expect(
                container.querySelector(
                    '[data-slot="checkbox-check-icon"], [data-slot="checkbox-indeterminate-icon"]'
                )
            ).toHaveClass('block')
            expect(
                container.querySelector('[data-slot="checkbox-indicator"]')
            ).toHaveClass(
                'group-data-[pressed]/checkbox:bg-success-foreground',
                'group-data-[selected]/checkbox:group-data-[pressed]/checkbox:bg-success-foreground',
                'group-data-[indeterminate]/checkbox:group-data-[pressed]/checkbox:bg-success-foreground',
                'group-data-[selected]/checkbox:group-data-[pressed]/checkbox:text-text-inverse',
                'group-data-[indeterminate]/checkbox:group-data-[pressed]/checkbox:text-text-inverse'
            )
        }
    )
})
