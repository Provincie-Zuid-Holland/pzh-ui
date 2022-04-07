import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { FieldLabel } from '../FieldLabel'

/**
 * Form textarea element
 */

export interface FieldTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label?: string
    description?: string
    hasError?: boolean
}

export const FieldTextArea = ({
    name,
    disabled,
    required,
    label,
    description,
    rows = 4,
    className,
    hasError,
    ...props
}: FieldTextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    // Resize size of textarea based on contents
    const resizeTextarea = () => {
        if (!textAreaRef.current) return

        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + 'px'
    }

    // Update size of textarea on initial load
    useEffect(() => resizeTextarea(), [])

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
            <textarea
                ref={textAreaRef}
                data-testid="pzh-form-textarea"
                id={name}
                name={name}
                disabled={disabled}
                required={required}
                onInput={resizeTextarea}
                rows={rows}
                className={classNames(
                    'pzh-form-input overflow-hidden resize-none min-h-[48px]',
                    {
                        'pzh-form-error': hasError,
                    },
                    className
                )}
                {...props}
            />
        </>
    )
}
