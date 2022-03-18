import React from 'react'
import classNames from 'classnames'

/**
 * Form checkbox element
 */

export interface FieldCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    classes?: string
}

export const FieldCheckbox = ({
    name,
    disabled,
    classes,
    children,
    ...props
}: FieldCheckboxProps) => (
    <label className={classNames('flex items-center', classes)}>
        <input
            data-testid="pzh-form-checkbox"
            disabled={disabled}
            name={name}
            className="absolute -left-[9999px] pzh-form-checkbox"
            type="checkbox"
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
