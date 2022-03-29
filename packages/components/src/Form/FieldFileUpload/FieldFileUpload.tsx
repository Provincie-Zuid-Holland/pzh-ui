import { useCallback, useMemo, useState } from 'react'
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone'
import { useUpdateEffect } from 'react-use'
import { getExtension } from 'mime'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

import { FieldLabel } from '../FieldLabel'
import formatBytes from '../../utils/formatBytes'

/**
 * Form file upload element
 */

export interface FieldFileUploadProps extends DropzoneOptions {
    name: string
    onChange: (files: FileWithPath[]) => void
    label?: string
    description?: string
    required?: boolean
    className?: string
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
    ],
    maxSize = 20971520, // = 20 MB
    ...props
}: FieldFileUploadProps) => {
    const [myFiles, setMyFiles] = useState<FileWithPath[]>([])

    const onDrop = useCallback(
        acceptedFiles => setMyFiles([...myFiles, ...acceptedFiles]),
        [myFiles]
    )

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            accept,
            ...props,
            onDrop,
        })

    const removeFile = (file: FileWithPath) => () => {
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

    useUpdateEffect(() => onChange(myFiles), [myFiles])

    return (
        <>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                />
            )}
            <div
                className={classNames(
                    'py-6 text-pzh-blue-dark text-center border border-dashed border-pzh-blue-dark border-opacity-35 rounded-[4px]',
                    className
                )}
                {...getRootProps()}>
                <input name={name} {...getInputProps()} />

                <div>
                    <FontAwesomeIcon
                        className={classNames('mb-2 max-w-[2rem]', {
                            'text-pzh-blue-dark': !isDragActive,
                            'text-pzh-green': isDragActive && !isDragReject,
                            'text-pzh-red': isDragReject && isDragActive,
                        })}
                        size="2x"
                        icon={faCloudArrowUp}
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
                    {myFiles.map((file: FileWithPath) => (
                        <li
                            key={file.path}
                            className="pzh-form-input justify-between items-center px-4 mt-2"
                            style={{ display: 'flex' }}>
                            <span>{file.path}</span>
                            <div className="flex items-center nowrap">
                                <span className="text-[16px] text-pzh-blue-dark text-opacity-50">
                                    {formatBytes(file.size)}
                                </span>
                                <button
                                    type="button"
                                    onClick={removeFile(file)}>
                                    <FontAwesomeIcon
                                        className="ml-4 text-pzh-red"
                                        icon={faTrashAlt}
                                    />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
