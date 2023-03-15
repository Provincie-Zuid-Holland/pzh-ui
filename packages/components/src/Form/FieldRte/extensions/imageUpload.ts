import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

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

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('imageUpload'),
                props: {
                    // @ts-ignore
                    handlePaste: async (_, event) => {
                        const files = event.clipboardData?.files

                        if (files?.length) {
                            event.preventDefault()
                            const src = (await blobToBase64(files[0])) as string
                            src &&
                                this.editor
                                    .chain()
                                    .focus()
                                    .setImage({ src })
                                    .run()
                        }
                    },
                    handleDOMEvents: {
                        // @ts-ignore
                        drop: async (_, event) => {
                            const files = event.dataTransfer?.files

                            if (files?.length) {
                                event.preventDefault()
                                const src = (await blobToBase64(
                                    files[0]
                                )) as string
                                src &&
                                    this.editor
                                        .chain()
                                        .focus()
                                        .setImage({ src })
                                        .run()
                            }
                        },
                    },
                },
            }),
        ]
    },
})

export default ImageUpload
