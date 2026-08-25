import type { ImageOptions } from '@tiptap/extension-image'

export type WysiwygImageOptions = {
    options?: Partial<ImageOptions>
    uploadOptions?: {
        maxHeight?: number
        maxWidth?: number
        maxSize?: number
        accept?: string
    }
}

export type WysiwygToolbarOption =
    | 'heading'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strike'
    | 'alignLeft'
    | 'alignCenter'
    | 'alignRight'
    | 'alignJustify'
    | 'table'
    | 'bulletList'
    | 'orderedList'
    | 'subscript'
    | 'superscript'
    | 'link'
    | 'image'
