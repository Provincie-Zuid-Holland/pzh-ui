import {
    Bold,
    Heading,
    Images,
    Italic,
    Link,
    ListOl,
    ListUl,
    Subscript,
    Superscript,
    Table,
    Underline,
} from '@pzh-ui/icons'
import { BubbleMenu, EditorContentProps } from '@tiptap/react'
import classNames from 'clsx'
import { ButtonHTMLAttributes, Fragment } from 'react'

import {
    FieldRteProps,
    TextEditorCustomMenuOptions,
    TextEditorMenuOptions,
} from '../../FieldRte'
import validateImage from '../../utils/validateImage'
import TableMenu from '../TableMenu'

interface RteMenuBarProps extends EditorContentProps {
    menuOptions: (TextEditorMenuOptions | TextEditorCustomMenuOptions)[]
    menuClassName?: string
    customMenuButtons?: FieldRteProps['customMenuButtons']
    imageOptions?: FieldRteProps['imageOptions']
    rightClick: boolean
    setRightClick: (rightClick: boolean) => void
    enableColorPicker?: boolean
}

const RteMenuBar = ({
    editor,
    disabled,
    menuOptions,
    menuClassName,
    customMenuButtons,
    imageOptions,
    rightClick,
    setRightClick,
    enableColorPicker,
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
                                    editor.chain().toggleBold().focus().run()
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
                                    editor.chain().toggleItalic().focus().run()
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
                                        .toggleUnderline()
                                        .focus()
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
                                        .toggleBulletList()
                                        .focus()
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
                                        .toggleOrderedList()
                                        .focus()
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
                                                imageOptions?.uploadOptions
                                                    ?.maxSize,
                                                imageOptions?.uploadOptions
                                                    ?.maxHeight,
                                                imageOptions?.uploadOptions
                                                    ?.maxWidth
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
                                            .extendMarkRange('link')
                                            .unsetLink()
                                            .focus()
                                            .run()

                                        return
                                    }

                                    // update link
                                    editor
                                        .chain()
                                        .extendMarkRange('link')
                                        .setLink({
                                            href: url,
                                            target: '_blank',
                                        })
                                        .focus()
                                        .run()
                                }}
                                disabled={disabled}
                                isActive={editor.isActive('link')}
                                aria-label="Link"
                                title="Link">
                                <Link />
                            </MenuButton>
                        )
                    case 'heading':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .toggleHeading({ level: 3 })
                                        .focus()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('heading')}
                                aria-label="Kop"
                                title="Kop">
                                <Heading />
                            </MenuButton>
                        )
                    case 'subscript':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .toggleSubscript()
                                        .focus()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('subscript')}
                                aria-label="Onderschrift"
                                title="Onderschrift">
                                <Subscript />
                            </MenuButton>
                        )
                    case 'superscript':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .toggleSuperscript()
                                        .focus()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editor.isActive('superscript')}
                                aria-label="Bovenschrift"
                                title="Bovenschrift">
                                <Superscript />
                            </MenuButton>
                        )
                    case 'table':
                        return (
                            <Fragment key={option}>
                                {editor && (
                                    <BubbleMenu
                                        editor={editor}
                                        tippyOptions={{
                                            duration: 100,
                                            placement: 'bottom',
                                        }}
                                        shouldShow={({ editor }) =>
                                            editor.isActive('table')
                                        }>
                                        {rightClick && (
                                            <TableMenu
                                                editor={editor}
                                                setRightClick={setRightClick}
                                                enableColorPicker={
                                                    enableColorPicker
                                                }
                                            />
                                        )}
                                    </BubbleMenu>
                                )}
                                <MenuButton
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .insertTable({
                                                rows: 3,
                                                cols: 4,
                                                withHeaderRow: true,
                                            })
                                            .focus()
                                            .run()
                                    }
                                    disabled={
                                        disabled || editor.isActive('table')
                                    }
                                    isActive={editor.isActive('table')}
                                    aria-label="Tabel"
                                    title="Tabel">
                                    <Table />
                                </MenuButton>
                            </Fragment>
                        )
                    default:
                        break
                }
            })}
            {customMenuButtons?.(editor)}
        </div>
    )
}

export const MenuButton = ({
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
                'bg-pzh-gray-100 text-pzh-green-500': isActive,
            }
        )}
        type="button"
        {...rest}>
        {children}
    </button>
)

export default RteMenuBar
