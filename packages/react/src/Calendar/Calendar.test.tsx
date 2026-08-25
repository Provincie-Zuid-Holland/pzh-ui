import type { ReactNode } from 'react'
import { I18nProvider } from 'react-aria-components'

import { parseDate } from '@internationalized/date'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Calendar, RangeCalendar } from './Calendar'

const renderCalendar = (children: ReactNode) =>
    render(<I18nProvider locale="nl-NL">{children}</I18nProvider>)

describe('Calendar', () => {
    it('renders the calendar', () => {
        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        expect(
            screen.getByRole('application', {
                name: /datum kiezen/i,
            })
        ).toBeInTheDocument()
    })

    it('renders a default selected date', () => {
        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultValue={parseDate('2026-08-19')}
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        const date = within(grid).getByText('19')
        const gridCell = date.closest('[role="gridcell"]')

        expect(gridCell).toHaveAttribute('aria-selected', 'true')
    })

    it('calls onChange when a date is selected', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
                onChange={onChange}
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        await user.click(
            within(grid).getByRole('button', {
                name: /20 augustus 2026/i,
            })
        )

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(parseDate('2026-08-20'))
    })

    it('navigates to the next month', async () => {
        const user = userEvent.setup()

        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        expect(
            screen.getByRole('grid', {
                name: /augustus 2026/i,
            })
        ).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', {
                name: 'Volgende maand',
            })
        )

        expect(
            screen.getByRole('grid', {
                name: /september 2026/i,
            })
        ).toBeInTheDocument()
    })

    it('navigates to the previous month', async () => {
        const user = userEvent.setup()

        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Vorige maand',
            })
        )

        expect(
            screen.getByRole('grid', {
                name: /juli 2026/i,
            })
        ).toBeInTheDocument()
    })

    it('renders multiple months', () => {
        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                numberOfMonths={2}
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        expect(
            screen.getByRole('grid', {
                name: /augustus 2026/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('grid', {
                name: /september 2026/i,
            })
        ).toBeInTheDocument()
    })

    it('renders month and year dropdowns', () => {
        const { container } = renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                captionLayout="dropdown"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        const triggers = container.querySelectorAll(
            '[data-slot="select-trigger"]'
        )

        expect(triggers).toHaveLength(2)
        expect(triggers[0]).toHaveTextContent(/augustus/i)
        expect(triggers[1]).toHaveTextContent('2026')
    })

    it('opens the month dropdown', async () => {
        const user = userEvent.setup()

        const { container } = renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                captionLayout="dropdown"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        const monthTrigger = container.querySelector<HTMLButtonElement>(
            '[data-slot="select-trigger"]'
        )

        expect(monthTrigger).toBeInTheDocument()

        await user.click(monthTrigger!)

        expect(await screen.findByRole('listbox')).toBeInTheDocument()
    })

    it('changes the visible month using the month dropdown', async () => {
        const user = userEvent.setup()

        const { container } = renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                captionLayout="dropdown"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        const monthTrigger = container.querySelector<HTMLButtonElement>(
            '[data-slot="select-trigger"]'
        )

        expect(monthTrigger).toBeInTheDocument()

        await user.click(monthTrigger!)

        const listbox = await screen.findByRole('listbox')

        await user.click(
            within(listbox).getByRole('option', {
                name: /september/i,
            })
        )

        expect(
            screen.getByRole('grid', {
                name: /september 2026/i,
            })
        ).toBeInTheDocument()
    })

    it('renders an unavailable date as disabled', () => {
        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
                isDateUnavailable={date =>
                    date.compare(parseDate('2026-08-20')) === 0
                }
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        expect(
            within(grid).getByRole('button', {
                name: /20 augustus 2026/i,
            })
        ).toHaveAttribute('aria-disabled', 'true')
    })

    it('supports custom cell rendering', () => {
        renderCalendar(
            <Calendar
                aria-label="Datum kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
                renderCell={({ date, defaultChildren }) => (
                    <>
                        {defaultChildren}

                        {date.day === 19 && (
                            <span data-slot="custom-cell">Beschikbaar</span>
                        )}
                    </>
                )}
            />
        )

        expect(screen.getByTestId('custom-cell')).toHaveTextContent(
            'Beschikbaar'
        )
    })
})

describe('RangeCalendar', () => {
    it('renders the range calendar', () => {
        renderCalendar(
            <RangeCalendar
                aria-label="Periode kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
            />
        )

        expect(
            screen.getByRole('application', {
                name: /periode kiezen/i,
            })
        ).toBeInTheDocument()
    })

    it('renders a selected range', () => {
        renderCalendar(
            <RangeCalendar
                aria-label="Periode kiezen"
                defaultValue={{
                    start: parseDate('2026-08-12'),
                    end: parseDate('2026-08-18'),
                }}
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        const start = within(grid).getByText('12').closest('[role="gridcell"]')

        const middle = within(grid).getByText('15').closest('[role="gridcell"]')

        const end = within(grid).getByText('18').closest('[role="gridcell"]')

        expect(start).toHaveAttribute('aria-selected', 'true')
        expect(middle).toHaveAttribute('aria-selected', 'true')
        expect(end).toHaveAttribute('aria-selected', 'true')
    })

    it('calls onChange when a range is selected', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        renderCalendar(
            <RangeCalendar
                aria-label="Periode kiezen"
                defaultFocusedValue={parseDate('2026-08-19')}
                onChange={onChange}
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        await user.click(
            within(grid).getByRole('button', {
                name: /19 augustus 2026/i,
            })
        )

        await user.click(
            within(grid).getByRole('button', {
                name: /22 augustus 2026/i,
            })
        )

        expect(onChange).toHaveBeenLastCalledWith({
            start: parseDate('2026-08-19'),
            end: parseDate('2026-08-22'),
        })
    })

    it('renders a single-day range correctly', () => {
        renderCalendar(
            <RangeCalendar
                aria-label="Periode kiezen"
                defaultValue={{
                    start: parseDate('2026-08-19'),
                    end: parseDate('2026-08-19'),
                }}
            />
        )

        const grid = screen.getByRole('grid', {
            name: /augustus 2026/i,
        })

        const date = within(grid).getByText('19')
        const gridCell = date.closest('[role="gridcell"]')
        const rangeDay = date.closest('[data-range-start="true"]')

        expect(gridCell).toHaveAttribute('aria-selected', 'true')

        expect(rangeDay).toBeInTheDocument()
        expect(rangeDay).toHaveAttribute('data-range-start', 'true')
        expect(rangeDay).toHaveAttribute('data-range-end', 'true')
    })
})
