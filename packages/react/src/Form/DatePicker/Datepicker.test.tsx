import { parseDate } from '@internationalized/date'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
    it('renders with the default placeholder', () => {
        render(<DatePicker />)

        expect(screen.getByPlaceholderText('Kies een dag')).toBeInTheDocument()
    })

    it('renders a default value', () => {
        render(<DatePicker defaultValue={parseDate('2030-01-11')} />)

        expect(screen.getByDisplayValue('11-01-2030')).toBeInTheDocument()
    })

    it('opens the calendar when pressing ArrowDown', async () => {
        const user = userEvent.setup()

        render(<DatePicker />)

        const input = screen.getByRole('textbox')

        await user.click(input)
        await user.keyboard('{ArrowDown}')

        expect(
            screen.getByRole('button', { name: 'Vorige maand' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'Volgende maand' })
        ).toBeInTheDocument()
    })

    it('opens the calendar when pressing the calendar button', async () => {
        const user = userEvent.setup()

        render(<DatePicker />)

        await user.click(screen.getByRole('button', { name: 'Kies een datum' }))

        expect(
            screen.getByRole('button', { name: 'Vorige maand' })
        ).toBeInTheDocument()
    })

    it('updates the value when typing a valid date', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<DatePicker onChange={onChange} />)

        const input = screen.getByRole('textbox')

        await user.type(input, '11-01-2030')

        expect(input).toHaveValue('11-01-2030')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(parseDate('2030-01-11'))
    })

    it('does not call onChange for an invalid date', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<DatePicker onChange={onChange} />)

        const input = screen.getByRole('textbox')

        await user.type(input, 'invalid')

        expect(input).toHaveValue('invalid')
        expect(onChange).not.toHaveBeenCalled()
    })

    it('updates when controlled value changes', () => {
        const { rerender } = render(
            <DatePicker value={parseDate('2030-01-11')} />
        )

        expect(screen.getByRole('textbox')).toHaveValue('11-01-2030')

        rerender(<DatePicker value={parseDate('2030-02-20')} />)

        expect(screen.getByRole('textbox')).toHaveValue('20-02-2030')
    })

    it('forwards input props', () => {
        render(
            <DatePicker
                id="start-date"
                name="startDate"
                aria-label="Startdatum"
            />
        )

        const input = screen.getByRole('textbox', {
            name: 'Startdatum',
        })

        expect(input).toHaveAttribute('id', 'start-date')
        expect(input).toHaveAttribute('name', 'startDate')
    })

    it('does not render the calendar button when disabled', () => {
        render(<DatePicker disabled />)

        expect(screen.getByRole('textbox')).toBeDisabled()

        expect(
            screen.queryByRole('button', { name: 'Kies een datum' })
        ).not.toBeInTheDocument()
    })
})
