import classNames from 'clsx'
import React, { ReactNode } from 'react'

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
}: FieldTextAreaProps) => (
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
                    'col-span-6 mt-2 mb-0 md:col-span-2': layout === 'grid',
                })}
                hasError={hasError}
            />
        )}
        <textarea
            data-testid="pzh-form-textarea"
            id={name}
            name={name}
            disabled={disabled}
            required={required}
            rows={rows}
            className={cn(
                'pzh-form-input min-h-[calc(2lh+2*10px)] resize-none overflow-hidden',
                {
                    'pzh-form-error': hasError,
                    'col-span-6 md:col-span-4': layout === 'grid',
                },
                className
            )}
            style={{
                // @ts-ignore
                fieldSizing: 'content',
            }}
            {...props}
        />
    </div>
)
