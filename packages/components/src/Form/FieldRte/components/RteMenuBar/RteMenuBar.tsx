import { EditorContentProps } from '@tiptap/react'
import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

import {
    Bold,
    Images,
    Italic,
    Link,
    ListOl,
    ListUl,
    Underline,
} from '@pzh-ui/icons'

import {
    FieldRteProps,
    TextEditorCustomMenuOptions,
    TextEditorMenuOptions,
} from '../../FieldRte'
import validateImage from '../../utils/validateImage'

interface RteMenuBarProps extends EditorContentProps {
    menuOptions: (TextEditorMenuOptions | TextEditorCustomMenuOptions)[]
    menuClassName?: string
    imageOptions?: FieldRteProps['imageOptions']
}

const RteMenuBar = ({
    editor,
    disabled,
    menuOptions,
    menuClassName,
    imageOptions,
}: RteMenuBarProps) => {
    if (!editor) return null

    return (
        <div
            className={classNames(
                'border-pzh-gray-600 bg-pzh-white flex rounded-t border-b px-2',
                menuClassName
            )}>
            {menuOptions.map(option => {
                switch (option) {
                    case 'bold':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor.chain().focus().toggleBold().run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('bold')}
                                aria-label="Vetgedrukt"
                                title="Vetgedrukt">
                                <Bold />
                            </MenuButton>
                        )
                    case 'italic':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor.chain().focus().toggleItalic().run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('italic')}
                                aria-label="Cursief"
                                title="Cursief">
                                <Italic />
                            </MenuButton>
                        )
                    case 'underline':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleUnderline()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('underline')}
                                aria-label="Onderstreept"
                                title="Onderstreept">
                                <Underline />
                            </MenuButton>
                        )
                    case 'bulletList':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('bulletList')}
                                aria-label="Ongeordende lijst"
                                title="Ongeordende lijst">
                                <ListUl />
                            </MenuButton>
                        )
                    case 'orderedList':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleOrderedList()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('orderedList')}
                                aria-label="Genummerde lijst"
                                title="Genummerde lijst">
                                <ListOl />
                            </MenuButton>
                        )
                    case 'image':
                        return (
                            <label
                                key={option}
                                aria-label="Afbeelding"
                                title="Afbeelding"
                                className={classNames(
                                    'm-1 flex h-8 w-8 cursor-pointer items-center justify-center',
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
                                            validateImage(
                                                editor,
                                                files,
                                                imageOptions?.maxSize,
                                                imageOptions?.maxHeight,
                                                imageOptions?.maxWidth
                                            )
                                        }

                                        // Clear input after change so new images can be uploaded
                                        event.target.value = ''
                                    }}
                                />
                            </label>
                        )
                    case 'link':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() => {
                                    const previousUrl =
                                        editor.getAttributes('link').href
                                    const url = window.prompt(
                                        'URL',
                                        previousUrl
                                    )

                                    // cancelled
                                    if (url === null) {
                                        return
                                    }

                                    // empty
                                    if (url === '') {
                                        editor
                                            .chain()
                                            .focus()
                                            .extendMarkRange('link')
                                            .unsetLink()
                                            .run()

                                        return
                                    }

                                    // update link
                                    editor
                                        .chain()
                                        .focus()
                                        .extendMarkRange('link')
                                        .setLink({
                                            href: url,
                                            target: '_blank',
                                        })
                                        .run()
                                }}
                                disabled={disabled}
                                isActive={editor.isActive('link')}
                                aria-label="Link"
                                title="Link">
                                <Link />
                            </MenuButton>
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
    isActive,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }) => (
    <button
        className={classNames(
            'm-1 flex h-8 w-8 items-center justify-center rounded',
            className,
            {
                'pointer-events-none': rest.disabled,
                'bg-pzh-gray-100 text-pzh-green': isActive,
            }
        )}
        type="button"
        {...rest}>
        {children}
    </button>
)

export default RteMenuBar
