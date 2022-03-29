import React from 'react'
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
    classes?: string
    hasError?: boolean
}

export const FieldTextArea = ({
    name,
    disabled,
    required,
    label,
    description,
    rows = 4,
    classes,
    hasError,
    ...props
}: FieldTextAreaProps) => (
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
            data-testid="pzh-form-textarea"
            name={name}
            disabled={disabled}
            required={required}
            rows={rows}
            className={classNames(
                'pzh-form-input min-h-[48px]',
                {
                    'pzh-form-error': hasError,
                },
                classes
            )}
            {...props}
        />
    </>
)
