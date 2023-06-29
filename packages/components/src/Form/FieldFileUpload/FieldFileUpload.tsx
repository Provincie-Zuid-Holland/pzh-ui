import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import classNames from 'classnames'
import { CloudArrowUp, TrashCan } from '@pzh-ui/icons'

import { FieldLabel } from '../FieldLabel'
import formatBytes from '../../utils/formatBytes'
import { base64ToFile } from '../../utils/file'

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
    ...props
}: FieldFileUploadProps) => {
    const [myFiles, setMyFiles] = useState<File[]>([])

    const onDrop = useCallback(
        (acceptedFiles: File[]) =>
            setMyFiles([
                ...myFiles,
                ...(preview
                    ? acceptedFiles.map(file =>
                          Object.assign(file, {
                              preview: URL.createObjectURL(file),
                          })
                      )
                    : acceptedFiles),
            ]),
        [myFiles]
    )

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
                'grid grid-cols-6 md:gap-8 gap-2': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'md:col-span-2 col-span-6 mb-0 mt-2': layout === 'grid',
                    })}
                />
            )}
            <div
                className={classNames('relative', {
                    'md:col-span-4 col-span-6': layout === 'grid',
                })}>
                <input
                    {...getInputProps({
                        required,
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
                    })}
                />

                <div
                    className={classNames(
                        'py-6 text-pzh-blue-dark text-center border border-dashed border-pzh-gray-600 rounded-[4px] cursor-pointer',
                        className,
                        {
                            hidden: myFiles.length === props.maxFiles,
                        }
                    )}
                    {...getRootProps()}>
                    <div>
                        <CloudArrowUp
                            size={60}
                            className={classNames('mb-2 mx-auto max-w-[2rem]', {
                                'text-pzh-blue-dark': !isDragActive,
                                'text-pzh-green':
                                    isDragActive &&
                                    (!isDragReject || !!!fileRejections.length),
                                'text-pzh-red':
                                    isDragReject || !!fileRejections.length,
                            })}
                        />

                        <p>
                            {!isDragReject && !!!fileRejections.length ? (
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
                                    Sorry, het opgegeven bestandstype is niet
                                    toegestaan of de bestandsgrootte is te
                                    groot.
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
                                        'flex justify-between items-center px-4',
                                        {
                                            'pb-1': preview,
                                        }
                                    )}>
                                    <span>{file.path || label}</span>
                                    <div className="flex items-center nowrap">
                                        <span className="text-[16px] text-pzh-blue-dark/50">
                                            {formatBytes(file.size)}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={removeFile(file)}>
                                            <TrashCan
                                                size={16}
                                                className="ml-4 -mt-[2px] text-pzh-red"
                                            />
                                            <span className="sr-only">
                                                Verwijderen
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                {file.preview && (
                                    <div className="border-t border-pzh-gray-600">
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
