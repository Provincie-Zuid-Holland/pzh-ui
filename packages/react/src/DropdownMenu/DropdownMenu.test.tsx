import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './DropdownMenu'

describe('DropdownMenu', () => {
    it('opens with keyboard, skips disabled actions and restores trigger focus', async () => {
        const user = userEvent.setup()
        const onAction = vi.fn()
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Acties</DropdownMenuTrigger>
                <DropdownMenuContent aria-label="Acties" onAction={onAction}>
                    <DropdownMenuItem id="edit">Bewerken</DropdownMenuItem>
                    <DropdownMenuItem id="disabled" isDisabled>
                        Verwijderen
                    </DropdownMenuItem>
                    <DropdownMenuItem id="archive">Archiveren</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        const trigger = screen.getByRole('button', { name: 'Acties' })
        await user.tab()
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('menu')).toBeInTheDocument()
        await waitFor(() =>
            expect(
                screen.getByRole('menuitem', { name: 'Bewerken' })
            ).toHaveFocus()
        )
        await user.keyboard('{ArrowDown}{Enter}')
        expect(onAction.mock.calls[0][0]).toBe('archive')
        await waitFor(() =>
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        )
        await waitFor(() => expect(trigger).toHaveFocus())
    })
    it('dismisses with Escape and supports small styling', async () => {
        const user = userEvent.setup()
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Acties</DropdownMenuTrigger>
                <DropdownMenuContent size="s" aria-label="Acties">
                    <DropdownMenuItem id="edit">Bewerken</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        await user.click(screen.getByRole('button', { name: 'Acties' }))
        expect(screen.getByRole('menu')).toHaveAttribute('data-size', 's')
        expect(screen.getByRole('menuitem')).toHaveClass('min-h-8')
        await user.keyboard('{Escape}')
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
    it('opens a submenu with keyboard navigation', async () => {
        const user = userEvent.setup()
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Acties</DropdownMenuTrigger>
                <DropdownMenuContent aria-label="Acties">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Exporteren
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent aria-label="Exportformaten">
                            <DropdownMenuItem id="pdf">PDF</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        await user.tab()
        await user.keyboard('{ArrowDown}')
        await waitFor(() =>
            expect(
                screen.getByRole('menuitem', { name: 'Exporteren' })
            ).toHaveFocus()
        )
        await user.keyboard('{ArrowRight}')
        expect(
            await screen.findByRole('menuitem', { name: 'PDF' })
        ).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'PDF' })).toHaveFocus()
    })
})
