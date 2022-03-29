import React from 'react'
import classNames from 'classnames'
import { FieldLabel } from '../FieldLabel'

/**
 * Form input element
 */

export interface FieldInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    description?: string
    classes?: string
    hasError?: boolean
}

export const FieldInput = ({
    name,
    disabled,
    required,
    type = 'text',
    label,
    description,
    classes,
    hasError,
    ...props
}: FieldInputProps) => (
    <>
        {label && (
            <FieldLabel
                name={name}
                label={label}
                description={description}
                required={required}
            />
        )}
        <input
            data-testid="pzh-form-input"
            id={name}
            name={name}
            required={required}
            disabled={disabled}
            className={classNames(
                'pzh-form-input',
                {
                    'pzh-form-error': hasError,
                },
                classes
            )}
            type={type}
            {...props}
        />
    </>
)
