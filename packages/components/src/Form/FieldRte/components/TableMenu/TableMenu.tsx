import { useKeyboardEvent } from '@react-hookz/web'
import { EditorContentProps } from '@tiptap/react'
import { useRef } from 'react'
import { Divider } from '../../../../Divider'

interface TableMenuProps extends EditorContentProps {
    setRightClick: (rightClick: boolean) => void
}

const TableMenu = ({ editor, setRightClick }: TableMenuProps) => {
    const ref = useRef(null)

    /** Handle close on Escape key event */
    useKeyboardEvent(true, ev => {
        ev.key === 'Escape' && setRightClick(false)
    })

    if (!editor) return null

    return (
        <div
            ref={ref}
            className="bg-pzh-white after:content-[`' '`] after:border-b-pzh-white flex flex-col gap-2 px-6 py-4 shadow-[0_1px_8px_0_rgba(0,0,0,0.2)] after:absolute after:-top-2 after:left-0 after:right-0 after:mx-auto after:block after:h-0 after:w-0 after:border-x-[10px] after:border-b-[10px] after:border-t-0 after:border-x-[transparent] after:border-t-transparent">
            <button
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="text-pzh-blue text-left font-bold">
                Rij onder invoegen
            </button>
            <Divider className="bg-pzh-gray-600" />
            <button
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                className="text-pzh-blue text-left font-bold">
                Kolom links invoegen
            </button>
            <button
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="text-pzh-blue text-left font-bold">
                Kolom rechts invoegen
            </button>
            <Divider className="bg-pzh-gray-600" />
            <button
                onClick={() => editor.chain().focus().deleteRow().run()}
                className="text-pzh-blue text-left font-bold">
                Rij verwijderen
            </button>
            <button
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className="text-pzh-blue text-left font-bold">
                Kolom verwijderen
            </button>
            <Divider className="bg-pzh-gray-600" />
            <button
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                className="text-pzh-blue text-left font-bold">
                Headerrij aan/uit
            </button>
        </div>
    )
}

export default TableMenu
