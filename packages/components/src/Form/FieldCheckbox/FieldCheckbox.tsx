import React from 'react'
import classNames from 'classnames'

/**
 * Form checkbox element
 */

export interface FieldCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    classes?: string
}

export const FieldCheckbox = ({
    label,
    name,
    id,
    disabled,
    classes,
    ...props
}: FieldCheckboxProps) => (
    <div className={classNames('flex items-center', classes)}>
        <input
            data-testid="pzh-form-checkbox"
            disabled={disabled}
            id={id}
            name={name}
            className="absolute -left-[9999px] pzh-form-checkbox"
            type="checkbox"
            {...props}
        />
        <label
            htmlFor={id}
            className={classNames(
                'relative pl-[34px] cursor-pointer inline-block text-pzh-blue-dark leading-[28px]',
                {
                    'text-opacity-35': disabled,
                }
            )}>
            {label}
        </label>
    </div>
)
