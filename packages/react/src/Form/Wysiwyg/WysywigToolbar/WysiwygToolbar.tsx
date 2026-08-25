'use client'

import * as React from 'react'

import type { Editor } from '@tiptap/core'
import { useCurrentEditor, useEditorState } from '@tiptap/react'

import { cn } from '../../../utils'
import { insertImages } from '../utils/image'
import type {
    WysiwygImageOptions,
    WysiwygToolbarOption,
} from '../Wysiwyg.types'
import { createToolbarGroups } from './WysiwygToolbar.actions'
import {
    ToolbarAction,
    ToolbarGroupDefinition,
    ToolbarState,
} from './WysiwygToolbar.types'
import { HeadingSelect, ToolbarActionControl } from './WysiwygToolbarButtons'
import { ToolbarOverflow } from './WysiwygToolbarOverflow'

export interface WysiwygToolbarProps {
    options: WysiwygToolbarOption[]
    className?: string
    disabled?: boolean
    imageOptions?: WysiwygImageOptions
    customActions?: ToolbarAction[]
}

const OVERFLOW_BUTTON_WIDTH = 40

export function WysiwygToolbar(props: WysiwygToolbarProps) {
    const { editor } = useCurrentEditor()

    const state = useEditorState({
        editor,
        selector: ({ editor }): ToolbarState | null => {
            if (!editor) {
                return null
            }

            return {
                focused: editor.isFocused,
                inTable: editor.isActive('table'),

                bold: editor.isActive('bold'),
                italic: editor.isActive('italic'),
                underline: editor.isActive('underline'),
                strike: editor.isActive('strike'),

                alignLeft: editor.isActive({
                    textAlign: 'left',
                }),
                alignCenter: editor.isActive({
                    textAlign: 'center',
                }),
                alignRight: editor.isActive({
                    textAlign: 'right',
                }),
                alignJustify: editor.isActive({
                    textAlign: 'justify',
                }),

                bulletList: editor.isActive('bulletList'),
                orderedList: editor.isActive('orderedList'),

                subscript: editor.isActive('subscript'),
                superscript: editor.isActive('superscript'),

                link: editor.isActive('link'),
            }
        },
    })

    if (!editor || !state) {
        return null
    }

    return <WysiwygToolbarContent {...props} editor={editor} state={state} />
}

