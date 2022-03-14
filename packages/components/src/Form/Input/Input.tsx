import React from 'react'
import classNames from 'classnames'

/**
 * Form input element
 */

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    classes?: string
}

export const Input = ({ disabled, classes, ...props }: InputProps) => (
    <input
        data-testid="pzh-form-input"
        disabled={disabled}
        className={classNames('pzh-form-input pt-[15px] pb-[11px]', classes)}
        type="text"
        {...props}
    />
)
