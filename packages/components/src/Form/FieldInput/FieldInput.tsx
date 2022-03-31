import React from 'react'
import classNames from 'classnames'
import { FieldLabel } from '../FieldLabel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

/**
 * Form input element
 */

export interface FieldInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    description?: string
    hasError?: boolean
    icon?: IconProp
}

export const FieldInput = ({
    name,
    disabled,
    required,
    type = 'text',
    label,
    description,
    className,
    hasError,
    icon,
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
        <div className="relative">
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    className="absolute right-3 h-[48px]"
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
                        'pr-8': !!icon,
                    },
                    className
                )}
                type={type}
                {...props}
            />
        </div>
    </>
)
