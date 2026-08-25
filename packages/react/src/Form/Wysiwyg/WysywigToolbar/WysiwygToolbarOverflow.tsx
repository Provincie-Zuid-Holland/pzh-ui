import * as React from 'react'
import { Menu, MenuItem } from 'react-aria-components'

import type { Editor } from '@tiptap/core'

import { Ellipsis } from '@pzh-ui/icons'

import { Button } from '../../../Button'
import { Popover, PopoverTrigger } from '../../../Popover'
import { cn } from '../../../utils'
import type { ToolbarAction } from './WysiwygToolbar.types'
import {
    ToolbarLinkPopoverContent,
    type ToolbarLinkSelection,
} from './WysiwygToolbarButtons'

export function ToolbarOverflow({
    actions,
    editor,
}: {
    actions: ToolbarAction[]
    editor: Editor
}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [linkSelection, setLinkSelection] =
        React.useState<ToolbarLinkSelection | null>(null)
    const [href, setHref] = React.useState('')

    const openLink = () => {
        const { from, to } = editor.state.selection
        const existingHref = editor.getAttributes('link').href as
            string | undefined

        setLinkSelection({
            from,
            to,
            isLink: editor.isActive('link'),
        })

        setHref(existingHref ?? '')
    }

    const close = () => {
        setIsOpen(false)
        setLinkSelection(null)
        setHref('')
    }

    return (
        <div data-slot="wysiwyg-toolbar-overflow" className="ml-auto shrink-0">
            <PopoverTrigger
                isOpen={isOpen}
                onOpenChange={open => {
                    setIsOpen(open)

                    if (!open) {
                        setLinkSelection(null)
                        setHref('')
                    }
                }}>
                <Button
                    type="button"
                    variant="default"
                    size="m"
                    aria-label="Meer opmaakopties"
                    className={cn(
                        'size-10 p-0 rounded-none border-0',
                        'bg-transparent text-primary',
                        'hover:bg-surface-muted',
                        'hover:text-success',
                        '[&>svg]:size-4'
                    )}>
                    <Ellipsis aria-hidden="true" />
                </Button>

                <Popover
                    placement="bottom end"
                    className={cn(
                        linkSelection
                            ? 'p-0 w-auto max-w-none overflow-visible'
                            : 'min-w-56 border border-border'
                    )}>
                    {linkSelection ? (
                        <ToolbarLinkPopoverContent
                            editor={editor}
                            selection={linkSelection}
                            href={href}
                            existingLink={linkSelection.isLink}
                            onHrefChange={setHref}
                            onClose={close}
                        />
                    ) : (
                        <Menu
                            items={actions}
                            aria-label="Meer opmaakopties"
                            className="min-h-0 p-1 flex-1 overflow-y-auto outline-none">
                            {action => (
                                <MenuItem
                                    id={action.key}
                                    textValue={action.label}
                                    isDisabled={action.disabled}
                                    shouldCloseOnSelect={action.type !== 'link'}
                                    data-active={action.active || undefined}
                                    className={menuItemClassName}
                                    onAction={() => {
                                        if (action.type === 'link') {
                                            openLink()
                                            return
                                        }

                                        action.onAction()
                                        setIsOpen(false)
                                    }}>
                                    {action.icon}
                                    <span>{action.label}</span>
                                </MenuItem>
                            )}
                        </Menu>
                    )}
                </Popover>
            </PopoverTrigger>
        </div>
    )
}

const menuItemClassName = cn(
    'gap-3 flex cursor-pointer items-center',
    'rounded px-3 py-2',
    'text-s font-bold text-primary',
    'outline-none',
    'data-focused:bg-surface-muted',
    'data-hovered:bg-surface-muted',
    'data-active:bg-surface-muted',
    'data-disabled:cursor-not-allowed',
    'data-disabled:text-text-disabled',
    '[&>svg]:size-4',
    '[&>svg]:shrink-0'
)
