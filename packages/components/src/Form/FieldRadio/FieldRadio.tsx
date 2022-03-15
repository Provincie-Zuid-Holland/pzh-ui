import React from 'react'
import classNames from 'classnames'

/**
 * Form radio element
 */

export interface FieldRadioProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    classes?: string
}

export const FieldRadio = ({
    label,
    name,
    id,
    disabled,
    classes,
    ...props
}: FieldRadioProps) => (
    <div className={classNames('flex items-center', classes)}>
        <input
            data-testid="pzh-form-radio"
            disabled={disabled}
            id={id}
            name={name}
            className="absolute -left-[9999px] pzh-form-radio"
            type="radio"
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
