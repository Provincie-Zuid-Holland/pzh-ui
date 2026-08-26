import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../Button'
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from './ButtonGroup'

describe('ButtonGroup', () => {
    it('renders an accessible horizontal group by default', () => {
        render(
            <ButtonGroup aria-label="Documentacties">
                <Button>Opslaan</Button>
                <Button>Verwijderen</Button>
            </ButtonGroup>
        )

        const group = screen.getByRole('group', { name: 'Documentacties' })

        expect(group).toHaveAttribute('data-slot', 'button-group')
        expect(group).toHaveAttribute('data-orientation', 'horizontal')
        expect(group).toHaveClass(
            '[&_[data-slot]~[data-slot]]:rounded-l-none',
            '[&_[data-slot]~[data-slot]]:border-l-0'
        )
        expect(screen.getByRole('button', { name: 'Opslaan' })).toBeVisible()
        expect(
            screen.getByRole('button', { name: 'Verwijderen' })
        ).toBeVisible()
    })

    it('applies the vertical layout', () => {
        render(
            <ButtonGroup orientation="vertical" aria-label="Documentacties">
                <Button>Opslaan</Button>
                <Button>Verwijderen</Button>
            </ButtonGroup>
        )

        const group = screen.getByRole('group', { name: 'Documentacties' })

        expect(group).toHaveAttribute('data-orientation', 'vertical')
        expect(group).toHaveClass(
            'flex-col',
            '[&_[data-slot]~[data-slot]]:rounded-t-none',
            '[&_[data-slot]~[data-slot]]:border-t-0'
        )
    })

    it('renders group text with the input styling', () => {
        render(
            <ButtonGroupText render={props => <span {...props} />}>
                of
            </ButtonGroupText>
        )

        const text = screen.getByText('of')

        expect(text.tagName).toBe('SPAN')
        expect(text).toHaveAttribute('data-slot', 'button-group-text')
        expect(text).toHaveAttribute('data-size', 'l')
        expect(text).toHaveClass(
            'h-12',
            'border-input-border',
            'bg-input',
            'text-foreground'
        )
    })

    it('supports the medium input size for group text', () => {
        render(<ButtonGroupText size="m">Tekst</ButtonGroupText>)

        expect(screen.getByText('Tekst')).toHaveAttribute('data-size', 'm')
        expect(screen.getByText('Tekst')).toHaveClass('h-10', 'px-2', 'text-s')
    })

    it('renders an accessible separator between buttons', () => {
        render(
            <ButtonGroup aria-label="Aantal aanpassen">
                <Button>Verlagen</Button>
                <ButtonGroupSeparator />
                <Button>Verhogen</Button>
            </ButtonGroup>
        )

        const separator = screen.getByTestId('button-group-separator')

        expect(separator).toHaveAttribute('aria-orientation', 'vertical')
        expect(separator).toHaveAttribute('data-orientation', 'vertical')
        expect(separator).toHaveClass('bg-border')
    })

    it('merges a custom class and forwards group props', () => {
        render(
            <ButtonGroup
                aria-label="Acties"
                id="actions"
                className="custom-class"
            />
        )

        const group = screen.getByRole('group', { name: 'Acties' })

        expect(group).toHaveAttribute('id', 'actions')
        expect(group).toHaveClass('custom-class')
    })
})
