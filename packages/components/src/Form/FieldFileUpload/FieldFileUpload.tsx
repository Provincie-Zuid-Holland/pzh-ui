import { CloudArrowUp, TrashCan } from '@pzh-ui/icons'
import { useMountEffect, useUpdateEffect } from '@react-hookz/web'
import classNames from 'clsx'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
    DropzoneOptions,
    FileError,
    FileWithPath,
    useDropzone,
} from 'react-dropzone-esm'

import { Text } from '../../Text'
import { cn } from '../../utils'
import { base64ToFile } from '../../utils/file'
import formatBytes from '../../utils/formatBytes'
import { FieldLabel } from '../FieldLabel'

/**
 * Form file upload element
 */

export type File = FileWithPath & { preview?: string }

export interface FieldFileUploadProps extends DropzoneOptions {
    name: string
    onChange: (files: FileWithPath[]) => void
    label?: string
    description?: string | ReactNode
    required?: boolean
    className?: string
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
    preview?: boolean
    defaultValue?: string[]
    maxWidth?: number
    maxHeight?: number
    hideDescription?: boolean
    hideIcon?: boolean
    hideSelectedFiles?: boolean
}

export const FieldFileUpload = ({
    name,
    onChange,
    required,
    label,
    description,
    className,
    accept = {
        'image/*': ['.png', '.jpeg', '.webp'],
    },
    maxSize = 1048576, // = 1 MB
    layout = 'default',
    tooltip,
    preview,
    defaultValue = [],
    maxWidth = 1500,
    maxHeight = 2500,
    hideDescription,
    hideIcon,
    hideSelectedFiles,
    ...props
}: FieldFileUploadProps) => {
    const [myFiles, setMyFiles] = useState<File[]>([])
    const [errors, setErrors] = useState<FileError[] | null>(null)

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setErrors(null)

            const validationPromises: Promise<FileError | null>[] =
                acceptedFiles.map(
                    async file => await validateImageDimensions(file)
                )

            Promise.all(validationPromises)
                .then(results => {
                    const errors = results.filter(Boolean) as FileError[]
                    if (errors.length > 0) {
                        // Handle validation errors here (e.g., display error messages)
                        setErrors(errors)
                    } else {
                        // No validation errors, proceed with adding files
                        setMyFiles([
                            ...myFiles,
                            ...(preview
                                ? acceptedFiles.map(file =>
                                      Object.assign(file, {
                                          preview: URL.createObjectURL(file),
                                      })
                                  )
                                : acceptedFiles),
                        ])
                    }
                })
                .catch(error => {
                    console.error('Error during validation:', error)
                })
        },
        [myFiles, preview]
    )

    const validateImageDimensions = async (file: File) => {
        return new Promise<FileError | null>(resolve => {
            if (!file.type.includes('image')) {
                resolve(null)
            }

            const image = new Image()
            image.src = URL.createObjectURL(file)
            image.onload = () => {
                const width = image.width
                const height = image.height

                if (maxWidth && width > maxWidth) {
                    resolve({
                        code: 'image-too-wide',
                        message: `De afbeeldingsbreedte overschrijdt de maximaal toegestane breedte van ${maxWidth}px`,
                    })
                } else if (maxHeight && height > maxHeight) {
                    resolve({
                        code: 'image-too-high',
                        message: `De afbeeldingshoogte overschrijdt de maximaal toegestane hoogte van ${maxHeight}px`,
                    })
                } else {
                    resolve(null)
                }
                URL.revokeObjectURL(image.src)
            }
        })
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        accept,
        maxSize,
        ...props,
        onDrop,
    })

    const removeFile = (file: File) => () => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
    }

    const acceptedTypes = useMemo(
        () =>
            (Object.keys(accept) &&
                Object.keys(accept).flatMap(type =>
                    accept[type].map(type => type)
                )) ||
            accept,
        [accept]
    )

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () =>
            myFiles.forEach(
                file => file.preview && URL.revokeObjectURL(file.preview)
            )
    }, [])

    useMountEffect(() => {
        if (!defaultValue?.length) return

        setMyFiles([])

        if (defaultValue.every(e => typeof e === 'string')) {
            Promise.all(defaultValue.map(val => base64ToFile(val, name))).then(
                onDrop
            )
        }
    })

    useUpdateEffect(() => {
        onChange(myFiles)

        return
    }, [myFiles])

    return (
        <div
            className={classNames({
                'grid grid-cols-6 gap-2 md:gap-8': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'col-span-6 mb-0 mt-2 md:col-span-2': layout === 'grid',
                    })}
                />
            )}
            <div
                className={classNames('relative', {
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                <input
                    {...getInputProps({
                        name,
                        style: {
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            opacity: 0.00001,
                            pointerEvents: 'none',
                        },
                        multiple: (props.maxFiles || 0) > 1,
                    })}
                />

                <div
                    className={cn(
                        'text-pzh-blue-dark border-pzh-gray-600 cursor-pointer rounded border border-dashed py-6 text-center',
                        className,
                        {
                            hidden: myFiles.length === props.maxFiles,
                            'border-pzh-positive ring-pzh-positive border-solid ring ring-1':
                                isDragActive,
                        }
                    )}
                    {...getRootProps()}>
                    <div>
                        {!hideIcon && (
                            <CloudArrowUp
                                size={60}
                                className={classNames(
                                    'mx-auto mb-2 max-w-[2rem]',
                                    {
                                        'text-pzh-blue-dark': !isDragActive,
                                        'text-pzh-green':
                                            isDragActive &&
                                            (!isDragReject ||
                                                !!!fileRejections.length ||
                                                !!!errors?.length),
                                        'text-pzh-red':
                                            isDragReject ||
                                            !!fileRejections.length ||
                                            !!errors?.length,
                                    }
                                )}
                            />
                        )}

                        <Text>
                            {!isDragReject &&
                            !!!fileRejections.length &&
                            !!!errors?.length ? (
                                <>
                                    Sleep hier je bestand(en) naartoe of{' '}
                                    <span className="text-pzh-green-500 underline">
                                        blader door je bestand(en)
                                    </span>
                                </>
                            ) : (
                                <>
                                    {!!errors?.length
                                        ? errors.map(err => err.message)
                                        : 'Sorry, het opgegeven bestandstype is niet toegestaan of de bestandsgrootte is te groot.'}
                                </>
                            )}
                        </Text>
                        {!hideDescription && (
                            <Text as="span" className="text-pzh-gray-600">
                                {Array.isArray(acceptedTypes) &&
                                acceptedTypes.length > 0 ? (
                                    <>
                                        De ondersteunde bestandstypen zijn{' '}
                                        {acceptedTypes
                                            .join(', ')
                                            .replace(/,(?!.*,)/gim, ' en')}
                                        . Maximale bestandsgrootte{' '}
                                        {formatBytes(maxSize)}.
                                    </>
                                ) : (
                                    <>
                                        Het ondersteunde bestandstype is{' '}
                                        {accept}. Maximale bestandsgrootte{' '}
                                        {formatBytes(maxSize)}.
                                    </>
                                )}
                                {maxWidth && ` Maximale breedte ${maxWidth}px.`}
                                {maxHeight &&
                                    ` Maximale hoogte ${maxHeight}px.`}
                            </Text>
                        )}
                    </div>
                </div>
                {!!myFiles.length && !hideSelectedFiles && (
                    <div className="border-pzh-gray-300 mt-6 rounded border p-4">
                        <Text bold color="text-pzh-blue-500 mb-2">
                            Geselecteerde bestanden
                        </Text>
                        <ul className="flex flex-col gap-2">
                            {myFiles.map((file, index) => (
                                <li
                                    key={file.path || `file-${index}`}
                                    className="pzh-form-input border-pzh-gray-200 overflow-hidden"
                                    style={
                                        preview
                                            ? { paddingBottom: 0 }
                                            : undefined
                                    }>
                                    <div
                                        className={classNames(
                                            'flex items-center justify-between px-4',
                                            {
                                                'pb-1': preview,
                                            }
                                        )}>
                                        <Text bold color="text-pzh-blue-500">
                                            {file.path || label}
                                        </Text>
                                        <div className="nowrap flex items-center">
                                            <Text
                                                as="span"
                                                size="s"
                                                color="text-pzh-gray-600">
                                                {formatBytes(file.size)}
                                            </Text>
                                            <button
                                                type="button"
                                                onClick={removeFile(file)}>
                                                <TrashCan
                                                    size={16}
                                                    className="text-pzh-red -mt-[2px] ml-4"
                                                />
                                                <span className="sr-only">
                                                    Verwijderen
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    {file.preview && (
                                        <div className="border-pzh-gray-600 border-t">
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                onLoad={() =>
                                                    URL.revokeObjectURL(
                                                        file.preview!
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
