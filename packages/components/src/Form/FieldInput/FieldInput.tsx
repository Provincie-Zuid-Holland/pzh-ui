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
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
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
    layout = 'default',
    tooltip,
    ...props
}: FieldInputProps) => (
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
            className={classNames('relative', {
                'md:col-span-4 col-span-6': layout === 'grid',
            })}>
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
    </div>
)
