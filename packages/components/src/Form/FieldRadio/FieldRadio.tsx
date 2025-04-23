import classNames from 'clsx'
import React from 'react'

import { cn } from '../../utils'

/**
 * Form radio element
 */

export interface FieldRadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    value?: string | number
    hasError?: boolean
    withBorder?: boolean
    size?: 'small' | 'large'
}

export const FieldRadio = ({
    disabled,
    hasError,
    withBorder,
    size = 'large',
    className,
    children,
    ...props
}: FieldRadioProps) => (
    <label
        className={cn(
            'text-pzh-blue-500 inline-block items-center',
            {
                'has-[:focus]:ring-pzh-focus has-[:checked]:border-pzh-green-500 has-[:checked]:bg-pzh-green-10 border-pzh-blue-500 hover:border-pzh-green-500 hover:text-pzh-green-500 inline-flex items-center rounded border font-bold has-[:focus]:ring-2':
                    !!withBorder,
                'h-10 px-2': !!withBorder && size === 'small',
                'h-12 px-4': !!withBorder && size === 'large',
                'bg-pzh-red-10 border-pzh-red-500': !!withBorder && !!hasError,
            },
            className
        )}>
        <input
            data-testid="pzh-form-radio"
            disabled={disabled}
            className={classNames('pzh-form-radio absolute -left-[9999px]', {
                'pzh-form-error': hasError,
            })}
            type="radio"
            {...props}
        />
        <span
            className={classNames('relative inline-block cursor-pointer pl-7', {
                'text-pzh-gray-600': disabled,
            })}>
            {children}
        </span>
    </label>
)
