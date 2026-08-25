import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../Button'
import {
    Popover,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from './Popover'

describe('Popover', () => {
    it('renders the popover when the trigger is pressed', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover>
                    <PopoverHeader>
                        <PopoverTitle>Popover titel</PopoverTitle>
                        <PopoverDescription>
                            Popover beschrijving
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>
        )

        expect(screen.queryByText('Popover titel')).not.toBeInTheDocument()

        await user.click(
            screen.getByRole('button', {
                name: 'Open popover',
            })
        )

        expect(screen.getByText('Popover titel')).toBeInTheDocument()
        expect(screen.getByText('Popover beschrijving')).toBeInTheDocument()
    })

    it('applies the default size', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover>Content</Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-content')).toHaveClass(
            'w-40',
            'text-s'
        )
    })

    it('applies the small size', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover size="s">Content</Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-content')).toHaveClass(
            'w-36',
            'text-xs'
        )
    })

    it('applies the base classes', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover>Content</Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-content')).toHaveClass(
            'z-50',
            'flex',
            'flex-col',
            'min-h-0',
            'overflow-hidden',
            'rounded',
            'bg-surface',
            'text-foreground',
            'shadow-popover',
            'outline-none'
        )
    })

    it('merges a custom className', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover className="custom-class">Content</Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-content')).toHaveClass(
            'custom-class'
        )
    })

    it('renders the correct data slots', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover>
                    <PopoverHeader>
                        <PopoverTitle>Popover titel</PopoverTitle>

                        <PopoverDescription>
                            Popover beschrijving
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-header')).toHaveAttribute(
            'data-slot',
            'popover-header'
        )

        expect(screen.getByTestId('popover-title')).toHaveAttribute(
            'data-slot',
            'popover-title'
        )

        expect(screen.getByTestId('popover-description')).toHaveAttribute(
            'data-slot',
            'popover-description'
        )
    })

    it('applies the placement', async () => {
        const user = userEvent.setup()

        render(
            <PopoverTrigger>
                <Button>Open popover</Button>

                <Popover placement="top">Content</Popover>
            </PopoverTrigger>
        )

        await user.click(screen.getByRole('button', { name: 'Open popover' }))

        expect(screen.getByTestId('popover-content')).toHaveAttribute(
            'data-placement',
            'top'
        )
    })
})
