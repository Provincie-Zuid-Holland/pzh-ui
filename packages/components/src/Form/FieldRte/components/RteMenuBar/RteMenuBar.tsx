import {
    Bold,
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
import { EditorContentProps, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import classNames from 'clsx'
import { ButtonHTMLAttributes, Fragment } from 'react'

import {
    FieldRteProps,
    TextEditorCustomMenuOptions,
    TextEditorMenuOptions,
} from '../../FieldRte'
import validateImage from '../../utils/validateImage'
import TableMenu from '../TableMenu'
import { TableMenuOption } from '../TableMenu/TableMenu'
import { menuBarStateSelector } from './menuBarState'

interface RteMenuBarProps extends EditorContentProps {
    menuOptions: (TextEditorMenuOptions | TextEditorCustomMenuOptions)[]
    menuClassName?: string
    customMenuButtons?: FieldRteProps['customMenuButtons']
    imageOptions?: FieldRteProps['imageOptions']
    rightClick: boolean
    setRightClick: (rightClick: boolean) => void
    tableMenuOptions?: TableMenuOption[]
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
    tableMenuOptions,
}: RteMenuBarProps) => {
    if (!editor) return null

    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    return (
        <div
            className={classNames(
                'toolbar border-pzh-gray-600 bg-pzh-white flex rounded-t border-b px-2',
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
                                isActive={editorState.isBold}
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
                                isActive={editorState.isItalic}
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
                                isActive={editorState.isUnderline}
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
                                isActive={editorState.isBulletList}
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
                                isActive={editorState.isOrderedList}
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
                                isActive={editorState.isLink}
                                aria-label="Link"
                                title="Link">
                                <Link />
                            </MenuButton>
                        )
                    case 'heading':
                        return (
                            <select
                                key={option}
                                aria-label="Kop"
                                title="Kop"
                                disabled={disabled}
                                value={
                                    editor.isActive('heading', { level: 3 })
                                        ? '3'
                                        : editor.isActive('heading', {
                                                level: 4,
                                            })
                                          ? '4'
                                          : editor.isActive('heading', {
                                                  level: 5,
                                              })
                                            ? '5'
                                            : ''
                                }
                                onChange={event => {
                                    const level = Number(event.target.value) as
                                        | 3
                                        | 4
                                        | 5

                                    if (!level) {
                                        editor
                                            .chain()
                                            .focus()
                                            .setParagraph()
                                            .run()
                                        return
                                    }

                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level })
                                        .run()
                                }}
                                className="text-s m-1 h-8">
                                <option value="">Tekst</option>
                                <option value="3">Kop 3</option>
                                <option value="4">Kop 4</option>
                                <option value="5">Kop 5</option>
                            </select>
                        )
                    case 'subscript':
                        return (
                            <MenuButton
                                key={option}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleSubscript()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editorState.isSubscript}
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
                                        .focus()
                                        .toggleSuperscript()
                                        .run()
                                }
                                disabled={disabled}
                                isActive={editorState.isSuperscript}
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
                                        options={{
                                            placement: 'bottom',
                                        }}
                                        shouldShow={({ editor }) =>
                                            editor.isActive('table')
                                        }>
                                        {rightClick && (
                                            <TableMenu
                                                editor={editor}
                                                setRightClick={setRightClick}
                                                tableMenuOptions={
                                                    tableMenuOptions
                                                }
                                            />
                                        )}
                                    </BubbleMenu>
                                )}
                                <MenuButton
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .insertTable({
                                                rows: 3,
                                                cols: 4,
                                                withHeaderRow: true,
                                            })
                                            .run()
                                    }
                                    disabled={disabled || editorState.isTable}
                                    isActive={editorState.isTable}
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
            'm-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded',
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
