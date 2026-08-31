import React from 'react'

import type { Editor } from '@tiptap/core'

import { AngleDown, ArrowTurnDownLeft, TrashCan } from '@pzh-ui/icons'

import { Button } from '../../../Button'
import { ButtonGroup } from '../../../ButtonGroup'
import { Popover, PopoverTrigger } from '../../../Popover'
import { cn } from '../../../utils'
import { Input } from '../../Input'
import type { ToolbarAction } from './WysiwygToolbar.types'

type ButtonToolbarAction = Extract<ToolbarAction, { type?: 'button' }>
type LinkToolbarAction = Extract<ToolbarAction, { type: 'link' }>

export type ToolbarLinkSelection = {
    from: number
    to: number
    isLink: boolean
}

export function ToolbarButton({ action }: { action: ButtonToolbarAction }) {
    return (
        <Button
            type="button"
            size="m"
            variant="diapositive"
            aria-label={action.label}
            isDisabled={action.disabled}
            data-active={action.active || undefined}
            onPress={action.onAction}
            className={cn(
                'size-10 p-0 border-0',
                'hover:bg-surface-muted',
                'hover:text-success',
                'focus-visible:z-10',
                'focus-visible:ring-2',
                'focus-visible:ring-inset',
                'focus-visible:ring-focus',
                'data-active:bg-surface-muted',
                'data-active:text-primary',
                'disabled:rounded-none'
            )}>
            {action.icon}
        </Button>
    )
}

export function ToolbarLinkPopoverContent({
    editor,
    selection,
    href,
    existingLink,
    onHrefChange,
    onClose,
}: {
    editor: Editor
    selection: ToolbarLinkSelection
    href: string
    existingLink: boolean
    onHrefChange: (href: string) => void
    onClose: () => void
}) {
    const restoreSelection = () =>
        editor.chain().focus().setTextSelection({
            from: selection.from,
            to: selection.to,
        })

    const applyLink = () => {
        const url = href.trim()

        if (!url) {
            return
        }

        const { from, to, isLink } = selection
        const hasSelection = from !== to

        if (isLink) {
            editor
                .chain()
                .focus()
                .setTextSelection({ from, to })
                .extendMarkRange('link')
                .setLink({
                    href: url,
                    target: '_blank',
                })
                .run()

            onClose()
            return
        }

        if (hasSelection) {
            editor
                .chain()
                .focus()
                .setTextSelection({ from, to })
                .setLink({
                    href: url,
                    target: '_blank',
                })
                .run()

            onClose()
            return
        }

        editor
            .chain()
            .focus()
            .setTextSelection(from)
            .insertContent({
                type: 'text',
                text: url,
                marks: [
                    {
                        type: 'link',
                        attrs: {
                            href: url,
                            target: '_blank',
                        },
                    },
                ],
            })
            .run()

        onClose()
    }

    const removeLink = () => {
        restoreSelection().extendMarkRange('link').unsetLink().run()
        onClose()
    }

    return (
        <form
            className="w-105 p-2 max-w-[calc(100vw-2rem)]"
            onSubmit={event => {
                event.preventDefault()
                applyLink()
            }}>
            <ButtonGroup className="w-full">
                <Input
                    type="url"
                    size="m"
                    autoFocus
                    value={href}
                    aria-label="Link"
                    placeholder="https://..."

                    onChange={event => onHrefChange(event.target.value)}
                />
                <Button
                    type="submit"
                    variant="secondary"
                    size="m"
                    aria-label="Link opslaan"
                    className="w-10">
                    <ArrowTurnDownLeft aria-hidden="true" />
                </Button>
                {existingLink && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="m"
                        aria-label="Link verwijderen"
                        className="w-10"
                        onPress={removeLink}>
                        <TrashCan aria-hidden="true" />
                    </Button>
                )}
            </ButtonGroup>
        </form>
    )
}