function WysiwygToolbarContent({
    options,
    className,
    disabled = false,
    imageOptions,
    customActions = [],
    editor,
    state,
}: WysiwygToolbarProps & {
    editor: Editor
    state: ToolbarState
}) {
    const toolbarRef = React.useRef<HTMLDivElement>(null)
    const measureRef = React.useRef<HTMLDivElement>(null)
    const imageInputRef = React.useRef<HTMLInputElement>(null)

    const [visibleGroupCount, setVisibleGroupCount] = React.useState(
        Number.POSITIVE_INFINITY
    )

    const headingEnabled = options.includes('heading')

    const openImagePicker = React.useCallback(() => {
        if (!disabled) {
            imageInputRef.current?.click()
        }
    }, [disabled])

    const handleLink = React.useCallback(() => {
        if (disabled) {
            return
        }

        const previousUrl = editor.getAttributes('link').href as
            string | undefined

        const url = window.prompt('URL', previousUrl ?? '')

        if (url === null) {
            return
        }

        if (!url.trim()) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({
                href: url,
                target: '_blank',
            })
            .run()
    }, [disabled, editor])

    const builtInGroups = React.useMemo(
        () =>
            createToolbarGroups({
                editor,
                options,
                state,
                disabled,
                onImage: openImagePicker,
            }),
        [disabled, editor, handleLink, openImagePicker, options, state]
    )

    const groups = React.useMemo<ToolbarGroupDefinition[]>(() => {
        if (!customActions.length) {
            return builtInGroups
        }

        return [
            ...builtInGroups,
            {
                key: 'custom',
                actions: customActions,
            },
        ]
    }, [builtInGroups, customActions])

    const updateVisibleGroups = React.useCallback(() => {
        const toolbar = toolbarRef.current
        const measure = measureRef.current

        if (!toolbar || !measure) {
            return
        }

        const availableWidth = toolbar.clientWidth

        const headingWidth = headingEnabled
            ? (measure
                  .querySelector<HTMLElement>('[data-measure-heading]')
                  ?.getBoundingClientRect().width ?? 0)
            : 0

        const groupWidths = Array.from(
            measure.querySelectorAll<HTMLElement>('[data-measure-group]')
        ).map(element => element.getBoundingClientRect().width)

        const totalWidth =
            headingWidth +
            groupWidths.reduce((total, width) => total + width, 0)

        if (totalWidth <= availableWidth) {
            setVisibleGroupCount(groups.length)
            return
        }

        const availableGroupWidth =
            availableWidth - headingWidth - OVERFLOW_BUTTON_WIDTH

        let usedWidth = 0
        let nextVisibleGroupCount = 0

        for (const groupWidth of groupWidths) {
            if (usedWidth + groupWidth > availableGroupWidth) {
                break
            }

            usedWidth += groupWidth
            nextVisibleGroupCount++
        }

        setVisibleGroupCount(nextVisibleGroupCount)
    }, [groups.length, headingEnabled])

    React.useLayoutEffect(() => {
        updateVisibleGroups()
    }, [updateVisibleGroups])

    React.useEffect(() => {
        const toolbar = toolbarRef.current

        if (!toolbar) {
            return
        }

        const observer = new ResizeObserver(updateVisibleGroups)

        observer.observe(toolbar)

        return () => {
            observer.disconnect()
        }
    }, [updateVisibleGroups])

    const visibleGroups = groups.slice(0, visibleGroupCount)

    const overflowActions = groups
        .slice(visibleGroupCount)
        .flatMap(group => group.actions)

    return (
        <>
            <div
                ref={toolbarRef}
                data-slot="wysiwyg-toolbar"
                role="toolbar"
                aria-label="Tekstopmaak"
                className={cn(
                    'top-0 sticky z-10',
                    'min-w-0 flex w-full items-stretch',
                    'overflow-hidden border-b border-border-strong',
                    'bg-surface',
                    {
                        'bg-input-disabled': disabled,
                    },
                    className
                )}>
                {headingEnabled && (
                    <ToolbarGroup>
                        <HeadingSelect editor={editor} disabled={disabled} />
                    </ToolbarGroup>
                )}

                {visibleGroups.map(group => (
                    <ToolbarGroup key={group.key}>
                        {group.actions.map(action => (
                            <ToolbarActionControl
                                key={action.key}
                                action={action}
                                editor={editor}
                            />
                        ))}
                    </ToolbarGroup>
                ))}

                {overflowActions.length > 0 && (
                    <ToolbarOverflow
                        actions={overflowActions}
                        editor={editor}
                    />
                )}
            </div>

            <ToolbarMeasure
                ref={measureRef}
                editor={editor}
                disabled={disabled}
                headingEnabled={headingEnabled}
                groups={groups}
            />

            <input
                ref={imageInputRef}
                type="file"
                hidden
                multiple
                accept={
                    imageOptions?.uploadOptions?.accept ??
                    'image/png,image/gif,image/jpeg,image/bmp,image/x-icon'
                }
                onChange={event => {
                    const files = event.target.files

                    if (files?.length) {
                        void insertImages(editor, files, {
                            maxSize: imageOptions?.uploadOptions?.maxSize,
                            maxHeight: imageOptions?.uploadOptions?.maxHeight,
                            maxWidth: imageOptions?.uploadOptions?.maxWidth,
                        })
                    }

                    event.target.value = ''
                }}
            />
        </>
    )
}

export function ToolbarGroup({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="wysiwyg-toolbar-group"
            className={cn(
                'flex shrink-0 items-stretch',
                'border-r border-border-strong',
                className
            )}
            {...props}
        />
    )
}

const ToolbarMeasure = React.forwardRef<
    HTMLDivElement,
    {
        editor: Editor
        disabled: boolean
        headingEnabled: boolean
        groups: ToolbarGroupDefinition[]
    }
>(function ToolbarMeasure({ editor, disabled, headingEnabled, groups }, ref) {
    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(
                'pointer-events-none invisible absolute',
                'flex w-max items-stretch'
            )}>
            {headingEnabled && (
                <ToolbarGroup data-measure-heading>
                    <HeadingSelect editor={editor} disabled={disabled} />
                </ToolbarGroup>
            )}

            {groups.map(group => (
                <ToolbarGroup key={group.key} data-measure-group>
                    {group.actions.map(action => (
                        <div key={action.key} className="size-10 shrink-0" />
                    ))}
                </ToolbarGroup>
            ))}
        </div>
    )
})
