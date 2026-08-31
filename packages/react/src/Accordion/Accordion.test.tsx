import '@testing-library/jest-dom/vitest'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './Accordion'

function Example({
    size = 'l',
    variant = 'underline',
}: {
    size?: 'l' | 'm'
    variant?: 'underline' | 'outline'
}) {
    return (
        <Accordion size={size} variant={variant}>
            <AccordionItem id="details">
                <AccordionTrigger>Accordion title</AccordionTrigger>
                <AccordionContent>Accordion content</AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

describe('Accordion', () => {
    it('opens and closes an item', () => {
        render(<Example />)

        const trigger = screen.getByRole('button', { name: 'Accordion title' })

        expect(trigger).toHaveAttribute('aria-expanded', 'false')
        expect(screen.getByText('Accordion content')).not.toBeVisible()

        fireEvent.click(trigger)

        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText('Accordion content')).toBeInTheDocument()
    })

    it.each([
        ['l', 'min-h-12', 'text-m'],
        ['m', 'min-h-10', 'text-s'],
    ] as const)('applies the %s size', (size, height, textSize) => {
        render(<Example size={size} />)

        expect(screen.getByRole('button')).toHaveClass(height, textSize)
    })

    it('applies the underline variant', () => {
        const { container } = render(<Example variant="underline" />)

        expect(container.querySelector('[data-slot="accordion"]')).toHaveClass(
            'gap-0'
        )
        expect(
            container.querySelector('[data-slot="accordion-item"]')
        ).toHaveClass('border-b', 'border-border')
    })

    it('applies the outline variant', () => {
        const { container } = render(<Example variant="outline" />)

        expect(container.querySelector('[data-slot="accordion"]')).toHaveClass(
            'gap-4'
        )
        expect(
            container.querySelector('[data-slot="accordion-item"]')
        ).toHaveClass(
            'rounded-lg',
            'border',
            'border-border',
            'has-[button:focus-visible]:ring-2',
            'has-[button:focus-visible]:ring-focus'
        )
        expect(screen.getByRole('button')).not.toHaveClass(
            'focus-visible:ring-2'
        )
    })

    it('applies the active state while pressed', () => {
        const { container } = render(<Example variant="outline" />)
        const trigger = screen.getByRole('button')

        fireEvent.pointerDown(trigger, { button: 0 })

        expect(trigger).toHaveAttribute('data-pressed')
        expect(trigger).toHaveClass(
            'data-pressed:bg-input-hover',
            'data-pressed:text-foreground'
        )
        expect(
            container.querySelector('[data-slot="accordion-item"]')
        ).toHaveClass('has-[button[data-pressed]]:border-input-border')
    })
})
