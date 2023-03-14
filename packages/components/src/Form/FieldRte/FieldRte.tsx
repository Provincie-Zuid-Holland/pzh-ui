import { ReactNode } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import { FieldLabel } from '../FieldLabel'
import classNames from 'classnames'
import RteMenuBar from './components/RteMenuBar'

export interface FieldRteProps {
    name: string
    label?: string
    description?: string | ReactNode
    required?: boolean
    disabled?: boolean
    onBlur?: (value: any) => void
    testId?: string
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
}

export const FieldRte = ({
    name,
    label,
    description,
    required,
    testId,
    layout = 'default',
    tooltip,
}: FieldRteProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: '<p>Hello World!</p>',
    })

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
                <div className="border border-pzh-gray-600 rounded-[4px]">
                    <RteMenuBar editor={editor} />
                    <div className="p-4">
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    )
}
