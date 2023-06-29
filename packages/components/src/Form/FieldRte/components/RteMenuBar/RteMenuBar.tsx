import {
    Bold,
    Images,
    Italic,
    Link,
    ListOl,
    ListUl,
    Underline,
} from '@pzh-ui/icons'
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
                                    'm-0.5 w-7 h-7 flex items-center justify-center cursor-pointer',
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
            'm-0.5 w-7 h-7 flex items-center justify-center rounded-[4px]',
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
