import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: 'primary' | 'secondary' | 'cta'
    size?: 'large' | 'small'
    icon?: IconProp
}

export const Button = ({
    variant = 'primary',
    label,
    type = 'button',
    size = 'large',
    disabled,
    icon,
    className,
    ...props
}: ButtonProps) => (
    <button
        type={type}
        className={classNames(
            'pzh-button',
            {
                'px-4 pt-[15px] pb-[12px] h-[48px]': size === 'large',
                'text-xs px-[12px] pb-[9px] pt-[12px] h-[36px]':
                    size === 'small',
                'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                    variant === 'primary' && !disabled,
                'text-pzh-blue border border-pzh-blue-dark border-opacity-35 hover:border-opacity-100':
                    variant === 'secondary' && !disabled,
                'bg-pzh-green hover:bg-pzh-green-dark text-white':
                    variant === 'cta' && !disabled,
                'cursor-pointer': !disabled,
            },
            className
        )}
        disabled={disabled}
        {...props}>
        {icon ? (
            <div className="flex">
                <FontAwesomeIcon
                    className={classNames({
                        '-mt-[2px]': variant !== 'secondary',
                        '-mt-0.5': variant === 'secondary',
                        'mr-2': size === 'large',
                        'mr-[8px]': size === 'small',
                    })}
                    icon={icon}
                />
                <span>{label}</span>
            </div>
        ) : (
            label
        )}
    </button>
)
