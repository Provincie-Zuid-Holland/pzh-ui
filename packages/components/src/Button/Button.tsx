import classNames from 'classnames'
import { ElementType, ReactNode, useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import { Link } from 'react-router-dom'

import { Spinner } from '@pzh-ui/icons'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps<T extends ElementType>
    extends AriaButtonProps<'button'> {
    as?: T
    variant?: 'primary' | 'secondary' | 'cta' | 'link' | 'default'
    size?: 'large' | 'small'
    icon?: any
    iconSize?: number
    isLoading?: boolean
    className?: string
    children?: ReactNode
}

export const Button = <T extends ElementType = 'button'>({
    as,
    variant = 'primary',
    size = 'large',
    iconSize = 14,
    ...props
}: ButtonProps<T>) => {
    const ref = useRef(null)
    const { buttonProps } = useButton({ ...props, elementType: as }, ref)
    const { children, isDisabled, isLoading, icon } = props

    const Component = as === 'a' ? Link : as || 'button'

    const Icon = icon && isLoading ? Spinner : icon ? icon : null

    return (
        <Component
            {...(as === 'a' && {
                to: props.href,
            })}
            className={classNames(
                variant !== 'default' && {
                    'pzh-button': true,
                    'h-12 pb-3 pt-[15px]': size === 'large',
                    'px-4': size === 'large' && variant !== 'link',
                    'text-s h-10 pb-[9px] pt-[10px]': size === 'small',
                    'px-3': size === 'small' && variant !== 'link',
                    'font-normal underline': variant === 'link',
                    'font-bold': variant !== 'link',
                    'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                        variant === 'primary' && !isDisabled,
                    'bg-pzh-white text-pzh-blue border-pzh-gray-600 hover:border-pzh-blue border':
                        variant === 'secondary' && !isDisabled,
                    'bg-pzh-green hover:bg-pzh-green-dark text-white':
                        variant === 'cta' && !isDisabled,
                    'cursor-pointer': !isDisabled,
                },
                props.className
            )}
            ref={ref}
            {...buttonProps}>
            {Icon ? (
                <div className="flex items-center">
                    <Icon
                        size={iconSize}
                        className={classNames('-mt-0.5', {
                            'mr-2': !!children,
                        })}
                    />
                    <span>{children}</span>
                </div>
            ) : isLoading ? (
                <div className="flex items-center">
                    <Spinner className="-mt-0.5 mr-2 animate-spin" />
                    <span>{children}</span>
                </div>
            ) : (
                children
            )}
        </Component>
    )
}
