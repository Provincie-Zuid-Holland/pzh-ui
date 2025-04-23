import classNames from 'clsx'
import React from 'react'

import { cn } from '../../utils'

/**
 * Form checkbox element
 */

export interface FieldCheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    hasError?: boolean
    withBorder?: boolean
    size?: 'small' | 'large'
}

export const FieldCheckbox = ({
    disabled,
    className,
    hasError,
    withBorder,
    size = 'large',
    children,
    ...props
}: FieldCheckboxProps) => (
    <label
        className={cn(
            'text-pzh-blue-500 inline-flex items-center',
            {
                'has-[:focus]:ring-pzh-focus has-[:checked]:border-pzh-green-500 has-[:checked]:bg-pzh-green-10 border-pzh-blue-500 hover:border-pzh-green-500 hover:text-pzh-green-500 items-center rounded border font-bold has-[:focus]:ring-2':
                    !!withBorder,
                'h-10 px-2': !!withBorder && size === 'small',
                'h-12 px-4': !!withBorder && size === 'large',
                'bg-pzh-red-10 border-pzh-red-500': !!withBorder && !!hasError,
            },
            className
        )}>
        <input
            data-testid="pzh-form-checkbox"
            disabled={disabled}
            className={classNames('pzh-form-checkbox absolute -left-[9999px]', {
                'pzh-form-error': hasError,
            })}
            type="checkbox"
            {...props}
        />
        <span
            className={classNames(
                'text-pzh-blue-900 relative inline-block cursor-pointer pl-7',
                {
                    'text-pzh-gray-600': disabled,
                }
            )}>
            {children}
        </span>
    </label>
)
