import { AnyExtension, Extensions, mergeAttributes } from '@tiptap/core'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { DOMOutputSpec } from '@tiptap/pm/model'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import classNames from 'clsx'
import { ReactNode, useEffect, useState } from 'react'

import { cn } from '../../utils'
import { FieldLabel } from '../FieldLabel'
import RteMenuBar from './components/RteMenuBar'
import { HandleDOMEvents } from './extensions/handleDOMEvents'
import ImageUpload from './extensions/imageUpload'
import { SanitisePastedHtml } from './extensions/sanitisePastedHtml'
import limitNestedLists from './utils/limitNestedLists'

export interface FieldRteProps {
    /** Name text */
    name: string
    /** Label text */
    label?: string
    /** Description underneath the label */
    description?: string | ReactNode
    /** Placeholder text */
    placeholder?: string
    /** Is field required */
    required?: boolean
    /** Applies disabled styling and disables the editor */
    disabled?: boolean
    /** Is called when the text is updated on blur */
    onBlur?: (value: string) => void
    /** Sets the initial text of the editor */
    initialContent?: string
    /** Add test-id for test purposes */
    testId?: string
    /** List of menu options that should be enabled */
    layout?: 'default' | 'grid'
    /** Add tooltip element */
    tooltip?: string | JSX.Element
    /** List of menu options that should be enabled */
    menuOptions?: TextEditorMenuOptions[]
    /** List of custom menu options that should be enabled */
    customMenuOptions?: TextEditorCustomMenuOptions[]
    /** List of custom menu buttons */
    customMenuButtons?: (editor: Editor) => ReactNode[]
    /** List of custom extensions */
    customExtensions?: AnyExtension[]
    /** Classnames of Tiptap editor */
    className?: string
    /** Classnames of menu */
    menuClassName?: string
    /** Has field an error */
    hasError?: boolean
    /** Options for image */
    imageOptions?: {
        /** Height in pixels, default 2500px */
        maxHeight?: number
        /** Width in pixels, default 1500px */
        maxWidth?: number
        /** Size in bytes, default 1048576 (1MB) */
        maxSize?: number
    }
}

export type TextEditorMenuOptions =
    | 'bold'
    | 'italic'
    | 'underline'
    | 'bulletList'
    | 'orderedList'

export type TextEditorCustomMenuOptions =
    | 'image'
    | 'link'
    | 'heading'
    | 'subscript'
    | 'superscript'
    | 'table'

export const FieldRte = ({
    name,
    label,
    description,
    placeholder,
    required,
    testId = name,
    layout = 'default',
    tooltip,
    disabled,
    onBlur,
    initialContent,
    menuOptions = ['bold', 'italic', 'underline', 'bulletList', 'orderedList'],
    className,
    customMenuOptions,
    customMenuButtons,
    customExtensions,
    menuClassName,
    hasError,
    imageOptions = {
        maxHeight: 2500,
        maxWidth: 1500,
        maxSize: 1048576,
    },
}: FieldRteProps) => {
    const [rightClick, setRightClick] = useState(false)

    const editor = useEditor({
        extensions: getEditorExtensions(),
        editable: !disabled,
        content: initialContent?.replace(/\n/g, '<br />'),
        onBlur({ editor }) {
            handleUpdate(editor as Editor)
        },
        onUpdate: limitNestedLists,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-neutral prose-li:my-0 prose-a:text-pzh-green-500 prose-img:my-0 p-5 max-w-full text-m text-pzh-blue-900 marker:text-pzh-blue-900 outline-none whitespace-pre-line',
                    className
                ),
                'data-testid': testId,
            },
        },
        injectCSS: false,
    })

    function getEditorExtensions() {
        const extensions: Extensions = [
            Document,
            Text,
            Paragraph,
            Bold,
            Italic,
            Underline,
            BulletList,
            OrderedList.extend({
                // Make sure lists can only start at 1.
                renderHTML({ HTMLAttributes }) {
                    const { start, ...attributesWithoutStart } = HTMLAttributes

                    return [
                        'ol',
                        mergeAttributes(
                            this.options.HTMLAttributes,
                            attributesWithoutStart
                        ),
                        0,
                    ]
                },
            }),
            ListItem,
            History,
            HardBreak,
            ...(customExtensions || []),
        ]

        if (placeholder)
            extensions.push(
                Placeholder.configure({
                    placeholder,
                })
            )

        if (!!customMenuOptions?.find(el => el === 'image'))
            extensions.push(
                Image.configure({
                    allowBase64: true,
                    inline: true,
                }),
                ImageUpload.configure(imageOptions)
            )

        if (!!customMenuOptions?.find(el => el === 'link'))
            extensions.push(
                Link.configure({
                    openOnClick: false,
                    validate: href => /^https?:\/\//.test(href),
                })
            )

        if (!!customMenuOptions?.find(el => el === 'heading'))
            extensions.push(
                Heading.configure({
                    levels: [3],
                })
            )

        if (!!customMenuOptions?.find(el => el === 'subscript'))
            extensions.push(Subscript)

        if (!!customMenuOptions?.find(el => el === 'superscript'))
            extensions.push(Superscript)

        if (!!customMenuOptions?.find(el => el === 'table'))
            extensions.push(
                Table.extend({
                    renderHTML({ HTMLAttributes }) {
                        const table: DOMOutputSpec = [
                            'table',
                            mergeAttributes(
                                this.options.HTMLAttributes,
                                HTMLAttributes
                            ),
                            ['tbody', 0],
                        ]

                        return table
                    },
                }),
                TableRow,
                TableCell,
                TableHeader,
                SanitisePastedHtml,
                HandleDOMEvents.configure({ callback: setRightClick })
            )

        return extensions
    }

    const handleUpdate = (editor: Editor) => {
        const html = editor.getHTML()

        // When the editor is empty, it still returns <p></p>.
        // We need to make sure we return an empty string in that case.
        if (html === '<p></p>') {
            onBlur?.('')
        } else {
            onBlur?.(html)
        }
    }

    useEffect(() => {
        if (!editor) return

        editor.off('blur')
        editor.on('blur', ({ editor }) => {
            handleUpdate(editor as Editor)
        })
    }, [editor])

    return (
        <div
            className={classNames({
                'grid grid-cols-6 gap-2 md:gap-8': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'col-span-6 mb-0 mt-2 md:col-span-2': layout === 'grid',
                    })}
                />
            )}
            <div
                className={classNames({
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                <div
                    className={classNames('relative rounded border', {
                        'bg-pzh-gray-200': disabled,
                        'bg-pzh-white': !disabled,
                        'pzh-form-error': hasError,
                        'border-pzh-gray-600': !hasError,
                    })}>
                    <RteMenuBar
                        editor={editor}
                        menuOptions={[
                            ...menuOptions,
                            ...(customMenuOptions || []),
                        ]}
                        customMenuButtons={customMenuButtons}
                        menuClassName={menuClassName}
                        disabled={disabled}
                        imageOptions={imageOptions}
                        rightClick={rightClick}
                        setRightClick={setRightClick}
                    />
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}
