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
            'inline-block transition duration-200 ease-in rounded focus:outline-none focus:ring font-bold',
            {
                'px-4': size === 'large',
                'text-xs': size === 'small',
                'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                    variant === 'primary' && !disabled,
                'text-pzh-blue border border-pzh-blue-dark border-opacity-35 hover:border-opacity-100':
                    variant === 'secondary' && !disabled,
                'bg-pzh-green hover:bg-pzh-green-dark text-white':
                    variant === 'cta' && !disabled,
                'cursor-pointer': !disabled,
                'bg-pzh-gray text-pzh-blue-dark text-opacity-35 cursor-not-allowed':
                    disabled,
            },
            classes
        )}
        style={
            size === 'small'
                ? {
                      paddingTop: 12,
                      paddingBottom: 9,
                      paddingInline: 12,
                      lineHeight: 1,
                  }
                : {
                      paddingTop: 16,
                      paddingBottom: 12,
                      lineHeight: 1,
                  }
        }
        {...props}>
        {label}
    </button>
)
