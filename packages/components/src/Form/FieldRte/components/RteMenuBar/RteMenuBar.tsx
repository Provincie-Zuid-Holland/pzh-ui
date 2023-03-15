import { Bold, Images, Italic, ListOl, ListUl, Underline } from '@pzh-ui/icons'
import { EditorContentProps } from '@tiptap/react'
import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { blobToBase64 } from '../../extensions/imageUpload'
import {
    TextEditorCustomMenuOptions,
    TextEditorMenuOptions,
} from '../../FieldRte'

interface RteMenuBarProps extends EditorContentProps {
    menuOptions: (TextEditorMenuOptions | TextEditorCustomMenuOptions)[]
}

const RteMenuBar = ({ editor, disabled, menuOptions }: RteMenuBarProps) => {
    if (!editor) return null

    return (
        <div className="px-2 flex border-b border-pzh-gray-600">
            {menuOptions.map(option => {
                switch (option) {
                    case 'bold':
                        return (
                            <MenuButton
                                onClick={() =>
                                    editor.chain().focus().toggleBold().run()
                                }
                                disabled={disabled}
                                className={classNames({
                                    'bg-pzh-gray-100 text-pzh-green':
                                        editor.isActive('bold'),
                                })}
                                aria-label="bold">
                                <Bold />
                            </MenuButton>
                        )
                    case 'italic':
                        return (
                            <MenuButton
                                onClick={() =>
                                    editor.chain().focus().toggleItalic().run()
                                }
                                disabled={disabled}
                                className={classNames({
                                    'bg-pzh-gray-100 text-pzh-green':
                                        editor.isActive('italic'),
                                })}
                                aria-label="italic">
                                <Italic />
                            </MenuButton>
                        )
                    case 'underline':
                        return (
                            <MenuButton
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleUnderline()
                                        .run()
                                }
                                disabled={disabled}
                                className={classNames({
                                    'bg-pzh-gray-100 text-pzh-green':
                                        editor.isActive('underline'),
                                })}
                                aria-label="underline">
                                <Underline />
                            </MenuButton>
                        )
                    case 'bulletList':
                        return (
                            <MenuButton
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run()
                                }
                                disabled={disabled}
                                className={classNames({
                                    'bg-pzh-gray-100 text-pzh-green':
                                        editor.isActive('bulletList'),
                                })}
                                aria-label="bullet list">
                                <ListUl />
                            </MenuButton>
                        )
                    case 'orderedList':
                        return (
                            <MenuButton
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleOrderedList()
                                        .run()
                                }
                                disabled={disabled}
                                className={classNames({
                                    'bg-pzh-gray-100 text-pzh-green':
                                        editor.isActive('orderedList'),
                                })}
                                aria-label="ordered list">
                                <ListOl />
                            </MenuButton>
                        )
                    case 'image':
                        return (
                            <label
                                aria-label="Upload afbeelding"
                                className={classNames(
                                    'w-8 h-8 flex items-center justify-center cursor-pointer',
                                    {
                                        'pointer-events-none': disabled,
                                    }
                                )}>
                                <Images />
                                <input
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
                                    className="hidden"
                                    onChange={async event => {
                                        const files = event.target.files

                                        if (files?.length) {
                                            event.preventDefault()
                                            const src = (await blobToBase64(
                                                files[0]
                                            )) as string
                                            src &&
                                                editor
                                                    .chain()
                                                    .focus()
                                                    .setImage({ src })
                                                    .run()
                                        }

                                        // Clear input after change so new images can be uploaded
                                        event.target.value = ''
                                    }}
                                />
                            </label>
                        )
                    default:
                        break
                }
            })}
        </div>
    )
}

const MenuButton = ({
    className,
    children,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={classNames(
            'w-8 h-8 flex items-center justify-center',
            className,
            {
                'pointer-events-none': rest.disabled,
            }
        )}
        {...rest}>
        {children}
    </button>
)

export default RteMenuBar
