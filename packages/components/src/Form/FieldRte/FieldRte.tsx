import { Extensions, mergeAttributes } from '@tiptap/core'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'

import Heading from '@tiptap/extension-heading'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
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
    customMenuOptions,
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
                class: 'prose prose-neutral prose-li:my-0 prose-a:text-pzh-green prose-img:my-0 p-5 max-w-full text-m text-pzh-blue-dark marker:text-pzh-blue-dark outline-none whitespace-pre-line',
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
                Table.configure({
                    HTMLAttributes: {
                        // class: 'not-prose',
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
                data-testid={testId}
                className={classNames({
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                <div
                    className={classNames(
                        'border-pzh-gray-600 relative rounded border',
                        {
                            'bg-pzh-gray-100': disabled,
                            'pzh-form-error': hasError,
                        }
                    )}>
                    <RteMenuBar
                        editor={editor}
                        menuOptions={[
                            ...menuOptions,
                            ...(customMenuOptions || []),
                        ]}
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
