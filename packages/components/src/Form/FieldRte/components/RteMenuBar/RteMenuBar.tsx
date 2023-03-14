import { EditorContentProps } from '@tiptap/react'
import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

const RteMenuBar = ({ editor }: EditorContentProps) => {
    if (!editor) return null

    return (
        <div className="px-2 flex">
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'font-bold' : ''}>
                bold
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'font-bold' : ''}>
                italic
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'font-bold' : ''}>
                underline
            </MenuButton>
        </div>
    )
}

const MenuButton = ({
    className,
    children,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={classNames('w-8 h-8', className)} {...rest}>
        {children}
    </button>
)

export default RteMenuBar
