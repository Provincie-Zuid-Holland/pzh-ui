import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

import { insertImages, type ImageUploadOptions } from '../utils/image'

export type ImageUploadExtensionOptions = Required<ImageUploadOptions>

export const ImageUpload = Extension.create<ImageUploadExtensionOptions>({
    name: 'imageUpload',

    addOptions() {
        return {
            maxHeight: 2500,
            maxWidth: 1500,
            maxSize: 1024 * 1024,
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('imageUpload'),

                props: {
                    handleDOMEvents: {
                        drop: (_view, event) => {
                            if (!(event instanceof DragEvent)) {
                                return false
                            }

                            const files = event.dataTransfer?.files

                            if (!files?.length) {
                                return false
                            }

                            const containsImage = Array.from(files).some(file =>
                                file.type.startsWith('image/')
                            )

                            if (!containsImage) {
                                return false
                            }

                            event.preventDefault()

                            void insertImages(this.editor, files, {
                                maxSize: this.options.maxSize,
                                maxHeight: this.options.maxHeight,
                                maxWidth: this.options.maxWidth,
                            })

                            return true
                        },
                    },
                },
            }),
        ]
    },
})
