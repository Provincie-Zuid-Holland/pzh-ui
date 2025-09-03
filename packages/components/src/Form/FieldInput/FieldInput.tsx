import classNames from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../utils'
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
    inlineButton?: ReactNode
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
    inlineButton,
    ...props
}: FieldInputProps) => (
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
        <div
            className={classNames('relative', {
                'col-span-6 md:col-span-4': layout === 'grid',
            })}>
            {Icon && (
                <Icon
                    size={20}
                    className="text-pzh-blue-500 absolute right-3 h-[48px]"
                />
            )}
            <input
                data-testid="pzh-form-input"
                id={name}
                name={name}
                required={required}
                disabled={disabled}
                className={cn(
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
            {inlineButton}
        </div>
    </div>
)
