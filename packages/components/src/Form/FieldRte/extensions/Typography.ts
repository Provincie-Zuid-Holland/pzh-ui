import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'

export const CustomBold = Bold.extend({
    renderHTML({ HTMLAttributes }) {
        return ['b', HTMLAttributes, 0]
    },
})

export const CustomItalic = Italic.extend({
    renderHTML({ HTMLAttributes }) {
        return ['i', HTMLAttributes, 0]
    },
})
