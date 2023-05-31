import React from 'react'
import classNames from 'classnames'

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
    <label className={classNames('inline-block items-center', className)}>
        <input
            data-testid="pzh-form-radio"
            disabled={disabled}
            className={classNames('absolute -left-[9999px] pzh-form-radio', {
                'pzh-form-error': hasError,
            })}
            type="radio"
            {...props}
        />
        <span
            className={classNames(
                'relative pl-[34px] cursor-pointer inline-block text-pzh-blue-dark leading-[28px]',
                {
                    'text-pzh-gray-600': disabled,
                }
            )}>
            {children}
        </span>
    </label>
)
