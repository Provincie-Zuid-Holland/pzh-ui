import React, { ReactNode, useLayoutEffect, useRef } from 'react'
import classNames from 'classnames'

import { FieldLabel } from '../FieldLabel'

/**
 * Form textarea element
 */

export interface FieldTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label?: string
    description?: string | ReactNode
    hasError?: boolean
    layout?: 'default' | 'grid'
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
    layout = 'default',
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
    useLayoutEffect(() => resizeTextarea())

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
                    className={classNames({
                        'md:col-span-2 col-span-6 mb-0 mt-2': layout === 'grid',
                    })}
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
                        'md:col-span-4 col-span-6': layout === 'grid',
                    },
                    className
                )}
                {...props}
            />
        </div>
    )
}
