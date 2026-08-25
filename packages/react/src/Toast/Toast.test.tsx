import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { Toaster, toast } from './Toast'

beforeAll(() => {
    vi.stubGlobal(
        'matchMedia',
        (query: string): MediaQueryList => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => true,
        })
    )
})

afterEach(() => {
    toast.dismiss()
})

describe('Toaster', () => {
    it('renders an info toast with the designed structure', async () => {
        render(<Toaster />)

        act(() => {
            toast.info('Info', {
                description: 'Dit is een informatieve melding.',
            })
        })

        const title = await screen.findByText('Info')
        const toastElement = title.closest('[data-sonner-toast]')

        expect(toastElement).toHaveClass(
            'w-90',
            'rounded-lg',
            'bg-surface-raised',
            'shadow-popover'
        )
        expect(toastElement).toHaveClass(
            '[&_[data-icon]]:bg-brand-blue-light'
        )
        expect(title).toHaveClass(
            'text-heading-s',
            'font-bold',
            'text-primary'
        )
        expect(
            screen.getByText('Dit is een informatieve melding.')
        ).toHaveClass('text-s', 'text-foreground')
    })

    it.each([
        ['info', '[&_[data-icon]]:bg-brand-blue-light'],
        ['warning', '[&_[data-icon]]:bg-warning'],
        ['success', '[&_[data-icon]]:bg-brand-green-light'],
        ['error', '[&_[data-icon]]:bg-destructive-border'],
    ] as const)('uses the correct rail for %s toasts', async (type, rail) => {
        render(<Toaster />)

        act(() => {
            toast[type](`${type} title`)
        })

        const title = await screen.findByText(`${type} title`)

        expect(title.closest('[data-sonner-toast]')).toHaveClass(rail)
    })

    it('renders an accessible close button by default', async () => {
        render(<Toaster />)

        act(() => {
            toast.success('Opgeslagen')
        })

        expect(
            await screen.findByRole('button', { name: 'Melding sluiten' })
        ).toHaveClass('text-primary', 'focus-visible:ring-focus')
    })

    it('merges custom toaster and toast classes', async () => {
        render(
            <Toaster
                className="custom-toaster"
                toastOptions={{
                    classNames: { toast: 'custom-toast' },
                }}
            />
        )

        act(() => {
            toast.info('Aangepast')
        })

        const toastElement = (await screen.findByText('Aangepast')).closest(
            '[data-sonner-toast]'
        )

        expect(toastElement?.closest('[data-sonner-toaster]')).toHaveClass(
            'custom-toaster'
        )
        expect(toastElement).toHaveClass('custom-toast')
    })
})
