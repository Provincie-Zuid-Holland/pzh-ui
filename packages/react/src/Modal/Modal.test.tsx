import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../Button'
import {
    Modal,
    ModalClose,
    ModalDescription,
    ModalTitle,
    ModalTrigger,
} from './Modal'

function Example({
    size = 'm',
    onOpenChange,
}: {
    size?: 'm' | 'l'
    onOpenChange?: (open: boolean) => void
}) {
    return (
        <ModalTrigger onOpenChange={onOpenChange}>
            <Button>Open</Button>
            <Modal size={size} aria-describedby="modal-subtitle">
                <ModalTitle>Title</ModalTitle>
                <ModalDescription id="modal-subtitle">
                    Subtitle
                </ModalDescription>
                <input aria-label="Name" />
                <ModalClose>Cancel</ModalClose>
            </Modal>
        </ModalTrigger>
    )
}

describe('Modal', () => {
    it.each(['m', 'l'] as const)(
        'opens an accessible dialog in size %s',
        async size => {
            const user = userEvent.setup()
            render(<Example size={size} />)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
            await user.click(screen.getByRole('button', { name: 'Open' }))
            expect(
                screen.getByRole('dialog', { name: 'Title' })
            ).toHaveAccessibleDescription('Subtitle')
            expect(screen.getByTestId('modal')).toHaveClass(
                size === 'm' ? 'max-w-160' : 'max-w-226'
            )
        }
    )
    it.each(['Escape', 'close', 'Cancel'])(
        'closes with %s and restores focus',
        async action => {
            const user = userEvent.setup()
            const onOpenChange = vi.fn()
            render(<Example onOpenChange={onOpenChange} />)
            const trigger = screen.getByRole('button', { name: 'Open' })
            await user.click(trigger)
            if (action === 'Escape') await user.keyboard('{Escape}')
            else
                await user.click(
                    screen.getByRole('button', {
                        name: action === 'close' ? 'Sluiten' : action,
                    })
                )
            await waitFor(() =>
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
            )
            await waitFor(() => expect(trigger).toHaveFocus())
            expect(onOpenChange).toHaveBeenLastCalledWith(false)
        }
    )
    it('keeps keyboard focus inside the dialog', async () => {
        const user = userEvent.setup()
        render(<Example />)
        await user.click(screen.getByRole('button', { name: 'Open' }))
        await user.click(
            screen
                .getByRole('button', { name: 'Sluiten' })
                .closest('[role="dialog"]')!
                .querySelector('input')!
        )
        await user.tab({ shift: true })
        expect(screen.getByRole('button', { name: 'Sluiten' })).toHaveFocus()
        await user.tab()
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus()
    })
    it('supports controlled state and hiding the default close button', () => {
        render(
            <ModalTrigger isOpen>
                <Button>Open</Button>
                <Modal showCloseButton={false}>
                    <ModalTitle>Controlled</ModalTitle>
                </Modal>
            </ModalTrigger>
        )
        expect(
            screen.getByRole('dialog', { name: 'Controlled' })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Sluiten' })
        ).not.toBeInTheDocument()
    })
})
