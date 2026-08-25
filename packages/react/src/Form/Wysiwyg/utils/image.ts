import type { Editor } from '@tiptap/core'

export type ImageUploadOptions = {
    maxSize?: number
    maxHeight?: number
    maxWidth?: number
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) {
        return '0 Bytes'
    }

    const units = ['Bytes', 'KB', 'MB', 'GB']
    const index = Math.floor(Math.log(bytes) / Math.log(1024))

    return `${Number((bytes / 1024 ** index).toFixed(2))} ${units[index]}`
}

export const blobToBase64 = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(blob)

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
                return
            }

            reject(new Error('Afbeelding kon niet worden gelezen.'))
        }

        reader.onerror = () => {
            reject(
                reader.error ?? new Error('Afbeelding kon niet worden gelezen.')
            )
        }
    })

const validateImageDimensions = (
    file: File,
    maxWidth: number,
    maxHeight: number
) =>
    new Promise<string | null>((resolve, reject) => {
        const image = new Image()
        const objectUrl = URL.createObjectURL(file)

        image.src = objectUrl

        image.onload = () => {
            URL.revokeObjectURL(objectUrl)

            if (image.width > maxWidth) {
                resolve(
                    `De afbeeldingsbreedte overschrijdt de maximaal toegestane breedte van ${maxWidth}px.`
                )
                return
            }

            if (image.height > maxHeight) {
                resolve(
                    `De afbeeldingshoogte overschrijdt de maximaal toegestane hoogte van ${maxHeight}px.`
                )
                return
            }

            resolve(null)
        }

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject(
                new Error(
                    'De afmetingen van de afbeelding konden niet worden bepaald.'
                )
            )
        }
    })

export const insertImages = async (
    editor: Editor,
    files: FileList | File[],
    {
        maxSize = 1024 * 1024,
        maxHeight = 2500,
        maxWidth = 1500,
    }: ImageUploadOptions = {}
) => {
    for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
            continue
        }

        if (file.size > maxSize) {
            window.alert(
                `De bestandsgrootte overschrijdt de maximaal toegestane grootte van ${formatBytes(
                    maxSize
                )}.`
            )
            continue
        }

        const dimensionError = await validateImageDimensions(
            file,
            maxWidth,
            maxHeight
        )

        if (dimensionError) {
            window.alert(dimensionError)
            continue
        }

        const src = await blobToBase64(file)

        editor.chain().focus().setImage({ src }).run()
    }
}
