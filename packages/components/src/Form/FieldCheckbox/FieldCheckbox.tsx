import classNames from 'classnames'
import React from 'react'

/**
 * Form checkbox element
 */

export interface FieldCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}

export const FieldCheckbox = ({
    disabled,
    className,
    hasError,
    children,
    ...props
}: FieldCheckboxProps) => (
    <label className={classNames('flex items-center', className)}>
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
                'text-pzh-blue-dark relative inline-block cursor-pointer pl-7',
                {
                    'text-pzh-gray-600': disabled,
                }
            )}>
            {children}
        </span>
    </label>
)