export function ToolbarLinkButton({
    action,
    editor,
}: {
    action: LinkToolbarAction
    editor: Editor
}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [href, setHref] = React.useState('')
    const [selection, setSelection] =
        React.useState<ToolbarLinkSelection | null>(null)

    const openLink = React.useCallback(
        (selection: ToolbarLinkSelection, href: string) => {
            setSelection(selection)
            setHref(href)
            setIsOpen(true)
        },
        []
    )

    const open = () => {
        const { from, to } = editor.state.selection

        openLink(
            {
                from,
                to,
                isLink: editor.isActive('link'),
            },
            (editor.getAttributes('link').href as string | undefined) ?? ''
        )
    }

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const link = target.closest<HTMLAnchorElement>('a')

            if (!link || !editor.view.dom.contains(link)) {
                return
            }

            event.preventDefault()

            const pos = editor.view.posAtDOM(link, 0)

            editor
                .chain()
                .focus()
                .setTextSelection(pos)
                .extendMarkRange('link')
                .run()

            const { from, to } = editor.state.selection

            openLink(
                {
                    from,
                    to,
                    isLink: true,
                },
                link.getAttribute('href') ?? ''
            )
        }

        editor.view.dom.addEventListener('click', handleClick)

        return () => {
            editor.view.dom.removeEventListener('click', handleClick)
        }
    }, [editor, openLink])

    return (
        <PopoverTrigger
            isOpen={isOpen}
            onOpenChange={open => {
                if (!open) {
                    setIsOpen(false)
                }
            }}>
            <Button
                type="button"
                size="m"
                variant="diapositive"
                aria-label={action.label}
                isDisabled={action.disabled}
                data-active={action.active || undefined}
                onPress={open}
                className={cn(
                    'size-10 p-0 border-0',
                    'hover:bg-surface-muted',
                    'hover:text-success',
                    'focus-visible:z-10',
                    'focus-visible:ring-2',
                    'focus-visible:ring-inset',
                    'focus-visible:ring-focus',
                    'data-active:bg-surface-muted',
                    'data-active:text-primary',
                    'disabled:rounded-none'
                )}>
                {action.icon}
            </Button>

            <Popover
                placement="bottom end"
                offset={4}
                className="p-0 w-auto max-w-none overflow-visible">
                {selection && (
                    <ToolbarLinkPopoverContent
                        editor={editor}
                        selection={selection}
                        href={href}
                        existingLink={selection.isLink}
                        onHrefChange={setHref}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </Popover>
        </PopoverTrigger>
    )
}

export function ToolbarActionControl({
    action,
    editor,
}: {
    action: ToolbarAction
    editor: Editor
}) {
    if (action.type === 'link') {
        return <ToolbarLinkButton action={action} editor={editor} />
    }

    return <ToolbarButton action={action} />
}

export function HeadingSelect({
    editor,
    disabled,
}: {
    editor: Editor
    disabled: boolean
}) {
    const value = getHeadingValue(editor)

    return (
        <div className="h-10 min-w-20 relative flex items-center">
            <select
                aria-label="Tekststijl"
                value={value}
                disabled={disabled}
                className={cn(
                    'h-full w-full cursor-pointer appearance-none',
                    'pl-4 pr-10 rounded border-0 bg-transparent',
                    'text-s text-primary',
                    'transition-all outline-none',
                    'hover:bg-surface-muted',
                    'hover:text-success',
                    'focus-visible:ring-2',
                    'focus-visible:ring-inset',
                    'focus-visible:ring-focus',
                    'disabled:cursor-not-allowed',
                    'disabled:text-text-subtle',
                    'disabled:bg-input-disabled',
                    'disabled:rounded-none'
                )}
                onChange={event => {
                    const nextValue = event.target.value

                    if (nextValue === 'paragraph') {
                        editor.chain().focus().setParagraph().run()
                        return
                    }

                    const level = Number(nextValue)

                    if (level === 3 || level === 4 || level === 5) {
                        editor.chain().focus().setHeading({ level }).run()
                    }
                }}>
                <option value="paragraph">Normale tekst</option>
                <option value="3">Kop 3</option>
                <option value="4">Kop 4</option>
                <option value="5">Kop 5</option>
            </select>

            <AngleDown
                aria-hidden="true"
                className={cn(
                    'right-4 size-4 pointer-events-none absolute',
                    disabled ? 'text-text-subtle' : 'text-primary'
                )}
            />
        </div>
    )
}

function getHeadingValue(editor: Editor) {
    if (editor.isActive('heading', { level: 3 })) {
        return '3'
    }

    if (editor.isActive('heading', { level: 4 })) {
        return '4'
    }

    if (editor.isActive('heading', { level: 5 })) {
        return '5'
    }

    return 'paragraph'
}
