import classNames from 'classnames'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
    DropzoneOptions,
    FileError,
    FileWithPath,
    useDropzone,
} from 'react-dropzone'
import { useEffectOnce, useUpdateEffect } from 'react-use'

import { CloudArrowUp, TrashCan } from '@pzh-ui/icons'

import { base64ToFile } from '../../utils/file'
import formatBytes from '../../utils/formatBytes'
import { FieldLabel } from '../FieldLabel'

/**
 * Form file upload element
 */

type File = FileWithPath & { preview?: string }

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
    maxSize = 1048576, // = 20 MB
    layout = 'default',
    tooltip,
    preview,
    defaultValue = [],
    maxWidth = 1500,
    maxHeight = 2500,
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
            const image = new Image()
            image.src = URL.createObjectURL(file)
            image.onload = () => {
                const width = image.width
                const height = image.height

                if (maxWidth && width > maxWidth) {
                    resolve({
                        code: 'image-too-wide',
                        message: `Afbeeldingsbreedte overschrijdt de maximaal toegestane breedte van ${maxWidth}px`,
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

    useEffectOnce(() => {
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
                    className={classNames(
                        'text-pzh-blue-dark border-pzh-gray-600 cursor-pointer rounded border border-dashed py-6 text-center',
                        className,
                        {
                            hidden: myFiles.length === props.maxFiles,
                        }
                    )}
                    {...getRootProps()}>
                    <div>
                        <CloudArrowUp
                            size={60}
                            className={classNames('mx-auto mb-2 max-w-[2rem]', {
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
                            })}
                        />

                        <p>
                            {!isDragReject &&
                            !!!fileRejections.length &&
                            !!!errors?.length ? (
                                <>
                                    Sleep hier je bestanden naartoe of{' '}
                                    {!isDragActive && (
                                        <span className="text-pzh-green underline">
                                            blader door je bestanden
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    {!!errors?.length
                                        ? errors.map(err => err.message)
                                        : 'Sorry, het opgegeven bestandstype is niet toegestaan of de bestandsgrootte is te groot.'}
                                </>
                            )}
                        </p>
                        <span className="text-pzh-gray-600">
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
                                    Het ondersteunde bestandstype is {accept}.
                                    Maximale bestandsgrootte{' '}
                                    {formatBytes(maxSize)}.
                                </>
                            )}
                            {maxWidth && ` Maximale breedte ${maxWidth}px.`}
                            {maxHeight && ` Maximale hoogte ${maxHeight}px.`}
                        </span>
                    </div>
                </div>
                {!!myFiles.length && (
                    <ul>
                        {myFiles.map((file, index) => (
                            <li
                                key={file.path || `file-${index}`}
                                className="pzh-form-input mt-2 overflow-hidden"
                                style={
                                    preview ? { paddingBottom: 0 } : undefined
                                }>
                                <div
                                    className={classNames(
                                        'flex items-center justify-between px-4',
                                        {
                                            'pb-1': preview,
                                        }
                                    )}>
                                    <span>{file.path || label}</span>
                                    <div className="nowrap flex items-center">
                                        <span className="text-pzh-blue-dark/50 text-s">
                                            {formatBytes(file.size)}
                                        </span>
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
                )}
            </div>
        </div>
    )
}
