import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from './Separator'

describe('Separator', () => {
    it('renders a horizontal separator by default', () => {
        const { container } = render(<Separator />)
        const separator = screen.getByRole('separator')

        expect(separator).toBeInstanceOf(HTMLHRElement)
        expect(separator).toHaveAttribute('data-slot', 'separator')
        expect(separator).toHaveAttribute('data-orientation', 'horizontal')
        expect(separator).toHaveClass(
            'data-[orientation=horizontal]:h-px',
            'data-[orientation=horizontal]:w-full'
        )
        expect(container.querySelector('hr')).toBe(separator)
    })

    it('renders an accessible vertical separator', () => {
        render(<Separator orientation="vertical" />)
        const separator = screen.getByRole('separator')

        expect(separator).toBeInstanceOf(HTMLDivElement)
        expect(separator).toHaveAttribute('aria-orientation', 'vertical')
        expect(separator).toHaveAttribute('data-orientation', 'vertical')
        expect(separator).toHaveClass(
            'data-[orientation=vertical]:w-px',
            'data-[orientation=vertical]:self-stretch'
        )
    })

    it('merges a custom class name and forwards props', () => {
        render(<Separator id="content-separator" className="my-6" />)
        const separator = screen.getByRole('separator')

        expect(separator).toHaveAttribute('id', 'content-separator')
        expect(separator).toHaveClass('my-6', 'bg-border')
    })
})
