import type { Editor } from '@tiptap/react'

import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { Wysiwyg } from './Wysiwyg'

class ResizeObserverMock implements ResizeObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_callback: ResizeObserverCallback) {}
}

describe('Wysiwyg', () => {
    beforeAll(() => {
        vi.stubGlobal('ResizeObserver', ResizeObserverMock)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the editor', async () => {
        render(<Wysiwyg />)

        expect(screen.getByTestId('wysiwyg')).toBeInTheDocument()

        await waitFor(() => {
            expect(
                screen.getByTestId('wysiwyg').querySelector('.ProseMirror')
            ).toBeInTheDocument()
        })
    })

    it('renders the default toolbar', async () => {
        render(<Wysiwyg />)

        expect(
            await screen.findByRole('toolbar', {
                name: 'Tekstopmaak',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('combobox', {
                name: 'Tekststijl',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Vet',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Cursief',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Onderstrepen',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Opsomming',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Genummerde lijst',
            })
        ).toBeInTheDocument()
    })

    it('only renders configured toolbar options', async () => {
        render(<Wysiwyg toolbar={['bold', 'italic']} />)

        await screen.findByRole('toolbar', {
            name: 'Tekstopmaak',
        })

        expect(
            screen.getByRole('button', {
                name: 'Vet',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Cursief',
            })
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('button', {
                name: 'Onderstrepen',
            })
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('combobox', {
                name: 'Tekststijl',
            })
        ).not.toBeInTheDocument()
    })

    it('renders a placeholder', async () => {
        render(<Wysiwyg placeholder="Begin met typen..." />)

        await waitFor(() => {
            const placeholder = screen
                .getByTestId('wysiwyg')
                .querySelector('.is-editor-empty[data-placeholder]')

            expect(placeholder).toHaveAttribute(
                'data-placeholder',
                'Begin met typen...'
            )
        })
    })

    it('renders defaultValue as initial content', async () => {
        render(<Wysiwyg defaultValue="<p>Bestaande inhoud</p>" />)

        await waitFor(() => {
            expect(screen.getByText('Bestaande inhoud')).toBeInTheDocument()
        })
    })

    it('converts newlines in incoming content to hard breaks', async () => {
        const onCreate = vi.fn()

        render(
            <Wysiwyg
                defaultValue={'Eerste regel\nTweede regel'}
                onCreate={onCreate}
            />
        )

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor
        const html = editor.getHTML()

        expect(html).toContain('Eerste regel')
        expect(html).toContain('Tweede regel')
        expect(html).toContain('<br')
    })

    it('updates the editor when a controlled value changes', async () => {
        const { rerender } = render(<Wysiwyg value="<p>Eerste waarde</p>" />)

        expect(await screen.findByText('Eerste waarde')).toBeInTheDocument()

        rerender(<Wysiwyg value="<p>Tweede waarde</p>" />)

        await waitFor(() => {
            expect(screen.getByText('Tweede waarde')).toBeInTheDocument()
        })

        expect(screen.queryByText('Eerste waarde')).not.toBeInTheDocument()
    })

    it('calls onChange when the editor content changes', async () => {
        const onChange = vi.fn()
        const onCreate = vi.fn()

        render(<Wysiwyg onChange={onChange} onCreate={onCreate} />)

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        act(() => {
            editor.commands.setContent('<p>Nieuwe inhoud</p>', {
                emitUpdate: true,
            })
        })

        expect(onChange).toHaveBeenCalledWith('<p>Nieuwe inhoud</p>')
    })

    it('returns an empty string for an empty editor', async () => {
        const onChange = vi.fn()
        const onCreate = vi.fn()

        render(
            <Wysiwyg
                defaultValue="<p>Inhoud</p>"
                onChange={onChange}
                onCreate={onCreate}
            />
        )

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        act(() => {
            editor.commands.clearContent()
        })

        expect(onChange).toHaveBeenLastCalledWith('')
    })

    it('calls onBlur with the current value', async () => {
        const onBlur = vi.fn()

        render(
            <>
                <Wysiwyg defaultValue="<p>Concepttekst</p>" onBlur={onBlur} />

                <button type="button">Buiten editor</button>
            </>
        )

        const editor = await waitFor(() => {
            const element = screen
                .getByTestId('wysiwyg')
                .querySelector<HTMLElement>('[contenteditable="true"]')

            expect(element).toBeInTheDocument()

            return element!
        })

        editor.focus()

        expect(editor).toHaveFocus()

        screen
            .getByRole('button', {
                name: 'Buiten editor',
            })
            .focus()

        await waitFor(() => {
            expect(onBlur).toHaveBeenCalledWith('<p>Concepttekst</p>')
        })
    })

    it('calls onCreate with the editor instance', async () => {
        const onCreate = vi.fn()

        render(<Wysiwyg onCreate={onCreate} />)

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        expect(editor).toBeDefined()
        expect(editor.commands).toBeDefined()
    })

    it('renders the invalid state', () => {
        render(<Wysiwyg invalid />)

        const wysiwyg = screen.getByTestId('wysiwyg')

        expect(wysiwyg).toHaveAttribute('data-invalid', 'true')

        expect(wysiwyg).toHaveClass('data-invalid:border-destructive')
    })

    it('sets aria-invalid on the editor content', async () => {
        render(<Wysiwyg invalid />)

        await waitFor(() => {
            const content = screen
                .getByTestId('wysiwyg')
                .querySelector('[data-slot="wysiwyg-content"]')

            expect(content).toHaveAttribute('aria-invalid', 'true')
        })
    })

    it('renders the disabled state', async () => {
        const onCreate = vi.fn()

        render(<Wysiwyg disabled onCreate={onCreate} />)

        expect(screen.getByTestId('wysiwyg')).toHaveAttribute(
            'data-disabled',
            'true'
        )

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        expect(editor.isEditable).toBe(false)
    })

    it('updates editable state when disabled changes', async () => {
        const onCreate = vi.fn()

        const { rerender } = render(<Wysiwyg onCreate={onCreate} />)

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        expect(editor.isEditable).toBe(true)

        rerender(<Wysiwyg disabled onCreate={onCreate} />)

        await waitFor(() => {
            expect(editor.isEditable).toBe(false)
        })

        rerender(<Wysiwyg onCreate={onCreate} />)

        await waitFor(() => {
            expect(editor.isEditable).toBe(true)
        })
    })

    it('supports custom toolbar actions', async () => {
        render(
            <Wysiwyg
                customToolbarActions={editor => [
                    {
                        key: 'custom',
                        label: 'Custom actie',
                        icon: <span aria-hidden="true">C</span>,
                        active: editor.isActive('bold'),
                        onAction: () => {},
                    },
                ]}
            />
        )

        expect(
            await screen.findByRole('button', {
                name: 'Custom actie',
            })
        ).toBeInTheDocument()
    })

    it('does not render the table menu when table support is disabled', () => {
        render(<Wysiwyg toolbar={['bold', 'italic']} />)

        expect(
            screen.queryByTestId('wysiwyg-table-menu')
        ).not.toBeInTheDocument()
    })

    it('renders bold as b', async () => {
        const onCreate = vi.fn()

        render(
            <Wysiwyg defaultValue="<strong>Vet</strong>" onCreate={onCreate} />
        )

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        expect(editor.getHTML()).toContain('<b>Vet</b>')
        expect(editor.getHTML()).not.toContain('<strong>')
    })

    it('renders italic as i', async () => {
        const onCreate = vi.fn()

        render(<Wysiwyg defaultValue="<em>Cursief</em>" onCreate={onCreate} />)

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledOnce()
        })

        const editor = onCreate.mock.calls[0][0] as Editor

        expect(editor.getHTML()).toContain('<i>Cursief</i>')
        expect(editor.getHTML()).not.toContain('<em>')
    })
})
