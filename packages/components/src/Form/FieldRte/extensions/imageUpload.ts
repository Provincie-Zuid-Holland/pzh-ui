import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import { Plugin, PluginKey } from 'prosemirror-state'

import validateImage from '../utils/validateImage'

// convert a blob to base64
export const blobToBase64 = async (blob: Blob) => {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

const ImageUpload = Extension.create({
    name: 'ImageUpload',
    addOptions() {
        return {
            maxHeight: 2500,
            maxWidth: 1500,
            maxSize: 1048576,
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('imageUpload'),
                props: {
                    handleDOMEvents: {
                        // @ts-ignore
                        drop: (_, event) => {
                            const files = event.dataTransfer?.files

                            if (files?.length) {
                                event.preventDefault()

                                return validateImage(
                                    this.editor as Editor,
                                    files,
                                    this.options.maxSize,
                                    this.options.maxHeight,
                                    this.options.maxWidth
                                )
                            }
                        },
                    },
                },
            }),
        ]
    },
})

export default ImageUpload
