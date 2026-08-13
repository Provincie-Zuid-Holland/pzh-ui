import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label } from './Label'

describe('Label', () => {
    it('renders the label', () => {
        render(<Label>Naam</Label>)

        expect(screen.getByTestId('label')).toBeInTheDocument()
        expect(screen.getByTestId('label')).toHaveTextContent('Naam')
    })

    it('uses the default size', () => {
        render(<Label>Naam</Label>)

        expect(screen.getByTestId('label')).toHaveClass('text-m')
    })

    it.each(['l', 'm'] as const)('supports the %s size', size => {
        render(<Label size={size}>Naam</Label>)

        expect(screen.getByTestId('label')).toHaveClass(
            size === 'l' ? 'text-m' : 'text-s'
        )
    })

    it('applies a custom className', () => {
        render(<Label className="custom-class">Naam</Label>)

        expect(screen.getByTestId('label')).toHaveClass('custom-class')
    })

    it('forwards htmlFor', () => {
        render(
            <>
                <Label htmlFor="name">Naam</Label>
                <input id="name" />
            </>
        )

        expect(screen.getByTestId('label')).toHaveAttribute('for', 'name')
    })

    it('associates the label with an input using htmlFor', () => {
        render(
            <>
                <Label htmlFor="name">Naam</Label>
                <input id="name" />
            </>
        )

        expect(screen.getByLabelText('Naam')).toHaveAttribute('id', 'name')
    })

    it('forwards native label props', () => {
        render(
            <Label id="name-label" title="Naam van de gebruiker">
                Naam
            </Label>
        )

        const label = screen.getByTestId('label')

        expect(label).toHaveAttribute('id', 'name-label')
        expect(label).toHaveAttribute('title', 'Naam van de gebruiker')
    })

    it('renders children', () => {
        render(
            <Label>
                <span>Voornaam</span>
                <span>*</span>
            </Label>
        )

        expect(screen.getByText('Voornaam')).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('forwards the slot prop', () => {
        render(<Label slot="label">Naam</Label>)

        expect(screen.getByTestId('label')).toHaveAttribute('slot', 'label')
    })
})
