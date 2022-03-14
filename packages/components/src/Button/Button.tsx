import React from 'react'
import classNames from 'classnames'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: 'primary' | 'secondary' | 'cta'
    size?: 'large' | 'small'
    classes?: string
}

export const Button = ({
    variant = 'primary',
    label,
    type = 'button',
    size = 'large',
    disabled,
    classes,
    ...props
}: ButtonProps) => (
    <button
        type={type}
        className={classNames(
            'pzh-button',
            {
                'px-4 pt-[16px] pb-[12px]': size === 'large',
                'text-xs px-[12px] pb-[9px] pt-[12px]': size === 'small',
                'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                    variant === 'primary' && !disabled,
                'text-pzh-blue border border-pzh-blue-dark border-opacity-35 hover:border-opacity-100':
                    variant === 'secondary' && !disabled,
                'bg-pzh-green hover:bg-pzh-green-dark text-white':
                    variant === 'cta' && !disabled,
                'cursor-pointer': !disabled,
            },
            classes
        )}
        disabled={disabled}
        {...props}>
        {label}
    </button>
)
