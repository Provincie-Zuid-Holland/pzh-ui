import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Toggle } from './Toggle'

describe('Toggle', () => {
    it('toggles its selected state', () => {
        const onChange = vi.fn()

        render(
            <Toggle aria-label="Meldingen inschakelen" onChange={onChange} />
        )

        const toggle = screen.getByRole('switch', {
            name: 'Meldingen inschakelen',
        })
        const toggleRoot = screen.getByTestId('toggle')

        expect(toggleRoot).not.toHaveAttribute('data-selected')

        toggle.click()

        expect(toggleRoot).toHaveAttribute('data-selected', 'true')
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('positions the thumb according to the selected state', () => {
        render(<Toggle aria-label="Ingeschakeld" defaultSelected />)

        expect(screen.getByTestId('toggle-thumb')).toHaveClass(
            'group-data-[selected]/toggle:translate-x-6'
        )
        expect(screen.getByTestId('toggle')).toHaveAttribute(
            'data-selected',
            'true'
        )
    })

    it('cannot be changed when disabled', () => {
        const onChange = vi.fn()

        render(
            <Toggle
                aria-label="Niet beschikbaar"
                isDisabled
                onChange={onChange}
            />
        )

        const toggle = screen.getByRole('switch')

        toggle.click()

        expect(onChange).not.toHaveBeenCalled()
        expect(toggle).toBeDisabled()
    })

    it('accepts a custom class name', () => {
        render(<Toggle aria-label="Aangepast" className="custom-toggle" />)

        expect(screen.getByTestId('toggle')).toHaveClass('custom-toggle')
    })
})
