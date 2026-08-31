'use client'

import * as React from 'react'

import type { Node, ResolvedPos } from '@tiptap/pm/model'
import type { Selection } from '@tiptap/pm/state'
import { useCurrentEditor } from '@tiptap/react'

import { Button } from '../../Button'
import { cn } from '../../utils'

export type TableMenuOption =
    | 'mergeCells'
    | 'splitCell'
    | 'addRowAfter'
    | 'addColumnBefore'
    | 'addColumnAfter'
    | 'deleteRow'
    | 'deleteColumn'
    | 'toggleHeaderRow'
    | 'deleteTable'
    | 'backgroundColor'

const defaultTableMenuOptions: TableMenuOption[] = [
    'addRowAfter',
    'addColumnBefore',
    'addColumnAfter',
    'deleteRow',
    'deleteColumn',
    'toggleHeaderRow',
    'deleteTable',
]

export interface TableMenuProps extends Omit<
    React.ComponentProps<'div'>,
    'children'
> {
    open: boolean
    onOpenChange: (open: boolean) => void
    options?: TableMenuOption[]
}

function TableMenu({
    open,
    onOpenChange,
    options = defaultTableMenuOptions,
    className,
    ...props
}: TableMenuProps) {
    const { editor } = useCurrentEditor()

    const [canDeleteColumn, setCanDeleteColumn] = React.useState(true)

    React.useEffect(() => {
        if (!editor) {
            return
        }

        const updateCanDeleteColumn = () => {
            setCanDeleteColumn(getCanDeleteColumn(editor.state.selection))
        }

        updateCanDeleteColumn()

        editor.on('selectionUpdate', updateCanDeleteColumn)
        editor.on('transaction', updateCanDeleteColumn)

        return () => {
            editor.off('selectionUpdate', updateCanDeleteColumn)
            editor.off('transaction', updateCanDeleteColumn)
        }
    }, [editor])

    React.useEffect(() => {
        if (!open) {
            return
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onOpenChange, open])

    if (!editor || !open) {
        return null
    }

    const cellAttributes = editor.getAttributes('tableCell') as Record<
        string,
        unknown
    >

    const currentCellColor =
        typeof cellAttributes.backgroundColor === 'string'
            ? cellAttributes.backgroundColor
            : '#ffffff'

    return (
        <div
            data-slot="wysiwyg-table-menu"
            role="menu"
            aria-label="Tabelopties"
            className={cn(
                'min-w-56 absolute z-50',
                'rounded border border-border bg-surface',
                'p-2 shadow-card',
                className
            )}
            {...props}>
            {options.includes('mergeCells') && (
                <TableMenuItem
                    isDisabled={!editor.can().mergeCells()}
                    onPress={() => {
                        editor.chain().focus().mergeCells().run()
                        onOpenChange(false)
                    }}>
                    Cellen samenvoegen
                </TableMenuItem>
            )}

            {options.includes('splitCell') && (
                <TableMenuItem
                    isDisabled={!editor.can().splitCell()}
                    onPress={() => {
                        editor.chain().focus().splitCell().run()
                        onOpenChange(false)
                    }}>
                    Cel splitsen
                </TableMenuItem>
            )}

            {(options.includes('mergeCells') ||
                options.includes('splitCell')) && <TableMenuSeparator />}

            {options.includes('addRowAfter') && (
                <TableMenuItem
                    onPress={() => {
                        editor.chain().focus().addRowAfter().run()
                        onOpenChange(false)
                    }}>
                    Rij onder invoegen
                </TableMenuItem>
            )}

            {(options.includes('addColumnBefore') ||
                options.includes('addColumnAfter')) && (
                <>
                    <TableMenuSeparator />

                    {options.includes('addColumnBefore') && (
                        <TableMenuItem
                            onPress={() => {
                                editor.chain().focus().addColumnBefore().run()

                                onOpenChange(false)
                            }}>
                            Kolom links invoegen
                        </TableMenuItem>
                    )}

                    {options.includes('addColumnAfter') && (
                        <TableMenuItem
                            onPress={() => {
                                editor.chain().focus().addColumnAfter().run()

                                onOpenChange(false)
                            }}>
                            Kolom rechts invoegen
                        </TableMenuItem>
                    )}
                </>
            )}

            {(options.includes('deleteRow') ||
                options.includes('deleteColumn')) && (
                <>
                    <TableMenuSeparator />

                    {options.includes('deleteRow') && (
                        <TableMenuItem
                            isDisabled={!editor.can().deleteRow()}
                            onPress={() => {
                                editor.chain().focus().deleteRow().run()
                                onOpenChange(false)
                            }}>
                            Rij verwijderen
                        </TableMenuItem>
                    )}

                    {options.includes('deleteColumn') && canDeleteColumn && (
                        <TableMenuItem
                            isDisabled={!editor.can().deleteColumn()}
                            onPress={() => {
                                editor.chain().focus().deleteColumn().run()
                                onOpenChange(false)
                            }}>
                            Kolom verwijderen
                        </TableMenuItem>
                    )}
                </>
            )}

            {options.includes('toggleHeaderRow') && (
                <>
                    <TableMenuSeparator />

                    <TableMenuItem
                        isDisabled={!editor.can().toggleHeaderRow()}
                        onPress={() => {
                            editor.chain().focus().toggleHeaderRow().run()
                            onOpenChange(false)
                        }}>
                        Headerrij aan/uit
                    </TableMenuItem>
                </>
            )}

            {options.includes('deleteTable') && (
                <TableMenuItem
                    isDisabled={!editor.can().deleteTable()}
                    destructive
                    onPress={() => {
                        editor.chain().focus().deleteTable().run()
                        onOpenChange(false)
                    }}>
                    Tabel verwijderen
                </TableMenuItem>
            )}

            {options.includes('backgroundColor') && (
                <>
                    <TableMenuSeparator />

                    <TableCellColorPicker
                        value={currentCellColor}
                        onChange={color => {
                            editor
                                .chain()
                                .focus()
                                .setCellAttribute('backgroundColor', color)
                                .run()
                        }}
                    />
                </>
            )}
        </div>
    )
}

function TableMenuItem({
    className,
    destructive = false,
    ...props
}: React.ComponentProps<typeof Button> & {
    destructive?: boolean
}) {
    return (
        <Button
            variant="default"
            size="s"
            className={cn(
                'rounded px-3 w-full justify-start border-0 bg-transparent',
                'text-s font-bold text-left',
                destructive
                    ? 'text-destructive hover:bg-destructive-background'
                    : 'text-primary hover:bg-surface-muted',
                className
            )}
            {...props}
        />
    )
}

function TableMenuSeparator() {
    return <div role="separator" className="my-2 h-px bg-border-subtle" />
}

interface TableCellColorPickerProps {
    value: string
    onChange: (value: string) => void
}

function TableCellColorPicker({ value, onChange }: TableCellColorPickerProps) {
    return (
        <label className="gap-4 px-3 py-2 flex items-center justify-between">
            <span className="text-s font-bold text-primary">
                Achtergrondkleur
            </span>

            <input
                type="color"
                value={value}
                aria-label="Achtergrondkleur van cel"
                className="size-8 rounded cursor-pointer border border-border"
                onChange={event => onChange(event.target.value)}
            />
        </label>
    )
}

function getCanDeleteColumn(selection: Selection) {
    const anchor = selection.$anchor as ResolvedPos & {
        path?: Array<Node | number>
    }

    const table = anchor.path?.find(
        item => typeof item !== 'number' && item.type?.name === 'table'
    )

    if (!table || typeof table === 'number') {
        return true
    }

    if (table.content.childCount > 1) {
        const firstRow = table.content.firstChild

        return (firstRow?.childCount ?? 0) > 2
    }

    const firstRow = table.content.firstChild

    return (firstRow?.childCount ?? 0) > 2
}

export { TableMenu }
