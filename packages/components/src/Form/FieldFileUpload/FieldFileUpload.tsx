import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone'
import { useUpdateEffect } from 'react-use'
import { getExtension } from 'mime'
import classNames from 'classnames'
import { CloudArrowUp, TrashCan } from '@pzh-ui/icons'

import { FieldLabel } from '../FieldLabel'
import formatBytes from '../../utils/formatBytes'

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
}

export const FieldFileUpload = ({
    name,
    onChange,
    required,
    label,
    description,
    className,
    accept = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'application/vnd.ms-excel',
        'image/jpeg',
    ],
    maxSize = 20971520, // = 20 MB
    layout = 'default',
    tooltip,
    preview,
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

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            accept,
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
            (Array.isArray(accept) &&
                accept.map(type => `.${getExtension(type)}`)) ||
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

    useUpdateEffect(() => onChange(myFiles), [myFiles])

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
                className={classNames(
                    'py-6 text-pzh-blue-dark text-center border border-dashed border-pzh-blue-dark border-opacity-35 rounded-[4px]',
                    className,
                    {
                        'md:col-span-4 col-span-6': layout === 'grid',
                        hidden: myFiles.length === props.maxFiles,
                    }
                )}
                {...getRootProps()}>
                <input name={name} {...getInputProps()} />

                <div>
                    <CloudArrowUp
                        size={60}
                        className={classNames('mb-2 mx-auto max-w-[2rem]', {
                            'text-pzh-blue-dark': !isDragActive,
                            'text-pzh-green': isDragActive && !isDragReject,
                            'text-pzh-red': isDragReject && isDragActive,
                        })}
                    />

                    <p>
                        {!isDragReject ? (
                            <>
                                Sleep hier je bestanden naartoe of{' '}
                                {!isDragActive && (
                                    <span className="text-pzh-green underline">
                                        blader door je bestanden
                                    </span>
                                )}
                            </>
                        ) : (
                            <>Dit bestandstype is niet toegestaan.</>
                        )}
                    </p>
                    <span className="opacity-50">
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
                                Maximale bestandsgrootte {formatBytes(maxSize)}.
                            </>
                        )}
                    </span>
                </div>
            </div>
            {!!myFiles.length && (
                <ul>
                    {myFiles.map(file => (
                        <li
                            key={file.path}
                            className="pzh-form-input mt-2"
                            style={preview ? { paddingBottom: 0 } : undefined}>
                            <div
                                className={classNames(
                                    'flex justify-between items-center px-4',
                                    {
                                        'pb-1': preview,
                                    }
                                )}>
                                <span>{file.path}</span>
                                <div className="flex items-center nowrap">
                                    <span className="text-[16px] text-pzh-blue-dark text-opacity-50">
                                        {formatBytes(file.size)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={removeFile(file)}>
                                        <TrashCan
                                            size={16}
                                            className="ml-4 -mt-[2px] text-pzh-red"
                                        />
                                    </button>
                                </div>
                            </div>
                            {file.preview && (
                                <div>
                                    <img
                                        src={file.preview}
                                        onLoad={() =>
                                            URL.revokeObjectURL(file.preview!)
                                        }
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
