import { Editor } from '@tiptap/react'

import formatBytes from '../../../utils/formatBytes'
import { blobToBase64 } from '../extensions/imageUpload'

const validateImageDimensions = async (
    file: File,
    maxWidth: number,
    maxHeight: number
) => {
    return new Promise<string | null>(resolve => {
        const image = new Image()
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            const width = image.width
            const height = image.height

            if (maxWidth && width > maxWidth) {
                resolve(
                    `De afbeeldingsbreedte overschrijdt de maximaal toegestane breedte van ${maxWidth}px`
                )
            } else if (maxHeight && height > maxHeight) {
                resolve(
                    `De afbeeldingshoogte overschrijdt de maximaal toegestane hoogte van ${maxHeight}px`
                )
            } else {
                resolve(null)
            }
            URL.revokeObjectURL(image.src)
        }
    })
}

const validateImage = (
    editor: Editor,
    files: FileList,
    maxSize = 1048576,
    maxHeight = 2500,
    maxWidth = 1500
) => {
    Array.from(files).forEach(async file => {
        if (file.size > maxSize) {
            return alert(
                `De bestandsgrootte overschrijdt de maximaal toegestane grootte van ${formatBytes(
                    maxSize
                )}`
            )
        }

        const validate = await validateImageDimensions(
            file,
            maxWidth,
            maxHeight
        )

        if (!!validate) {
            return alert(validate)
        }

        const src = (await blobToBase64(file)) as string
        src && editor.chain().focus().setImage({ src }).run()
    })
}

export default validateImage
