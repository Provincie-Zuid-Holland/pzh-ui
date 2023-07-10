import { ReactNode, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Editor, Extensions } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

import { FieldLabel } from '../FieldLabel'
import classNames from 'classnames'
import RteMenuBar from './components/RteMenuBar'
import ImageUpload from './extensions/imageUpload'

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
    /** Has field an error */
    hasError?: boolean
}

export type TextEditorMenuOptions =
    | 'bold'
    | 'italic'
    | 'underline'
    | 'bulletList'
    | 'orderedList'

export type TextEditorCustomMenuOptions = 'image' | 'link'

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
    hasError,
}: FieldRteProps) => {
    const editor = useEditor({
        extensions: getEditorExtensions(),
        editable: !disabled,
        content: initialContent,
        onBlur({ editor }) {
            handleUpdate(editor)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-neutral prose-li:my-0 prose-a:text-pzh-green prose-img:my-0 p-4 max-w-full text-pzh-blue-dark marker:text-pzh-blue-dark leading-6 outline-none',
            },
        },
        injectCSS: false,
    })

    function getEditorExtensions() {
        const extensions: Extensions = [
            StarterKit.configure({
                blockquote: false,
                code: false,
                codeBlock: false,
                strike: false,
                heading: false,
                horizontalRule: false,
            }),
            Underline,
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
                ImageUpload
            )

        if (!!customMenuOptions?.find(el => el === 'link'))
            extensions.push(
                Link.configure({
                    openOnClick: false,
                    validate: href => /^https?:\/\//.test(href),
                })
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
            handleUpdate(editor)
        })
    }, [editor, handleUpdate])

    return (
        <div
            className={classNames({
                'grid grid-cols-6 md:gap-8 gap-2': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'md:col-span-2 col-span-6 mb-0 mt-2': layout === 'grid',
                    })}
                />
            )}
            <div
                data-testid={testId}
                className={classNames({
                    'md:col-span-4 col-span-6': layout === 'grid',
                })}>
                <div
                    className={classNames(
                        'border border-pzh-gray-600 rounded-[4px]',
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
                        disabled={disabled}
                    />
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}
