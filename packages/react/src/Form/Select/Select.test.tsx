import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './Select'

const options = [
    { id: 'noord-holland', name: 'Noord-Holland' },
    { id: 'utrecht', name: 'Utrecht' },
    { id: 'zuid-holland', name: 'Zuid-Holland' },
]

const renderSelect = ({
    size = 'l',
    isDisabled = false,
}: {
    size?: 'l' | 'm'
    isDisabled?: boolean
} = {}) =>
    render(
        <Select
            aria-label="Provincie"
            size={size}
            isDisabled={isDisabled}
            placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.id} id={option.id}>
                        {option.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )

describe('Select', () => {
    it('renders the placeholder', () => {
        renderSelect()

        expect(
            screen.getByRole('button', {
                name: /selecteer een provincie/i,
            })
        ).toBeInTheDocument()
    })

    it('opens the list when the trigger is pressed', async () => {
        const user = userEvent.setup()

        renderSelect()

        await user.click(
            screen.getByRole('button', {
                name: /selecteer een provincie/i,
            })
        )

        expect(
            screen.getByRole('option', {
                name: 'Noord-Holland',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('option', {
                name: 'Utrecht',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('option', {
                name: 'Zuid-Holland',
            })
        ).toBeInTheDocument()
    })

    it('selects an item', async () => {
        const user = userEvent.setup()

        renderSelect()

        const trigger = screen.getByRole('button', {
            name: /selecteer een provincie/i,
        })

        await user.click(trigger)

        await user.click(
            screen.getByRole('option', {
                name: 'Zuid-Holland',
            })
        )

        expect(trigger).toHaveTextContent('Zuid-Holland')
    })

    it('renders a default selected value', () => {
        render(
            <Select
                aria-label="Provincie"
                defaultSelectedKey="zuid-holland"
                placeholder="Selecteer een provincie">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.id} id={option.id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )

        expect(
            screen.getByRole('button', {
                name: /zuid-holland/i,
            })
        ).toHaveTextContent('Zuid-Holland')
    })

    it('does not open when disabled', async () => {
        const user = userEvent.setup()

        renderSelect({ isDisabled: true })

        const trigger = screen.getByRole('button', {
            name: /selecteer een provincie/i,
        })

        expect(trigger).toBeDisabled()

        await user.click(trigger)

        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('does not allow selecting a disabled item', async () => {
        const user = userEvent.setup()

        render(
            <Select
                aria-label="Provincie"
                placeholder="Selecteer een provincie">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem id="noord-holland">Noord-Holland</SelectItem>

                    <SelectItem id="utrecht" isDisabled>
                        Utrecht
                    </SelectItem>

                    <SelectItem id="zuid-holland">Zuid-Holland</SelectItem>
                </SelectContent>
            </Select>
        )

        const trigger = screen.getByRole('button', {
            name: /selecteer een provincie/i,
        })

        await user.click(trigger)

        const disabledItem = screen.getByRole('option', {
            name: 'Utrecht',
        })

        expect(disabledItem).toHaveAttribute('data-disabled')

        await user.click(disabledItem)

        expect(trigger).not.toHaveTextContent('Utrecht')
    })

    it('uses large size by default', () => {
        const { container } = renderSelect()

        const select = container.querySelector('[data-slot="select"]')
        const trigger = container.querySelector('[data-slot="select-trigger"]')

        expect(select).toHaveAttribute('data-size', 'l')
        expect(trigger).toHaveAttribute('data-size', 'l')
    })

    it('uses medium size when size is m', async () => {
        const user = userEvent.setup()
        const { container } = renderSelect({ size: 'm' })

        const select = container.querySelector('[data-slot="select"]')
        const trigger = container.querySelector('[data-slot="select-trigger"]')

        expect(select).toHaveAttribute('data-size', 'm')
        expect(trigger).toHaveAttribute('data-size', 'm')

        await user.click(
            screen.getByRole('button', {
                name: /selecteer een provincie/i,
            })
        )

        expect(screen.getByRole('listbox')).toHaveAttribute('data-size', 'm')

        expect(
            screen.getByRole('option', {
                name: 'Noord-Holland',
            })
        ).toHaveAttribute('data-size', 'm')
    })

    it('marks the selected item as selected', async () => {
        const user = userEvent.setup()

        renderSelect()

        await user.click(
            screen.getByRole('button', {
                name: /selecteer een provincie/i,
            })
        )

        const item = screen.getByRole('option', {
            name: 'Zuid-Holland',
        })

        await user.click(item)

        await user.click(
            screen.getByRole('button', {
                name: /zuid-holland/i,
            })
        )

        expect(
            screen.getByRole('option', {
                name: 'Zuid-Holland',
            })
        ).toHaveAttribute('data-selected')
    })

    it('supports multiple selection', async () => {
        const user = userEvent.setup()

        render(
            <Select
                aria-label="Provincies"
                selectionMode="multiple"
                placeholder="Selecteer provincies">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.id} id={option.id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )

        const trigger = screen.getByRole('button', {
            name: /selecteer provincies/i,
        })

        await user.click(trigger)

        await user.click(
            screen.getByRole('option', {
                name: 'Noord-Holland',
            })
        )

        await user.click(
            screen.getByRole('option', {
                name: 'Zuid-Holland',
            })
        )

        expect(trigger).toHaveTextContent('Noord-Holland')
        expect(trigger).toHaveTextContent('Zuid-Holland')
    })
})
