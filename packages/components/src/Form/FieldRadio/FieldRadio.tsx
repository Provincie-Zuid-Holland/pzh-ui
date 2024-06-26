import classNames from 'clsx'
import React from 'react'
import { cn } from '../../utils'

/**
 * Form radio element
 */

export interface FieldRadioProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string | number
    hasError?: boolean
}

export const FieldRadio = ({
    disabled,
    hasError,
    className,
    children,
    ...props
}: FieldRadioProps) => (
    <label className={cn('inline-block items-center', className)}>
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
            className={classNames(
                'text-pzh-blue-dark relative inline-block cursor-pointer pl-7',
                {
                    'text-pzh-gray-600': disabled,
                }
            )}>
            {children}
        </span>
    </label>
)
