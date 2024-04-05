import classNames from 'clsx'
import React, { ReactNode, useLayoutEffect, useRef } from 'react'

import { cn } from '../../utils'
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
    tooltip?: string | JSX.Element
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
    tooltip,
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
            <textarea
                ref={textAreaRef}
                data-testid="pzh-form-textarea"
                id={name}
                name={name}
                disabled={disabled}
                required={required}
                onInput={resizeTextarea}
                rows={rows}
                className={cn(
                    'pzh-form-input min-h-[48px] resize-none overflow-hidden',
                    {
                        'pzh-form-error': hasError,
                        'col-span-6 md:col-span-4': layout === 'grid',
                    },
                    className
                )}
                {...props}
            />
        </div>
    )
}
