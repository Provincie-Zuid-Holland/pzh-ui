'use client'

import * as React from 'react'

import type { AnyExtension, Extensions } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { Table, TableHeader, TableRow } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import { Placeholder } from '@tiptap/extensions/placeholder'
import {
    EditorContent,
    EditorContext,
    useEditor,
    type Editor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { cn } from '../../utils'
import { inputControlVariants } from '../Input'
import { HandleDOMEvents } from './extensions/HandleDOMEvents'
import { ImageUpload } from './extensions/ImageUpload'
import { NestedListLimit } from './extensions/NestedListLimit'
import { SanitisePastedHtml } from './extensions/SanitisePastedHtml'
import { CustomTableCell } from './extensions/TableCell'
import { CustomBold, CustomItalic } from './extensions/Typography'
import { TableMenu, type TableMenuOption } from './TableMenu'
import type { WysiwygImageOptions, WysiwygToolbarOption } from './Wysiwyg.types'
import { WysiwygToolbar } from './WysywigToolbar'
import type { ToolbarAction } from './WysywigToolbar/WysiwygToolbar.types'

export type WysiwygProps = Omit<
    React.ComponentProps<'div'>,
    'onChange' | 'onBlur'
> & {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    toolbar?: WysiwygToolbarOption[]
    toolbarClassName?: string
    customToolbarActions?: (editor: Editor) => ToolbarAction[]
    extensions?: AnyExtension[]
    onCreate?: (editor: Editor) => void
    tableMenuOptions?: TableMenuOption[]
    imageOptions?: WysiwygImageOptions
}

type TableMenuState = {
    open: boolean
    x: number
    y: number
}

const defaultToolbar: WysiwygToolbarOption[] = [
    'heading',
    'bold',
    'italic',
    'underline',
    'bulletList',
    'orderedList',
]

const defaultImageOptions: WysiwygImageOptions = {
    options: {
        allowBase64: true,
        inline: true,
    },
    uploadOptions: {
        maxHeight: 2500,
        maxWidth: 1500,
        maxSize: 1024 * 1024,
    },
}

function normalizeIncomingValue(value?: string) {
    return value?.replace(/\n/g, '<br />') ?? ''
}

function normalizeValue(editor: Editor) {
    const html = editor.getHTML()

    return html === '<p></p>' ? '' : html
}

function Wysiwyg({
    className,
    value,
    defaultValue = '',
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    invalid = false,
    toolbar = defaultToolbar,
    toolbarClassName,
    customToolbarActions,
    extensions,
    onCreate,
    tableMenuOptions,
    imageOptions = defaultImageOptions,
    ...props
}: WysiwygProps) {
    const isControlled = value !== undefined

    const [tableMenu, setTableMenu] = React.useState<TableMenuState>({
        open: false,
        x: 0,
        y: 0,
    })

    const features = React.useMemo(() => new Set(toolbar), [toolbar])

    const hasAlignment =
        features.has('alignLeft') ||
        features.has('alignCenter') ||
        features.has('alignRight') ||
        features.has('alignJustify')

    const hasTable = features.has('table')
    const hasImage = features.has('image')
    const hasLink = features.has('link')
    const hasLists = features.has('bulletList') || features.has('orderedList')

    const initialContent = React.useMemo(
        () => normalizeIncomingValue(value ?? defaultValue),
        [defaultValue, value]
    )

    const editorExtensions = React.useMemo<Extensions>(() => {
        const configuredExtensions: Extensions = [
            StarterKit.configure({
                /*
                 * Structural extensions such as Document, Paragraph, Text and
                 * HardBreak remain enabled because they form the editor's
                 * baseline document schema.
                 */

                heading: features.has('heading')
                    ? {
                          levels: [3, 4, 5],
                      }
                    : false,

                bold: false,
                italic: false,
                underline: features.has('underline') ? {} : false,
                strike: features.has('strike') ? {} : false,

                bulletList: features.has('bulletList') ? {} : false,
                orderedList: features.has('orderedList') ? {} : false,

                /*
                 * Link is configured separately below so StarterKit must never
                 * register its own Link extension.
                 */
                link: false,

                /*
                 * These features aren't currently exposed by the Wysiwyg.
                 */
                blockquote: false,
                code: false,
                codeBlock: false,
                horizontalRule: false,
                trailingNode: false,
            }),
        ]

        if (features.has('bold')) {
            configuredExtensions.push(CustomBold)
        }

        if (features.has('italic')) {
            configuredExtensions.push(CustomItalic)
        }

        if (hasAlignment) {
            configuredExtensions.push(
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    alignments: ['left', 'center', 'right', 'justify'],
                })
            )
        }

        if (hasTable) {
            configuredExtensions.push(
                Table.configure({
                    resizable: false,
                }),
                TableRow,
                TableHeader,
                CustomTableCell,
                SanitisePastedHtml,
                HandleDOMEvents.configure({
                    onTableContextMenu: ({ x, y }) => {
                        setTableMenu({
                            open: true,
                            x,
                            y,
                        })
                    },

                    onPointerDown: () => {
                        setTableMenu(current => ({
                            ...current,
                            open: false,
                        }))
                    },
                })
            )
        }

        if (features.has('subscript')) {
            configuredExtensions.push(Subscript)
        }

        if (features.has('superscript')) {
            configuredExtensions.push(Superscript)
        }

        if (hasLink) {
            configuredExtensions.push(
                Link.configure({
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: 'https',
                })
            )
        }

        if (hasLists) {
            configuredExtensions.push(
                NestedListLimit.configure({
                    maxDepth: 3,
                })
            )
        }

        if (hasImage) {
            configuredExtensions.push(
                Image.configure({
                    allowBase64: true,
                    inline: true,
                    ...imageOptions.options,
                }),
                ImageUpload.configure({
                    maxHeight: imageOptions.uploadOptions?.maxHeight ?? 2500,
                    maxWidth: imageOptions.uploadOptions?.maxWidth ?? 1500,
                    maxSize: imageOptions.uploadOptions?.maxSize ?? 1024 * 1024,
                })
            )
        }

        if (placeholder) {
            configuredExtensions.push(
                Placeholder.configure({
                    placeholder,
                })
            )
        }

        if (extensions) {
            configuredExtensions.push(...extensions)
        }

        return configuredExtensions
    }, [
        extensions,
        features,
        hasAlignment,
        hasImage,
        hasLink,
        hasTable,
        imageOptions,
        placeholder,
    ])

    const editor = useEditor({
        immediatelyRender: false,

        extensions: editorExtensions,

        content: initialContent,

        editable: !disabled,

        editorProps: {
            attributes: {
                class: cn(
                    'prose max-w-none',
                    'min-h-30 field-sizing-content',
                    'px-4 py-2',
                    'text-s text-text-editor',
                    'outline-none',

                    // Placeholder
                    '[&.is-editor-empty:first-child::before]:pointer-events-none',
                    '[&.is-editor-empty:first-child::before]:float-left',
                    '[&.is-editor-empty:first-child::before]:h-0',
                    '[&.is-editor-empty:first-child::before]:text-text-subtle',
                    '[&.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',

                    // Prose
                    'marker:text-text-editor',

                    {
                        'text-text-subtle': disabled,
                    }
                ),

                'aria-invalid': invalid ? 'true' : 'false',
                'data-slot': 'wysiwyg-content',
            },
        },

        onCreate({ editor }) {
            onCreate?.(editor)
        },

        onUpdate({ editor }) {
            onChange?.(normalizeValue(editor))
        },

        onBlur({ editor }) {
            onBlur?.(normalizeValue(editor))
        },
    })

    React.useEffect(() => {
        if (!editor) {
            return
        }

        editor.setEditable(!disabled)
    }, [disabled, editor])

    React.useEffect(() => {
        if (!editor || !isControlled) {
            return
        }

        const nextValue = normalizeIncomingValue(value)
        const currentValue = normalizeValue(editor)

        if (nextValue === currentValue) {
            return
        }

        editor.commands.setContent(nextValue, {
            emitUpdate: false,
        })
    }, [editor, isControlled, value])

    React.useEffect(() => {
        if (!tableMenu.open) {
            return
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target

            if (
                target instanceof HTMLElement &&
                target.closest('[data-slot="wysiwyg-table-menu"]')
            ) {
                return
            }

            setTableMenu(current => ({
                ...current,
                open: false,
            }))
        }

        document.addEventListener('pointerdown', handlePointerDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [tableMenu.open])

    const contextValue = React.useMemo(
        () => ({
            editor,
        }),
        [editor]
    )

    return (
        <EditorContext.Provider value={contextValue}>
            <div
                data-slot="wysiwyg"
                data-disabled={disabled || undefined}
                data-invalid={invalid || undefined}
                className={cn(
                    inputControlVariants(),

                    'group/wysiwyg relative h-auto',
                    '*:data-[slot=wysiwyg-toolbar]:rounded-t-[inherit]',

                    // Focus
                    'focus-within:border-transparent',
                    'focus-within:ring-2',
                    'focus-within:ring-focus',

                    // Disabled
                    'data-disabled:pointer-events-none',
                    'data-disabled:cursor-not-allowed',
                    'data-disabled:bg-input-disabled',
                    'data-disabled:text-text-subtle',

                    // Invalid
                    'data-invalid:rounded-b-none',
                    'data-invalid:border-destructive',

                    className
                )}
                {...props}>
                <WysiwygToolbar
                    options={toolbar}
                    disabled={disabled}
                    imageOptions={imageOptions}
                    customActions={
                        editor ? customToolbarActions?.(editor) : undefined
                    }
                    className={toolbarClassName}
                />

                <EditorContent editor={editor} />

                {hasTable && (
                    <TableMenu
                        open={tableMenu.open}
                        onOpenChange={open =>
                            setTableMenu(current => ({
                                ...current,
                                open,
                            }))
                        }
                        options={tableMenuOptions}
                        style={{
                            position: 'fixed',
                            left: tableMenu.x,
                            top: tableMenu.y,
                        }}
                    />
                )}
            </div>
        </EditorContext.Provider>
    )
}

export { Wysiwyg }
