import React from 'react'
import classNames from 'classnames'

/**
 * Form radio element
 */

export interface FieldRadioProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string
    classes?: string
    hasError?: boolean
}

export const FieldRadio = ({
    disabled,
    classes,
    hasError,
    children,
    ...props
}: FieldRadioProps) => (
    <label className={classNames('flex items-center', classes)}>
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
                    'text-opacity-35': disabled,
                }
            )}>
            {children}
        </span>
    </label>
)
