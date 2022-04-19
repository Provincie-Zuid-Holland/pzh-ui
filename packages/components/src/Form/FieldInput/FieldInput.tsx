import { InputHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

import { FieldLabel } from '../FieldLabel'

/**
 * Form input element
 */

export interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    description?: string | ReactNode
    hasError?: boolean
    icon?: any
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
    icon: Icon,
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
            {Icon && (
                <Icon
                    size={20}
                    className="absolute right-3 h-[48px] text-pzh-blue"
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
                        'pr-8': !!Icon,
                    },
                    className
                )}
                type={type}
                {...props}
            />
        </div>
    </>
)
