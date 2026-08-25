import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Tooltip, TooltipTrigger } from './Tooltip'

describe('Tooltip', () => {
    it('renders accessible tooltip content with the correct styling', async () => {
        render(
            <TooltipTrigger isOpen>
                <button type="button">More information</button>
                <Tooltip>Helpful information</Tooltip>
            </TooltipTrigger>
        )

        const trigger = screen.getByRole('button', {
            name: 'More information',
        })
        const tooltip = await screen.findByRole('tooltip')

        expect(tooltip).toHaveTextContent('Helpful information')
        expect(tooltip).toHaveClass('bg-foreground', 'text-background')
        expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
        expect(
            tooltip.querySelector('[data-slot="tooltip-arrow"]')
        ).toHaveClass('bg-foreground', 'fill-foreground')
    })

    it('merges a custom class name', async () => {
        render(
            <TooltipTrigger isOpen>
                <button type="button">Trigger</button>
                <Tooltip className="max-w-sm">Content</Tooltip>
            </TooltipTrigger>
        )

        expect(await screen.findByRole('tooltip')).toHaveClass('max-w-sm')
    })
})
